//Acceso a la base de datos
const db = require("../config/db");

//Métodos exportador (req para recibir datos, res para enviar datos)
//CREAR (CREATE)
exports.crearCategoria = async (req, res) => {
  //Recibir los datos
  const { nombre } = req.body;

  //Validar el campo
  if (!nombre) {
    return res.status(400).json({ mensaje: "Falta completar el campo" });
  }

  //Preparar la consulta para insertar la categoria en MySQL
  const sql = "INSERT INTO categorias (nombre) VALUES (?)";

  //Try catch para ejecutar la consulta y manejar errores
  try {
    //Ejecutar la consulta
    const [result] = await db.query(sql, [nombre]);

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
exports.obtenerCategoria = async (req, res) => {
  //Preparar la consulta para pedir las categorias en MySQL
  const sql = "SELECT id, nombre FROM categorias";

  //try catch para ejecutar la consulta y manejar errores
  try {
    //Ejecutar la consulta y deserealizar los datos
    const [categorias] = await db.query(sql);
    //Enviar el resultado y mostrar las categorias
    res.status(200).json(categorias);
  } catch (e) {
    //Enviar un error si no se puede conectar
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//LISTAR POR ID (READ)
exports.obtenerCategoriaPorId = async (req, res) => {
  //Obtiene el id por el URL
  //Params = http://localhost.com/api/categorias/1
  const { id } = req.params;

  //Prepara la consulta para pedir las categorias por su id en MySQL
  const sql = "SELECT id, nombre FROM categorias WHERE id = ?";

  //Try catch para ejecutar la consulta y manejar errores
  try {
    //Ejecutar la consulta y deserealizar los datos
    const [categorias] = await db.query(sql, [id]);

    //if para validar si existe la categoria
    if (categorias.length === 0) {
      return res.status(404).json({ mensaje: "Categoria no encontrada" });
    }
    //Enviar el resultado y mostrar la categoria
    res.status(200).json(categorias[0]);
  } catch (e) {
    //Enviar un error si no se puede conectar
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//ACTUALIZAR (UPDATE)
exports.actualizarCategoria = async (req, res) => {
  //Obtiene el id por el URL
  const { id } = req.params;
  //Recibir los datos
  const { nombre } = req.body;
  //Validar el campo
  if (!nombre) {
    return res.status(401).json({ mensaje: "Falta completar el campo" });
  }

  //Armar la consulta SQL dinámicamente
  let sqlParts = []; //Campos que sufrirán la actualización
  let values = []; //Valores para los campos

  if (nombre) {
    sqlParts.push("nombre = ?");
    values.push(nombre);
  }

  //Validar si hay campos para actualizar
  if (sqlParts.length === 0) {
    return res.status(400).json({ mensaje: "No hay campos para actualizar" });
  }

  //Construir la consulta SQL dinámicamente
  values.push(id);
  const sql = `UPDATE categorias SET ${sqlParts.join(", ")} WHERE id = ?`;

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
exports.eliminarCategoria = async (req, res) => {
  //Obtiene el id por el URL
  const { id } = req.params;
  //Preparar la consulta para eliminar la subcategoria en MySQL
  const sql = "DELETE FROM categorias WHERE id = ?";

  try {
    //Ejecutar la consulta
    const [result] = await db.query(sql, [id]);

    //Validar si se encontró la subcategoría
    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: "No se encontró la categoría" });
    }

    res.status(200).json({ mensaje: "Eliminado correctamente" });
  } catch (e) {
    //Enviar un error si no se puede conectar
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
