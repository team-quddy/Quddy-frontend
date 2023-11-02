import ErrorImg from "../../../assets/imgs/undeveloped.png";
import { ErrorPageComponent } from "../../../styles/components";

const ErrorDefault = () => {
  return (
    <ErrorPageComponent>
      <img src={ErrorImg} alt="에러 이미지" />
      <h1>아직은 공사중</h1>
      <p>
        해당 페이지는 현재 개발중입니다.
        <br />
        빠른 시일 내에 제공하고자 노력하겠습니다.
      </p>
    </ErrorPageComponent>
  );
};

export default ErrorDefault;
