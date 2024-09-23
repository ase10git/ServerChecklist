import styles from 'styles/pages/server/memo.module.css';
import { useServer } from "contexts/ServerContext";
import { useState } from "react";
import { Link } from 'react-router-dom';
import memoSample from 'lib/sampleData/memoSample';
import { PlusCircle } from 'react-bootstrap-icons';

const { Container, button, Form } = require("react-bootstrap");

function Memo() {

    const [memo, setMemo] = useState(memoSample);
    const [isAdd, setIsAdd] = useState(false);

    function handleAddChange() {
        setIsAdd(!isAdd);
    }

    return (
        <Container className={styles.container}>
            <h2 className={styles.title}><Link to={`/`}>서버(이름)</Link> 메모</h2>
            <div className={styles.add_btn_wrap}>
                <button className={`add_btn ${styles.add_btn}`}
                onClick={handleAddChange}>추가</button>
            </div>
            <div className={styles.box}>
                {
                    memo.map((el)=>{
                        return(
                            <div className={styles.memo_box}>
                                <div className={styles.info_box}>
                                    <div className={styles.memo_title_box}>
                                        <span>{el.name}</span>
                                        <span>{el.ownerId}</span>
                                    </div>
                                    <div className={styles.btn_wrap}>
                                        <button className={`edit_btn ${styles.edit_btn}`}>수정</button>
                                        <button className={`del_btn ${styles.del_btn}`}>삭제</button>
                                    </div>
                                </div>
                                <div className={styles.content_box}>
                                    {el.content}
                                </div>
                            </div>
                        )
                    })
                }
                {
                    isAdd === false ?
                    <div className={styles.plus_wrap}>
                        <button onClick={handleAddChange}><PlusCircle/></button>
                    </div>
                    : <MemoAdd handleAddChange={handleAddChange}/>
                }
            </div>
        </Container>
    )
}

// memo adding box
function MemoAdd({handleAddChange}) {
    return(
        <>
            <Form className={styles.memo_box}>
                <div className={styles.info_box}>
                    <div className={styles.memo_title_box}>
                        <input name='name'></input>
                        <input type='hidden' value=''></input>
                    </div>
                    <div className={styles.btn_wrap}>
                        <button className={`add_btn ${styles.add_btn}`}>추가</button>
                        <button className={`del_btn ${styles.del_btn}`}
                        onClick={handleAddChange}>취소</button>
                    </div>
                </div>
                <input name='content' className={styles.content_box}></input>
            </Form>
        </>
    )
}

export default Memo;