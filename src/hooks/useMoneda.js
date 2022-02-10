import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";


//============ Styles ===============
const Label = styled.label`
  font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-family: "Raleway", sans-serif;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 1.8rem;
  margin-bottom: 0.5rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 0.8rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;
//====================================



const useMoneda = (label, stateInicial, opciones) => {
  // STATE DE NUESTRO HOOKS
  const [state, actualizarState] = useState(stateInicial);

  //LO QUE SE MUESTRA EN LA PANTALLA
  const Selecionar = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select
        //CAPTURAMOS EL CAMBIO EN EL SELECT
        onChange={(e) => actualizarState(e.target.value)}
        //ACTUALIZAMOS EL SELECT CON EL VALOR QUE HAYA SELECXIONADO EL USUARIO
        value={state}
      >
        <option value="">- Selecione -</option>
        {/* RECORREMOS ENTRE LAS OPCIONES QUE TENEMOS EJ: PESO ARGENTINO */}
        {opciones.map((opcion) => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </Fragment>
  );

  //RETORNAR STATE, INTERFAZ Y FUNCTION QUE MODIFICA EL ESTATE
  return [state, Selecionar, actualizarState];
};

export default useMoneda;
