import styled from "@emotion/styled";
import { ReactNode } from "react";

const Case = styled.div`
  --c-width: 287px;
  display: block;
  background-color: #000;
  background-size: auto 101%, cover;
  background-repeat: no-repeat, no-repeat;
  border: solid #111;
  position: relative;
  margin: auto;
  box-shadow: 0 0.5em 2em 0.2em rgba(0, 0, 0, 0.33), 0 0 0 0.5px #000 inset;
  transition: all 0.1s linear, line-height 0s linear;
  background-position: 50% 100%, center;
  transform-origin: bottom center;
  width: var(--c-width);
  height: calc(2.15 * var(--c-width));
  line-height: calc(2.165 * var(--c-width));
  border-width: calc(var(--c-width) / 15.625);
  border-radius: calc(var(--c-width) / 5.86);
  background-color: aliceblue;
  background-image: linear-gradient(rgba(0, 0, 0, 0), #111),
    url("./phone_wallpaper-01.png");
  z-index: 200;
  -webkit-box-reflect: below 4px linear-gradient(to top, white -120%, rgba(255, 255, 255, 0) 25%);
  &:before {
    content: "";
    position: absolute;
    z-index: 1;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    height: 30px;
    width: 200px;
    border-radius: 0 0 16px 16px;
    background: #000;
  }
`;

export default function Phone({ children }: { children: ReactNode }) {
  return <Case>{children}</Case>;
}
