import { createBrowserRouter } from "react-router-dom";
import { Edit, ExamDetail, ExamList, Main, Profile, Template, TemplateDetail } from "../pages";
import { loaderExamDetail, loaderSolver, loaderTemplateDetail } from "./loader";
import ErrorBoundary from "../components/common/Error/ErrorBoundary";
import App from "../App";
import Solver from "../pages/Solver";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
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
      {
        path: "solver/:id",
        element: <Solver />,
        loader: loaderSolver,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

export default router;
