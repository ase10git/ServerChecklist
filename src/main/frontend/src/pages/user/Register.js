import styles from 'styles/pages/user/register.module.css';
import { Container, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import REGEX from 'lib/regex';

function Register() {
    
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    function handleExitBtn() {
        navigate('/');
    }

    return(
        <Container className={styles.container}>
            <h2>회원가입</h2>
            <div className={styles.box}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group md="4" controlId="email" className={styles.form_box}>
                    <InputGroup hasvalidation>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="이메일"
                            className="mb-3"
                        >
                            
                            <Form.Control
                                required
                                type="text"
                                placeholder="aaa@naver.com"
                            />
                            <Form.Control.Feedback type="invalid">
                            이메일을 입력해주세요
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </InputGroup>
                </Form.Group>
                        
                <Form.Group md="4" controlId="password" className={styles.form_box}>
                    <InputGroup hasvalidation>
                        <FloatingLabel
                            controlId="floatingPassword"
                            label="비밀번호"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                type="password"
                                placeholder=""
                            />
                            <Form.Control.Feedback type="invalid">
                                비밀번호를 입력해주세요
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </InputGroup>
                </Form.Group>

                <Form.Group md="4" controlId="text" className={styles.form_box}>
                    <InputGroup hasvalidation>
                        <FloatingLabel
                            controlId="floatingText"
                            label="닉네임"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                            />
                            <Form.Control.Feedback type="invalid">
                                닉네임을 입력해주세요
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </InputGroup>
                </Form.Group>

                <div className={styles.btn_wrap}>
                    <button type="submit" className={`edit_btn ${styles.register_btn}`}>확인</button>
                    <button className='del_btn' onClick={handleExitBtn}>취소</button>
                </div>
                </Form>
            </div>
        </Container>
    )
}

export default Register;