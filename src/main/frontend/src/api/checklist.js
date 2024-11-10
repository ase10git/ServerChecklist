import axios from 'lib/axios';

// 에러처리 함수
async function errorHandling(targetFn) {
    try {
        return await targetFn();
    } catch (error) {
        //window.location.href = '/error';
    }
}

// 체크박스 변경 저장
export async function saveChecked(list) {
    return errorHandling(async () => {
        const res = await axios.patch('/checklists/checkboxs', list);

        if (res.status !== "OK") {
            //window.location.href = '/error';
        }
    });
}
