import { recentList } from 'api/serverItems';
import ServerMainChecklist from 'components/servermain/ServerMainChecklist';
import ServerMainMap from 'components/servermain/ServerMainMap';
import ServerMainMemo from 'components/servermain/ServerMainMemo';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import styles from 'styles/pages/server/serverMain.module.css';
import ServerProtectedRoute from 'contexts/ServerProtectedRoute';
import { useServer } from 'contexts/ServerContext';

// serverMain info box
function ServerRecentItems() {
    const {isServerUser} = useServer();
    const {id} = useParams();
    const [serverMemo, setServerMemo] = useState([]);
    const [serverChecklists, setServerChecklists] = useState([]);
    const [serverMaps, setServerMaps] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{

        // 서버 메모 가져오기
        async function getMemo() {
            const res = await recentList(0, id);
            setServerMemo(res);
        }

        // 서버 체크리스트 가져오기
        async function getChecklists() {
            const res = await recentList(1, id);
            setServerChecklists(res);
        }

        // 서버 지도 가져오기
        async function getMaps() {
            const res = await recentList(2, id);
            
            if (res) {
                setServerMaps(res);
            }
        }

        if (isServerUser) {
            getMemo();
            getChecklists();
            getMaps();
        }
    }, [id, isServerUser]);

    if (!isServerUser) {
        return(
            <div className={styles.list_box}>
                <p>서버에 가입하시면 서버 아이템을 볼 수 있어요!</p>
            </div>
        );
    }

    return(
        <div className={styles.list_box}>
            <div className={styles.main_box}>
                <div className={styles.left_box}>
                    <div className={styles.category_box}>
                        <button className={styles.more_btn} 
                        onClick={()=>{navigate(`/servers/${id}/checklists`)}}>더보기</button>
                        <ServerMainChecklist serverChecklists={serverChecklists}/>
                    </div>
                </div>
                <div className={styles.right_box}>
                    <div className={styles.category_box}>
                        <h2 className={styles.category_title}>서버 메모</h2>
                        <button className={styles.more_btn} 
                        onClick={()=>{navigate(`/servers/${id}/memo`)}}>더보기</button>
                        <ServerMainMemo serverMemo={serverMemo}/>
                    </div>
                </div>
            </div>
            <div className={styles.category_box}>
                <h2 className={styles.category_title}>서버 지도</h2>
                <button className={styles.more_btn} 
                onClick={()=>{navigate(`/servers/${id}/maps`)}}>더보기</button>
                <ServerMainMap serverMaps={serverMaps} serverId={id}/>
            </div>
        </div>
    )
}

export default ServerRecentItems;