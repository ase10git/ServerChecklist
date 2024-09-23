import styles from 'styles/pages/user/login.module.css';
import { Button, Container, Form, FloatingLabel, InputGroup } from "react-bootstrap";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import REGEX from 'lib/regex';

function Login() {

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    // validate function from bootstrap
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    function handleRegisterBtn() {
        navigate('/register');
    }

    return(
        <Container className={styles.container}>
            <h2>로그인</h2>
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
                                <Form.Control.Feedback type="invalid" tooltip>
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
                                <Form.Control.Feedback type="invalid" tooltip>
                                    비밀번호를 입력해주세요
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>
                    <div className={styles.btn_wrap}>
                        <button type='submit' className={`edit_btn ${styles.login_btn}`}>로그인</button>
                        <button className='edit_btn' onClick={handleRegisterBtn}>회원가입</button>
                    </div>
                </Form>
                <div className={styles.link_box}><Link to={'/resetpwd'}>비밀번호 초기화</Link></div>
            </div>
        </Container>
    )
}

export default Login;