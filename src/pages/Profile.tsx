import { styled } from "styled-components";
import BackBtn from "../components/common/BackBtn/BackBtn";
import { TbClipboard, TbSettings, TbUser } from "react-icons/tb";
import Regist from "../components/common/Regist/Regist";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../apis/Setter";

const Profile = () => {
  const query = useQuery(["getUser"], getUserInfo, { retry: 2 });

  return (
    <ProfileComponent>
      <BackBtn />
      <section className="prfile-info">
        <div className="user">
          <div className="user-img">
            <TbUser />
          </div>

          <div className="user-id">
            <p>{query.data?.nickname ?? "-"}</p>
            <button type="button">
              <b>ID </b>
              {query.data?.id ?? "-"}
              <TbClipboard />
            </button>
          </div>

          <button type="button" className="setting">
            <TbSettings />
          </button>
        </div>

        <div className="log-stat">
          <div>
            <p>만든 문제집</p>
            <p>{query.data?.examCnt ?? "-"}</p>
          </div>

          <div>
            <p>공개 문제집</p>
            <p>{query.data?.publicExamCnt ?? "-"}</p>
          </div>

          <div>
            <p>좋아요 수</p>
            <p>{query.data?.scrapCnt ?? "-"}</p>
          </div>
        </div>
      </section>

      <section className="latest-solved">
        <h2>응시한 문제집</h2>
        <p className="empty">아직 응시기록이 없습니다.</p>
      </section>

      {query.isInitialLoading || <Regist refetch={query.refetch} initialVsibility={query.isSuccess} />}
    </ProfileComponent>
  );
};

const ProfileComponent = styled.main`
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 24px 20px 56px;

  & > section.prfile-info {
    border-bottom: 1px solid var(--color-light-gray);

    & .user {
      margin: 20px 8px;
      display: flex;

      & > .user-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: var(--color-gray);
        display: flex;
        align-items: center;
        justify-content: center;

        & > svg {
          font-size: 48px;
          color: var(--color-theme);
        }
      }

      & > .user-id {
        padding-left: 12px;
        margin: auto 0;
        flex: 1 1 0;
        & > p {
          font-weight: bold;
          font-size: 18px;
          margin: 0 4px;
          line-height: 24px;
        }
        & > button {
          border: none;
          background: none;
          color: var(--color-primary);
          font-size: 10px;
          display: flex;
          align-items: center;
          & > b {
            font-weight: bold;
            margin-right: 4px;
          }
          & > svg {
            margin-left: 4px;
            font-size: 14px;
          }
        }
      }

      & > .setting {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        padding: 0;
        border: none;
        border-radius: 50%;
        margin: auto;
        background-color: var(--color-light-gray);
        color: var(--color-primary);
      }
    }

    & .log-stat {
      margin: 20px auto;
      width: calc(100% - 24px);
      max-width: 400px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: bold;

        & > p:first-child {
          margin-bottom: 4px;
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  }

  & > section.latest-solved {
    margin: 20px 0;
    & > h2 {
      font-weight: bold;
    }

    & > .empty {
      margin: 40px;
      font-size: 12px;
      text-align: center;
    }
  }
`;

export default Profile;
