import { styled } from "styled-components";
import TopNav from "./components/common/TopNav/TopNav";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Template from "./pages/Template";
import ExamList from "./pages/ExamList";
import Edit from "./pages/Edit";
import TemplateDetail from "./pages/TemplateDetail";

function App() {
  return (
    <AppComponent>
      <TopNav />
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="template">
          <Route path="" element={<Template />} />
          <Route path=":id" element={<TemplateDetail />} />
        </Route>
        <Route path="exam" element={<ExamList />} />
        <Route path="edit" element={<Edit />} />
      </Routes>
    </AppComponent>
  );
}

const AppComponent = styled.div`
  padding: 48px 0 0;
`;

export default App;
