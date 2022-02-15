import styled from "@emotion/styled";
import { ReactNode } from "react";

const height = 489;
const width = 245;
const perspective = 900;

const globalTransitionmTime = ".5s";
const globalTransitionEasing = "cubic-bezier(0.615, 0.000, 0.280, 1.005)";

const Case = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 24px;
  width: ${width}px;
  height: ${height}px;
  perspective: ${perspective};
  border-radius: 24px;
  overflow: hidden;
  border-radius: 40px;
  box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.3);
  -webkit-box-reflect: below 4px
    linear-gradient(
      to top,
      rgba(255, 255, 255, 1) -120%,
      rgba(255, 255, 255, 0) 25%
    );
`;

const Frame = styled.div`
  width: ${width}px;
  height: ${height}px;
  position: absolute;
  z-index: 2;
  pointer-events: none;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/frameIphone.png");
`;

const Screen = styled.div`
  width: ${width - 20}px;
  height: ${height - 14}px;
  position: relative;
  left: 10px;
  top: 6px;
  overflow: hidden;
  transform-style: preserve-3D;
  background: #ada59c;
`;

const ScreenViewPort = styled.div`
  transform-style: preserve-3D;
  height: 100%;
  width: 100%;
  position: relative;
  left: 0;
  transition: all ${globalTransitionmTime} + 0.009s ${globalTransitionEasing};
`;

export default function Phone({ children }: { children: ReactNode }) {
  return (
    <Case>
      <Frame></Frame>
      <Screen>
        <ScreenViewPort>{children}</ScreenViewPort>
      </Screen>
    </Case>
  );
}
