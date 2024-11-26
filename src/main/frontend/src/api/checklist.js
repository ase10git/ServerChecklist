import axios from 'lib/axios';

// 체크박스 변경 저장
export async function saveChecked(list) {
    try {
        await axios.patch('/checklists/checkboxs', list);

    } catch (error) {
        alert("체크박스 변경에 실패했습니다");
    }
}
