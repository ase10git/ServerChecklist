import styles from 'styles/pages/server/serverAdd.module.css';
import { Container, Form, InputGroup } from "react-bootstrap";
import { Camera } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import serverSample from 'lib/sampleData/serverSample';
import { useState } from 'react';

function ServerEdit() {

    const [serverInfo, SetServerInfo] = useState(serverSample);
    const navigate = useNavigate();

    function handleBackBtn() {
        navigate(`/servers/${serverInfo.id}`);
    }

    return(
        <Container className={styles.container}>
            <h2 className={styles.title}>{serverInfo.name} 수정</h2> 
            <Form className={styles.box}>
                <div className={styles.img_box}>
                    <img src={serverInfo.photo} alt="serverimg"></img>
                    <input type='file' name="photo" accept="image/*"></input>
                </div>
                <div className={styles.info_box}>
                    <Form.Group md="4" controlId="name" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="name">서버 이름</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="name"
                            placeholder={serverInfo.name}
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
                            />
                        </InputGroup>
                    </Form.Group>
                </div>
            </Form>
            <div className={styles.btn_wrap}>
                <button className={`edit_btn ${styles.upload_btn}`}>수정</button>
                <button className='del_btn' onClick={handleBackBtn}>취소</button>
            </div>
        </Container>
    )
}

export default ServerEdit;