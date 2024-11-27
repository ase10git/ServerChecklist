import { useEffect, useState } from 'react';
import styles from 'styles/pages/server/serverMain.module.css';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { remove, show } from 'api/server';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { getImage } from 'api/image';

function ServerMain() {

    const [serverInfo, setServerInfo] = useState({}); // 서버 정보
    const {id} = useParams(); // 서버 id
    const navigate = useNavigate();

    // 서버 편집 페이지로 이동
    function handleServerEdit() {
        navigate(`/servers/${serverInfo.id}/edit`);
    }

    // 서버 제거
    // async function handleDelete() {
    //     try {
    //         const res = await remove(id);

    //         if (res) {
    //             alert("서버가 삭제되었습니다");
    //         }
    //     } catch (error) {
    //     }
    // }

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
                        <div>
                            <button className='edit_btn'
                            onClick={handleServerEdit}><Pencil/></button>
                            <button
                            className='del_btn'><Trash/></button>
                        </div>
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