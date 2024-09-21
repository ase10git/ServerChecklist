import { Person, Search, SearchHeartFill } from 'react-bootstrap-icons';
import styles from 'styles/components/header.module.css';
import { Button, Form, Navbar, Row } from "react-bootstrap";

function Header() {

    return(
        <>
            <Navbar expand="lg" className={`bg-body-tertiary ${styles.nav}`}>
                <div className={styles.nav_container}>
                    <Navbar.Brand href="/" className={styles.logo}>서버메모</Navbar.Brand>
                    <Form inline className={styles.input_form}>
                        <Row className={styles.input_group}>
                            <Form.Control
                            type="text"
                            placeholder="서버 검색 / Search for Server"
                            className={styles.search}
                            />
                            <Button type="submit" className={styles.search_btn}><Search/></Button>
                        </Row>
                    </Form>
                    <Button className={styles.login_btn}><Person/>로그인</Button>
                </div>
            </Navbar>
        </>
    )
}

export default Header;