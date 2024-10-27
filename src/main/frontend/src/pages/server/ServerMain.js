import { useEffect, useState } from 'react';
import styles from 'styles/pages/server/serverMain.module.css';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { show } from 'api/server';
import { Pencil } from 'react-bootstrap-icons';
import fileurl from 'api/image';

function ServerMain() {

    const [serverInfo, setServerInfo] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    // 서버 편집 페이지로 이동
    function handleServerEdit() {
        navigate(`/servers/${serverInfo.id}/edit`);
    }

    useEffect(()=>{
        // 서버 정보 가져오기
        async function getServer() {
            const res = await show(id);
            setServerInfo(res);
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
                            <img src={`${fileurl}${serverInfo.photoId}`} alt="serverimg"/>
                            : null
                        }
                    </div>
                </div>
                <div className={styles.server_desc_box}>
                    <p>{serverInfo.description}</p>
                </div>
            </div>
            <Outlet context={{serverInfo}}/>
        </div>
    )
}

export default ServerMain;