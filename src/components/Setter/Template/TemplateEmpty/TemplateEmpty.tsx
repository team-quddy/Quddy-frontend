import { styled } from "styled-components";
import Image from "../../../../assets/imgs/quddy_sad.png";

const TemplateEmpty = () => {
  return (
    <TemplateEmptyComponent>
      <img alt="우는 큐디" src={Image} />
      <p>아직 공개된 템플릿이 없어요</p>
    </TemplateEmptyComponent>
  );
};

const TemplateEmptyComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & img {
    width: 100%;
    max-width: 100px;
    margin: 32px 0 12px;
  }
  & p {
    text-align: center;
    color: var(--color-primary);
    font-size: 12px;
  }
`;

export default TemplateEmpty;
