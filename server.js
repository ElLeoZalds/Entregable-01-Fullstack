//Importar express
const express = require("express");

//Manejo de CORS
const cors = require("cors");
const path = require("path");

//Importar rutas
const categoriaRoutes = require("./routes/categoriaRoutes");
const cursoRoutes = require("./routes/cursoRoutes");
const docenteRoutes = require("./routes/docenteRoutes");
const subcategoriaRoutes = require("./routes/subcategoriaRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

//Servidor escuchando
app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  })
);

//La comunicación entre el front y el back es a través de JSON
app.use(express.json());
//
app.use(express.static(path.join(__dirname, "public")));

//RUTAS
//http://localhost:3000 + -> public > index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//Rutas para las vistas HTML
app.get("categoria", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "categoria.html"));
});

app.get("curso", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "curso.html"));
});

app.get("docente", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "docente.html"));
});

app.get("subcategoria", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "subcategoria.html"));
});

//Rutas de la API
app.use("/api/categorias", categoriaRoutes);
app.use("/api/cursos", cursoRoutes);
app.use("/api/docentes", docenteRoutes);
app.use("/api/subcategorias", subcategoriaRoutes);

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
