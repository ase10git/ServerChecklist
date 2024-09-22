import styles from 'styles/pages/main.module.css';
import { Container } from 'react-bootstrap';
import ServerInfoContainer from 'components/main/ServerInfoContainer';
import { useState } from 'react';
import serverListSample from 'lib/sampleData/serverListSample';

function Main() {

    const [serverData, setServerData] = useState(serverListSample);

    return(
        <Container className={styles.box}>
            {
                serverData.map((el)=>{
                    return (
                        <ServerInfoContainer serverInfo={el}/>
                    );
                })
            }
        </Container>
    )
}

export default Main;