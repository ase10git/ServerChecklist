import styles from 'styles/components/user/userInput.module.css';
import { useState } from "react";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";

function UserInput() {
    const [validated, setValidated] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    function handleEditChange() {
        setIsEdit(!isEdit);
    }

    return(
        <Form noValidate validated={validated} onSubmit={handleSubmit} className={styles.box}>
            {/* profile */}
            <div className={styles.profile_box}>
                {
                    isEdit === false ?
                    <img src='' alt='profile'/>
                    :
                    <>
                    <label htmlFor='photo'></label>
                    <input type='file' name="photo" accept="image/*"></input>
                    </>
                }
            </div>

            <div className={styles.info_box}>
                {/* email */}
                <Form.Group md="4" controlId="email" className={styles.form_box}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="email">이메일</InputGroup.Text>
                        <Form.Control
                        disabled
                        type='text'
                        value={'name@email.com'}
                        aria-label="email"
                        />
                    </InputGroup>
                </Form.Group>

                {/* nickname */}
                <Form.Group md="4" controlId="nickname" className={styles.form_box}>
                    {
                        isEdit === false ?
                        <InputGroup hasvalidation>
                            <InputGroup.Text id="nickname">닉네임</InputGroup.Text>
                            <Form.Control
                                required
                                disabled
                                type="text"
                                placeholder=""
                            />
                        </InputGroup>
                        :
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
                            변경할 닉네임을 입력해주세요
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    }
                </Form.Group>

                {/* password */}
                <Form.Group md="4" controlId="password" className={styles.form_box}>
                    {
                        isEdit === false ?
                        <InputGroup hasvalidation>
                            <InputGroup.Text id="password">비밀번호</InputGroup.Text>
                            <Form.Control
                                required
                                disabled
                                type="password"
                                placeholder=""
                            />
                        </InputGroup>
                        :
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
                            변경할 비밀번호를 입력해주세요
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    }
                </Form.Group>

                <div className={styles.btn_wrap}>
                    {
                        isEdit === false ?
                        <button onClick={handleEditChange} className='edit_btn'>수정</button>
                        :
                        <>
                        <button type='submit' className='edit_btn'>확인</button>
                        <button onClick={handleEditChange} 
                        className={`del_btn ${styles.del_btn}`}>취소</button>
                        </>
                    }
                </div>
            </div>
        </Form>
    )
}

export default UserInput;