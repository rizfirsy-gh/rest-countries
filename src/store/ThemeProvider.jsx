import { useState } from "react";
import { Theme } from "./ThemeContext";

export default function ThemeProvider(props) {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <Theme.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </Theme.Provider>
  );
}
