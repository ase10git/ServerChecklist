import { useServer } from 'contexts/ServerContext';
import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Dot } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import styles from 'styles/components/servermain/servermainMemo.module.css';
import memoSample from 'lib/sampleData/memoSample';

function ServerMainMemo() {

    const {serverInfo} = useServer();
    const navigate = useNavigate();

    const [memo, setMemo] = useState(memoSample);

    function handleMoreBtn() {
        navigate(`/servers/${serverInfo.id}/memo`);
    }

    return(
        <div className={styles.box}>
            <h3 className={styles.memo_title}>서버 메모</h3>
            <Button className={styles.more_btn} onClick={handleMoreBtn}>더보기</Button>
            <div className={styles.memo_box}>
            {
                memo.map((el)=>{
                    return (
                        <div className={styles.memo}>
                            <p className={styles.title}>{el.name}</p>
                            <p className={styles.content}><span><Dot/></span>{el.content}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default ServerMainMemo;