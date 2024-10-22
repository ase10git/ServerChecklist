import { button, Container, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from 'styles/pages/server/maps/mapDetail.module.css';
//import mapSample from 'lib/sampleData/mapSample';
import { useEffect, useState } from 'react';
import MapContext, { useMap } from 'contexts/MapContext';
import { patch, remove, show } from 'api/serverItems';
import { Pencil, Trash } from 'react-bootstrap-icons';

function MapDetail() {

    const [map, setMap] = useState({});
    const {id, mapid} = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    
    // 수정 메모 form
    const [editFormData, setEditFormData] = useState({
        id: mapid,
        title: map.title,
        location: map.location,
        photo: map.photo,
        ownerId: map.ownerId,
        serverId: id,
        description: map.description
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
        }
        getMap();
    }, [id, mapid]);

    return (
        <Container className={styles.container}>
            <MapContext.Provider value={{id, mapid, map, setMap, isEdit, setIsEdit, handleEditChange, navigate}}>
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

// default map info page
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
                    <img src={map.photo} alt="mapimg"></img>
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

// map edit page
function MapEdit({
    editFormData,
    setEditFormData
}) {
    const {mapid, map, setMap, setIsEdit, handleEditChange} = useMap();

    // edit form 데이터 등록
    function handleChange(event) {
        const { name, value } = event.currentTarget;
        setEditFormData((prev)=>({
            ...prev,
            [name] : value
        }));
    }

    // 지도 수정
    async function handleSubmit(event) {
        event.preventDefault();

        const updatedFormData = {...editFormData};

        // 빈 값 처리
        Object.keys(updatedFormData).forEach((key)=>{
            if (updatedFormData[key] === null || updatedFormData[key] === '') {
                updatedFormData[key] = map[key];
            }
        });

        try {
            const res = await patch(2, updatedFormData);

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
        setEditFormData(map);
    }

    return(
        <div>
            <h2 className={styles.title}>지도 수정</h2> 
            <Form className={styles.box}>
                <input type='hidden' name='ownerid'></input>
                <div className={styles.map_img_box}>
                    {
                        map.photo === editFormData.photo ?
                        <img src={map.photo} alt="mapimg"></img>
                        :
                        <img src={editFormData.photo} alt="newimg"></img>
                    }
                    <input type='file' 
                    name="photo" accept="image/*"
                    value={editFormData.photo}
                    onChange={handleChange}></input>
                </div>
                <div className={`${styles.info_box} ${styles.edit}`}>
                    <Form.Group md="4" controlId="title" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="title">제목</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="title"
                            name="title"
                            value={editFormData.title}
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
                            value={editFormData.location}
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
                            value={editFormData.description}
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