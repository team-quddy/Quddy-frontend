import ErrorImg from "../../../assets/imgs/500.png";
import { useRouteError } from "react-router-dom";
import { AxiosError } from "axios";
import { ErrorPageComponent } from "../../../styles/components";

const Error500 = () => {
  const { code, message } = useRouteError() as AxiosError;

  return (
    <ErrorPageComponent>
      <img src={ErrorImg} alt="에러 이미지" />
      <h1>안 돼!</h1>
      <p>
        현재 서버가 원활하지 않습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </p>
      <p className="detail">
        {code} | {message}
      </p>
    </ErrorPageComponent>
  );
};

export default Error500;
