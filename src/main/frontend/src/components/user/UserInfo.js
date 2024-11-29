import styles from 'styles/components/user/userInfo.module.css';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Person } from 'react-bootstrap-icons';
import fileApi from 'api/image';

function UserInfo() {
    const {user} = useAuth(); // 로그인 한 사용자
    const navigate = useNavigate();

    return(
        <div className={styles.box}>
            <div className={styles.profile_box}>
                {
                    user.profile ?
                    <img src={`${fileApi}${user.profile}`} alt='profile'/>
                    : <div className={styles.default_img_box}><Person/></div>
                }
            </div>
            <div className={styles.info_box}>
                <div className={styles.info_group}>
                    <p className={styles.category}>이메일</p>
                    <p>{user.email}</p>
                </div>
                <div className={styles.info_group}>
                    <p className={styles.category}>닉네임</p>
                    <p>{user.nickname}</p>
                </div>
                <div className={styles.btn_wrap}>
                    <button
                    className='edit_btn'
                    onClick={()=>{navigate("/user/edit")}}
                    >정보 수정</button>
                    <button
                    className='edit_btn'
                    onClick={()=>{navigate("/user/newpwd")}}
                    >비밀번호 수정</button>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;