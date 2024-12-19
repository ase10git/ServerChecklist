import styles from 'styles/pages/server/checklists.module.css';
import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { CheckLg, PencilFill, PlusCircle, Trash, X, XLg } from 'react-bootstrap-icons';
import { create, list, patch, remove } from 'api/serverItems';
import { saveChecked } from 'api/checklist';
import { useAuth } from 'contexts/AuthContext';

function Checklists() {

    const {user} = useAuth();
    const [checklists, setChecklists] = useState([]);
    const {id} = useParams(); // serverId
    const [isAdd, setIsAdd] = useState(false); // 추가 상태 플래그
    const [isEdit, setIsEdit] = useState(''); // 수정 상태 플래그
    const [isChecked, setIsChecked] = useState([]); // 체크박스 상태
    const [isChanged, setIsChanged] = useState(false); // 체크박스 변경 사항 플래그
    const navigate = useNavigate();

    // 새 체크리스트 form
    const [formData, setFormData] = useState({
        title: '',
        ownerId: user?.email,
        serverId: id,
        checked: false
    });

    // 체크리스트 수정 form
    const [editFormData, setEditFormData] = useState({
        id: '',
        title: '',
        serverId: id
    });

    // 체크리스트 추가 시 입력폼 생성
    function handleAddState() {
        setIsAdd(!isAdd);
    }

    // 체크리스트의 체크박스 변경
    function handleCheckboxChange(event, cid) {
        const checkedState = event.currentTarget.checked;        
        const defaultChecked = checklists.find((el) => (el.id === cid)).checked;

        let newChangeList = [...isChecked];
        const target = newChangeList.find(el => el.id === cid);

        // 배열 요소에 특정 id가 없는 경우에만 추가
        if (target === null || target === undefined) {
            if (checkedState !== defaultChecked) {
                newChangeList.push({id: cid, checked : checkedState});
                setIsChecked(newChangeList);
                setIsChanged(true);
            }
        } else if (target) {
            if (checkedState === defaultChecked) {
                setIsChecked(newChangeList.filter(el => el.id !== cid));
            }
        }
    }

    // 체크리스트 수정 시 입력폼 생성
    function handleEditState(checklist) {
        setIsEdit(checklist.id);
        setEditFormData((prev)=>({
            ...prev,
            id : checklist.id,
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
        
        // 유효성 검사
        if (formData.title === null || formData.title === '') {
            alert('제목을 입력해주세요!');
            return;
        }
        try {
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

        if (user.email !== checklists.ownerId) {
            return;
        }
        
        const updatedFormData = {...editFormData};

        // 빈 값 처리
        if (updatedFormData.title === null || updatedFormData.title === '') {
            updatedFormData.title = checklists.find(m => m.id === editFormData.id).title;
        }

        try {
            const res = await patch(1, editFormData.id, updatedFormData);

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
            ownerId: user?.email
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
        if (user.email !== checklists.ownerId) {
            return;
        }
        
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
        document.title = "체크리스트";

        if (!user) {
            navigate("/login");
        }

        if (!user.joinedServerList.find(id)) {
            navigate("/");
        }

        // 서버 체크리스트 가져오기
        async function getChecklists() {
            const res = await list(1, id);
            setChecklists(res);
        }

        getChecklists();
    }, [user, id]);

    // 페이지를 떠날 때 체크박스 변경 사항 저장하기
    useEffect(()=>{
        async function handleBeforeUnload(event) {
            if (isChanged) {
                event.preventDefault();

                // 체크박스 변경사항 저장
                if (isChecked.length !== 0) {
                    await saveChecked(isChecked);
                }
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    }, [isChecked, isChanged]);

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
                                makeUnderline={makeUnderline}
                                handleCheckboxChange={handleCheckboxChange}
                                />
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

// checklist box ------------------------------------------------------------------
function CheckBox({
    checklist,
    handleEditState,
    handleDelete,
    makeUnderline,
    handleCheckboxChange,
}) {
    const {user} = useAuth();
    return (
        <div className={styles.info_box}>
            <div className={styles.check_info_box}>
                <input type="checkbox" 
                defaultChecked={checklist.checked}
                className={styles.check_input}
                onChange={(event)=>(handleCheckboxChange(event, checklist.id))}/>
                <span className={`${styles.check_title} ${makeUnderline(checklist.checked)}`}>
                    {checklist.title}
                </span>
            </div>
            {
                user.email === checklist.ownerId ?
                <div className={styles.option_btn_wrap}>
                    <button 
                    className={`edit_btn ${styles.edit_btn}`}
                    onClick={()=>(handleEditState(checklist))}><PencilFill/></button>
                    <button 
                    className={`del_btn ${styles.del_btn}`}
                    onClick={()=>(handleDelete(checklist.id))}><Trash/></button>
                </div>
                : null
            }
        </div>
    )
}

// checklist add box ------------------------------------------------------------------
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

// checklist edit box ------------------------------------------------------------------
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