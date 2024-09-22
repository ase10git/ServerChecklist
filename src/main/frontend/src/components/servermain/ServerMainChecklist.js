import styles from 'styles/components/servermain/servermainChecklist.module.css';
import { useState } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useServer } from 'contexts/ServerContext';
import checklistSample from 'lib/sampleData/checklistSample';

function ServerMainChecklist() {

    const {serverInfo} = useServer();
    const navigate = useNavigate();

    const [checklist, setChecklist] = useState(checklistSample);

    function handleMoreBtn() {
        navigate(`/servers/${serverInfo.id}/checklists`);
    }

    return(
        <div className={styles.box}>
            <Button className={styles.more_btn} onClick={handleMoreBtn}>더보기</Button>
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