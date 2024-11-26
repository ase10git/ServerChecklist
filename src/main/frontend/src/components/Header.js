import { DoorOpen, DoorOpenFill, Heart, HeartFill, Pen, PenFill, PersonCircle, Search } from 'react-bootstrap-icons';
import styles from 'styles/components/header.module.css';
import { Dropdown, Navbar} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

function Header() {

    const {user, profileImage, logout} = useAuth();
    const navigate = useNavigate();

    function handleLoginBtn() {
        navigate('/login');
    }

    // 게스트 표시
    function notLoggedIn() {
        return(
            <div className={styles.btn_wrap}>
                <button 
                className={styles.login_btn}
                onClick={handleLoginBtn}>
                    <DoorOpenFill/>로그인
                </button>
            </div>
        )
    }

    // 로그인 표시
    function loggedIn() {
        return(
            <Dropdown
            className={`${styles.btn_wrap} ${styles.logged_in}`}
            >
                <Dropdown.Toggle 
                variant="success" id="dropdown-basic"
                className={styles.info_box}>
                <div className={styles.img_box}>
                    {
                        user.profile ?
                        <img 
                        className={styles.profile_img}
                        src={profileImage}/>
                        :
                        <PersonCircle/>
                    }
                </div>
                <p>{user.nickname}</p>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1"
                    onClick={()=>{navigate('/user')}}
                    ><Pen/> 내 정보</Dropdown.Item>
                    <Dropdown.Item href="#/action-2"
                    onClick={()=>{navigate('/user/favorites')}}
                    ><Heart/> 즐겨찾기</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item href="#/action-3"
                    className={styles.logout_btn}
                    onClick={()=>{logout()}}
                    ><DoorOpen/> 로그아웃</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    return(
        <>
            <Navbar expand="lg" className={`bg-body-tertiary ${styles.nav}`}>
                <div className={styles.nav_container}>
                    <Navbar.Brand href="/" className={styles.logo}>서버메모</Navbar.Brand>
                    <div className={styles.input_form}>
                        <div className={styles.input_group}>
                            <input
                            type="text"
                            placeholder="서버 검색"
                            className={styles.search}
                            />
                            <button type="submit" className={styles.search_btn}><Search/></button>
                        </div>
                    </div>
                    {
                        user === null ?
                        notLoggedIn()
                        :
                        loggedIn()
                    }
                </div>
            </Navbar>
        </>
    )
}

export default Header;