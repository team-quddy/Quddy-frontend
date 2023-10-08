import { styled } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import LoadingPage from "./components/common/Loading/LoadingPage";
import router from "./router";

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
