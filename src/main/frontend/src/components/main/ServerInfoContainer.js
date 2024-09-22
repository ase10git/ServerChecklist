import { useState } from 'react';
import { ListCheck, PencilSquare, PinMapFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styles from 'styles/components/main/serverInfoContainer.module.css';

function ServerInfoContainer({serverInfo}) {

    return(
        <div className={styles.container}>
            <span className={styles.server_name}>{serverInfo.name}</span>
            <div className={styles.server_photo_box}>
                <Link to={`/servers/${serverInfo.id}`}>
                    <img src={serverInfo.photo} alt="serverImg"></img>
                </Link>
            </div>
            <div className={styles.server_info_box}>
                <div className={styles.server_info}>
                    <Link to={`/servers/${serverInfo.id}/memo`}>
                        <p>
                            <span><PencilSquare/></span>등록된 메모 : {serverInfo.numOfMemos}
                        </p>
                    </Link>
                </div>
                <div className={styles.server_info}>
                    <Link to={`/servers/${serverInfo.id}/checklists`}>
                        <p>
                            <span><ListCheck/></span>등록된 체크리스트 : {serverInfo.numOfLists}
                        </p>
                    </Link>
                </div>
                <div className={styles.server_info}>
                    <Link to={`/servers/${serverInfo.id}/maps`}>
                        <p>
                            <span><PinMapFill/></span>등록된 지도 : {serverInfo.numOfMaps}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ServerInfoContainer;