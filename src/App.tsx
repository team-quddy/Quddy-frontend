import { styled } from "styled-components";
import TopNav from "./components/common/TopNav/TopNav";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Template from "./pages/Template";
import ExamList from "./pages/ExamList";

function App() {
  return (
    <AppComponent>
      <TopNav />
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="template" element={<Template />} />
        <Route path="exam" element={<ExamList />} />
      </Routes>
    </AppComponent>
  );
}

const AppComponent = styled.div`
  padding: 48px 0 0;
`;

export default App;
