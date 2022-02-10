import React from "react";
import styled from "@emotion/styled";
import "animate.css";

const ResultadoDiv = styled.div`
  color: #fff;
  display: flex;
  text-align: center;
  flex-direction: column;
  background-color: rgba(64, 78, 95, 0.63);
  margin-top: 1rem;
  border-radius: 0.5rem;
  font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-family: "Raleway", sans-serif;
  border: white solid;

  &:hover{
    transform: scale(1.03);
  }
`;
const Info = styled.p`
  font-size: 18px;

  span {
    font-weight: bold;
  }
`;
const Precio = styled.p`
  font-size: 18px;

  span {
    font-weight: bold;
  }
`;

const Cotizacion = ({ resultado }) => {
  //SI EL OBJETO 'resultado' LLEGA VACIO NO RETORNAMOS NADA
  if (Object.keys(resultado).length === 0) return null;

  return (
    <ResultadoDiv className="animate__animated animate__flipInX">
      <Precio>
        Cotización: <span>{resultado.PRICE}</span>
      </Precio>
      <Info>
        Precio más alto del día: <span>{resultado.HIGHDAY}</span>
      </Info>
      <Info>
        Precio más bajo del día: <span>{resultado.LOWDAY}</span>
      </Info>
      <Info>
        Variación últimas 24hs: <span>{resultado.CHANGEPCT24HOUR}</span>
      </Info>
      <Info>
        Última Actualización: <span>{resultado.LASTUPDATE}</span>
      </Info>
    </ResultadoDiv>
  );
};

export default Cotizacion;
