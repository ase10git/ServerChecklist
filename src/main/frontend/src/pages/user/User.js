import styles from 'styles/pages/user/user.module.css';
import { Container } from "react-bootstrap";
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

function User() {
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        document.title = "마이페이지";

        if (!user) {
            navigate("/login");
        }
    }, [user]);

    return(
        <Container className={styles.container}>
            <h2 className={styles.title}>마이페이지</h2>
            <Outlet/>
        </Container>
    )
}

export default User;