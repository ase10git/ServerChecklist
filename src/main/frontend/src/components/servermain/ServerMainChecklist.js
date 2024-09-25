import styles from 'styles/components/servermain/servermainChecklist.module.css';
import { useState } from "react";
import checklistSample from 'lib/sampleData/checklistSample';

function ServerMainChecklist() {

    const [checklist, setChecklist] = useState(checklistSample);

    return(
        <ul className={styles.list}>
        {
            checklist.map((el)=>{
                return(
                    <li key={el.id}>
                        <input type="checkbox" checked={el.checked}></input>
                        <span>{el.title}</span>
                    </li>
                )
            })
        }
        </ul>
    )
}

export default ServerMainChecklist;