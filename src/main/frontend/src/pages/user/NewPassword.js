import styles from 'styles/pages/user/newPassword.module.css';
import { useAuth } from "contexts/AuthContext";
import causes from "lib/invalidCause";
import REGEX from "lib/regex";
import { useEffect, useState } from "react";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function NewPassword() {
    const {user, patchUserPwd} = useAuth(); // 로그인 한 사용자
    const [validated, setValidated] = useState(false); // Form validation
    const [pwdVisible, setPwdVisible] = useState(false); // password 보이기 여부
    const navigate = useNavigate();
    // 수정 form
    const [formData, setFormData] = useState({
        email: '',
        currentPassword: '',
        newPassword: ''
    });
    // 유효성 결과 타입
    const [invalidType, setInvalidType] = useState([
        {
            type : "currentPassword",
            cause : causes[0].reason
        },
        {
            type : "newPassword",
            cause : causes[0].reason
        }
    ]);

    useEffect(()=>{
        document.title = "비밀번호 변경";
        // 현재 로그인한 사용자 정보로 formData 수정하기
        setFormData((prev)=>({
            ...prev,
            email: user?.email,
        }))
    }, []);

    // form 데이터 등록
    function handleChange(event) {
        const { name, value } = event.currentTarget;
        setFormData((prev)=>({
            ...prev,
            [name] : value
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
                    }
                }
                return field;
            })
        );

        // 검사 재진행 필요
        setValidated(false);
    }

    // 유효성 검사 및 사용자 수정
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        // 유효성 검사 통과 못하면 수정 중지
        if (!form.checkValidity()) {
            event.stopPropagation();
        } 

        else {
            // 두 비밀번호 비교
            if (formData.newPassword !== "" 
            && formData.currentPassword  !== "" 
            && !(formData.newPassword === formData.currentPassword)) 
            {
                try {
                    // 수정 요청 전송
                    await patchUserPwd(formData, user.email);
                } catch (error) {
                }
            } else {
                alert("두 비밀번호가 동일합니다. 다른 비밀번호로 변경해주세요");
            }
        }
        // 유효성 검사를 진행했음 - was-validated
        setValidated(true);
    };

    // 비밀번호 보임 처리
    function handlePasswordVisible() { 
        setPwdVisible((pwdVisible)=>(!pwdVisible));
    }

    return(
        <div>
            <Form noValidate validated={validated}
            onSubmit={handleSubmit} className={styles.box}>
                <Form.Group md="4" controlId="currentPassword" 
                className={styles.form_box}>
                    <InputGroup hasValidation>
                        <FloatingLabel
                            controlId="currentPassword"
                            label="현재 비밀번호"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                type={
                                    (pwdVisible) ?
                                    "text" : "password"
                                }
                                name="currentPassword"
                                onChange={handleChange}
                                pattern={REGEX.STR_PASSWORD_REG}
                            />
                            <Form.Control.Feedback type="invalid">
                                {`비밀번호${invalidType[0].cause}`}
                                {
                                    (invalidType[0].cause.includes("형식")) ?
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

                <Form.Group md="4" controlId="newPassword" 
                className={styles.form_box}>
                    <InputGroup hasValidation>
                        <FloatingLabel
                            controlId="newPassword"
                            label="새 비밀번호"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                type={
                                    (pwdVisible) ?
                                    "text" : "password"
                                }
                                name="newPassword"
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
                <div className={styles.btn_wrap}>
                    <button
                    type="submit"
                    className='edit_btn'
                    >확인</button>
                    <button 
                    type="button"
                    onClick={()=>{navigate("/user")}} 
                    className={`del_btn ${styles.del_btn}`}
                    >취소</button>
                </div>
            </Form>
        </div>
    )
}

export default NewPassword;