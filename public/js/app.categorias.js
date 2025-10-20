//Llamar todos los elementos del DOM necesarios
const API_URL = "http://localhost:3000/api/categorias";

const formulario_cate = document.getElementById("form-categoria");
const tabla_cate = document.querySelector("#tabla-categorias tbody");

const idcategoria = document.getElementById("idcategoria");
const categoria = document.getElementById("categoria");

const btnGuardarCate = document.getElementById("btnGuardarCate");
const btnCancelCate = document.getElementById("btnCancelCate");

//Retorna el formulario a su estado inicial al cancelar
btnCancelCate.addEventListener("click", () => {
  btnGuardarCate.innerText = "Guardar";
});

//Función para obtener y mostrar las categorías
async function obtenerCategorias() {
  const response = await fetch(API_URL, { method: "get" });
  const categorias = await response.json();

  //Limpiar la tabla antes de llenarla
  tabla_cate.innerHTML = "";

  categorias.forEach((cate) => {
    //Crear una nueva fila y celdas
    const row = tabla_cate.insertRow();

    //Agregar celdas con datos
    row.insertCell().textContent = cate.id;
    row.insertCell().textContent = cate.nombre;

    //Crear celda para los botones de acción
    const actionCell = row.insertCell();

    //Crear botón de editar
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("btn");
    editButton.classList.add("btn-info");
    editButton.classList.add("btn-sm");
    editButton.onclick = () => cargarParaEdicion(cate);

    //Crear botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("btn-sm");
    deleteButton.onclick = () => eliminarCategoria(cate.id, cate.nombre);

    //Agregar los botones a la celda de acción
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  });
}

async function eliminarCategoria(id, categoria) {
  //Confirmar la eliminación
  if (confirm(`Está seguro de eliminar la categoría: ${categoria}?`)) {
    try {
      //Eliminar categoría
      const response = await fetch(API_URL + `/${id}`, { method: "delete" });

      if (!response.ok) throw new Error(`Error al eliminar ${categoria}`);

      //Actualizar la lista de categorías
      const result = await response.json();
      console.log(result);
      obtenerCategorias();
    } catch (e) {
      console.error(e);
    }
  }
}

async function cargarParaEdicion(cate) {
  //Cargar los datos de la categoría en el formulario para edición
  idcategoria.value = cate.id;
  categoria.value = cate.nombre;

  btnGuardarCate.innerText = "Actualizar";
}

//Manejo del envío del formulario
formulario_cate.addEventListener("submit", async (event) => {
  //Prevenir el envío por defecto
  event.preventDefault();

  //Construir el objeto de datos a enviar
  const data = {
    nombre: categoria.value,
  };

  //Enviar la petición adecuada (POST o PUT)
  try {
    let response = null;
    //Si no hay id, es creación, si hay id, es actualización
    if (idcategoria.value === "") {
      //Crear nueva categoría
      response = await fetch(API_URL, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      //Si hay idcategoria, es una actualización
    } else {
      //Actualizar categoría existente
      response = await fetch(API_URL + `/${idcategoria.value}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    //Actualizar la lista de categorías
    const result = await response.json();
    console.log(result);
    btnGuardarCate.innerText = "Guardar";
    formulario_cate.reset();
    obtenerCategorias();
  } catch (e) {
    console.error(e);
  }
});

//Cuando la página esté cargada, invocar la función de obtener categorías
document.addEventListener("DOMContentLoaded", obtenerCategorias);
