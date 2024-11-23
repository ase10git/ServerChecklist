import axios from 'lib/axios';

// header 설정
function setHeader(response) {
    // 응답에서 Access Token 가져와 로컬 변수에 저장
    const {access_token} = response.data;

    // Access Token을 axios의 header의 Authorization Bearer Schema에 적용
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

// 로그인
export async function login(formData) {
    try {
        const res = await axios.post(
            '/auth/login', 
            formData, 
            {withCredentials: true}
        );

        if (res.status === 200) {
            setHeader(res);
        }
        return res.status;    
    } catch (error) {
    }
}

// 회원가입
export async function register(formData) {
    try {
        const res = await axios.post('/auth/register', formData);

        return res.status;
    } catch (error) {
    }
}

// 재발급
export async function refreshToken() {
    try {
        const res = await axios.post(
            '/auth/refresh-token', 
            {}, 
            {withCredentials: true}
        );

        if (res.status === 200) {
            setHeader(res);
        }

        return res.status;
    } catch (error) {
    }
}

// 로그아웃
export async function logout(formData) {
    try {
        const res = await axios.post('/auth/logout', formData);

        return res;    
    } catch (error) {
    }
}