import styles from 'styles/pages/server/checklists.module.css';
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import checklistSample from 'lib/sampleData/checklistSample';
import { useState } from 'react';
import { PlusCircle } from 'react-bootstrap-icons';

function Checklists() {

    const [checklists, setChecklists] = useState(checklistSample);

    function makeUnderline(checked) {
        if (checked === true) {
            return `${styles.checked}`;
        }
    }

    return(
        <Container className={styles.container}>
            <h2 className={styles.title}>
                <Link to={`/`}>서버(이름)</Link> 체크리스트
            </h2>
            <div className={styles.btn_wrap}>
                <Button className={`add_btn ${styles.add_btn}`}>추가</Button>
                <Button className={`del_btn ${styles.del_btn}`}>제거</Button>
            </div>
            <div className={styles.box}>
                <ul>
                {
                    checklists.map((el)=>{
                        return(
                            <li>
                                <input type="checkbox" checked={el.checked}/>
                                <span className={makeUnderline(el.checked)}>{el.title}</span>
                            </li>
                        )
                    })
                }
                </ul>
                <div className={styles.plus_wrap}>
                    <Button><PlusCircle/></Button>
                </div>
            </div>
        </Container>
    )
}

export default Checklists;