import styles from 'styles/pages/user/user.module.css';
import { Container } from "react-bootstrap";
import serverListSample from 'lib/sampleData/serverListSample';
import { useState } from 'react';
import UserInput from 'components/user/UserInput';

function User() {
    const [serverData, setServerData] = useState(serverListSample);
    

    return(
        <Container className={styles.container}>
            <div>
                <h2 className={styles.title}>마이페이지</h2>
                <UserInput/>
            </div>
        </Container>
    )
}

export default User;