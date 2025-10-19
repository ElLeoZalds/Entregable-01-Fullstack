const API_URL = "http://localhost:3000/api/subcategorias";

const formulario_subcate = document.getElementById("form-subcategoria");
const tabla_subcate = document.querySelector("#tabla-subcategorias tbody");

const idsubcategoria = document.getElementById("idsubcategoria");
const subcategoria = document.getElementById("subcategoria");

const btnGuardarSubCate = document.getElementById("btnGuardarSubCate");
const btnCancelSubCate = document.getElementById("btnCancelSubCate");

btnCancelSubCate.addEventListener("click", () => {
  btnGuardarSubCate.innerText = "Guardar";
});

async function obtenerSubCategorias() {
  const response = await fetch(API_URL, { method: "get" });
  const subcategorias = await response.json();

  tabla_subcate.innerHTML = "";

  subcategorias.forEach((subcate) => {
    const row = tabla_cate.insertRow();

    row.insertCell().textContent = subcate.id;
    row.insertCell().textContent = subcate.nombre;
    row.insertCell().textContent = subcate.categoria_id;

    const actionCell = row.insertCell();

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("btn");
    editButton.classList.add("btn-info");
    editButton.classList.add("btn-sm");
    editButton.onclick = () => cargarParaEdicion(subcate);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("btn-sm");
    deleteButton.onclick = () =>
      eliminarSubCategoria(subcate.id, subcate.nombre, subcate.categoria_id);

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  });
}

async function eliminarSubCategoria(id, subcategoria) {
  if (confirm(`Está seguro de eliminar la categoría: ${subcategoria}?`)) {
    try {
      const response = await fetch(API_URL + `/${id}`, { method: "delete" });

      if (!response.ok) throw new Error(`Error al eliminar ${subcategoria}`);

      const result = await response.json();
      console.log(result);
      obtenerSubCategorias();
    } catch (e) {
      console.error(e);
    }
  }
}

async function cargarParaEdicion(subcate) {
  idsubcategoria.value = subcate.id;
  subcategoria.value = subcate.categoria_id;

  btnGuardarSubCate.innerText = "Actualizar";
}

formulario_subcate.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    subcategoria: subcategoria.value,
  };

  try {
    let response = null;

    if (idsubcategoria.value === "") {
      //Crear nueva categoría
      response = await fetch(API_URL, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      //Actualizar categoría existente
      response = await fetch(API_URL + `/${idsubcategoria.value}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    const result = await response.json();
    console.log(result);
    btnGuardarSubCate.innerText = "Guardar";
    formulario_subcate.reset();
    obtenerSubCategorias();
  } catch (e) {
    console.error(e);
  }
});