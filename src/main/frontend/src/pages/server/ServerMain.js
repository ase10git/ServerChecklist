import { useEffect, useState } from 'react';
import styles from 'styles/pages/server/serverMain.module.css';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { show } from 'api/server';
import { Pencil } from 'react-bootstrap-icons';
import { getImage } from 'api/image';

function ServerMain() {

    const [serverInfo, setServerInfo] = useState({}); // 서버 정보
    const {id} = useParams(); // 서버 id
    const navigate = useNavigate();

    // 서버 편집 페이지로 이동
    function handleServerEdit() {
        navigate(`/servers/${serverInfo.id}/edit`);
    }

    useEffect(()=>{
        // 서버 정보 가져오기
        async function getServer() {
            const res = await show(id);

            if (res) {
                if (res.photoId) {
                    const imgUrl = await getImage(res.photoId);
                    setServerInfo({...res, imgUrl});
                } else {
                    setServerInfo(res);
                }
            }
        }

        getServer();
    }, []);

    return(
        <div className={styles.container}>
            <div className={styles.server_info_box}>
                <div className={styles.top_box}>
                    <div className={styles.title_box}>
                        <h1><Link to={`/servers/${serverInfo.id}`}>{serverInfo.name}</Link></h1>
                        <button className='edit_btn'
                        onClick={handleServerEdit}><Pencil/></button>
                    </div>
                    <div className={styles.server_img_box}>
                        {
                            serverInfo.photoId ?
                            <img src={serverInfo.imgUrl} alt="serverimg"/>
                            : null
                        }
                    </div>
                </div>
                <div className={styles.server_desc_box}>
                    <p>{serverInfo.description}</p>
                </div>
            </div>
            {/* Server 하위 페이지에서 전부 공유 */}
            <Outlet context={{serverInfo, setServerInfo}}/>
        </div>
    )
}

export default ServerMain;