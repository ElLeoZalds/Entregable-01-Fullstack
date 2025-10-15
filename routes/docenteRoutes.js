//Routes = Rutas = Acceso a los recursos (endpoints)

//Importar express y el router
const express = require("express");
const router = express.Router();

//Importar el controlador
const docenteController = require("../controllers/docenteController");

//Definir las rutas
router.post("/", docenteController.crearDocente);
router.get("/", docenteController.obtenerDocente);
router.get("/:id", docenteController.obtenerDocentePorId);
router.put("/:id", docenteController.actualizarDocente);
router.delete("/:id", docenteController.eliminarDocente);

module.exports = router;
