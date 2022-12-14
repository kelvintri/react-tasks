import "./App.css";
import CreateTask from "./components/CreateTask";
import {
  ChakraProvider,
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskLists from "./components/TaskLists";
import UpdateTask from "./components/UpdateTask";
import Nav from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <ColorModeProvider>
            <CSSReset />
            <Nav />
            <Router>
              <Routes>
                <Route exact path="/" element={<TaskLists />} />
                <Route exact path="/createtask" element={<CreateTask />} />
                <Route exact path="/updatetask" element={<UpdateTask />} />
              </Routes>
            </Router>
            <Footer />
          </ColorModeProvider>
        </ThemeProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
