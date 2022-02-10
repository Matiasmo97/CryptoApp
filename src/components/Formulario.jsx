import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import MensajeError from "./Error.jsx";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";

//============ Styles ===============
const Boton = styled.input`
  font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-family: "Raleway", sans-serif;
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: rgb(166, 0, 231);
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transform: background-color 0.3s ease;

  &:hover {
    background-color: #c74fff;
    cursor: pointer;
  }
`;
//====================================

const Formulario = ({ guardarMoneda, guardarCripto }) => {
  //MOBEDAS DISPONIBLES
  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar Estados Unidos" },
    { codigo: "ARS", nombre: "Peso Argentino" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
  ];

  //STATE DEL LISTADO DE CRIPTOMONEDAS
  const [listacripto, guardarCriptomonedas] = useState([]);
  //STATE PARA MOSTRAR EL ERROR
  const [error, guardarError] = useState(false);
  // UTILIZAR useMoneda                        //LABEL           //OPCIONES
  const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", "", MONEDAS);
  //UTILIZAR useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listacripto
  );

  // EJECUTAMOS EL LLAMADO A LA API
  useEffect(() => {
    const consultarApi = async () => {
      const url =
        //NOS TRAEMOS LAS 10 CRYPTOMONEDAS MAS USADAS
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(url);
      //GUARDAMOS LA RESPUESTA DE LA API SETEANDOLA EN listacripto
      guardarCriptomonedas(resultado.data.Data);
    };
    consultarApi();
  }, []);

  //CUANDO EL USUARIO HACE SUBMIT
  const cotizarMoneda = (e) => {
    e.preventDefault();
    //VALIDAMOS SI AMBOS CAMPOS ESTAN LLENOS
    if (moneda === "" || criptomoneda === "") {
      guardarError(true);
      return;
    }
    //PASAR LOS DATOS LA COMPONENTE PRINCIPAL EN APP
    guardarError(false);
    guardarMoneda(moneda);
    guardarCripto(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? (
        <MensajeError mensaje="Todos los campos son obligatorios" />
      ) : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
