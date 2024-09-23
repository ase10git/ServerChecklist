import styles from 'styles/pages/user/user.module.css';
import { Container, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import ServerInfoContainer from 'components/main/ServerInfoContainer';
import serverListSample from 'lib/sampleData/serverListSample';
import { useState } from 'react';
import UserInput from 'components/user/UserInput';

function User() {
    const [serverData, setServerData] = useState(serverListSample);

    return(
        <Container className={styles.container}>
            <h2 className={styles.title}>마이페이지</h2>
            <UserInput/>
            
            <h2 className={styles.title}>즐겨찾기</h2>
            <div className={styles.server_box}>
                
            {
                serverData.map((el)=>{
                    return (
                        <ServerInfoContainer serverInfo={el}/>
                    );
                })
            }
            </div>
        </Container>
    )
}

export default User;