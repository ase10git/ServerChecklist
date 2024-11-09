import styles from 'styles/pages/user/login.module.css';
import { Button, Container, Form, FloatingLabel, InputGroup } from "react-bootstrap";
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import REGEX from 'lib/regex';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { login } from 'api/auth';
import causes from 'lib/invalidCause';

function Login() {

    const [validated, setValidated] = useState(false); // 검사 진행 여부
    const [pwdVisible, setPwdVisible] = useState(false); // password 보이기 여부
    // 로그인 form
    const [formData, setFormData] = useState({ email: '', password: ''});
    // 유효성 결과 타입
    const [invalidType, setInvalidType] = useState({email: 0, password: 0});
    const navigate = useNavigate();

    // bootstrap 유효성 검사 및 제출
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        // 유효성 검사 통과 못하면 로그인 중지
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setInvalidType({
                email: 0, password: 0
            });
        } 
        // else if (!REGEX.EMAIL_REG.test(formData.email) 
        //     || !REGEX.PASSWORD_REG.test(formData.password)) {
        //         console.log(REGEX.EMAIL_REG.test(formData.email), REGEX.PASSWORD_REG.test(formData.password))
        //         event.preventDefault();
        //         event.stopPropagation();
        //         setInvalidType({
        //             email: 1, password: 1
        //         });
        // }
        else {
            try {
                // 전송 
                const res = await login(formData);

            } catch (error) {
            }
        }

        // 유효성 검사를 진행했음 - was-validated
        setValidated(true);
    };

    // form 데이터 등록
    function handleChange(event) {
        const { name, value } = event.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }));
    }

    // 비밀번호 보임 처리
    function handlePasswordVisible() { 
        setPwdVisible((pwdVisible)=>(!pwdVisible));
    }

    useEffect(()=>{
        // 타이틀 설정
        document.title = "로그인";
    }, []);

    return(
        <div className={styles.container}>
            <div className={styles.login_img_box}>
                <img src={process.env.PUBLIC_URL+'/img/login-design-1.png'} alt='login-image'/>
            </div>
            <div className={styles.box}>
                <h2>로그인</h2>
                <Form noValidate validated={validated} 
                onSubmit={handleSubmit}>
                    <Form.Group md="4" controlId="email" className={styles.form_box}>
                        <InputGroup hasvalidation>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="이메일(email)"
                                className="mb-3"
                            >
                                <Form.Control
                                    required
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {`이메일${causes[invalidType.email].reason}`}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>
                        
                    <Form.Group md="4" controlId="password" className={styles.form_box}>
                        <InputGroup hasvalidation>
                            <FloatingLabel
                                controlId="floatingPassword"
                                label="비밀번호(password)"
                                className={`${styles.password_label} mb-3`}
                            >
                                <Form.Control
                                    required
                                    type={
                                        (pwdVisible) ? 
                                        "text" : "password"
                                    }
                                    name="password"
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {`비밀번호${causes[invalidType.password].reason}`}
                                </Form.Control.Feedback>
                                <span className={styles.password_eye} 
                                onClick={handlePasswordVisible}>
                                    {
                                        (pwdVisible) ? 
                                        <Eye/>:<EyeSlash/>
                                    }
                                </span>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>
                    <div className={styles.btn_wrap}>
                        <button type='submit' className={`edit_btn ${styles.login_btn}`}>로그인</button>
                    </div>
                </Form>
                <div className={styles.link_box}>
                    <Link to={'/resetpwd'}>이메일 찾기/비밀번호 초기화</Link>
                    <span>|</span>
                    <Link to={'/register'}>회원가입</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;