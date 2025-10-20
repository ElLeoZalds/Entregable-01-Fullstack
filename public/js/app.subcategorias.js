//Llamar todos los elementos del DOM necesarios
const API_URL = "http://localhost:3000/api/subcategorias";
const URL_API_LISTACATEGORIAS = "http://localhost:3000/api/categorias";

const formulario_subcate = document.getElementById("form-subcategoria");
const tabla_subcate = document.querySelector("#tabla-subcategorias tbody");
const listaIdCate = document.getElementById("lista-idcate");

const idsubcategoria = document.getElementById("idsubcategoria");
const subcategoria = document.getElementById("subcategoria");

const btnGuardarSubCate = document.getElementById("btnGuardarSubCate");
const btnCancelSubCate = document.getElementById("btnCancelSubCate");

//Retorna el formulario a su estado inicial al cancelar
btnCancelSubCate.addEventListener("click", () => {
  btnGuardarSubCate.innerText = "Guardar";
});

//Función para obtener y mostrar las subcategorías
async function obtenerSubCategorias() {
  const response = await fetch(API_URL, { method: "get" });
  const subcategorias = await response.json();

  //Limpiar la tabla antes de llenarla
  tabla_subcate.innerHTML = "";

  subcategorias.forEach((subcate) => {
    //Crear una nueva fila y celdas
    const row = tabla_subcate.insertRow();

    //Agregar celdas con datos
    row.insertCell().textContent = subcate.id;
    row.insertCell().textContent = subcate.nombre;
    row.insertCell().textContent = subcate.categoria_id;

    //Crear celda para los botones de acción
    const actionCell = row.insertCell();

    //Crear botón de editar
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("btn");
    editButton.classList.add("btn-info");
    editButton.classList.add("btn-sm");
    editButton.onclick = () => cargarParaEdicion(subcate);

    //Crear botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("btn-sm");
    deleteButton.onclick = () =>
      eliminarSubCategoria(subcate.id, subcate.nombre, subcate.categoria_id);

    //Agregar los botones a la celda de acción
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  });
}

async function obtenerListaCategorias() {
  //Llenar el select con las categorías disponibles
  const response = await fetch(URL_API_LISTACATEGORIAS, { method: "get" });
  const listacategorias = await response.json();

  listacategorias.forEach((item) => {
    const tagOption = document.createElement("option");
    tagOption.innerHTML = item.nombre;
    tagOption.value = item.id;
    listaIdCate.appendChild(tagOption);
  });
}

async function eliminarSubCategoria(id, subcategoria) {
  //Confirmar la eliminación
  if (confirm(`Está seguro de eliminar la subcategoría: ${subcategoria}?`)) {
    try {
      //Eliminar subcategoría
      const response = await fetch(API_URL + `/${id}`, { method: "delete" });

      if (!response.ok) throw new Error(`Error al eliminar ${subcategoria}`);

      //Actualizar la lista de subcategorías
      const result = await response.json();
      console.log(result);
      obtenerSubCategorias();
    } catch (e) {
      console.error(e);
    }
  }
}

async function cargarParaEdicion(subcate) {
  //Cargar los datos de la subcategoría en el formulario para edición
  idsubcategoria.value = subcate.id;
  subcategoria.value = subcate.nombre;

  btnGuardarSubCate.innerText = "Actualizar";
}

//Manejo del envío del formulario
formulario_subcate.addEventListener("submit", async (event) => {
  //Prevenir el envío por defecto
  event.preventDefault();

  //Construir el objeto de datos a enviar
  const data = {
    nombre: subcategoria.value,
    categoria_id: listaIdCate.value,
  };

  //Enviar la petición adecuada (POST o PUT)
  try {
    let response = null;

    //Si no hay id, es creación, si hay id, es actualización
    if (idsubcategoria.value === "") {
      //Crear nueva subcategoría
      response = await fetch(API_URL, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      //Si hay idsubcategoria, es una actualización
    } else {
      //Actualizar subcategoría existente
      response = await fetch(API_URL + `/${idsubcategoria.value}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    //Actualizar la lista de subcategorías
    const result = await response.json();
    console.log(result);
    btnGuardarSubCate.innerText = "Guardar";
    formulario_subcate.reset();
    obtenerSubCategorias();
  } catch (e) {
    console.error(e);
  }
});

//Cuando la página esté cargada, invocar la función de obtener subcategorías y lista de categorías
document.addEventListener("DOMContentLoaded", () => {
  obtenerListaCategorias();
  obtenerSubCategorias();
});
