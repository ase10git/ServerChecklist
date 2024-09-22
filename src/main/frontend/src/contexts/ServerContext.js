import { createContext, useContext } from "react";

const ServerContext = createContext();

export function useServer() {
    return useContext(ServerContext);
}

export default ServerContext;