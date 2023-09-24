import { TbCameraPlus, TbPlus } from "react-icons/tb";
import { styled } from "styled-components";
import BackBtn from "../components/common/BackBtn/BackBtn";
import Toggle from "../components/common/Toggle/Toggle";
import { useState } from "react";
import { ExamEditType, ProblemKeyType } from "../types/types";
import ProblemEditAccordion from "../components/Setter/Problem/ProblemEdit/ProblemEditAccordion";

const Edit = () => {
  const [data, setData] = useState<ExamEditType<ProblemKeyType>>({
    isPublic: false,
    title: "",
    date: "2023/09/10",
    scrap: 0,
    cnt: 0,
    thumbnail: "",
    ref: "",
    id: "",
    problems: [],
  });
  const [problemCnt, setProblemCnt] = useState<number>(0);

  // 썸네일 변경 이벤트
  const onChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      const thumbnail = fileReader.result as string;
      console.log(thumbnail.length);
      setData((pre) => ({ ...pre, thumbnail }));
    };
  };

  // 타이틀 변경 이벤트
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setData((pre) => ({ ...pre, title }));
  };

  // 문제 추가 이벤트
  const onAddProblem = () => {
    if (data.problems.length >= 10) return;

    const problem: ProblemKeyType = {
      question: "",
      is_objective: true,
      opt: ["", "", "", ""],
      answer: "",
      ex_img: "",
      ex_text: "",
      key: problemCnt,
    };
    setProblemCnt((pre) => pre + 1);
    setData((pre) => ({ ...pre, problems: [...pre.problems, problem] }));
  };

  // 문제 내용 변경 이벤트
  const onChangeProblem = (problem: ProblemKeyType) => {
    const idx = data.problems.findIndex((item) => item.key === problem.key);
    setData((pre) => {
      pre.problems[idx] = problem;
      return { ...pre };
    });
  };

  // 문제 삭제 이벤트
  const onRemoveProblem = (key: number) => {
    setData((pre) => {
      pre.problems = pre.problems.filter((item) => item.key !== key);
      return { ...pre };
    });
  };

  return (
    <EditComponent>
      <BackBtn />
      <section className="exam-info">
        <div className="thumbnail">
          <img src={data.thumbnail} alt="썸네일" />
          <input id="thumbnail" type="file" accept="image/png, image/jpg, image/jpeg" onChange={onChangeThumbnail} />
          <label htmlFor="thumbnail">
            <TbCameraPlus />
          </label>
        </div>

        {/* 문제집 설정 */}
        <div className="setting">
          <div>
            <label htmlFor="title">
              문제집명<b>*</b>
            </label>
            <input id="title" type="text" placeholder="문제집명" value={data.title} onChange={onChangeTitle} />
          </div>
          <div>
            <label>
              템플릿 공개<b>*</b>
            </label>
            <p className="info">공개시 문제집 템플릿 목록에 등록됩니다</p>
            <Toggle value={data.isPublic} setValue={(isPublic) => setData((pre) => ({ ...pre, isPublic }))} />
          </div>
        </div>
      </section>

      {/* 문제 설정 */}
      <section className="problem-list">
        <div className="title">
          <h2>문제 목록</h2>
          <p>
            <b>{data.problems.length}</b>/10
          </p>
        </div>

        <div className="list">
          {data.problems.map((item, idx) => (
            <ProblemEditAccordion
              key={item.key}
              no={idx + 1}
              problem={item}
              setProblem={onChangeProblem}
              removeProblem={onRemoveProblem}
            />
          ))}
        </div>

        <button type="button" className={`add-btn ${data.problems.length < 10}`} onClick={onAddProblem}>
          <TbPlus />
        </button>
      </section>
    </EditComponent>
  );
};

const EditComponent = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 24px 20px 120px;

  & > section.exam-info {
    margin-top: 20px;
    display: flex;

    & > .thumbnail {
      background-color: var(--color-light-gray);
      border-radius: 8px;
      width: 40%;
      max-width: 300px;
      aspect-ratio: 0.75;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;

      & > img {
        width: 100%;
        margin: auto;
        &[src=""] {
          display: none;
        }
      }

      & > input {
        display: none;
      }

      & > label {
        position: absolute;
        z-index: 10;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        padding-bottom: 2px;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 28px;
      }
      &::after {
        position: absolute;
        z-index: 1;
        content: "";
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    & > .setting {
      margin-left: 12px;
      flex-grow: 1;
      & b {
        color: var(--color-primary);
        font-weight: bold;
      }
      & > div {
        display: flex;
        font-size: 12px;
        flex-direction: column;
        margin-bottom: 24px;

        & .info {
          font-size: 8px;
          color: var(--color-primary);
          margin: 2px 0;
        }

        & > *:last-child {
          margin-top: 4px;
        }

        & input {
          width: 100%;
          height: 32px;
          border: none;
          border-radius: 4px;
          padding: 0 12px;
          background-color: var(--color-light-gray);
          font-size: 14px;
          color: var(--color-text);

          &:focus {
            outline: 2px solid var(--color-background);
          }
          &::placeholder {
            color: var(--color-primary);
            opacity: 0.5;
          }
        }
      }
    }
  }

  & > section.problem-list {
    margin-top: 28px;

    & > .title {
      display: flex;
      align-items: end;
      font-size: 16px;
      font-weight: bold;
      & p {
        margin-left: 12px;
        font-size: 12px;
        font-weight: 400;
        color: var(--color-primary);
      }
    }

    & > .list {
      width: 100%;
      & > * {
        margin: 12px 0;
      }
    }
    & .add-btn {
      margin-top: 12px;
      width: 100%;
      height: 40px;
      background-color: var(--color-primary);
      border: none;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: var(--color-theme);

      &.false {
        display: none;
      }
    }
  }
`;

export default Edit;
