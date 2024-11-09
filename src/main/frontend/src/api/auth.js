import axios from 'lib/axios';

// 에러처리 함수
async function errorHandling(targetFn) {
    try {
        return await targetFn();
    } catch (error) {
        //window.location.href = '/error';
    }
}

// 로그인
export async function login(formData) {
    return errorHandling(async () => {
        const res = await axios.post('/auth/login', formData);

        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    })
}

// 회원가입
export async function register(formData) {
    return errorHandling(async () => {
        const res = await axios.post('/auth/register', formData);

        if (res.statusText !== "OK") {
            //window.location.href = '/error';
        }

        const body = res.data;
        return body;
    })
}