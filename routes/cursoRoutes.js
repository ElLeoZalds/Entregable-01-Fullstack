//Routes = Rutas = Acceso a los recursos (endpoints)

//Importar express y el router
const express = require("express");
const router = express.Router();

//Importar el controlador
const cursoController = require("../controllers/cursoController");

//Definir las rutas
router.post("/", cursoController.crearCurso);
router.get("/", cursoController.obtenerCurso);
router.get("/:id", cursoController.obtenerCursoPorId);
router.put("/:id", cursoController.actualizarCurso);
router.delete("/:id", cursoController.eliminarCurso);

module.exports = router;
