import { TbArrowNarrowLeft } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const BackBtn = () => {
  const navigate = useNavigate();

  const onBack = () => navigate(-1);
  return (
    <BackBtnComponent type="button" onClick={onBack}>
      <TbArrowNarrowLeft /> 뒤로가기
    </BackBtnComponent>
  );
};

const BackBtnComponent = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-size: 14px;
  background: none;
  border: none;
  & svg {
    font-size: 24px;
    padding-bottom: 1px;
  }
`;

export default BackBtn;
