import styles from 'styles/pages/user/user.module.css';
import { Container } from "react-bootstrap";
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function User() {
    useEffect(()=>{
        document.title = "마이페이지";
    }, []);

    return(
        <Container className={styles.container}>
            <h2 className={styles.title}>마이페이지</h2>
            <Outlet/>
        </Container>
    )
}

export default User;