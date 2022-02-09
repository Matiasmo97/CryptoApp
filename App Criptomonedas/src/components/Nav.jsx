import React from "react";
import Logo from "../img/Icon.gif";
import styled from "@emotion/styled";

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  color: #fff;
  font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-size: 1.5rem;
`;

const Nav = () => {
  return (
    <Content>
      <img src={Logo} alt="Icono" width={50} />
      <span>Crypto App</span>
    </Content>
  );
};

export default Nav;
