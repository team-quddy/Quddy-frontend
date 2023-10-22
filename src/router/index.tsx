import { createBrowserRouter } from "react-router-dom";
import {
  Edit,
  ExamDetail,
  ExamList,
  Main,
  Profile,
  Solver,
  SolverExam,
  SolverResult,
  Template,
  TemplateDetail,
} from "../pages";
import { loaderExamDetail, loaderSolverExam, loaderSolverResult, loaderTemplateDetail } from "./loader";
import ErrorBoundary from "../components/common/Error/ErrorBoundary";
import App from "../App";

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
        path: "solver",
        element: <Solver />,
        children: [
          { path: "exam/:id", element: <SolverExam />, loader: loaderSolverExam, errorElement: <ErrorBoundary /> },
          {
            path: "result/:id",
            element: <SolverResult />,
            loader: loaderSolverResult,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
]);

export default router;
