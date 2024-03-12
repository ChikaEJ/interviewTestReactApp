import React, {createContext, useState} from "react";

interface MyContextValue {
    token: string;
    updateValue: (newValue: string) => void;
}

export const AuthContext = createContext<MyContextValue>({
    token: '', updateValue: () => {
    }
});

const MyProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const initialValue = localStorage.getItem("accessToken") || "";
    const [token, setToken] = useState<string>(initialValue);

    const updateValue = (newValue: string) => {
        setToken(newValue)
    };

    return (
        <AuthContext.Provider value={{token: token, updateValue}}>
            {children}
        </AuthContext.Provider>
    );
};

export default MyProvider