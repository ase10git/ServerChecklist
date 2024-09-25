import styles from 'styles/pages/server/serverAdd.module.css';
import { Container, Form, InputGroup } from "react-bootstrap";
import { Camera } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

function ServerAdd() {

    const navigate = useNavigate();

    function handleBackBtn() {
        navigate(`/`);
    }

    return(
        <Container className={styles.container}>
            <h2 className={styles.title}>새 서버 추가</h2> 
            <Form className={styles.box}>
                <div className={styles.img_box}>
                    <label htmlFor='photo'><Camera/></label>
                    <input type='file' name="photo" accept="image/*"></input>
                </div>
                <div className={styles.info_box}>
                    <Form.Group md="4" controlId="name" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="name">서버 이름</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="name"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4" controlId="usage" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="usage">사용 용도</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="usage"
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4" controlId="description" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="description">서버 이름</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="description"
                            />
                        </InputGroup>
                    </Form.Group>
                </div>
            </Form>
            <div className={styles.btn_wrap}>
                <button className={`edit_btn ${styles.upload_btn}`}>추가</button>
                <button className='del_btn' onClick={handleBackBtn}>취소</button>
            </div>
        </Container>
    )
}

export default ServerAdd;