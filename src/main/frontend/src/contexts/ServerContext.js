import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import { show } from "api/server";

const ServerContext = createContext();

function ServerProvider({children}) {
    const {id} = useParams(); // 서버 id
    const [serverInfo, setServerInfo] = useState({}); // 서버 정보
    const [isServerUser, setIsServerUser] = useState(false); // 서버사용자
    const [isServerManager, setIsServerManager] = useState(false);
    const [dataLoading, setDataLoading] = useState(true); // 서버정보 대기
    const {user, loading} = useAuth();

    useEffect(()=>{
        // 서버 정보 가져오기
        async function getServer() {
            const res = await show(id);

            if (res) {
                setServerInfo(res);
            }
        }
        getServer();
    }, [id]);

    useEffect(()=>{
        if (!loading) {
            if (user?.joinedServerList.find((el)=>el===id)) {
                setIsServerUser(true);
            }

            if (user?.email === serverInfo.managerId) {
                setIsServerManager(true);
            }
        }
        setDataLoading(false);
    }, [user, loading, serverInfo]);

    return(
        <ServerContext.Provider
        value={{isServerUser, setIsServerUser, 
        dataLoading, setDataLoading, 
        isServerManager, serverInfo}}>
            {children}
        </ServerContext.Provider>
    )
}

export function useServer() {
    return useContext(ServerContext);
}

export default ServerProvider;