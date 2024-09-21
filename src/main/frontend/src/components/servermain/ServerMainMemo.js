import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Dot } from 'react-bootstrap-icons';
import styles from 'styles/components/servermain/servermainMemo.module.css';


function ServerMainMemo() {

    const [memo, setMemo] = useState([
        {
            id : '231',
            serverId: '11111',
            name: '목장 가축 리스트',
            content: '양, 소, 말, 닭, 토끼',
            ownerId: '12'
        },
        {
            id : '234',
            serverId: '11111',
            name: '본거점 재화',
            content: '철 120개, 금 40개',
            ownerId: '21'
        },
        {
            id : '232',
            serverId: '11111',
            name: 'end region no dragon',
            content: 'no dragon, already kiiled it',
            ownerId: '2'
        },
        {
            id : '233',
            serverId: '11111',
            name: '자작나무 많이 필요',
            content: '현재 건축 재료로 사용중',
            ownerId: '24'
        },
        {
            id : '236',
            serverId: '11111',
            name: '레이드 재료 수집중',
            content: '위더 레이드 준비중',
            ownerId: '12'
        },
        {
            id : '238',
            serverId: '11111',
            name: '서버 확장중',
            content: '일주일간 서버가 다운될 수 있습니다.',
            ownerId: '2'
        },
    ]);

    return(
        <div className={styles.box}>
            <h3 className={styles.memo_title}>서버 메모</h3>
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