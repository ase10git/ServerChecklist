import { Map } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styles from 'styles/components/servermain/servermainMap.module.css';
//import mapSample from 'lib/sampleData/mapSample';

function ServerMainMap({serverMaps, serverId}) {

    return(
        <div className={styles.map_box}>
        {
            serverMaps.map((el)=>{
                return (
                    <div key={el.id} className={styles.map}>
                        <Link to={`/servers/${serverId}/maps/${el.id}`}>
                            <div className={styles.map_img_box}>
                                {
                                    el.photo ?
                                    <img src={el.photo} alt="mapimg"></img>
                                    :
                                    <div className={styles.icon_default}>
                                        <Map/>
                                    </div>
                                }
                            </div>
                            <p className={styles.title}>{el.title}</p>
                        </Link>
                    </div>
                )
            })
        }
        </div>
    )
}

export default ServerMainMap;