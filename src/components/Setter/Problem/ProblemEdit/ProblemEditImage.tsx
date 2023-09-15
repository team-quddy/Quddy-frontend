import { TbPhotoPlus, TbX } from "react-icons/tb";
import { styled } from "styled-components";
import { ProblemKeyType } from "../../../../types/types";
import { StretchHeightEvent } from "../../../../types/event";
import { useRef } from "react";

interface Props {
  problem: ProblemKeyType;
  setProblem: (problem: ProblemKeyType) => void;
}

const ProblemEditImage = ({ problem, setProblem }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  // 이미지 변경 이벤트
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      // 이미지가 추가되면 accordion을 리사이징
      if (!problem.ex_img)
        divRef.current?.dispatchEvent(
          new CustomEvent<StretchHeightEvent>("stretchHeight", {
            detail: {
              height: divRef.current.offsetWidth * (2 / 3) - 56,
            },
            bubbles: true,
          })
        );

      // 로드된 이미지를 저장
      const ex_img = fileReader.result as string;
      setProblem({ ...problem, ex_img });
    };
  };

  const onResetImage = () => {
    // input 초기화를 통해 같은 이미지 삭제 -> 재삽입 가능하도록 설정
    const input = divRef.current?.querySelector("input");
    if (input) input.value = "";

    setProblem({ ...problem, ex_img: "" });

    divRef.current?.dispatchEvent(
      new CustomEvent<StretchHeightEvent>("stretchHeight", {
        detail: {
          height: -(divRef.current.offsetWidth * (2 / 3) - 56),
        },
        bubbles: true,
      })
    );
  };

  return (
    <ProblemEditImageComponent ref={divRef}>
      <input id={`example-img-${problem.key}`} type="file" accept="image/*" onChange={onChangeImage} />
      {problem.ex_img ? (
        <div className="example-img">
          <button type="button" onClick={onResetImage}>
            <TbX />
          </button>
          <img src={problem.ex_img} alt="보기 이미지" />
          <label htmlFor={`example-img-${problem.key}`}>
            <TbPhotoPlus />
          </label>
        </div>
      ) : (
        <label htmlFor={`example-img-${problem.key}`}>
          <TbPhotoPlus />
          이미지 추가
        </label>
      )}
    </ProblemEditImageComponent>
  );
};

const ProblemEditImageComponent = styled.div`
  & > input {
    display: none;
  }
  & > label {
    border: none;
    border-radius: 8px;
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 56px;
    background-color: var(--color-light-gray);
    color: var(--color-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    & svg {
      font-size: 24px;
      margin-bottom: 2px;
    }
  }

  & > .example-img {
    position: relative;
    width: 100%;
    max-width: 100%;
    aspect-ratio: 1.5;
    background-color: var(--color-gray);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      position: absolute;
      z-index: 1;
      content: "";
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }

    & > label {
      position: absolute;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      display: flex;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      & svg {
        font-size: 26px;
        /* margin-bottom: 2px; */
      }
    }
    & img {
      max-width: 100%;
      max-height: 100%;
      margin: auto;
      &[src=""] {
        display: none;
      }
    }
    & button {
      position: absolute;
      z-index: 10;
      top: 8px;
      right: 8px;
      background-color: rgba(0, 0, 0, 0.2);
      border: none;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      font-size: 28px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default ProblemEditImage;
