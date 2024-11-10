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
        const res = await axios.post('/auth/login', formData)


        const body = {
            "status" : res.status,
            "data" : res.data
        };
        return body;
    })
}

// 회원가입
export async function register(formData) {
    return errorHandling(async () => {
        const res = await axios.post('/auth/register', formData);

        const body = {
            "status" : res.status,
            "data" : res.data
        };
        return body;
    })
}

// 로그아웃
export async function logout(formData) {
    return errorHandling(async () => {
        const res = await axios.post('/auth/logout', formData);

        const body = {
            "status" : res.status,
            "data" : res.data
        };
        return body;
    })
}