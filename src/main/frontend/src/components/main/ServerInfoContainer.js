import { ListCheck, PencilSquare, PinMapFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styles from 'styles/components/main/serverInfoContainer.module.css';
import fileurl from 'api/image';

function ServerInfoContainer({data}) {

    return(
        <div className={styles.container}>
            <span className={styles.server_name}>{data.serverInfo.name}</span>
            <div className={styles.server_photo_box}>
                <Link to={`/servers/${data.serverInfo.id}`}>
                {
                    data.serverInfo.photoId ?
                    <img src={`${fileurl}${data.serverInfo.photoId}`} alt="serverImg"/>
                    : null
                }
                </Link>
            </div>
            <div className={styles.server_info_box}>
                <div className={styles.server_info}>
                    <Link to={`/servers/${data.serverInfo.id}/memo`}>
                        <p>
                            <span><PencilSquare/></span>등록된 메모 : {data.numOfMemo}
                        </p>
                    </Link>
                </div>
                <div className={styles.server_info}>
                    <Link to={`/servers/${data.serverInfo.id}/checklists`}>
                        <p>
                            <span><ListCheck/></span>등록된 체크리스트 : {data.numOfChecklists}
                        </p>
                    </Link>
                </div>
                <div className={styles.server_info}>
                    <Link to={`/servers/${data.serverInfo.id}/maps`}>
                        <p>
                            <span><PinMapFill/></span>등록된 지도 : {data.numOfMaps}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ServerInfoContainer;