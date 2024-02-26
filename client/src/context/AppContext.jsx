import { createContext, useReducer, useEffect } from "react";

const initState = {
  theme: JSON.parse(localStorage.getItem("theme")) || "dark",
  onMenu: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "TOGGLE_MENU":
      return {
        ...state,
        onMenu: state.onMenu ? false : true,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(state.theme));
  }, [state?.theme]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state?.user]);

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });
  };

  const toggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AppContext.Provider
      value={{ state, toggleTheme, toggleMenu, login, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};
