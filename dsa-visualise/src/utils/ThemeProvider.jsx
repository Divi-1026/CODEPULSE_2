import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, settheme] = useState("light");

  useEffect(() => {
    const savedtheme = localStorage.getItem("theme") || "light";
    settheme(savedtheme);
    document.documentElement.classList.add(savedtheme);
  }, []);

  const Toggletheme = () => {
    let newtheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newtheme);
    settheme(newtheme);
    localStorage.setItem("theme", newtheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, Toggletheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
