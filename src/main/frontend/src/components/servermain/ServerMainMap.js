import styles from 'styles/components/servermain/servermainMap.module.css';
import { useState } from "react";
import mapSample from 'lib/sampleData/mapSample';

function ServerMainMap() {

    const [map, setMap] = useState(mapSample);

    return(
        <div className={styles.map_box}>
        {
            map.map((el)=>{
                return (
                    <div key={el.id} className={styles.map}>
                        <div className={styles.map_img_box}>
                            <img src={el.photo} alt="mapimg"></img>
                        </div>
                        <p className={styles.title}>{el.title}</p>
                    </div>
                )
            })
        }
        </div>
    )
}

export default ServerMainMap;