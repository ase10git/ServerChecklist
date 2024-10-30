import { Container, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styles from 'styles/pages/server/maps/mapDetail.module.css';
import { useEffect, useState } from 'react';
import MapContext, { useMap } from 'contexts/MapContext';
import { patch, remove, show } from 'api/serverItems';
import { Camera, Map, Pencil, Trash, XCircle } from 'react-bootstrap-icons';
import fileurl from 'api/image';

function MapDetail() {

    const [map, setMap] = useState({});
    const {id, mapid} = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    
    // 수정 메모 form
    const [editFormData, setEditFormData] = useState({
        id: mapid,
        title: '',
        location: '',
        photo: null,
        ownerId: '',
        serverId: id,
        description: ''
    });

    // 지도 목록으로 이동
    function handleBackBtn() {
        navigate(`/servers/${id}/maps`);
    }

    // 지도 편집
    function handleEditChange() {
        setIsEdit(!isEdit);
    }

    useEffect(()=>{
        // 지도 가져오기
        async function getMap() {
            const res = await show(2, mapid);
            setMap(res);
            setEditFormData({
                id: mapid,
                title: res.title,
                location: res.location,
                photo: null,
                ownerId: res.ownerId,
                serverId: id,
                description: res.description
            });
        }
        getMap();
    }, [id, mapid]);

    return (
        <Container className={styles.container}>
            <MapContext.Provider value={{
                id, mapid, map, setMap, 
                isEdit, setIsEdit, handleEditChange, navigate
            }}>
            {
                isEdit === false ? 
                <MapInfo handleBackBtn={handleBackBtn}/>
                : 
                <MapEdit editFormData={editFormData}
                setEditFormData={setEditFormData}/>
            }
            </MapContext.Provider>
        </Container>
    )
}

// default map info page ------------------------------------------------------------------
function MapInfo({
    handleBackBtn
}) {
    const {id, map, mapid, handleEditChange, navigate} = useMap();

    async function handleDelete() {
        if (!window.confirm('정말 삭제할까요?')) {
            return;
        }

        try {
            const res = await remove(2, mapid);
            
            if (res !== null) {
                alert('지도가 삭제되었습니다');
                navigate(`/servers/${id}/maps`);
            } else {
                alert('지도 삭제를 실패했습니다');
            }
        } catch (error) {
        }
    }

    return(
        <div>
            <div className={styles.title_box}>
                <h2 className={styles.title}>{map.title}</h2> 
                <div className={styles.btn_wrap}>
                    <button className={`edit_btn ${styles.edit_btn}`}
                    onClick={handleEditChange}><Pencil/></button>
                    <button className={`del_btn ${styles.del_btn}`}
                    onClick={handleDelete}><Trash/></button>
                </div>
            </div>
            <div className={styles.box}>
                <div className={styles.map_img_box}>
                    {
                        map.photoId ? 
                        <img src={`${fileurl}${map.photoId}`} alt="mapimg"/>
                        : 
                        <div className={styles.icon_default}>
                            <Map/>
                        </div>
                    }
                </div>
                <div className={styles.info_box}>
                    <span className={styles.nickname}>{map.ownerId}</span>
                    <p>위치 정보 : 
                        <span className={styles.location}>{map.location}</span>
                    </p>
                    <p className={styles.desc_box}>{map.description}</p>
                </div>
            </div>
            <div className={styles.list_btn_wrap}>
                <button onClick={handleBackBtn}>목록으로</button>
            </div>
        </div>
    )
}

// map edit box ------------------------------------------------------------------
function MapEdit({
    editFormData,
    setEditFormData
}) {
    const {id, mapid, map, setMap, setIsEdit, handleEditChange} = useMap();

    // 변경할 파일 미리보기 url
    const [fileUrl, setFileUrl] = useState('');
    // 파일 제거 플래그
    const [fileFlag, setFileFlag] = useState(false);

    // edit form 데이터 등록
    function handleChange(event) {
        const { name, value } = event.currentTarget;
        setEditFormData((prev)=>({
            ...prev,
            [name] : value
        }));
    }

    // 파일 변경
    function handlePhotoChange(event) {
        const { files } = event.currentTarget;
        setEditFormData((prev) => ({
            ...prev,
            "photo" : files[0],
        }));

        // 업로드한 파일 미리보기 url 생성
        const currentImageUrl = URL.createObjectURL(files[0]);
        setFileUrl(currentImageUrl);
    }

    // 업로드할 파일 삭제(파일 업로드 취소)
    function handleFileUploadQuit() {
        setEditFormData((prev)=>({
            ...prev,
            "photo" : null,
        }));
        setFileUrl('');
    }

    // 파일 삭제 플래그 변경
    function handleFileRemove() {
        setFileFlag(!fileFlag);
    }

    // 지도 수정
    async function handleSubmit(event) {
        event.preventDefault();

        // 전송할 formData 객체 생성
        const formDataToSend = new FormData();
        // 빈 값 처리
        Object.keys(editFormData)
        .filter(key => key !== "photo")
        .forEach((key)=>{
            if (editFormData[key] === null || editFormData[key] === '') {
                formDataToSend.append(`${key}`, map[key]);
            } else {
                formDataToSend.append(`${key}`, editFormData[key]);
            }
        });
        formDataToSend.append("fileDeleteFlag", fileFlag);

        // 파일이 있는 경우에만 첨부
        // 만약 그냥 null이라도 FormData에 넣는 경우 서버에서 type mismatch 에러 발생
        if (editFormData.photo) {
            formDataToSend.append("photo", editFormData.photo);
        }

        try {
            const res = await patch(2, mapid, formDataToSend);

            if (res !== null) {
                alert('지도가 수정되었습니다');
                handleEditChange();

                try {
                    const newMap = await show(2, mapid);
                    setMap(newMap);
                } catch (error) {
                }
            } else {
                alert('지도 수정을 실패했습니다');
            }
        } catch (error) {
        }
    }

    // 지도 수정 취소
    function handleEditQuit() {
        setIsEdit(false);
        setEditFormData({
            id: mapid,
            title: map.title,
            location: map.location,
            photo: null,
            ownerId: map.ownerId,
            serverId: id,
            description: map.description
        });
    }

    // 서버 사진과 업로드한 사진 미리보기 생성
    function ImageBox() {
        if (editFormData.photo) {
            return(
                <img src={fileUrl}  
                alt="mapimg"
                className={styles.map_img}/>
            )
        } else {
            if (map.photoId) {
                return (                        
                    <img src={`${fileurl}${map.photoId}`}  
                    alt="mapimg"
                    className={styles.map_img}/>)
            } else {
                return (
                    <div className={styles.map_default_img}>
                        <Camera/>
                    </div>
                )
            }
        }
    }

    return(
        <div>
            <h2 className={styles.title}>지도 수정</h2> 
            <Form className={styles.box}>
                <input type='hidden' name='ownerid'></input>
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
                            <input type='file' name="photo" accept="image/*"
                            onChange={handlePhotoChange}></input>
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                    placement='right'
                    overlay={<Tooltip>지도에 이미 등록된 사진을 제거하거나 취소합니다</Tooltip>}>
                        <button type="button" 
                        className={
                            `${styles.file_remove_btn} ${fileFlag ? styles.del_false : styles.del_true}`
                        }
                        onClick={handleFileRemove}>
                            {
                                fileFlag ? 
                                '지도 제거 취소하기' 
                                : '지도 사진 제거하기'
                            }
                        </button>
                    </OverlayTrigger>
                </div>
                <div className={`${styles.info_box} ${styles.edit}`}>
                    <Form.Group md="4" controlId="title" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="title">제목</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="title"
                            name="title"
                            placeholder={map.title}
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4" controlId="location" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="location">위치 좌표</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="location"
                            name="location"
                            placeholder={map.location}
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
                            placeholder={map.description}
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                </div>
            </Form>
            <div className={styles.edit_btn_wrap}>
                <button className={`edit_btn ${styles.upload_btn}`}
                onClick={handleSubmit}>수정</button>
                <button className='del_btn'
                onClick={handleEditQuit}>취소</button>
            </div>
        </div>
    )
}

export default MapDetail;