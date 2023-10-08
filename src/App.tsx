import { styled } from "styled-components";
import TopNav from "./components/common/TopNav/TopNav";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Template from "./pages/Template";
import ExamList from "./pages/ExamList";
import Edit from "./pages/Edit";
import TemplateDetail from "./pages/TemplateDetail";
import ExamDetail from "./pages/ExamDetail";
import Profile from "./pages/Profile";
import { Suspense } from "react";
import LoadingPage from "./components/common/Loading/LoadingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TopNav />,
    children: [
      { path: "", element: <Main /> },
      {
        path: "template",
        children: [
          { path: "", element: <Template /> },
          { path: ":id", element: <TemplateDetail /> },
        ],
      },
      {
        path: "exam",
        children: [
          { path: "", element: <ExamList /> },
          { path: ":id", element: <ExamDetail /> },
        ],
      },
      { path: "edit", element: <Edit /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

function App() {
  return (
    <AppComponent>
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </AppComponent>
  );
}

const AppComponent = styled.div`
  padding: 48px 0 0;
`;

export default App;
