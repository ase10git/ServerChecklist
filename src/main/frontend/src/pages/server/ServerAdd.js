import styles from 'styles/pages/server/serverAdd.module.css';
import { Container, Form, InputGroup } from "react-bootstrap";
import { Camera } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { create } from 'api/server';
import { useState } from 'react';

function ServerAdd() {

    // form 데이터
    const [formData, setFormData] = useState({
        name: '',
        photo: null,
        usage: '',
        description: '',
        managerId: '1111', // for test
    });
    const navigate = useNavigate();

    // form 데이터 등록
    function handleChange(event) {
        const { name, value, files } = event.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name] : name === "photo" ? files[0] : value,
        }));
    }

    // 서버 추가
    async function handleSubmit(event) {
        event.preventDefault();

        // 유효성 검사
        if (formData.name === null || formData.name === '') {
            alert('서버 이름을 입력해주세요!');
            return;
        }
        if (formData.usage === null || formData.usage === '') {
            alert('사용 용도를 입력해주세요!');
            return;
        }
        if (formData.description === null || formData.description === '') {
            alert('서버 설명을 입력해주세요!');
            return;
        }

        // 전송할 formData 객체 생성
        const formDataToSend = new FormData();
        Object.keys(formData)
            .filter(key => key !== "photo")
            .map(key => {
                formDataToSend.append(`${key}`, formData[key]);    
            });

        // 파일이 있는 경우에만 첨부
        // 만약 그냥 null이라도 FormData에 넣는 경우 서버에서 type mismatch 에러 발생
        if (formData.photo) {
            formDataToSend.append("photo", formData.photo);
        }

        try {
            const res = await create(formDataToSend);

            if (res !== null) {
                alert('서버가 추가되었습니다');
                navigate('/');
            } else {
                alert('서버 추가를 실패했습니다');
            }
        } catch (error) {
        }
    }

    // 뒤로 가기
    function handleBackBtn() {
        navigate(`/`);
    }

    return(
        <Container className={styles.container}>
            <h2 className={styles.title}>새 서버 추가</h2> 
            <Form onSubmit={handleSubmit}
            className={styles.box}>
                <div className={styles.img_box}>
                    <label htmlFor='photo'><Camera/></label>
                    <input type='file' name="photo" accept="image/*"
                    onChange={handleChange}/>
                </div>
                <div className={styles.info_box}>
                    <Form.Group md="4" controlId="name" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="name">서버 이름</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="name"
                            name="name"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4" controlId="usage" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="usage">사용 용도</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="usage"
                            name="usage"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4" controlId="description" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="description">서버 설명</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="description"
                            name="description"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                </div>
            </Form>
            <div className={styles.btn_wrap}>
                <button className={`edit_btn ${styles.upload_btn}`}
                onClick={handleSubmit}>추가</button>
                <button className='del_btn' onClick={handleBackBtn}>취소</button>
            </div>
        </Container>
    )
}

export default ServerAdd;