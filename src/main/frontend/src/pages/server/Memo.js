import styles from 'styles/pages/server/memo.module.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
//import memoSample from 'lib/sampleData/memoSample';
import { CheckLg, PencilFill, PlusCircle, Trash, XLg } from 'react-bootstrap-icons';
import { create, list, patch, remove } from 'api/serverItems';
import { Container, Form } from "react-bootstrap";
import { useAuth } from 'contexts/AuthContext';

function Memo() {

    const {user} = useAuth();
    const [memo, setMemo] = useState([]);
    const {id} = useParams(); // serverId
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState('');
    const navigate = useNavigate();
    
    // 새 메모 form
    const [formData, setFormData] = useState({
        name: '',
        content: '',
        ownerId: user?.email,
        serverId: id
    });
    // 수정 메모 form
    const [editFormData, setEditFormData] = useState({
        id: '',
        name: '',
        content: '',
        ownerId: user?.email,
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

        // 유효성 검사
        if (formData.name === null || formData.name === '') {
            alert('제목을 입력해주세요!');
            return;
        }
        if (formData.content === null || formData.content === '') {
            alert('내용을 입력해주세요!');
            return;
        }

        try {
            const res = await create(0, formData);

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

        if (user.email !== memo.ownerId) {
            return;
        }

        const updatedFormData = {...editFormData};

        // 빈 값 처리
        Object.keys(updatedFormData).forEach((key)=>{
            if (updatedFormData[key] === null || updatedFormData[key] === '') {
                updatedFormData[key] = memo.find(m => m.id === editFormData.id)[key];
            }
        });

        try {
            const res = await patch(0, editFormData.id, updatedFormData);

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
            ownerId: user?.email
        }));
        handleAddState();
    }

    // 메모 수정 취소 시 form 리셋
    function handleEditQuit() {
        setFormData((prev) => ({
            ...prev,
            id: '',
            name: '',
            content: '',
            ownerId: user?.email
        }));
        setIsEdit('');
    }

    // 메모 삭제
    async function handleDelete(id) {
        if (!window.confirm('정말 삭제할까요?')) {
            return;
        }

        try {
            const res = await remove(0, id);

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
        document.title = "메모";

        if (!user) {
            navigate("/login");
        }

        if (!user.joinedServerList.find(id)) {
            navigate("/");
        }

        // 서버 메모 가져오기
        async function getMemo() {
            const res = await list(0, id);
            setMemo(res);
        }

        getMemo();
    }, [user, id]);

    return (
        <Container className={styles.container}>
            <div className={styles.title_box}>
                <h2 className={styles.title}>메모 목록</h2>
                <button className={`add_btn ${styles.add_btn}`}
                onClick={handleAddState}><PlusCircle/></button>
            </div>
            <div className={styles.box}>
                {
                    memo.map((el)=>{
                        return(
                            <div key={el.id} className={styles.memo_box}>
                            {
                                isEdit === el.id ?
                                <MemoEdit
                                memo={el}
                                handleEditChange={handleEditChange}
                                handleEdit={handleEdit}
                                handleEditQuit={handleEditQuit}/>
                                :
                                <MemoBox
                                memo={el}
                                handleEditState={handleEditState}
                                handleDelete={handleDelete}/>
                            }
                            </div>
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

// memo box ------------------------------------------------------------------
function MemoBox({
    memo,
    handleEditState,
    handleDelete
}) {
    const {user} = useAuth();
    return(
        <>
            <div className={styles.info_box}>
                <div className={styles.memo_title_box}>
                    <span>{memo.name}</span>
                    <span>{memo.ownerId}</span>
                </div>
                {
                    user.email === memo.ownerId ?
                    <div className={styles.btn_wrap}>
                        <button 
                        className={`edit_btn ${styles.edit_btn}`}
                        onClick={()=>(handleEditState(memo))}><PencilFill/></button>
                        <button 
                        className={`del_btn ${styles.del_btn}`}
                    onClick={()=>(handleDelete(memo.id))}><Trash/></button>
                    </div>
                : null
                }
            </div>
            <div className={styles.content_box}>
                {memo.content}
            </div>
        </>  
    );
}

// memo adding box ------------------------------------------------------------------
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
                    onClick={handleSubmit}><CheckLg/></button>
                    <button
                    className={`del_btn ${styles.del_btn}`}
                    onClick={handleAddQuit}
                    ><XLg/></button>
                </div>
            </div>
            <input name='content' className={styles.content_box}
            onChange={handleAddChange}></input>
        </Form>
    )
}

// memo editting box ------------------------------------------------------------------
function MemoEdit({
    memo,
    handleEditChange,
    handleEdit,
    handleEditQuit,
}) {
    return(
        <Form>
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
                    ><CheckLg/></button>
                    <button className={`del_btn ${styles.del_btn}`}
                    onClick={handleEditQuit}><XLg/></button>
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