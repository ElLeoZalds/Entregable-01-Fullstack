//Llamar todos los elementos del DOM necesarios
const API_URL = "http://localhost:3000/api/cursos";
const URL_API_LISTASUBCATEGORIAS = "http://localhost:3000/api/subcategorias";
const URL_API_LISTADOCENTES = "http://localhost:3000/api/docentes";

const formulario_curso = document.getElementById("form-curso");
const tabla_curso = document.querySelector("#tabla-cursos tbody");
const listaIdSubCate = document.getElementById("lista-idsubcate");
const listaIdDocente = document.getElementById("lista-iddocente");

const idcurso = document.getElementById("idcurso");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const fecha_inicio = document.getElementById("fecha_inicio");
const fecha_fin = document.getElementById("fecha_fin");
const duracion_horas = document.getElementById("duracion_horas");
const precio = document.getElementById("precio");

const btnGuardarCurso = document.getElementById("btnGuardarCurso");
const btnCancelCurso = document.getElementById("btnCancelCurso");

//Retorna el formulario a su estado inicial al cancelar
btnCancelCurso.addEventListener("click", () => {
  btnGuardarCurso.innerText = "Guardar";
});

//Función para obtener y mostrar los cursos
async function obtenerCursos() {
  const response = await fetch(API_URL, { method: "get" });
  const cursos = await response.json();

  //Limpiar la tabla antes de llenarla
  tabla_curso.innerHTML = "";

  cursos.forEach((curso) => {
    //Crear una nueva fila y celdas
    const row = tabla_curso.insertRow();

    //Agregar celdas con datos
    row.insertCell().textContent = curso.id;
    row.insertCell().textContent = curso.titulo;
    row.insertCell().textContent = curso.descripcion;
    row.insertCell().textContent = curso.fecha_inicio;
    row.insertCell().textContent = curso.fecha_fin;
    row.insertCell().textContent = curso.duracion_horas;
    row.insertCell().textContent = curso.precio;
    row.insertCell().textContent = curso.subcategoria_id;
    row.insertCell().textContent = curso.docente_id;

    //Crear celda para los botones de acción
    const actionCell = row.insertCell();

    //Crear botón de editar
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("btn");
    editButton.classList.add("btn-info");
    editButton.classList.add("btn-sm");
    editButton.onclick = () => cargarParaEdicion(curso);

    //Crear botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.classList.add("btn-sm");
    deleteButton.onclick = () =>
      eliminarCurso(
        curso.id,
        curso.titulo,
        curso.descripcion,
        curso.fecha_inicio,
        curso.fecha_fin,
        curso.duracion_horas,
        curso.precio,
        curso.subcategoria_id,
        curso.docente_id
      );

    //Agregar los botones a la celda de acción
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  });
}

async function obtenerListaSubCategorias() {
  //Llenar el select con las subcategorías disponibles
  const response = await fetch(URL_API_LISTASUBCATEGORIAS, { method: "get" });
  const listasubcategorias = await response.json();

  listasubcategorias.forEach((item) => {
    const tagOption = document.createElement("option");
    tagOption.value = item.id;
    tagOption.innerHTML = item.nombre;
    listaIdSubCate.appendChild(tagOption);
  });
}

async function obtenerListaDocentes() {
  //Llenar el select con los docentes disponibles
  const response = await fetch(URL_API_LISTADOCENTES, { method: "get" });
  const listadocentes = await response.json();

  listadocentes.forEach((item) => {
    const tagOption = document.createElement("option");
    tagOption.value = item.id;
    tagOption.innerHTML = item.nombre;
    listaIdDocente.appendChild(tagOption);
  });
}

async function eliminarCurso(id, titulo) {
  //Confirmar la eliminación
  if (confirm(`¿Está seguro de eliminar el curso ${titulo}?`)) {
    try {
      //Eliminar curso
      const response = await fetch(API_URL + `/${id}`, { method: "delete" });

      if (!response.ok) throw new Error(`Error al eliminar el curso ${titulo}`);

      //Actualizar la lista de cursos
      const result = await response.json();
      console.log(result);
      obtenerCursos();
    } catch (e) {
      console.error(e);
    }
  }
}

async function cargarParaEdicion(curso) {
  //Cargar los datos del curso en el formulario para edición
  idcurso.value = curso.id;
  titulo.value = curso.titulo;
  descripcion.value = curso.descripcion;
  fecha_inicio.value = curso.fecha_inicio.split("T")[0]; // Ajuste para formato de fecha
  fecha_fin.value = curso.fecha_fin.split("T")[0];
  duracion_horas.value = curso.duracion_horas;
  precio.value = curso.precio;
  listaIdSubCate.value = curso.subcategoria_id;
  listaIdDocente.value = curso.docente_id;

  btnGuardarCurso.innerText = "Actualizar";
}

//Manejo del envío del formulario
formulario_curso.addEventListener("submit", async (event) => {
  //Prevenir el envío por defecto
  event.preventDefault();

  //Construir el objeto de datos a enviar
  const data = {
    titulo: titulo.value,
    descripcion: descripcion.value,
    fecha_inicio: fecha_inicio.value,
    fecha_fin: fecha_fin.value,
    duracion_horas: duracion_horas.value,
    precio: parseFloat(precio.value),
    subcategoria_id: listaIdSubCate.value,
    docente_id: listaIdDocente.value,
  };

  //Enviar la petición adecuada (POST o PUT)
  try {
    let response = null;

    //Si no hay id, es creación, si hay id, es actualización
    if (idcurso.value === "") {
      response = await fetch(API_URL, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      //Si hay idcurso, es una actualización
    } else {
      //Actualizar curso existente
      response = await fetch(API_URL + `/${idcurso.value}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    //Actualizar la lista de cursos
    const result = await response.json();
    console.log(result);
    btnGuardarCurso.innerText = "Guardar";
    formulario_curso.reset();
    obtenerCursos();
  } catch (e) {
    console.error(e);
  }
});

//Cuando la página esté cargada, invocar la función de obtener cursos y listas
document.addEventListener("DOMContentLoaded", () => {
  obtenerListaSubCategorias();
  obtenerListaDocentes();
  obtenerCursos();
});
