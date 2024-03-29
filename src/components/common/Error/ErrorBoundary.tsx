import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Error400 from "./Error400";
import Error500 from "./Error500";
import { isAxiosError } from "axios";
import ErrorDefault from "./ErrorDefault";

const ErrorBoundary = () => {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    if (error.status >= 400 && error.status < 500) return <Error400 />;
    if (error.status >= 500) return <Error500 />;
    else return <ErrorDefault />;
  } else if (isAxiosError(error) && error.response) {
    if (error.response.status >= 400 && error.response.status < 500) return <Error400 />;
    if (error.response.status >= 500) return <Error500 />;
  } else return <ErrorDefault />;

  return <ErrorDefault />;
};

export default ErrorBoundary;
