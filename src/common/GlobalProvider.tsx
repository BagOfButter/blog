"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { GlobalStyle } from "@/lib/global";
import Header from "@/components/Header/Header";
import StyledComponentsProvider from "./StyledComponentsProvider";

type TGlobalProviderProps = {
  children: React.ReactNode;
};

const GlobalProvider = ({ children }: TGlobalProviderProps) => {
  return (
    <Provider store={store}>
      <StyledComponentsProvider>
        <GlobalStyle />
        <Header />
        {children}
      </StyledComponentsProvider>
    </Provider>
  );
};

export default GlobalProvider;
