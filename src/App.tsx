import { styled } from "styled-components";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import TopNav from "./components/common/TopNav/TopNav";
import LoadingPage from "./components/common/Loading/LoadingPage";

function App() {
  const navigation = useNavigation();
  const location = useLocation();

  return (
    <AppComponent>
      {location.pathname.match("/solver") ? undefined : <TopNav />}
      {navigation.state === "loading" ? <LoadingPage fade={false} /> : undefined}
      <Outlet />
    </AppComponent>
  );
}

const AppComponent = styled.div`
  padding: 48px 0 0;
`;

export default App;
