import { TbCameraPlus, TbPlus } from "react-icons/tb";
import { styled } from "styled-components";
import BackBtn from "../components/common/BackBtn/BackBtn";
import Toggle from "../components/common/Toggle/Toggle";
import { useState } from "react";
import { ExamEditType } from "../types/types";
import ProblemEditAccordion from "../components/Setter/Problem/ProblemEdit/ProblemEditAccordion";

const Edit = () => {
  const [data, setData] = useState<ExamEditType>({
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

  return (
    <EditComponent>
      <BackBtn />
      <section className="exam-info">
        <div className="thumbnail">
          <img />
          <button type="button">
            <TbCameraPlus />
          </button>
        </div>

        {/* 문제집 설정 */}
        <div className="setting">
          <div>
            <label htmlFor="title">
              문제집명<b>*</b>
            </label>
            <input id="title" type="text" placeholder="문제집명" />
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
            <b>0</b>/10
          </p>
        </div>

        <div className="list">
          <ProblemEditAccordion />
          <ProblemEditAccordion />
        </div>
        <button type="button" className="add-btn">
          <TbPlus />
        </button>
      </section>
    </EditComponent>
  );
};

const EditComponent = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 24px 20px;

  & > section.exam-info {
    margin-top: 20px;
    display: flex;

    & > .thumbnail {
      background-color: var(--color-gray);
      border-radius: 8px;
      width: 40%;
      max-width: 300px;
      aspect-ratio: 0.75;
      display: flex;
      align-items: center;
      justify-content: center;

      & > button {
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
    }
  }
`;

export default Edit;
