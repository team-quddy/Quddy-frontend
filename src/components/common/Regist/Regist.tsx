import { styled } from "styled-components";
import QuddySvg from "../../../assets/imgs/quddy.svg";
import DubbySvg from "../../../assets/imgs/dubby.svg";
import { useMemo, useState } from "react";
import { postCreateUser } from "../../../apis/Setter";
import { QueryObserverResult, useMutation } from "@tanstack/react-query";

interface Props {
  refetch(): Promise<QueryObserverResult>;
  initialVsibility: boolean;
}

const Regist = ({ refetch, initialVsibility }: Props) => {
  const [nickname, setNickname] = useState<string>("");
  const mutation = useMutation(() => postCreateUser(nickname), { onSuccess: () => refetch() });
  const memo = useMemo(() => initialVsibility, []);

  console.log(memo);

  if (memo) return <></>;

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 8) return;
    setNickname(value);
  };

  const onRegist = async () => {
    if (nickname.length < 2) return;
    mutation.mutate();
  };

  const onLogin = () => {
    alert("추후 기능을 제공할 예정입니다!");
  };

  return (
    <RegistComponent className={mutation.isSuccess ? "close" : ""}>
      <img src={QuddySvg} className="svg quddy" alt="큐디" />
      <img src={DubbySvg} className="svg dubby" alt="더비" />
      <div>
        <div className="header">
          <p>Welcome to</p>
          <h1>quddy</h1>
        </div>

        <p>큐디 서비스를 이용하기 위해 닉네임을 설정해주세요</p>
        <p className="notice">* 타인에게 불쾌함을 줄 수 있는 닉네임은 피해주세요</p>

        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={onChangeNickname}
          placeholder="2글자 이상 8글자 이하"
        />

        <button type="button" className="regist-btn" disabled={nickname.length < 2} onClick={onRegist}>
          시작하기
        </button>
        <button type="button" className="login-btn" onClick={onLogin}>
          이미 서비스를 이용한 적이 있나요?
        </button>
      </div>
    </RegistComponent>
  );
};

const RegistComponent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: end;
  &::after {
    content: "";
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  & > img.svg {
    position: absolute;
    z-index: 0;
    bottom: 0;
    opacity: 1;
    left: 50%;
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
    animation-name: appear;
    animation-duration: 500ms;
    animation-delay: 500ms;
    animation-fill-mode: both;

    &.quddy {
      transform: scale(0.7) rotate(-4deg) translateX(-150%) translateY(5%);
    }
    &.dubby {
      animation-duration: 520ms;
      transform: scale(0.68) rotate(4deg) translateX(-20%) translateY(10%);
    }
  }

  & > div {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    max-width: 640px;
    z-index: 10001;
    background-color: var(--color-theme);
    margin: 0 auto;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    padding: 16px 24px 56px;
    box-shadow: 0 -4px 16px 8px rgba(0, 0, 0, 0.2);
    animation-name: side-up;
    animation-duration: 500ms;

    & > .header {
      margin: auto;
      margin-bottom: 32px;
      text-align: center;
      color: var(--color-primary);

      & > p {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 2px;
      }

      & > h1 {
        font-family: Pacifico-Regular;
        font-size: 36px;
      }
    }

    & > p {
      font-size: 14px;
      text-align: center;
      margin-bottom: 8px;
    }

    & > p.notice {
      font-size: 11px;
      color: var(--color-primary);
    }

    & > input {
      width: 100%;
      max-width: 240px;
      height: 40px;
      margin: 16px auto;
      border: none;
      border-radius: 4px;
      padding: 0 8px;
      background-color: var(--color-light-gray);
      font-size: 14px;
      text-align: center;
      color: var(--color-text);

      &:focus {
        outline: 2px solid var(--color-background);
      }
      &::placeholder {
        color: var(--color-primary);
        opacity: 0.5;
      }
    }

    & > button.regist-btn {
      margin: auto;
      width: 160px;
      height: 48px;
      color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      background-color: var(--color-primary);

      &:disabled {
        opacity: 0.5;
      }
    }

    & > button.login-btn {
      text-decoration: underline;
      color: var(--color-primary);
      font-size: 12px;
      margin-top: 24px;
      background: none;
      border: none;
    }
  }

  &.close {
    animation: fide-out;
    animation-delay: 500ms;
    animation-duration: 500ms;
    animation-fill-mode: both;
    & > div {
      animation-name: side-down;
      animation-fill-mode: both;
    }
    & > img.svg {
      animation-name: disappear;
      animation-delay: 0ms;
    }
  }

  @keyframes fide-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }

  @keyframes side-up {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes side-down {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(101%);
    }
  }
  @keyframes appear {
    0% {
      opacity: 0;
      bottom: 0;
    }
    70% {
      bottom: 310px;
    }
    85% {
      bottom: 295px;
    }
    95% {
      bottom: 305px;
    }
    100% {
      bottom: 300px;
    }
  }
  @keyframes disappear {
    0% {
      bottom: 300px;
    }

    100% {
      bottom: -240px;
    }
  }
`;

export default Regist;
