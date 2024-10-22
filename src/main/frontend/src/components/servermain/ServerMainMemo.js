import { Dot } from 'react-bootstrap-icons';
import styles from 'styles/components/servermain/servermainMemo.module.css';
//import memoSample from 'lib/sampleData/memoSample';

function ServerMainMemo({serverMemo}) {

    return(
            <div className={styles.memo_box}>
            {
                serverMemo.map((el)=>{
                    return (
                        <div key={el.id} className={styles.memo}>
                            <p className={styles.title}>{el.name}</p>
                            <p className={styles.content}><span><Dot/></span>{el.content}</p>
                        </div>
                    )
                })
            }
            </div>
    )
}

export default ServerMainMemo;