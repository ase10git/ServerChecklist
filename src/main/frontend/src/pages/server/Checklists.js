import styles from 'styles/pages/server/checklists.module.css';
import { Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import checklistSample from 'lib/sampleData/checklistSample';
import { useEffect, useState } from 'react';
import { CheckLg, PencilFill, PlusCircle, Trash, X, XLg } from 'react-bootstrap-icons';
import { create, list, patch, remove } from 'api/serverItems';
import { show } from 'api/server';

function Checklists() {

    const [checklists, setChecklists] = useState(checklistSample);
    const [serverInfo, setServerInfo] = useState({});
    const {id} = useParams(); // serverId
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState('');
    const navigate = useNavigate();

    // 새 체크리스트 form
    const [formData, setFormData] = useState({
        title: '',
        ownerId: '1111', // for test
        serverId: id,
        checked: false
    });

    // 새 체크리스트 form
    const [editFormData, setEditFormData] = useState({
        id: '',
        title: '',
        ownerId: '', // for test
        serverId: id
    });

    // 체크리스트 추가 시 입력폼 생성
    function handleAddState() {
        setIsAdd(!isAdd);
    }

    // 체크리스트 수정 시 입력폼 생성
    function handleEditState(checklist) {
        setIsEdit(checklist.id);
        setEditFormData((prev)=>({
            ...prev,
            id : checklist.id,
            ownerId : checklist.ownerId,
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

    // 새 체크리스트 추가
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            if (formData.title === null || formData.title === '') {
                alert('제목을 입력해주세요!');
                return;
            }

            const res = await create(1, formData);

            if (res !== null) {
                alert('체크리스트가 추가되었습니다');
                navigate(0);
            } else {
                alert('체크리스트 추가를 실패했습니다');
            }
        } catch (error) {
            
        }
    }

    // 체크리스트 수정
    async function handleEdit(event) {
        event.preventDefault();

        const updatedFormData = {...editFormData};

        // 빈 값 처리
        if (updatedFormData.title === null || updatedFormData.title === '') {
            updatedFormData.title = checklists.find(m => m.id === editFormData.id).title;
        }

        try {
            const res = await patch(1, updatedFormData);

            if (res !== null) {
                alert('체크리스트가 수정되었습니다');
                navigate(0);
            } else {
                alert('체크리스트 수정을 실패했습니다');
            }
        } catch (error) {
        }
    }

    // 체크리스트 추가 취소 시 form 리셋
    function handleAddQuit() {
        setFormData((prev) => ({
            ...prev,
            title: '',
            ownerId: ''
        }));
        handleAddState();
    }

    // 체크리스트 수정 취소 시 form 리셋
    function handleEditQuit() {
        setFormData((prev) => ({
            ...prev,
            id: '',
            title: '',
            ownerId: ''
        }));
        setIsEdit('');
    }

    // 체크리스트 삭제
    async function handleDelete(id) {
        if (!window.confirm('정말 삭제할까요?')) {
            return;
        }

        try {
            const res = await remove(1, id);

            if (res !== null) {
                alert('체크리스트가 삭제되었습니다');
                navigate(0);
            } else {
                alert('체크리스트 삭제를 실패했습니다');
            }
        } catch (error) {
        }
    }

    // 체크된 체크리스트에 선 추가하기
    function makeUnderline(checked) {
        if (checked === true) {
            return `${styles.checked}`;
        }
    }

    useEffect(()=>{
        // 서버 정보 가져오기
        async function getServer() {
            const res = await show(id);
            setServerInfo(res);
        }

        async function getChecklists() {
            const res = await list(1, id);
            setChecklists(res);
        }

        getServer();
        getChecklists();
    }, []);

    return(
        <Container className={styles.container}>
            <div className={styles.title_box}>
                <h2 className={styles.title}>체크리스트</h2>
                <div className={styles.btn_wrap}>
                    <button className={`add_btn ${styles.add_btn}`}
                    onClick={handleAddState}><PlusCircle/></button>
                    <button className={`del_btn ${styles.del_btn}`}><Trash/></button>
                </div>
            </div>
            <div className={styles.box}>
                <ul>
                {
                    checklists.map((el)=>{
                        return(
                            <li key={el.id}>
                                {
                                isEdit === el.id ?
                                <CheckEdit 
                                checklist={el}
                                handleEditChange={handleEditChange}
                                handleEdit={handleEdit}
                                handleEditQuit={handleEditQuit}/>
                                :
                                <CheckBox
                                checklist={el}
                                handleEditState={handleEditState}
                                handleDelete={handleDelete}
                                makeUnderline={makeUnderline}/>
                                }
                            </li>
                        )
                    })
                }
                </ul>
                {
                    isAdd === false ?
                    <div className={styles.plus_wrap}>
                        <button onClick={handleAddState}><PlusCircle/></button>
                    </div>
                    : <CheckAdd
                    handleAddChange={handleAddChange}
                    handleSubmit={handleSubmit}
                    handleAddQuit={handleAddQuit}/>
                }

            </div>
        </Container>
    )
}

// checklist box
function CheckBox({
    checklist,
    handleEditState,
    handleDelete,
    makeUnderline
}) {
    return (
        <div className={styles.info_box}>
            <div className={styles.check_info_box}>
                <input type="checkbox" 
                defaultChecked={checklist.checked}
                className={styles.check_input}/>
                <span className={`${styles.check_title} ${makeUnderline(checklist.checked)}`}>
                    {checklist.title}
                </span>
            </div>
            <div className={styles.option_btn_wrap}>
                <button 
                className={`edit_btn ${styles.edit_btn}`}
                onClick={()=>(handleEditState(checklist))}><PencilFill/></button>
                <button 
                className={`del_btn ${styles.del_btn}`}
                onClick={()=>(handleDelete(checklist.id))}><Trash/></button>
            </div>
        </div>
    )
}

// checklist add box
function CheckAdd({
    handleAddChange,
    handleSubmit,
    handleAddQuit
}) {
    return(
        <Form>
            <div className={styles.input_box}>
                <input name='title'
                onChange={handleAddChange}/>
                <div className={styles.option_btn_wrap}>
                    <button className={`edit_btn ${styles.edit_btn}`}
                    onClick={handleSubmit}><CheckLg/></button>
                    <button
                    className={`del_btn ${styles.del_btn}`}
                    onClick={handleAddQuit}
                    ><XLg/></button>
                </div>
            </div>
        </Form>
    )
}

// checklist edit box
function CheckEdit({
    checklist,
    handleEditChange,
    handleEdit,
    handleEditQuit
}) {
    return(
        <Form className={styles.edit_input_box}>
            <input name='title'
            placeholder={checklist.title}
            onChange={handleEditChange}/>
            <div className={styles.option_btn_wrap}>
                <button className={`edit_btn ${styles.edit_btn}`}
                onClick={handleEdit}><CheckLg/></button>
                <button
                className={`del_btn ${styles.del_btn}`}
                onClick={handleEditQuit}
                ><XLg/></button>
            </div>
        </Form>
    )
}

export default Checklists;