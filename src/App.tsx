import { styled } from "styled-components";
import TopNav from "./components/common/TopNav/TopNav";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  return (
    <AppComponent>
      <TopNav />
      <Routes>
        <Route path="" element={<Main />} />
      </Routes>
    </AppComponent>
  );
}

const AppComponent = styled.div`
  padding: 48px 0 0;
`;

export default App;
