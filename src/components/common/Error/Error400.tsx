import ErrorImg from "../../../assets/imgs/400.png";
import { useRouteError } from "react-router-dom";
import { AxiosError } from "axios";
import { ErrorPageComponent } from "../../../styles/components";

const Error400 = () => {
  const { code, message } = useRouteError() as AxiosError;

  return (
    <ErrorPageComponent>
      <img src={ErrorImg} alt="에러 이미지" />
      <h1>이런!</h1>
      <p>
        해당 페이지는 존재하지 않거나
        <br />
        접근할 수 없는 페이지입니다.
      </p>
      <p className="detail">
        {code} | {message}
      </p>
    </ErrorPageComponent>
  );
};

export default Error400;
