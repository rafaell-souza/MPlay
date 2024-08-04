import React, { createContext } from "react";
import { useState } from "react";

export const MenuContext = createContext({
  menu: false,
  setMenu: (value: boolean) => {}
});

export default function MenuProvider({ children }: React.PropsWithChildren<{}>) {
  const [menu, setMenu] = useState(false);

  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
}