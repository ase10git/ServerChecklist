import styles from 'styles/pages/user/register.module.css';
import { Container, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import REGEX from 'lib/regex';
import { register } from 'api/auth';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import causes from 'lib/invalidCause';

function Register() {
    
    const [validated, setValidated] = useState(false); // 검사 진행 여부
    const [pwdVisible, setPwdVisible] = useState(false); // password 보이기 여부
    // 회원가입 form
    const [formData, setFormData] = useState({ 
        email: '', 
        password: '', 
        nickname: ''
    });
    // 유효성 결과 타입
    const [invalidType, setInvalidType] = useState({
        email: 0, 
        password: 0, 
        nickname: 0
    });
    const navigate = useNavigate();

    // bootstrap 유효성 검사 및 제출
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setInvalidType({
                email: 0, password: 0, nickname: 0
            });
        }
        else {
            try {
                // 전송 
                const res = await register(formData);

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

    // 취소 - 로그인 페이지 이동
    function handleExitBtn() {
        navigate('/login');
    }

    return(
        <div className={styles.container}>
            <div className={styles.login_img_box}>
                <img src={process.env.PUBLIC_URL+'/img/login-design-1.png'} alt='login-image'/>
            </div>
            <div className={styles.box}>
                <h2>회원가입</h2>
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
                                label="비밀번호"
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
                                    <span className={styles.password_eye} 
                                    onClick={handlePasswordVisible}>
                                        {
                                            (pwdVisible) ? 
                                            <Eye/>:<EyeSlash/>
                                        }
                                    </span>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {`비밀번호${causes[invalidType.email].reason}`}
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
                                    name="nickname"
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {`닉네임${causes[invalidType.email].reason}`}
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
        </div>
    )
}

export default Register;