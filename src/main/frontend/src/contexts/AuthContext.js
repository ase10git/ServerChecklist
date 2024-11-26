import axios from 'lib/axios';
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from 'api/image';

const AuthContext = createContext();

function AuthProvider({children}) {

    const [user, setUser] = useState(null); // 로그인 한 사용자
    const [profileImage, setProfileImage] = useState(''); // 이미지 파일
    //const [token, setToken] = useState(null); // Access Token
    const navigate = useNavigate();

    // header 설정
    function setHeader(response) {
        // 응답에서 Access Token 가져와 로컬 변수에 저장
        const {access_token} = response.data;

        // Access Token을 axios의 header의 Authorization Bearer Schema에 적용
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        // token state에 Access Token 추가
        //setToken(access_token);
    }

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
                    await getUserInfo();
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
    async function getUserInfo() {
        
        // 사용자 정보 가져오기
        async function getUser() {
            try {
                const res = await axios.get(`/user/current-user`);
    
                if (res.status === 200) {
                    setUser(res.data);

                    // 프로필 정보가 있다면 가져오기
                    if (res.data.profile) {
                        const imgRes = await getImage(res.data.profile);
                        setProfileImage(imgRes);
                    }
                }
            } catch (error) {
            }
        }

        // token이 있을때만 요청
        if (axios.defaults.headers.common['Authorization']) {
            getUser();
        } else {
            // 재발급
            const token_status = await refreshToken();

            if (token_status === 200) {
                getUser();
            }
        }
    }

    return(
        <AuthContext.Provider
        value={{user, profileImage, login, register, refreshToken, logout, getUserInfo}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;