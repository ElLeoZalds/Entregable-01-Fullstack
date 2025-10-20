//Llamar todos los elementos del DOM necesarios
const API_URL = "http://localhost:3000/api/docentes";

const formulario_docente = document.getElementById("form-docente");
const tabla_docente = document.querySelector("#tabla-docentes tbody");

const iddocente = document.getElementById("iddocente");
const docente = document.getElementById("docente");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");

const btnCancelDocen = document.getElementById("btnCancelDocen");
const btnGuardarDocen = document.getElementById("btnGuardarDocen");

//Retorna el formulario a su estado inicial al cancelar
btnCancelDocen.addEventListener("click", () => {
  btnGuardarDocen.innerText = "Guardar";
});

//Función para obtener y mostrar los docentes
async function obtenerDocentes() {
  const response = await fetch(API_URL, { method: "get" });
  const docentes = await response.json();

  //Limpiar la tabla antes de llenarla
  tabla_docente.innerHTML = "";

  docentes.forEach((docen) => {
    //Crear una nueva fila y celdas
    const row = tabla_docente.insertRow();

    //Agregar celdas con datos
    row.insertCell().textContent = docen.id;
    row.insertCell().textContent = docen.nombre;
    row.insertCell().textContent = docen.email;
    row.insertCell().textContent = docen.telefono;

    //Crear celda para los botones de acción
    const actionCell = row.insertCell();

    //Crear botón de editar
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("btn");
    editButton.classList.add("btn-info");
    editButton.classList.add("btn-sm");
    editButton.onclick = () => cargarParaEdicion(docen);

    //Crear botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("btn-sm");
    deleteButton.onclick = () =>
      eliminarDocente(docen.id, docen.nombre, docen.email, docen.telefono);

    //Agregar los botones a la celda de acción
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  });
}

async function eliminarDocente(id, docente) {
  //Confirmar antes de eliminar
  if (confirm(`Está seguro de eliminar el docente: ${docente}?`)) {
    try {
      //Eliminar docente
      const response = await fetch(API_URL + `/${id}`, { method: "delete" });

      if (!response.ok) throw new Error(`Error al eliminar ${docente}`);

      //Actualizar la lista de docentes
      const result = await response.json();
      console.log(result);
      obtenerDocentes();
    } catch (e) {
      console.error(e);
    }
  }
}

async function cargarParaEdicion(docen) {
  //Cargar los datos del docente en el formulario para edición
  iddocente.value = docen.id;
  docente.value = docen.nombre;
  email.value = docen.email;
  telefono.value = docen.telefono;

  btnGuardarDocen.innerText = "Actualizar";
}

//Manejo del envío del formulario
formulario_docente.addEventListener("submit", async (event) => {
  //Prevenir el envío por defecto
  event.preventDefault();

  //Construir el objeto de datos a enviar
  const data = {
    nombre: docente.value,
    email: email.value,
    telefono: telefono.value,
  };

  //Enviar la petición adecuada (POST o PUT)
  try {
    let response = null;

    //Si no hay id, es creación, si hay id, es actualización
    if (iddocente.value === "") {
      //Crear nuevo docente
      response = await fetch(API_URL, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      //Si hay iddocente, es una actualización
    } else {
      //Actualizar docente existente
      response = await fetch(API_URL + `/${iddocente.value}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    //Actualizar la lista de docentes
    const result = await response.json();
    console.log(result);
    btnGuardarDocen.innerText = "Guardar";
    formulario_docente.reset();
    obtenerDocentes();
  } catch (e) {
    console.error(e);
  }
});

//Cuando la página esté cargada, invocar la función de obtener docentes
document.addEventListener("DOMContentLoaded", obtenerDocentes);
