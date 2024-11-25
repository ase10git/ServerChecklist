import axios from 'lib/axios';
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// header 설정
function setHeader(response) {
    // 응답에서 Access Token 가져와 로컬 변수에 저장
    const {access_token} = response.data;

    // Access Token을 axios의 header의 Authorization Bearer Schema에 적용
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

function AuthProvider({children}) {

    const [user, setUser] = useState(null); // 로그인 한 사용자
    const navigate = useNavigate();
    
    // 로그인
    async function login(formData) {
        try {
            // 전송 
            const res = await axios.post(
                '/auth/login', 
                formData, 
                {withCredentials: true}
            );

            if (res.status === 200) {
                setHeader(res);

                try {
                    // user 설정
                    const user = await getUser(formData.email);

                    if (user.status === 200) {
                        setUser(user.data);
                    }
                } catch (error) {
                }
            }

            return res;
        } catch (error) {
        }
    }

    // 회원가입
    async function register(formData) {
        try {
            const res = await axios.post('/auth/register', formData);

            return res.status;
        } catch (error) {
        }
    }

    // 재발급
    async function refreshToken() {
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
    async function logout(formData) {
        try {
            const res = await axios.post('/auth/logout', formData);

            return res;    
        } catch (error) {
        }
    }

    // 사용자 정보 가져오기
    async function getUser(email) {
        
        if (!axios.defaults.headers.common['Authorization']) {
            await refreshToken();
        }
        
        try {
            const res = await axios.get(`/user/${email}`);

            return res;
        } catch (error) {
        }
    }

    return(
        <AuthContext.Provider
        value={{user, login, register, refreshToken, logout, getUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;