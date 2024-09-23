import styles from 'styles/components/servermain/servermainMap.module.css';
import { useState } from "react";
import { button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useServer } from 'contexts/ServerContext';
import mapSample from 'lib/sampleData/mapSample';

function ServerMainMap() {

    const {serverInfo} = useServer();
    const navigate = useNavigate();

    const [map, setMap] = useState(mapSample);

    function handleMoreBtn() {
        navigate(`/servers/${serverInfo.id}/maps`);
    }

    return(
        <div className={styles.box}>
            <h3 className={styles.map_title}>서버 지도</h3>
            <button className={styles.more_btn} onClick={handleMoreBtn}>더보기</button>
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