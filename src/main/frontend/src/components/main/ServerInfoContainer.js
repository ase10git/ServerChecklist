import fileApi from 'api/image';
import { ListCheck, PencilSquare, PinMapFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styles from 'styles/components/main/serverInfoContainer.module.css';

function ServerInfoContainer({data}) {

    return(
        <div className={styles.container}>
            <span className={styles.server_name}>
                <Link to={`/servers/${data.id}`}>
                    {data.name}
                </Link>
            </span>
            <div className={styles.server_photo_box}>
                <Link to={`/servers/${data.id}`}>
                {
                    data.photoId ?
                    <img src={`${fileApi}/servers/${data.id}`} alt="serverImg"/>
                    : null
                }
                </Link>
            </div>
            <div className={styles.server_info_box}>
                <div className={styles.server_info}>
                    <p>
                        <span><PencilSquare/></span>등록된 메모 : {data.numOfMemo}
                    </p>
                </div>
                <div className={styles.server_info}>
                    <p>
                        <span><ListCheck/></span>등록된 체크리스트 : {data.numOfChecklists}
                    </p>
                </div>
                <div className={styles.server_info}>
                    <p>
                        <span><PinMapFill/></span>등록된 지도 : {data.numOfMaps}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ServerInfoContainer;