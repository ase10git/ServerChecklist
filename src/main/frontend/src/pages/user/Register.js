import styles from 'styles/pages/user/register.module.css';
import { Container, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import REGEX from 'lib/regex';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import causes from 'lib/invalidCause';
import { useAuth } from 'contexts/AuthContext';

function Register() {
    
    const {register} = useAuth();
    const [validated, setValidated] = useState(false); // 검사 진행 여부
    const [pwdVisible, setPwdVisible] = useState(false); // password 보이기 여부
    // 회원가입 form
    const [formData, setFormData] = useState({ 
        email: '', 
        password: '', 
        nickname: ''
    });
    // 유효성 결과 타입
    const [invalidType, setInvalidType] = useState([
        {
            type : "email",
            cause : causes[0].reason
        },
        {
            type : "password",
            cause : causes[0].reason
        },
        {
            type : "nickname",
            cause : causes[0].reason
        }
    ]);
    const navigate = useNavigate();

    // bootstrap 유효성 검사 및 제출
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (!form.checkValidity()) {
            event.stopPropagation();
        }

        else {
            try {
                // 전송 
                const status = await register(formData);
                if (status === 200) {
                    alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
                    navigate("/login");
                } else {
                    alert('회원가입에 실패했습니다');
                }
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

        // 유효성 검사 통과 실패 사유 설정
        setInvalidType((prev)=>
            prev.map((field)=>{
                if (field.type === name) {
                    return {
                        ...field,
                        cause: value === '' ? 
                            causes[0].reason 
                            : 
                            causes[1].reason
                    };
                }
                return field;
            })
        );

        // 검사 재진행 필요
        setValidated(false);
    }

    // 비밀번호 보임 처리
    function handlePasswordVisible() { 
        setPwdVisible((pwdVisible)=>(!pwdVisible));
    }

    // 취소 - 로그인 페이지 이동
    function handleExitBtn() {
        navigate('/login');
    }

    useEffect(()=>{
        document.title = "서버메모 - 회원가입";
    }, []);

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
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                {`이메일${invalidType[0].cause}`}
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
                                    pattern={REGEX.STR_PASSWORD_REG}
                                />
                                <Form.Control.Feedback type="invalid">
                                {`비밀번호${invalidType[1].cause}`}
                                    {
                                        (invalidType[1].cause.includes("형식")) ?
                                        <p>
                                            영어 대소문자, 숫자, 특수문자 포함 8~20자
                                        </p>
                                        : null
                                    }
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
                                    pattern={REGEX.STR_NAME_REG}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {`닉네임${invalidType[2].cause}`}
                                    {
                                        (invalidType[2].cause.includes("형식")) ?
                                        <p>
                                            특수문자 제외 한글/영어 2~13글자
                                        </p>
                                        : null
                                    }
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