import styles from 'styles/pages/server/serverAdd.module.css';
import { Container, Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { patch } from 'api/server';
import { Camera, XCircle } from 'react-bootstrap-icons';

function ServerEdit() {

    const {id} = useParams();
    const {serverInfo} = useOutletContext(); // 서버 정보
    // 파일 제거 플래그
    const [fileFlag, setFileFlag] = useState(false);

    // form 데이터
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        photo: null,
        usage: '',
        description: ''
    });

    // 변경할 파일 미리보기 url
    const [fileUrl, setFileUrl] = useState('');

    useEffect(()=>{
        // 서버 정보 가져온 후 formData 수정하기
        setFormData({
            id: serverInfo.id,
            name: serverInfo.name,
            photo: serverInfo.photo ?? null,
            usage: serverInfo.usage,
            description: serverInfo.description
        });
    }, [serverInfo]);

    const navigate = useNavigate();

    // form 데이터 등록
    function handleChange(event) {
        const { name, value } = event.currentTarget;
        setFormData((prev) => ({
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

    // 파일 삭제 플래그 변경
    function handleFileRemove() {
        setFileFlag(!fileFlag);
    }

    // 서버 수정
    async function handleSubmit(event) {
        event.preventDefault();

        // 전송할 formData 객체 생성
        const formDataToSend = new FormData();
        Object.keys(formData)
        .filter(key => key !== "photo")
        .forEach((key)=>{
            if (formData[key] === null || formData[key] === '') {
                formDataToSend.append(`${key}`, serverInfo[key]);
            } else {
                formDataToSend.append(`${key}`, formData[key]);
            }
        });
        formDataToSend.append("fileDeleteFlag", fileFlag);

        // 파일이 있는 경우에만 첨부
        // 만약 그냥 null이라도 FormData에 넣는 경우 서버에서 type mismatch 에러 발생
        if (formData.photo) {
            formDataToSend.append("photo", formData.photo);
        }

        try {
            const res = await patch(id, formDataToSend);

            if (res !== null) {
                alert('서버가 수정되었습니다');
                navigate(`/servers/${serverInfo.id}`);
            } else {
                alert('서버 수정을 실패했습니다');
            }
        } catch (error) {
        }
    }

    // 뒤로 가기
    function handleBackBtn() {
        navigate(`/servers/${serverInfo.id}`);
    }

    // 서버 사진과 업로드한 사진 미리보기 생성
    function ImageBox() {
        if (formData.photo) {
            return(
                <img src={fileUrl}  
                alt="serverimg"
                className={styles.server_img}/>
            )
        } else {
            if (serverInfo.photoId) {
                return (                        
                    <img src={serverInfo.imgUrl}  
                    alt="serverimg"
                    className={styles.server_img}/>)
            } else {
                return (
                    <div className={styles.server_default_img}>
                        <Camera/>
                    </div>
                )
            }
        }
    }

    return(
        <Container className={styles.container}>
            <h2 className={styles.title}>{serverInfo.name} 서버 정보 수정</h2> 
            <Form onSubmit={handleSubmit}
            className={styles.box}>
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
                        <Tooltip>사진을 수정하려면 여기를 누르세요</Tooltip>
                    }>
                        <div className={styles.img_box}>
                            <label htmlFor='photo'>
                                <ImageBox/>
                            </label>
                            <input type='file' 
                            name="photo" id="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}></input>
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                    placement='right'
                    overlay={<Tooltip>서버에 이미 등록된 사진을 제거하거나 취소합니다</Tooltip>}>
                        <button type="button" 
                        className={
                            `${styles.file_remove_btn} ${fileFlag ? styles.del_false : styles.del_true}`
                        }
                        onClick={handleFileRemove}>
                            {
                                fileFlag ? 
                                '사진 제거 취소하기' 
                                : '서버 사진 제거하기'
                            }
                        </button>
                    </OverlayTrigger>
                </div>
                <div className={styles.info_box}>
                    <Form.Group md="4" controlId="name" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="name">서버 이름</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="name"
                            placeholder={serverInfo.name}
                            name="name"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4" controlId="usage" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="usage">사용 용도</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="usage"
                            placeholder={serverInfo.usage}
                            name="usage"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4" controlId="description" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="description">서버 이름</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="description"
                            placeholder={serverInfo.description}
                            name="description"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                </div>
            </Form>
            <div className={styles.btn_wrap}>
                <button className={`edit_btn ${styles.upload_btn}`}
                onClick={handleSubmit}>수정</button>
                <button className='del_btn' onClick={handleBackBtn}>취소</button>
            </div>
        </Container>
    )
}

export default ServerEdit;