import { button, Container, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from 'styles/pages/server/maps/mapAdd.module.css';
import mapSample from 'lib/sampleData/mapSample';
import { useState } from 'react';
import { Camera } from 'react-bootstrap-icons';

function MapAdd() {

    const [map, setMap] = useState(mapSample[0]);
    const navigate = useNavigate();

    function handleBackBtn() {
        navigate(`/servers/${map.serverid}/maps`);
    }

    return (
        <Container className={styles.container}>
            <h2 className={styles.title}>
                <Link to={`/`}>서버(이름)</Link> 지도 추가
            </h2> 
            <Form className={styles.box}>
                <input type='hidden' name='ownerid'></input>
                <div className={styles.map_img_box}>
                    <label htmlFor='photo'><Camera/></label>
                    <input type='file' name="photo" accept="image/*"></input>
                </div>
                <div className={styles.info_box}>
                    <Form.Group md="4" controlId="title" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="title">제목</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="title"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4" controlId="location" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="location">위치 좌표</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="location"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4" controlId="description" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="description">지도 설명</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="description"
                            />
                        </InputGroup>
                    </Form.Group>
                </div>
            </Form>
            <div className={styles.btn_wrap}>
                <button className={`edit_btn ${styles.upload_btn}`}>업로드</button>
                <button className='del_btn' onClick={handleBackBtn}>취소</button>
            </div>
        </Container>
    )
}

export default MapAdd;