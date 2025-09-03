import styles from 'styles/pages/server/serverMain.module.css';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { remove, show, joinServer, leaveServer } from 'api/server';
import { Heart, Heartbreak, HeartbreakFill, Pencil, Plug, Trash } from 'react-bootstrap-icons';
import fileApi from 'api/image';
import ServerProvider, { useServer } from 'contexts/ServerContext';

function ServerMain() {
    return(
        <ServerProvider>
            <div className={styles.container}>
                <ServerMainInfo/>
                <Outlet/>
            </div>
        </ServerProvider>
    )
}

function ServerMainInfo() {
    const {serverInfo, isServerUser, isServerManager} = useServer();
    const navigate = useNavigate();
    const {id} = useParams(); // 서버 id

    // 서버 편집 페이지로 이동
    function handleServerEdit() {
        navigate(`/servers/${serverInfo.id}/edit`);
    }

    // 서버 가입
    async function joinServer() {
        await joinServer(id);
    }

    // 서버 탈퇴
    async function leaveServer() {
        if (!window.confirm("정말 서버를 탈퇴하시겠습니까?")) {
            return;
        }

        await leaveServer(id);
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

    return(
        <div className={styles.server_info_box}>
            <div className={styles.top_box}>
                <div className={styles.title_box}>
                    <h1><Link to={`/servers/${serverInfo.id}`}>{serverInfo.name}</Link></h1>
                    <div className={styles.btn_wrap}>
                        {
                            !isServerUser ?
                            <button className={styles.join_btn}
                            onClick={joinServer}><Heart/>서버 가입</button>
                            :
                            !isServerManager ?
                            <button className={styles.join_btn}
                            onClick={leaveServer}><HeartbreakFill/>서버 탈퇴</button>
                            : null
                        }
                        {
                            isServerManager ?
                            <>
                                <button className='edit_btn'
                                onClick={handleServerEdit}><Pencil/></button>
                                <button
                                className='del_btn'><Trash/></button>
                            </>
                        : null
                        }
                    </div>
                </div>
                <div className={styles.server_img_box}>
                    {
                        serverInfo.photoId ?
                        <img src={`${fileApi}/servers/${serverInfo.id}`} alt="serverimg"/>
                        : null
                    }
                </div>
            </div>
            <div className={styles.server_desc_box}>
                <p>{serverInfo.description}</p>
            </div>
        </div>
    )
}

export default ServerMain;