import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Spinner } from "react-bootstrap";

function ProtectedRoute({ loading, redirectTo = "/login"}) {

    const {user} = useAuth();

    // 로딩 표시
    if (loading) {
        return <div><Spinner/></div>
    }

    // user가 없으면 로그인으로 이동
    if (!user) {
        return <Navigate to={redirectTo} replace/>
    }

    return <Outlet/>
}

export default ProtectedRoute;