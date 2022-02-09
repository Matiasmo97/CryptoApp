import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Formulario from "./components/Formulario.jsx";
import Cotizacion from "./components/Cotizacion.jsx";
import Spinner from "./components/Spinner.jsx";
import imagen from "./img/Cripto.gif";
import Nav from "./components/Nav.jsx";

const Contenedor = styled.div`
  margin: 0 auto;
  width: 900px;
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
  }
  @media (max-width: 520px) {
    width: 90%;
    
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  width: 95%;
  margin-top: 3rem;
`;
const Heading = styled.h1`
  font-family: "IBM Plex Sans Thai Looped", sans-serif;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 2.2rem;
  margin-bottom: 50px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #d394f0;
    display: block;
  }
`;

function App() {
  //STATE PARA GUARDAR EL PAIS ELEGID0
  const [moneda, guardarMoneda] = useState("");
  //STATE PARA GUARDAR LA CRIPTO ELEGIDA
  const [cripto, guardarCripto] = useState("");
  //STATE PARA GUARDAR EL RESULTADO DE LA API
  const [resultado, guardarResultado] = useState({});
  //STATE PARA MOSTRAR EL SPINNER 'CARGANDO'
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      //EVITAMOS LA EJECUCION LA PRIMERA VEZ
      if (moneda === "") return;

      //CONSULTAMOS A LA API PARA OBTENER LA COTIZACION
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      //MOSTRAR EL SPINNER
      guardarCargando(true);

      setTimeout(() => {
        //CAMBIAR EL STATE DE CARGANDO
        guardarCargando(false);

        //GUARDAMOS EL RESULTADO DE LA PETICIÓN
        guardarResultado(resultado.data.DISPLAY[cripto][moneda]);
      }, 1000);
    };
    cotizarCriptomoneda();
  }, [moneda, cripto]);

  //MOSTRAR EL SPINNER O RESULTADO
  const componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <Nav />
      <Body>
        <div>
          <Imagen src={imagen} alt="imagen criptomonedas" />
        </div>
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>

          <Formulario
            guardarMoneda={guardarMoneda}
            guardarCripto={guardarCripto}
          />

          {/* APLICAMOS EL 'componente' PARA QUE NOS MUESTRE EL SPINNER AL CARGAR LOS DATOS Y LUEGO RENDERICE EL COMPONENTE 'Cotización'*/}
          {componente}
        </div>
      </Body>
    </Contenedor>
  );
}

export default App;
