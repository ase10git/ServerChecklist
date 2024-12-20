import { Navigate, Outlet } from "react-router-dom";
import { useServer } from "./ServerContext";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./AuthContext";
import { Spinner } from "react-bootstrap";

function ServerProtectedRoute({redirectTo="/"}) {
    const {loading} = useAuth();
    const {isServerUser, dataLoading} = useServer();

    if (dataLoading) {
        return <div><Spinner/><p>잠시만 기다려주세요</p></div>
    }

    // 서버 사용자가 아니면 홈 이동
    if (!isServerUser) {
        return <Navigate to={redirectTo} replace/>
    }

    return <ProtectedRoute loading={loading}><Outlet/></ProtectedRoute>
}

export default ServerProtectedRoute;