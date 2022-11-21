import { render } from "solid-js/web";
import { createSignal } from "solid-js";
import axios from "axios";

function App() {
  return (
    <main>
      <img src="src/img/logoNur.png" alt="LogoNur" id="logoNur" />
      <h1>Snack Nur</h1>
      <div class="container"></div>

      <div class="fila"></div>
      <form>
        <fieldset>
          <legend>PRODUCTO</legend>
          <input type="text" class="formulario" id="item" />
          <br />
          <legend>PRECIO</legend>
          <input type="number" step="0.01" class="formulario" id="precio" />
        </fieldset>

        <div class="botones-crud">
          <button type="button" id="crear" class="btn btn-crear">
            Crear Tabla
          </button>
          <button type="button" id="insertar" class="btn btn-insertar">
            Insertar registro
          </button>
          <button type="button" id="modificar" class="btn btn-modificar">
            Modificar registro
          </button>
          <button type="button" id="listar" class="btn btn-actualizar">
            Mostrar/Actualizar
          </button>
          <button type="button" id="eliminar-todo" class="btn btn-eliminar">
            Eliminar Tabla
          </button>
        </div>
      </form>
      
      <hr />
      <div>
        <h3>Lista de productos</h3>
        <table class="tabla-registro" id="listaProductos"></table>
      </div>
      <script type="text/javascript" src="src/javascript/jquery.js"></script>
      <script type="text/javascript" src="src/javascript/crud.js"></script>
      <script src="src/index.jsx" type="module"></script>
    </main>
  );
}

export default App;
