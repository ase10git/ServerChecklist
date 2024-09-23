import styles from 'styles/pages/server/maps/maps.module.css';
import { Link, useNavigate } from "react-router-dom";
import mapSample from 'lib/sampleData/mapSample';
import { useState } from 'react';
import { PlusCircle } from 'react-bootstrap-icons';

const { Container, button } = require("react-bootstrap");

function Maps() {

    const [maplist, setMaplist] = useState(mapSample);
    const navigate = useNavigate();

    function handleAddBtn() {
        navigate(`/servers/${maplist[0].serverid}/maps/new`);
    }

    return (
        <Container className={styles.container}>
            <h2 className={styles.title}><Link to={`/`}>서버(이름)</Link> 지도</h2>
            <div className={styles.add_btn_wrap}>
                <button className={`add_btn ${styles.add_btn}`}
                onClick={handleAddBtn}>추가</button>
            </div>
            <div className={styles.box}>
                {
                    maplist.map((el)=>{
                        return(
                        <div className={styles.map}>
                            <Link to={`/servers/${el.serverid}/maps/${el.id}`}>
                            <div className={styles.map_img_box}>
                                <img src={el.photo} alt="mapimg"></img>
                            </div>
                            <p className={styles.map_title}>{el.title}</p>
                            </Link>
                        </div>
                        )
                    })
                }
            </div>
            <div className={styles.plus_wrap}>
                <button onClick={handleAddBtn}><PlusCircle/></button>
            </div>
        </Container>
    )
}

export default Maps;