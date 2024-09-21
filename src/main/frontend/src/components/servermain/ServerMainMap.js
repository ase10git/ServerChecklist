import styles from 'styles/components/servermain/servermainMap.module.css';
import { useState } from "react";

function ServerMainMap() {

    const [map, setMap] = useState([
        {
            id : '12',
            serverId: '11111',
            title: '황무지 바이옴 좌표',
            location: '312 -31 62',
            photo: '',
            ownerId: '12'
        },
        {
            id : '15',
            serverId: '11111',
            title: '본거점 외관',
            location: '623 781 62',
            photo: '',
            ownerId: '2'
        },
        {
            id : '12',
            serverId: '11111',
            title: 'end portal',
            location: '123 0 -12',
            photo: '',
            ownerId: '24'
        }
    ]);

    return(
        <div className={styles.box}>
            <h3 className={styles.map_title}>서버 지도</h3>
            <div className={styles.map_box}>
            {
                map.map((el)=>{
                    return (
                        <div className={styles.map}>
                            <div className={styles.map_img_box}>
                                <img src={el.photo} alt="mapimg"></img>
                            </div>
                            <p className={styles.title}>{el.title}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default ServerMainMap;