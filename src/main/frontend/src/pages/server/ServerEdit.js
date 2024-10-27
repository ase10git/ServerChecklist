import styles from 'styles/pages/server/serverAdd.module.css';
import { Container, Form, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
//import serverSample from 'lib/sampleData/serverSample';
import { useEffect, useState } from 'react';
import { patch, show } from 'api/server';

function ServerEdit() {

    const {id} = useParams();

    const [serverInfo, setServerInfo] = useState({});

    // form 데이터
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        photo: null,
        usage: '',
        description: ''
    });

    useEffect(()=>{
        async function getServer() {
            const res = await show(id);
            setServerInfo(res);
            setFormData({
                id: res.id,
                name: res.name,
                photo: res.photo ?? null,
                usage: res.usage,
                description: res.description
            });
        }
        getServer();
    }, []);

    const navigate = useNavigate();

    // form 데이터 등록
    function handleChange(event) {
        const { name, value, files } = event.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name] : name === "photo" ? files[0] : value,
        }));
        console.log(formData)
    }

    // 서버 수정
    async function handleSubmit(event) {
        event.preventDefault();

        // 전송할 formData 객체 생성
        const formDataToSend = new FormData();
        Object.keys(formData)
        .filter(key => key !== "photo")
        .forEach((key)=>{
            if (formData[key] === null || formData[key] === '') {
                formDataToSend.append(`${key}`, serverInfo[key]);
            } else {
                formDataToSend.append(`${key}`, formData[key]);
            }
        });

        // 파일이 있는 경우에만 첨부
        // 만약 그냥 null이라도 FormData에 넣는 경우 서버에서 type mismatch 에러 발생
        if (formData.photo) {
            formDataToSend.append("photo", formData.photo);
        }

        try {
            const res = await patch(id, formDataToSend);

            if (res !== null) {
                alert('서버가 수정되었습니다');
                navigate(`/servers/${serverInfo.id}`);
            } else {
                alert('서버 수정을 실패했습니다');
            }
        } catch (error) {
        }
    }

    // 뒤로 가기
    function handleBackBtn() {
        navigate(`/servers/${serverInfo.id}`);
    }

    return(
        <Container className={styles.container}>
            <h2 className={styles.title}>{serverInfo.name} 수정</h2> 
            <Form onSubmit={handleSubmit}
            className={styles.box}>
                <div className={styles.img_box}>
                    <img src={serverInfo.photo} alt="serverimg"></img>
                    <input type='file' name="photo" accept="image/*"
                    onChange={handleChange}></input>
                </div>
                <div className={styles.info_box}>
                    <Form.Group md="4" controlId="name" className={styles.form_box}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="name">서버 이름</InputGroup.Text>
                            <Form.Control
                            type='text'
                            aria-label="name"
                            placeholder={serverInfo.name}
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
                            placeholder={serverInfo.usage}
                            name="usage"
                            onChange={handleChange}
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
                            name="description"
                            onChange={handleChange}
                            />
                        </InputGroup>
                    </Form.Group>
                </div>
            </Form>
            <div className={styles.btn_wrap}>
                <button className={`edit_btn ${styles.upload_btn}`}
                onClick={handleSubmit}>수정</button>
                <button className='del_btn' onClick={handleBackBtn}>취소</button>
            </div>
        </Container>
    )
}

export default ServerEdit;