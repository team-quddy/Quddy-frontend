import styled from "styled-components";

interface Props {
  size: string;
  x: string;
}

const DistributionGraph = ({ size, x }: Props) => {
  return (
    <SvgComponent viewBox="0 0 637 255">
      <mask
        id="distribution_mask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="637"
        height="255">
        <path
          id="distribution_graph"
          d="M318.5 0C183.913 0 247.699 255 0 255H637C389.301 255 453.087 0 318.5 0Z"
          fill="var(--color-background)"
        />
      </mask>
      <g mask="url(#distribution_mask)">
        <rect width="100%" height="100%" fill="var(--color-background)" />
        <rect className="range" x={x} width={size} height="100%" fill="var(--color-primary)" />
      </g>
      <animate
        xlinkHref="#distribution_graph"
        attributeName="d"
        attributeType="XML"
        from="
        M318.5 255
        C318.5 255 0 255 0 255
        H637
        C637 255 318.5 255 318.5 255
        Z"
        to="M318.5 0
        C183.913 0 247.699 255 0 255
        H637
        C389.301 255 453.087 0 318.5 0
        Z"
        dur="800ms"
      />
      <line xmlns="http://www.w3.org/2000/svg" y1="254.5" x2="637" y2="254.5" stroke="black" strokeWidth={4} />
    </SvgComponent>
  );
};

const SvgComponent = styled.svg`
  box-sizing: border-box;

  & rect.range {
    animation: move 1500ms ease-out;
  }

  @keyframes move {
    0% {
      x: 0%;
    }
  }
`;

export default DistributionGraph;
