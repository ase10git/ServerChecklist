import axios from 'lib/axios';

// 에러처리 함수
async function errorHandling(targetFn) {
    try {
        return await targetFn();
    } catch (error) {
        //window.location.href = '/error';
    }
}

export async function saveChecked(list) {
    return errorHandling(async () => {
        const res = await axios.patch('/checklists/checkboxs', list);

        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }
    });
}
