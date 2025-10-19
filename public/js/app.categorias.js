const API_URL = "http://localhost:3000/api/categorias";

const formulario = document.getElementById("form-categoria");
const tabla = document.querySelector("#tabla-categorias  tbody");

const idcategoria = document.getElementById("idcategoria");
const categoria = document.getElementById("categoria");

const btnGuardarCate = document.getElementById("btnGuardarCate");
const btnCancelCate = document.getElementById("btnCancelCate");

btnCancelCate.addEventListener("click", () => {
  btnGuardarCate.innerText = "Guardar";
});

async function obtenerCategorias() {
  const response = await fetch(API_URL, { method: "get" });
  const categorias = await response.json();

  tabla.innerHTML = "";

  categorias.forEach((cate) => {
    const row = tabla.insertRow();

    row.insertCell().textContent = cate.id;
    row.insertCell().textContent = cate.nombre;

    const actionCell = row.insertCell();

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("btn");
    editButton.classList.add("btn-info");
    editButton.classList.add("btn-sm");
    editButton.onclick = () => cargarParaEdicion(cate);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("btn-sm");
    deleteButton.onclick = () =>
      eliminarCategoria(cate.id, cate.nombre);

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  });
}

async function eliminarCategoria(id, categoria) {
  if (confirm(`Está seguro de eliminar la categoría: ${categoria}?`)) {
    try {
      const response = await fetch(API_URL + `/${id}`, { method: "delete" });

      if (!response.ok) throw new Error(`Error al eliminar ${categoria}`);

      const result = await response.json();
      console.log(result);
      obtenerCategorias();
    } catch (e) {
      console.error(e);
    }
  }
}

async function cargarParaEdicion(cate) {
  idcategoria.value = cate.id;
  categoria.value = cate.nombre;

  btnGuardarCate.innerText = "Actualizar";
}

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    categoria: categoria.value,
  };

  try {
    let response = null;

    if (idcategoria.value === "") {
      //Crear nueva categoría
      response = await fetch(API_URL, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      //Actualizar categoría existente
      response = await fetch(API_URL + `/${idcategoria.value}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    const result = await response.json();
    console.log(result);
    btnGuardarCate.innerText = "Guardar";
    formulario.reset();
    obtenerCategorias();
  } catch (e) {
    console.error(e);
  }
});

//Cuando la página esté cargada, invocar la función de obtener categorías
document.addEventListener("DOMContentLoaded", obtenerCategorias);
