import styles from 'styles/pages/server/memo.module.css';
import { useServer } from "contexts/ServerContext";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import memoSample from 'lib/sampleData/memoSample';
import { PlusCircle } from 'react-bootstrap-icons';
import { create, list, patch, remove } from 'api/memo';
import { show } from 'api/server';

const { Container, button, Form } = require("react-bootstrap");

function Memo() {

    const [serverInfo, setServerInfo] = useState({});
    const [memo, setMemo] = useState([]);
    const {id} = useParams(); // serverId
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState('');
    const navigate = useNavigate();
    // 새 메모 form
    const [formData, setFormData] = useState({
        name: '',
        content: '',
        ownerId: '1111', // for test
        serverId: id
    });
    // 수정 메모 form
    const [editFormData, setEditFormData] = useState({
        id: '',
        name: '',
        content: '',
        ownerId: '', // for test
        serverId: id
    });

    // 메모 추가 시 입력폼 생성
    function handleAddState() {
        setIsAdd(!isAdd);
    }

    // 메모 수정 시 입력폼 생성
    function handleEditState(memo) {
        setIsEdit(memo.id);
        setEditFormData((prev)=>({
            ...prev,
            id : memo.id,
            ownerId : memo.ownerId,
        }));
    }

    // add form 데이터 등록
    function handleAddChange(event) {
        const { name, value } = event.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name] : value,
        }));
    }

    // edit form 데이터 등록
    function handleEditChange(event) {
        const { name, value } = event.currentTarget;
        setEditFormData((prev) => ({
            ...prev,
            [name] : value,
        }));
    }

    // 새 메모 추가
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            if (formData.name === null || formData.name === '') {
                alert('제목을 입력해주세요!');
                return;
            }
            if (formData.content === null || formData.content === '') {
                alert('내용을 입력해주세요!');
                return;
            }

            const res = await create(formData);

            if (res !== null) {
                alert('메모가 추가되었습니다');
                navigate(0);
            } else {
                alert('메모 추가를 실패했습니다');
            }
        } catch (error) {
            
        }
    }

    // 메모 수정
    async function handleEdit(event) {
        event.preventDefault();

        const updatedFormData = {...editFormData};

        // 빈 값 처리
        Object.keys(updatedFormData).forEach((key)=>{
            if (updatedFormData[key] === null || updatedFormData[key] === '') {
                updatedFormData[key] = memo.find(m => m.id === editFormData.id)[key];
            }
        });

        try {
            const res = await patch(updatedFormData);

            if (res !== null) {
                alert('메모가 수정되었습니다');
                navigate(0);
            } else {
                alert('메모 수정을 실패했습니다');
            }
        } catch (error) {
        }
    }

    // 메모 추가 취소 시 form 리셋
    function handleAddQuit() {
        setFormData((prev) => ({
            ...prev,
            name: '',
            content: '',
        }));
        handleAddChange();
    }

    // 메모 수정 취소 시 form 리셋
    function handleEditQuit() {
        setFormData((prev) => ({
            ...prev,
            name: '',
            content: '',
        }));
        setIsEdit('');
    }

    // 메모 삭제
    async function handleDelete(id) {
        if (!window.confirm('정말 삭제할까요?')) {
            return;
        }

        try {
            const res = await remove(id);

            if (res !== null) {
                alert('메모가 삭제되었습니다');
                navigate(0);
            } else {
                alert('메모 삭제를 실패했습니다');
            }
        } catch (error) {
        }
    }

    useEffect(()=>{
        // 서버 이름 가져오기
        async function getServer() {
            const res = await show(id);
            setServerInfo(res);
        }

        // 서버 메모 가져오기
        async function getMemo() {
            const res = await list(id);
            setMemo(res);
        }

        getServer();
        getMemo();
    }, []);

    return (
        <Container className={styles.container}>
            <h2 className={styles.title}><Link to={`/`}>{serverInfo.name}</Link> 메모</h2>
            <div className={styles.add_btn_wrap}>
                <button className={`add_btn ${styles.add_btn}`}
                onClick={handleAddState}>추가</button>
            </div>
            <div className={styles.box}>
                {
                    memo.map((el)=>{
                        return(
                            <>
                            {
                                isEdit === el.id ?
                                <MemoEdit key={el.id}
                                memo={el}
                                handleEditChange={handleEditChange}
                                handleEdit={handleEdit}
                                handleEditQuit={handleEditQuit}/>
                                :
                                <MemoBox key={el.id}
                                memo={el}
                                handleEditState={handleEditState}
                                handleDelete={handleDelete}/>
                            }
                            </>
                        )
                    })
                }
                {
                    isAdd === false ?
                    <div className={styles.plus_wrap}>
                        <button onClick={handleAddState}><PlusCircle/></button>
                    </div>
                    : <MemoAdd
                    handleAddChange={handleAddChange}
                    handleSubmit={handleSubmit}
                    handleAddQuit={handleAddQuit}/>
                }
            </div>
        </Container>
    )
}

// memo box
function MemoBox({
    memo,
    handleEditState,
    handleDelete
}) {
    return(
        <div className={styles.memo_box}>
            <div className={styles.info_box}>
                <div className={styles.memo_title_box}>
                    <span>{memo.name}</span>
                    <span>{memo.ownerId}</span>
                </div>
                <div className={styles.btn_wrap}>
                    <button 
                    className={`edit_btn ${styles.edit_btn}`}
                    onClick={()=>(handleEditState(memo))}>수정</button>
                    <button 
                    className={`del_btn ${styles.del_btn}`}
                    onClick={()=>(handleDelete(memo.id))}>삭제</button>
                </div>
            </div>
            <div className={styles.content_box}>
                {memo.content}
            </div>
        </div>  
    );
}

// memo adding box
function MemoAdd({
    handleAddChange,
    handleSubmit,
    handleAddQuit
}) {
    return(
        <Form className={styles.memo_box}>
            <div className={styles.info_box}>
                <div className={styles.memo_title_box}>
                    <input name='name'
                    onChange={handleAddChange}/>
                </div>
                <div className={styles.btn_wrap}>
                    <button className={`add_btn ${styles.add_btn}`}
                    onClick={handleSubmit}>추가</button>
                    <button
                    className={`del_btn ${styles.del_btn}`}
                    onClick={handleAddQuit}
                    >취소</button>
                </div>
            </div>
            <input name='content' className={styles.content_box}
            onChange={handleAddChange}></input>
        </Form>
    )
}

// memo editting box
function MemoEdit({
    memo,
    handleEditChange,
    handleEdit,
    handleEditQuit,
}) {
    return(
        <Form className={styles.memo_box}>
            <div className={styles.info_box}>
                <div className={styles.memo_title_box}>
                    <input name='name'
                    placeholder={memo.name}
                    onChange={handleEditChange}/>
                </div>
                <div className={styles.btn_wrap}>
                    <button
                    className={`edit_btn ${styles.edit_btn}`}
                    onClick={handleEdit}
                    >확인</button>
                    <button className={`del_btn ${styles.del_btn}`}
                    onClick={handleEditQuit}>취소</button>
                </div>
            </div>
            <input name='content' 
            placeholder={memo.content}
            className={styles.content_box}
            onChange={handleEditChange}></input>
        </Form>
    )
}

export default Memo;