import "./App.css";
import CreateTask from "./components/CreateTask";
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskLists from "./components/TaskLists";
import UpdateTask from "./components/UpdateTask";
import Nav from "./components/Navbar";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Nav/>
          <Router>
            <Routes>
              <Route exact path="/createtask" element={<CreateTask/>} />
              <Route exact path="/updatetask" element={<UpdateTask/>} />
              <Route exact path="/" element={<TaskLists/>} />
            </Routes>
          </Router>
        </ColorModeProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
