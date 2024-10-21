import styles from 'styles/components/servermain/servermainChecklist.module.css';
//import checklistSample from 'lib/sampleData/checklistSample';

function ServerMainChecklist({serverChecklists}) {

    return(
        <ul className={styles.list}>
        {
            serverChecklists.map((el)=>{
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