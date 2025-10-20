//Acceso a la base de datos
const db = require("../config/db");

//Métodos exportador (req para recibir datos, res para enviar datos)
//CREAR (CREATE)
exports.crearCurso = async (req, res) => {
  //Recibir los datos
  const {
    titulo,
    descripcion,
    fecha_inicio,
    fecha_fin,
    duracion_horas,
    precio,
    subcategoria_id,
    docente_id,
  } = req.body;

  //Validar el campo
  if (
    !titulo ||
    !descripcion ||
    !fecha_inicio ||
    !fecha_fin ||
    !duracion_horas ||
    !precio ||
    !subcategoria_id ||
    !docente_id
  ) {
    return res.status(400).json({ mensaje: "Falta completar los campos" });
  }

  //Preparar la consulta para insertar el curso en MySQL
  const sql =
    "INSERT INTO cursos (titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, subcategoria_id, docente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  //Try catch para ejecutar la consulta y manejar errores
  try {
    //Ejecutar la consulta
    const [result] = await db.query(sql, [
      titulo,
      descripcion,
      fecha_inicio,
      fecha_fin,
      duracion_horas,
      precio,
      subcategoria_id,
      docente_id,
    ]);

    //Enviar la respuesta al enviar la consulta
    res.status(201).json({
      id: result.insertId,
      mensaje: "Registrado correctamente",
    });
    //Enviar un error si no se puede conectar
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//LISTAR (READ)
exports.obtenerCurso = async (req, res) => {
  //Preparar la consulta para pedir las cursos en MySQL
  const sql =
    "SELECT id, titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, subcategoria_id, docente_id FROM cursos";

  //try catch para ejecutar la consulta y manejar errores
  try {
    //Ejecutar la consulta y deserealizar los datos
    const [cursos] = await db.query(sql);
    //Enviar el resultado y mostrar las cursos
    res.status(201).json(cursos);
  } catch (e) {
    //Enviar un error si no se puede conectar
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//LISTAR POR ID (READ)
exports.obtenerCursoPorId = async (req, res) => {
  //Obtiene el id por el URL
  //Params = http://localhost.com/api/cursos/1
  const { id } = req.params;

  //Prepara la consulta para pedir las cursos por su id en MySQL
  const sql =
    "SELECT id, titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, subcategoria_id, docente_id FROM cursos WHERE id = ?";

  //Try catch para ejecutar la consulta y manejar errores
  try {
    //Ejecutar la consulta y deserealizar los datos
    const [cursos] = await db.query(sql, [id]);

    //if para validar si existe el curso
    if (cursos.length == 0) {
      return res.status(404).json({ mensaje: "Curso no encontrada" });
    }
    //Enviar el resultado y mostrar el curso
    res.status(201).json(cursos[0]);
  } catch (e) {
    //Enviar un error si no se puede conectar
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//ACTUALIZAR (UPDATE)
exports.actualizarCurso = async (req, res) => {
  //Obtiene el id por el URL
  const { id } = req.params;
  //Recibir los datos
  const {
    titulo,
    descripcion,
    fecha_inicio,
    fecha_fin,
    duracion_horas,
    precio,
    subcategoria_id,
    docente_id,
  } = req.body;
  //Validar el campo
  if (
    !titulo &&
    !descripcion &&
    !fecha_inicio &&
    !fecha_fin &&
    !duracion_horas &&
    !precio &&
    !subcategoria_id &&
    !docente_id
  ) {
    return res.status(401).json({ mensaje: "Falta completar el campo" });
  }

  //Armar la consulta SQL dinámicamente
  let sqlParts = []; //Campos que sufrirán la actualización
  let values = []; //Valores para los campos

  if (titulo) {
    sqlParts.push("titulo = ?");
    values.push(titulo);
  }

  if (descripcion) {
    sqlParts.push("descripcion = ?");
    values.push(descripcion);
  }

  if (fecha_inicio) {
    sqlParts.push("fecha_inicio = ?");
    values.push(fecha_inicio);
  }

  if (fecha_fin) {
    sqlParts.push("fecha_fin = ?");
    values.push(fecha_fin);
  }

  if (duracion_horas) {
    sqlParts.push("duracion_horas = ?");
    values.push(duracion_horas);
  }

  if (precio) {
    sqlParts.push("precio = ?");
    values.push(precio);
  }

  if (subcategoria_id) {
    sqlParts.push("subcategoria_id = ?");
    values.push(subcategoria_id);
  }

  if (docente_id) {
    sqlParts.push("docente_id = ?");
    values.push(docente_id);
  }

  //Validar si hay campos para actualizar
  if (sqlParts.length === 0) {
    return res.status(400).json({ mensaje: "No hay campos para actualizar" });
  }

  //Construir la consulta SQL dinámicamente
  values.push(id);
  const sql = `UPDATE cursos SET ${sqlParts.join(",")} WHERE id = ?`;

  try {
    //Ejecutar la consulta
    const [result] = await db.query(sql, values);

    //Validar si se encontró el curso
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "No se encontró el curso" });
    }
    //Enviar la respuesta de actualización exitosa
    res.status(200).json({ mensaje: "Actualizado correctamente" });
  } catch (e) {
    //Enviar un error si no se puede conectar
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//ELIMINAR (DELETE)
exports.eliminarCurso = async (req, res) => {
  //Obtiene el id por el URL
  const { id } = req.params;
  //Preparar la consulta para eliminar el curso en MySQL
  const sql = "DELETE FROM cursos WHERE id = ?";

  try {
    //Ejecutar la consulta
    const [restult] = await db.query(sql, [id]);

    //Validar si se encontró el curso
    if (restult.affectedRows === 0) {
      res.status(404).json({ mensaje: "No se encontró el curso" });
    }

    res.status(200).json({ mensaje: "Eliminado correctamente" });
  } catch (e) {
    //Enviar un error si no se puede conectar
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
