import { createContext, useState } from "react";

export const InputContext = createContext<any>("");

export const ImputProvider: React.FC = ({ children }) => {
    const [input, setInput] = useState<string>("");

    function handleInput(value: string) {
        setInput(value);
    }

    return (
        <InputContext.Provider value={{input, handleInput}}>
        {children}
        </InputContext.Provider>
    );
}