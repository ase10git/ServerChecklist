import styles from 'styles/components/servermain/servermainChecklist.module.css';
import { useState } from "react";

function ServerMainChecklist() {

    const [checklist, setChecklist] = useState([
        {
            id : '1234',
            serverId: '11111',
            title: '신규 바이옴 찾기',
            ownerId: '133',
            checked: true
        },
        {
            id : '1234',
            serverId: '11111',
            title: '목장 관리하기',
            ownerId: '133',
            checked: false
        }
    ]);

    return(
        <div className={styles.box}>
            <ul>
            {
                checklist.map((el)=>{
                    return(
                        <li>
                            <input type="checkbox" checked={el.checked}></input>
                            <span>{el.title}</span>
                        </li>
                    )
                })
            }
            </ul>
            
        </div>
    )
}

export default ServerMainChecklist;