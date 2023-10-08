import { createBrowserRouter } from "react-router-dom";
import { Edit, ExamDetail, ExamList, Main, Profile, Template, TemplateDetail } from "../pages";
import { loaderExamDetail, loaderTemplateDetail } from "./loader";
import ErrorBoundary from "../components/common/Error/ErrorBoundary";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Main /> },
      {
        path: "template",
        children: [
          { path: "", element: <Template /> },
          { path: ":id", element: <TemplateDetail />, loader: loaderTemplateDetail, errorElement: <ErrorBoundary /> },
        ],
      },
      {
        path: "exam",
        children: [
          { path: "", element: <ExamList /> },
          { path: ":id", element: <ExamDetail />, loader: loaderExamDetail, errorElement: <ErrorBoundary /> },
        ],
      },
      { path: "edit", element: <Edit /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default router;
