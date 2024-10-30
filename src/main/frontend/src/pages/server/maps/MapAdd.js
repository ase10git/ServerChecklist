import { Container, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styles from 'styles/pages/server/maps/mapAdd.module.css';
import { useState } from 'react';
import { Camera, XCircle } from 'react-bootstrap-icons';
import { create } from 'api/serverItems';

function MapAdd() {

    const {id} = useParams();
    
    // 새 지도 form
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        photo: '',
        ownerId: '1111', // for test
        serverId: id,
        description: ''
    });
    const navigate = useNavigate();

    // 변경할 파일 미리보기 url
    const [fileUrl, setFileUrl] = useState('');

    // form 데이터 등록
    function handleChange(event) {
        const { name, value } = event.currentTarget;
        setFormData((prev)=>({
            ...prev,
            [name] : value,
        }));
    }

    // 파일 변경
    function handlePhotoChange(event) {
        const { files } = event.currentTarget;
        setFormData((prev) => ({
            ...prev,
            "photo" : files[0],
        }));

        // 업로드한 파일 미리보기 url 생성
        const currentImageUrl = URL.createObjectURL(files[0]);
        setFileUrl(currentImageUrl);
    }

    // 업로드할 파일 삭제(파일 업로드 취소)
    function handleFileUploadQuit() {
        setFormData((prev)=>({
            ...prev,
            "photo" : null,
        }));
        setFileUrl('');
    }

    // 새 지도 추가
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            if (formData.title === null || formData.title === '') {
                alert('제목을 입력해주세요!');
                return;
            }
            if (formData.location === null || formData.location === '') {
                alert('위치 정보를 입력해주세요!');
                return;
            }
            if (formData.description === null || formData.description === '') {
                alert('지도 설명을 입력해주세요!');
                return;
            }
            
            // 전송할 formData 객체 생성
            const formDataToSend = new FormData();
            Object.keys(formData)
                .filter(key => key !== "photo")
                .forEach(key => {
                    formDataToSend.append(`${key}`, formData[key]);    
                });

            // 파일이 있는 경우에만 첨부
            // 만약 그냥 null아라도 FormData에 넣는 경우 서버에서 type mismatch 에러 발생
            if (formData.photo) {
                formDataToSend.append("photo", formData.photo);
            }

            const res = await create(2, formDataToSend);

            if (res !== null) {
                alert('지도가 추가되었습니다');
                navigate(`/servers/${id}/maps`);
            } else {
                alert('지도 추가를 실패했습니다');
            }
        } catch {
        }
    }

    // 맵 등록 취소
    function handleBackBtn() {
        navigate(`/servers/${id}/maps`);
    }

    // 업로드한 사진 미리보기 생성
    function ImageBox() {
        return (
            (formData.photo) ?
                <img src={fileUrl}  
                alt="mapimg"
                className={styles.map_img}/>
                :
                <div className={styles.map_default_img}>
                    <Camera/>
                </div>
        )
    }
    
    return (
        <Container className={styles.container}>
            <h2 className={styles.title}>지도 추가</h2> 
            <Form className={styles.box}>
                <div className={styles.top_box}>
                    <OverlayTrigger
                    placement='top'
                    overlay={<Tooltip>업로드할 사진을 삭제합니다</Tooltip>}>
                        <button type="button"
                        className={styles.remove_img_btn}
                        onClick={handleFileUploadQuit}>
                            <XCircle/>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                    placement='top'
                    overlay={
                        <Tooltip>사진을 추가하려면 여기를 누르세요</Tooltip>
                    }>
                        <div className={styles.img_box}>
                            <label htmlFor='photo'>
                                <ImageBox/>
                            </label>
                            <input type='file' name="photo" 
                            id="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}></input>
                        </div>
                    </OverlayTrigger>
                </div>
                <div className={styles.info_box}>
                    <Form.Group md="4" controlId="title" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="title">제목</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="title"
                            name="title"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4" controlId="location" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="location">위치 정보</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="location"
                            name="location"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4" controlId="description" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="description">지도 설명</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="description"
                            name="description"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                </div>
            </Form>
            <div className={styles.btn_wrap}>
                <button className={`edit_btn ${styles.upload_btn}`}
                onClick={handleSubmit}>업로드</button>
                <button className='del_btn' onClick={handleBackBtn}>취소</button>
            </div>
        </Container>
    )
}

export default MapAdd;