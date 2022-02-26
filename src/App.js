import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";


function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);

  // paginar
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect( ()=> {

    const consultarApi = async()=> {
      
      if( busqueda === '') return;
      const imagenesPorPagina = 30;
      const apiKey = '25398053-ac60a0b7840e69554a4cc63d8';
      const url = `https://pixabay.com/api/?key=${ apiKey}&q=${ busqueda }&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch( url );
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      // calcular el total de paginas
      const calcularPaginas = Math.ceil( resultado.totalHits / imagenesPorPagina);
      setTotalPaginas( calcularPaginas );

      // mover la pantalla al inicio !!
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView ({ behavior: 'smooth'});
    }
    consultarApi();
  },[busqueda, paginaActual]);

  // definir la pagina anterior
  const paginaAnterior = ()=>{
    const nuevaPaginaActual = paginaActual - 1;
    if(nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual);
  }

  // definir la pagina siguiente
  const paginaSiguiente = ()=> {
    const nuevaPaginaActual = paginaActual + 1;
    if(nuevaPaginaActual > totalPaginas)return;
    setPaginaActual(nuevaPaginaActual);
  }
  
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>

        <Formulario 
          setBusqueda={ setBusqueda }
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={ imagenes }
        />

        {
          (paginaActual > 1)&&
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaAnterior}
            >&laquo; Anterior</button>
        }
        {
          (paginaActual < totalPaginas) &&
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={ paginaSiguiente }
            >Siguiente &raquo;</button>
        }
      </div>
    </div>
  );
}

export default App;
