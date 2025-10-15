//Routes = Rutas = Acceso a los recursos (endpoints)

//Importar express y el router
const express = require("express");
const router = express.Router();

//Importar el controlador
const categoriaController = require("../controllers/categoriaController");

//Definir las rutas
router.post("/", categoriaController.crearCategoria);
router.get("/", categoriaController.obtenerCategoria);
router.get("/:id", categoriaController.obtenerCategoriaPorId);
router.put("/:id", categoriaController.actualizarCategoria);
router.delete("/:id", categoriaController.eliminarCategoria);

module.exports = router;
