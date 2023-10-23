import styled from "styled-components";

export const ErrorPageComponent = styled.div`
  max-width: 800px;
  width: 100%;
  min-height: calc(100vh - 48px);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-primary);
  text-align: center;

  & > img {
    margin: 140px auto 24px;
    height: 140px;
  }
  & > h1 {
    line-height: 32px;
    font-weight: bold;
    font-size: 20px;
  }
  & > p {
    line-height: 20px;
    font-size: 14px;
  }
  & > p.detail {
    font-size: 10px;
    margin-top: 14px;
  }
`;
