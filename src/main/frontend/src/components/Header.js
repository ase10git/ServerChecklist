import { Person, Search } from 'react-bootstrap-icons';
import styles from 'styles/components/header.module.css';
import { Navbar} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

function Header() {

    const {user, logout} = useAuth();
    const navigate = useNavigate();

    function handleLoginBtn() {
        navigate('/login');
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
                    <div className={styles.btn_wrap}>
                        {
                            user === null ?
                            <button 
                            className={styles.login_btn}
                            onClick={handleLoginBtn}>
                                <Person/>로그인
                            </button>
                            :
                            <button
                            className={styles.login_btn}
                            onClick={()=>{logout()}}
                            >로그아웃</button>
                        }
                    </div>
                </div>
            </Navbar>
        </>
    )
}

export default Header;