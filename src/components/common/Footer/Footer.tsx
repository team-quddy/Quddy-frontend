import { TbBrandGithubFilled, TbMailFilled } from "react-icons/tb";
import { styled } from "styled-components";

const Footer = () => {
  return (
    <FooterComponent>
      <h2>Made by</h2>
      <p>
        <b>FE</b> 한유경 <b>BE</b> 김승희
      </p>
      <div>
        <TbBrandGithubFilled />
        <span>https://github.com/team-quddy</span>
      </div>
      <div>
        <TbMailFilled />
        <span>ygo65312@naver.com</span>
      </div>
    </FooterComponent>
  );
};

const FooterComponent = styled.footer`
  width: 100%;
  padding: 20px 24px 40px;
  background-color: var(--color-light-gray);

  & h2 {
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 8px;
  }
  & p {
    margin-bottom: 16px;
    font-size: 14px;
  }

  & b,
  & svg {
    color: var(--color-primary);
  }

  & div {
    margin-top: 4px;
    display: flex;
    align-items: center;
    font-size: 12px;
    & svg {
      font-size: 16px;
    }
    & > * {
      margin-right: 4px;
    }
  }
`;

export default Footer;
