import { createContext, useState } from "react";

// get the input value from the user at every route
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
