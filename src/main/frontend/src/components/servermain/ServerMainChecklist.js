import styles from 'styles/components/servermain/servermainChecklist.module.css';

function ServerMainChecklist({serverChecklists}) {

    return(
        <ul className={styles.list}>
        {
            serverChecklists.map((el)=>{
                return(
                    <li key={el.id}>
                        <input type="checkbox" defaultChecked={el.checked} disabled></input>
                        <span>{el.title}</span>
                    </li>
                )
            })
        }
        </ul>
    )
}

export default ServerMainChecklist;