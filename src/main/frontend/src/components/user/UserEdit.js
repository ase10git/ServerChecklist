import styles from 'styles/components/user/userEdit.module.css';
import { useEffect, useState } from "react";
import { FloatingLabel, Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAuth } from 'contexts/AuthContext';
import { Eye, EyeSlash, Person, XCircle } from 'react-bootstrap-icons';
import REGEX from 'lib/regex';
import causes from 'lib/invalidCause';
import { useNavigate } from 'react-router-dom';

function UserEdit() {
    const {user, profileImage, patchUser} = useAuth(); // 로그인 한 사용자
    const navigate = useNavigate();

    // 파일 제거 플래그
    const [fileFlag, setFileFlag] = useState(false);
    // 수정 form
    const [formData, setFormData] = useState({
        email: '',
        nickname: '',
        profile: null
    });
    // 변경할 파일 미리보기 url 
    const [fileUrl, setFileUrl] = useState('');

    useEffect(()=>{
        // 현재 로그인한 사용자 정보로 formData 수정하기
        setFormData((prev)=>({
            ...prev,
            email: user?.email,
            nickname: user?.nickname,
            profile: null
        }))
    }, [user]);

    // form 데이터 등록
    function handleChange(event) {
        const { name, value } = event.currentTarget;
        setFormData((prev)=>({
            ...prev,
            [name] : value
        }));
    }

    // 파일 변경
    function handleProfileChange(event) {
        const { files } = event.currentTarget;
        setFormData((prev)=>({
            ...prev,
            "profile" : files[0]
        }));

        // 업로드할 프로필 미리보기 url 생성
        const currentImageUrl = URL.createObjectURL(files[0]);
        setFileUrl(currentImageUrl);
    }

    // 업로드할 파일 삭제(파일 업로드 취소)
    function handleFileUploadQuit() {
        setFormData((prev)=>({
            ...prev,
            "profile" : null
        }));
        setFileUrl('');
    }

    // 파일 삭제 플래그 변경
    function handleFileRemove() {
        setFileFlag(!fileFlag);
    }

    // 유효성 검사 및 사용자 수정
    const handleSubmit = async (event) => {
        event.preventDefault();

        // 전송할 formData 객체 생성
        const formDataToSend = new FormData();
        Object.keys(formData)
        .filter(key => key !== "profile")
        .forEach((key)=>{
            if (formData[key] === null || formData[key] === '') {
                formDataToSend.append(`${key}`, user[key]);
            } else {
                formDataToSend.append(`${key}`, formData[key]);
            }
        });
        formDataToSend.append("fileDeleteFlag", fileFlag);

        // 파일이 있는 경우에만 첨부
        // 만약 그냥 null이라도 FormData에 넣는 경우 서버에서 type mismatch 에러 발생
        if (formData.profile) {
            formDataToSend.append("profile", formData.profile);
        }

        try {
            // 수정 요청 전송
            await patchUser(formDataToSend, user.email);
        } catch (error) {
        }
    };

    // 프로필 수정 박스
    function ProfileBox() {
        return(
            <div className={styles.profile_edit_box}>
                <OverlayTrigger
                placement='top'
                overlay={<Tooltip>프로필 사진 등록을 취소합니다</Tooltip>}>
                    <button type="button"
                    className={styles.remove_img_btn}
                    onClick={handleFileUploadQuit}>
                        <XCircle/>
                    </button>
                </OverlayTrigger>
                <OverlayTrigger
                placement='top'
                overlay={
                    <Tooltip>프로필을 수정하려면 여기를 누르세요</Tooltip>
                }>
                    <div className={styles.img_box}>
                        <label htmlFor='profile'>
                            {
                                formData.profile ?
                                <img src={fileUrl}
                                alt="profile"
                                />
                                :
                                profileImage ?
                                <img src={profileImage}
                                alt="profile"
                                />
                                : <Person/>
                            }
                        </label>
                        <input type='file' 
                        accept="image/*"
                        name="profile" id="profile"
                        onChange={handleProfileChange}></input>
                    </div>
                </OverlayTrigger>
                <OverlayTrigger
                placement='right'
                overlay={
                    <Tooltip>
                        {
                            fileFlag ? 
                            '사진을 그대로 둡니다' 
                            : '등록된 프로필 사진을 제거합니다'
                        }
                    </Tooltip>
                }>
                    <div className={styles.file_btn_wrap}>
                        <button type="button" 
                        className={
                            `${styles.file_remove_btn} ${fileFlag ? 
                                styles.del_false : styles.del_true}`
                        }
                        onClick={handleFileRemove}>
                            {
                                fileFlag ? 
                                '프로필 제거 취소하기' 
                                : '프로필 제거하기'
                            }
                        </button>
                    </div>
                </OverlayTrigger>
            </div>
        )
    }

return(
    <Form className={styles.box}>
        {/* profile */}
        <ProfileBox/>

        <div className={styles.info_box}>
            {/* email */}
            <Form.Group md="4" controlId="nickname" className={styles.form_box}>
                <InputGroup>
                    <InputGroup.Text id="nickname">이메일</InputGroup.Text>
                    <Form.Control
                        disabled
                        type="email"
                        onChange={handleChange}
                        placeholder={user.email}
                        pattern={REGEX.STR_NAME_REG}
                    />
                </InputGroup>
            </Form.Group>

            {/* nickname */}
            <Form.Group md="4" controlId="nickname" className={styles.form_box}>
                <InputGroup>
                    <InputGroup.Text id="nickname">닉네임</InputGroup.Text>
                    <Form.Control
                        type="text"
                        name="nickname"
                        id="nickname"
                        onChange={handleChange}
                        placeholder={user.nickname}
                        pattern={REGEX.STR_NAME_REG}
                    />
                    <Form.Control.Feedback type="invalid">
                        {`닉네임${causes[1].reason}`}
                        <p>
                            특수문자 제외 한글/영어 2~13글자
                        </p>
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <div className={styles.btn_wrap}>
                <button
                className='edit_btn'
                onClick={handleSubmit}
                >확인</button>
                <button onClick={()=>{navigate("/user")}} 
                className={`del_btn ${styles.del_btn}`}
                >취소</button>
            </div>
        </div>
    </Form>
)
}

export default UserEdit;