import { button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from 'styles/pages/server/maps/mapDetail.module.css';
import mapSample from 'lib/sampleData/mapSample';
import { useState } from 'react';
import MapContext, { useMap } from 'contexts/MapContext';

function MapDetail() {

    const [map, setMap] = useState(mapSample[0]);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();

    function handleBackBtn() {
        navigate(`/servers/${map.serverid}/maps`);
    }

    function handleEditChange() {
        setIsEdit(!isEdit);
    }

    return (
        <Container className={styles.container}>
            <MapContext.Provider value={{map, isEdit, setIsEdit, handleEditChange}}>
            {
                isEdit === false ? 
                <MapInfo handleBackBtn={handleBackBtn}/>
                : <MapEdit/>
            }
            </MapContext.Provider>
        </Container>
    )
}

// default map info page
function MapInfo({handleBackBtn}) {
    const {map, isEdit, setIsEdit, handleEditChange} = useMap();

    return(
        <>
            <h2 className={styles.title}>
                <Link to={`/`}>서버(이름)</Link> : {map.title}
            </h2> 
            <div className={styles.btn_wrap}>
                <button className={`edit_btn ${styles.edit_btn}`}
                onClick={handleEditChange}>수정</button>
                <button className={`del_btn ${styles.del_btn}`}>제거</button>
            </div>
            <div className={styles.box}>
                <div className={styles.map_img_box}>
                    <img src={map.photo} alt="mapimg"></img>
                </div>
                <div className={styles.info_box}>
                    <p className={styles.map_title}>{map.title}</p>
                    <span className={styles.nickname}>{map.ownerid}</span>
                    <p>위치 좌표 : <span className={styles.location}>{map.location}</span></p>
                    <p className={styles.desc_box}>{map.description}</p>
                </div>
            </div>
            <div className={styles.list_btn_wrap}>
                <button onClick={handleBackBtn}>목록으로</button>
            </div>
        </>
    )
}

// map edit page
function MapEdit() {
    const {map, isEdit, setIsEdit, handleEditChange} = useMap();

    return(
        <>
            <h2 className={styles.title}>지도 수정</h2> 
            <Form className={styles.box}>
                <input type='hidden' name='ownerid'></input>
                <div className={styles.map_img_box}>
                    <img src={map.photo} alt="mapimg"></img>
                    <input type='file' name="photo" accept="image/*"></input>
                </div>
                <div className={styles.info_box}>
                    <div className={styles.input_box}>
                        <label htmlFor='title'>제목</label>
                        <input className={styles.map_title} name='title' value={map.title}></input>
                    </div>
                    <div className={styles.input_box}>
                        <label htmlFor='location'>위치 좌표</label>
                        <input name='location' value={map.location}></input>
                    </div>
                    <div className={styles.input_box}>
                        <label htmlFor='description'>지도 설명</label>
                        <input name='description' value={map.description}></input>
                    </div>
                </div>
            </Form>
            <div className={styles.edit_btn_wrap}>
                <button className={`edit_btn ${styles.upload_btn}`}>수정</button>
                <button className='del_btn'
                onClick={handleEditChange}>취소</button>
            </div>
        </>
    )
}

export default MapDetail;