import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("playrentUser")) || null
  );

  const register = (name, email, password) => {
    const newUser = {
      name,
      email,
      password,
    };

    localStorage.setItem("playrentUser", JSON.stringify(newUser));
    setUser(newUser);

    return true;
  };

  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem("playrentUser"));

    if (!savedUser) {
      return false;
    }

    if (
      savedUser.email === email &&
      savedUser.password === password
    ) {
      setUser(savedUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};