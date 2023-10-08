import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import TopNav from "./components/common/TopNav/TopNav";
import { Suspense } from "react";
import LoadingPage from "./components/common/Loading/LoadingPage";

function App() {
  return (
    <AppComponent>
      <TopNav />
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </AppComponent>
  );
}

const AppComponent = styled.div`
  padding: 48px 0 0;
`;

export default App;
