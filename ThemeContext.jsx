import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a Context
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");


  useEffect(() => {
    // Update HTML root element based on theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.querySelector('body').style.backgroundColor = '#1f2937';
    } else {
      document.documentElement.classList.remove("dark");
      document.querySelector('body').style.backgroundColor = '#fff';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };



  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
