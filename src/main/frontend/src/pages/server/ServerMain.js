import ServerMainChecklist from 'components/servermain/ServerMainChecklist';
import ServerMainMap from 'components/servermain/ServerMainMap';
import ServerMainMemo from 'components/servermain/ServerMainMemo';
import ServerContext from 'contexts/ServerContext';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from 'styles/pages/server/serverMain.module.css';
import serverSample from 'lib/sampleData/serverSample';
import { useNavigate } from 'react-router-dom';

function ServerMain() {

    const [serverInfo, SetServerInfo] = useState(serverSample);
    const navigate = useNavigate();

    function handleServerEdit() {
        navigate(`/servers/${serverInfo.id}/edit`);
    }

    return(
        <ServerContext.Provider value={{serverInfo}}>
            <Container className={styles.container}>
                <div className={styles.title_box}>
                    <h1>{serverInfo.name}</h1>
                    <button className='edit_btn'
                    onClick={handleServerEdit}>수정</button>
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
                        <div className={styles.category_box}>
                            <button className={styles.more_btn} 
                            onClick={()=>{navigate(`/servers/${serverInfo.id}/checklists`)}}>더보기</button>
                            <ServerMainChecklist/>
                        </div>
                    </div>
                    <div className={styles.right_box}>
                        <div className={styles.category_box}>
                            <h2 className={styles.category_title}>서버 메모</h2>
                            <button className={styles.more_btn} 
                            onClick={()=>{navigate(`/servers/${serverInfo.id}/memo`)}}>더보기</button>
                            <ServerMainMemo/>
                        </div>
                    </div>
                </div>
                <div className={styles.category_box}>
                    <h2 className={styles.category_title}>서버 지도</h2>
                    <button className={styles.more_btn} 
                    onClick={()=>{navigate(`/servers/${serverInfo.id}/maps`)}}>더보기</button>
                    <ServerMainMap/>
                </div>
            </Container>
        </ServerContext.Provider>
    )
}

export default ServerMain;