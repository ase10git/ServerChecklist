import ServerMainChecklist from 'components/servermain/ServerMainChecklist';
import ServerMainMap from 'components/servermain/ServerMainMap';
import ServerMainMemo from 'components/servermain/ServerMainMemo';
import ServerContext from 'contexts/ServerContext';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from 'styles/pages/server/serverMain.module.css';
import serverSample from 'lib/sampleData/serverSample';

function ServerMain() {

    const [serverInfo, SetServerInfo] = useState(serverSample);

    return(
        <ServerContext.Provider value={{serverInfo}}>
            <Container className={styles.box}>
                <div className={styles.title_box}>
                    <h2>{serverInfo.name}</h2>
                </div>
                <div className={styles.main_box}>
                    <div className={styles.left_box}>
                        <div className={styles.server_info_box}>
                            <div className={styles.server_img_box}>
                                <img src={serverInfo.photo} alt="serverimg"></img>
                            </div>
                            <div className={styles.server_desc_box}>
                                {serverInfo.description}
                            </div>
                        </div>
                        <ServerMainChecklist/>
                    </div>
                    <div className={styles.right_box}>
                        <ServerMainMemo/>
                    </div>
                </div>
                <ServerMainMap/>
            </Container>
        </ServerContext.Provider>
    )
}

export default ServerMain;