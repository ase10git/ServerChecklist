import axios from 'lib/axios';
import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getImage } from 'api/image';

const AuthContext = createContext();

// 사용자 인증 및 사용자 정보 관리
function AuthProvider({children}) {

    const [user, setUser] = useState(null); // 로그인 한 사용자
    //const [token, setToken] = useState(null); // Access Token
    const navigate = useNavigate();
    const location = useLocation();

    // header 설정
    function setHeader(response) {
        // 응답에서 Access Token 가져와 로컬 변수에 저장
        const {access_token} = response.data;

        // Access Token을 axios의 header의 Authorization Bearer Schema에 적용
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        // token state에 Access Token 추가
        // setToken(access_token);
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
            alert("로그인에 실패했습니다. 이메일이나 비밀번호를 다시 확인해주세요");
        }
    }

    // 회원가입
    async function register(formData) {
        try {
            const res = await axios.post('/auth/register', formData);

            return res.status;
        } catch (error) {
            alert("회원가입에 실패했습니다. 다시 시도해주세요");
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
    async function logout() {

        async function sendLogout() {
            try {
                const res = await axios.get('/auth/logout');
                if (res.status === 200) {
                    console.log(location.pathname)
                    if (location.pathname !== "/") {
                        window.location.replace("/");
                    }
                    window.location.reload();
                }
            } catch (error) {
            }
        }

        // token이 있을때만 요청
        if (axios.defaults.headers.common['Authorization']) {
            sendLogout();
        } else {
            // 재발급
            const token_status = await refreshToken();
            if (token_status === 200) {
                sendLogout();
            }
        }
    }

    // access token 검증 후 axios 요청
    async function authFetch(action) {

        // token이 있을때만 요청
        if (axios.defaults.headers.common['Authorization']) {
            action();
        } else {
            // 재발급
            const token_status = await refreshToken();
            if (token_status === 200) {
                action();
            } else {
                alert("로그인 후 이용해주세요");
                navigate("/login");
            }
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

    // 사용자 정보 수정
    async function patchUser(formData, email) {
        
        async function patchAxios() {
            try {
                const res = await axios.patch(`/user/${email}`, formData);

                if (res.status === 200) {
                    alert("정보가 수정되었습니다");
                    getUserInfo();
                    navigate("/user");
                }
            } catch (error) {
                alert("정보 수정에 실패했습니다");
            }
        }
        
        // token이 있을때만 요청
        authFetch(patchAxios);
    }

    // 비밀번호 수정
    async function patchUserPwd(formData, email) {
        async function patchAxios() {
            try {
                const res = await axios.patch(`/user/new-password/${email}`, formData);

                if (res.status === 200) {
                    alert("비밀번호를 수정했습니다");
                    navigate("/user");
                }
            } catch (error) {
                alert(error.response.data);
            }
        }
        
        // token이 있을때만 요청
        authFetch(patchAxios);
    }

    // 회원 탈퇴
    async function deleteUser(email) {
        
        async function deleteAxios() {
            try {
                const res = await axios.delete(`/user/${email}`);

                if (res.status === 200) {
                    alert("이용해주셔서 감사합니다");
                    navigate("/");
                }
            } catch (error) {
                alert("회원 탈퇴를 실패했습니다");
            }
        }
        
        // token이 있을때만 요청
        authFetch(deleteAxios);
    }

    return(
        <AuthContext.Provider
        value={{user, login, register, refreshToken, logout, 
        getUserInfo, patchUser, patchUserPwd, deleteUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;