import { Map } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styles from 'styles/components/servermain/servermainMap.module.css';

function ServerMainMap({serverMaps, serverId}) {

    console.log(serverMaps)
    return(
        <div className={styles.map_box}>
        {
            serverMaps.map((el)=>{
                return (
                    <div key={el.id} className={styles.map}>
                        <Link to={`/servers/${serverId}/maps/${el.id}`}>
                            <div className={styles.map_img_box}>
                                {
                                    el.photoId ?
                                    <img src={el.imgUrl} 
                                    alt="mapimg"
                                    className={styles.map_img}/>
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