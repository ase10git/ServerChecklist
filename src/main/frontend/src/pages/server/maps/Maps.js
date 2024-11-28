import styles from 'styles/pages/server/maps/maps.module.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Map, PlusCircle, PlusLg, Trash } from 'react-bootstrap-icons';
import { list } from 'api/serverItems';
import { Container } from "react-bootstrap";
import fileApi, { getImage } from 'api/image';

function Maps() {

    const [maplist, setMaplist] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    // 지도 추가 페이지 이동
    function handleAddBtn() {
        navigate(`/servers/${id}/maps/new`);
    }

    useEffect(()=>{
        // 지도 가져오기
        async function getMaps() {
            const res = await list(2, id);
            
            if (res) {
                setMaplist(res);
            }
        }

        getMaps();
    }, []);

    return (
        <Container className={styles.container}>
            <div className={styles.title_box}>
                <h2 className={styles.title}>지도 목록</h2>
                <div className={styles.btn_wrap}>
                    <button className={`add_btn ${styles.add_btn}`}
                    onClick={handleAddBtn}><PlusLg/></button>
                    <button className={`del_btn ${styles.del_btn}`}><Trash/></button>
                </div>
            </div>
            <div className={styles.box}>
                {
                    maplist.map((el)=>{
                        return(
                        <div className={styles.map} key={el.id}>
                            <Link to={`/servers/${id}/maps/${el.id}`}>
                            <div className={styles.map_img_box}>
                                {
                                    el.photoId ?
                                    <img src={`${fileApi}${el.photoId}`} alt="mapimg"
                                    className={styles.map_img}/>
                                    :
                                    <div className={styles.icon_default}>
                                        <Map/>
                                    </div>
                                }
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