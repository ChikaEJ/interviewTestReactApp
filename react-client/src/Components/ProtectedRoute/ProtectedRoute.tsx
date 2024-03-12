import React from 'react';
import {Navigate} from "react-router-dom";

interface IProtectedRoutsProps{
    isAllowed: boolean | null;
    redirectPath: string;
    children: React.ReactNode;
}
const ProtectedRoute:React.FC<IProtectedRoutsProps> = ({isAllowed, redirectPath = '/', children }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;