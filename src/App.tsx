import { styled } from "styled-components";
import TopNav from "./components/common/TopNav/TopNav";

function App() {
  return (
    <AppComponent>
      <TopNav />
      <button onClick={() => alert("sdfd")}>sdfds</button>
    </AppComponent>
  );
}

const AppComponent = styled.div`
  padding: 100px 20px;

  & button {
    float: right;
  }
`;

export default App;
