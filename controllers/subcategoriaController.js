//Acceso a la base de datos
const db = require("../config/db");

//Métodos exportador (req para recibir datos, res para enviar datos)
//CREAR (CREATE)
exports.crearSubcategoria = async (req, res) => {
  //Recibir los datos
  const { nombre, categoria_id } = req.body;

  //Validar los campos
  if ((!nombre, !categoria_id)) {
    return res.status(400).json({ mensaje: "Falta completar los campo" });
  }

  //Preparar la consulta para insertar la categoria en MySQL
  const sql = "INSERT INTO subcagorias (nombre, categoria_id) VALUES (?, ?)";

  //Try catch para ejecutar la consulta y manejar errores
  try {
    //Ejecutar la consulta
    const [result] = await db.query(sql, [nombre, categoria_id]);

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
exports.obtenerSubcategoria = async (req, res) => {
  //Preparar la consulta para pedir las subcategorias en MySQL
  const sql = "SELECT id, nombre, categoria_id FROM subcategorias";

  //try catch para ejecutar la consulta y manejar errores
  try {
    //Ejecutar la consulta y deserealizar los datos
    const [subcategorias] = await db.query(sql);
    //Enviar el resultado y mostrar las subcategorias
    res.status(201).json(subcategorias);
  } catch (e) {
    //Enviar un error si no se puede conectar
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//LISTAR POR ID (READ)
exports.obtenerSubcategoriaPorId = async (req, res) => {
  //Obtiene el id por el URL
  //Params = http://localhost.com/api/subcategorias/1
  const { id } = req.params;

  //Prepara la consulta para pedir las subcategorias por su id en MySQL
  const sql = "SELECT id, nombre, categoria_id FROM subcategorias WHERE id = ?";

  //Try catch para ejecutar la consulta y manejar errores
  try {
    //Ejecutar la consulta y deserealizar los datos
    const [subcategorias] = await db.query(sql, [id]);

    //if para validar si existe la categoria
    if (subcategorias.lenght == 0) {
      return res.status(404).json({ mensaje: "Subcategoria no encontrada" });
    }
    //Enviar el resultado y mostrar la categoria
    res.status(201).json(subcategorias[0]);
  } catch (e) {
    //Enviar un error si no se puede conectar
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//ACTUALIZAR (UPDATE)
exports.actualizarSubcategoria = async (req, res) => {
  //Obtiene el id por el URL
  const { id } = req.params;
  //Recibir los datos
  const { nombre, categoria_id } = req.body;
  //Validar los campos
  if ((!nombre, !categoria_id)) {
    return res.status(401).json({ mensaje: "Falta completar el campo" });
  }

  //Algoritmo eficiente de actualización
  let sqlParts = []; //Campos que sufrirán la actualización
  let values = []; //Valores para los campos

  if (nombre) {
    sqlParts.push("nombre = ?");
    values.push(nombre);
  }

  if (categoria_id) {
    sqlParts.push("categoria_id = ?");
    values.push(categoria_id);
  }

  //Validar si hay campos para actualizar
  if (sqlParts.length === 0) {
    return res.status(400).json({ mensaje: "No hay campos para actualizar" });
  }

  //Construir la consulta SQL dinámicamente
  const sql = `UPDATE subcategorias SET ${sqlParts.join(",")} WHERE id = ?`;

  try {
    //Ejecutar la consulta
    const [result] = await db.query(sql, values);

    //Validar si se encontró la subcategoría
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "No se encontró la categoría" });
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
exports.eliminarSubcategoria = async (req, res) => {
  //Obtiene el id por el URL
  const { id } = req.params;
  //Preparar la consulta para eliminar la subcategoria en MySQL
  const sql = "DELETE FROM subcategorias WHERE id = ?";

  try {
    //Ejecutar la consulta
    const [restult] = await db.query(sql, [id]);

    //Validar si se encontró la subcategoría
    if (restult.affectedRows === 0) {
      return res.status(404).json({ mensaje: "No se encontró la categoría" });
    }
  } catch (e) {
    //Enviar un error si no se puede conectar
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
