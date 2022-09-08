import * as React from "react";

type StateT = {
  refreshResults: () => void;
};

const initialState: StateT = {
  refreshResults: () => {},
};

const SearchCtx = React.createContext<StateT>(initialState);

export const SearchProv = ({
  state,
  children,
}: {
  children: React.ReactNode;
  state: StateT;
}) => <SearchCtx.Provider value={state}>{children}</SearchCtx.Provider>;

export const useSearch = () => React.useContext(SearchCtx);
