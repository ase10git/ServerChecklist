import styles from 'styles/pages/user/favorites.module.css';
import { Container } from "react-bootstrap";
import ServerInfoContainer from 'components/main/ServerInfoContainer';
import serverListSample from 'lib/sampleData/serverListSample';
import { useState } from 'react';
import ServerMainMemo from 'components/servermain/ServerMainMemo';
import ServerMainChecklist from 'components/servermain/ServerMainChecklist';
import ServerMainMap from 'components/servermain/ServerMainMap';

function Favorites() {
    const [serverData, setServerData] = useState(serverListSample);

    return(
        <Container className={styles.container}>
            <h1 className={styles.main_title}>즐겨찾기</h1>
            <div>
                <div className={styles.box}>
                    <h2 className={styles.category_title}>서버</h2>
                    <button className={styles.more_btn}>더보기</button>
                    <div className={`${styles.category_box} ${styles.server_box}`}>
                    {
                        serverData.map((el)=>{
                            return (
                                <ServerInfoContainer serverInfo={el}/>
                            );
                        })
                    }
                    </div>
                </div>

                <div className={styles.box}>
                    <h2 className={styles.category_title}>메모</h2>
                    <button className={styles.more_btn}>더보기</button>
                    <div className={styles.category_box}>
                        <ServerMainMemo/>
                    </div>
                </div>

                <div className={styles.box}>
                    <h2 className={styles.category_title}>체크리스트</h2>
                    <button className={styles.more_btn}>더보기</button>
                    <div className={styles.category_box}>
                        <ServerMainChecklist/>
                    </div>
                </div>

                <div className={styles.box}>
                    <h2 className={styles.category_title}>지도</h2>
                    <button className={styles.more_btn}>더보기</button>
                    <div className={styles.category_box}>
                        <ServerMainMap/>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Favorites;