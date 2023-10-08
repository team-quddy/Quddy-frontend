import { styled } from "styled-components";
import TopNav from "./components/common/TopNav/TopNav";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Template from "./pages/Template";
import ExamList from "./pages/ExamList";
import Edit from "./pages/Edit";
import TemplateDetail from "./pages/TemplateDetail";
import ExamDetail from "./pages/ExamDetail";
import Profile from "./pages/Profile";
import { Suspense } from "react";
import LoadingPage from "./components/common/Loading/LoadingPage";

function App() {
  return (
    <AppComponent>
      <TopNav />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="template">
            <Route path="" element={<Template />} />
            <Route path=":id" element={<TemplateDetail />} />
          </Route>
          <Route path="exam">
            <Route path="" element={<ExamList />} />
            <Route path=":id" element={<ExamDetail />} />
          </Route>
          <Route path="edit" element={<Edit />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </AppComponent>
  );
}

const AppComponent = styled.div`
  padding: 48px 0 0;
`;

export default App;
