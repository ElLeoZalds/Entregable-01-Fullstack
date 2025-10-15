//Routes = Rutas = Acceso a los recursos (endpoints)

//Importar express y el router
const express = require("express");
const router = express.Router();

//Importar el controlador
const subcategoriaController = require("../controllers/subcategoriaController");

//Definir las rutas
router.post("/", subcategoriaController.crearSubcategoria);
router.get("/", subcategoriaController.obtenerSubcategoria);
router.get("/:id", subcategoriaController.obtenerSubcategoriaPorId);
router.put("/:id", subcategoriaController.actualizarSubcategoria);
router.delete("/:id", subcategoriaController.eliminarSubcategoria);

module.exports = router;
