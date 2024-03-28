import React from "react";
import styled from "styled-components";

import { ReactComponent as BosonLogo } from "../../logo.svg";
export const redirectPath = "/";

const widgetsPage = "https://docs.bosonprotocol.io/docs/category/widgets";

const Redirecting = styled.div`
  width: 104px;
  @keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }
  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ellipsis steps(4, end) 900ms infinite;
    content: "...";
    width: 0px;
  }
`;

export const RedirectToDocs: React.FC = () => {
  //   useEffect(() => {
  //     window.location.href = widgetsPage;
  //   }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <BosonLogo width="300px" style={{ maxWidth: "100%" }} />
      <Redirecting>Redirecting</Redirecting>
      <p
        style={{
          wordBreak: "break-word",
          textAlign: "center"
        }}
      >
        If you don't get automatically redirected, click on{" "}
        <a href={widgetsPage}>{widgetsPage}</a>
      </p>
    </div>
  );
};
