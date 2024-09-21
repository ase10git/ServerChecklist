import styles from 'styles/pages/main.module.css';
import { Container } from 'react-bootstrap';
import ServerInfoContainer from 'components/main/ServerInfoContainer';
import { useState } from 'react';

function Main() {

    const [serverData, setServerData] = useState([1, 2]);

    return(
        <Container className={styles.box}>
            {
                serverData.map(()=>{
                    return (
                        <ServerInfoContainer/>
                    );
                })
            }
        </Container>
    )
}

export default Main;