import "./App.css";
import CreateTask from "./components/CreateTask";
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/react";
import ThemeToggler from "./components/ThemeToggler";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskLists from "./components/TaskLists";
import UpdateTask from "./components/UpdateTask";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <ThemeToggler />
          <Router>
            <Routes>
              <Route exact path="/createTask" element={<CreateTask/>} />
              <Route exact path="/updateTask" element={<UpdateTask/>} />
              <Route exact path="/" element={<TaskLists/>} />
            </Routes>
          </Router>
        </ColorModeProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
