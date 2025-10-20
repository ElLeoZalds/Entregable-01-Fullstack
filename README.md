# ENTREGABLE - FULLSTACK DEVELOPER SOFTWARE

# Procedimientos

## 🚀 1. Clonar el repositorio de GitHub en la terminal:

```bash
git clone https://github.com/ElLeoZalds/Entregable-01-Fullstack.git
```

## 💾 2. Restaurar la Base de Datos:

```sql
CREATE TABLE categorias (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
)ENGINE = INNODB;

CREATE TABLE subcategorias (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	categoria_id INT,
	FOREIGN KEY (categoria_id) REFERENCES categorias(id)  ON DELETE CASCADE
)ENGINE = INNODB;

CREATE TABLE docentes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	telefono VARCHAR(20) NOT NULL
)ENGINE = INNODB;

CREATE TABLE cursos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	titulo VARCHAR(150) NOT NULL,
	descripcion TEXT NOT NULL,
	fecha_inicio DATE NOT NULL,
	fecha_fin DATE NOT NULL,
	duracion_horas INT NOT NULL,
	precio DECIMAL(10,2) NOT NULL,
	subcategoria_id INT NOT NULL,
	docente_id INT NOT NULL,
	FOREIGN KEY (subcategoria_id) REFERENCES subcategorias(id)  ON DELETE CASCADE,
	FOREIGN KEY (docente_id) REFERENCES docentes(id)  ON DELETE CASCADE
)ENGINE = INNODB;
```

## 🔧 3. Abrir el proyecto en Visual Studio Code usando por ejemplo el comando:

```
code .
```

## ⬇️ 4. Instalar ejecutar la instalación y recuperar todas las dependencias

### Usar **ctrl + ñ** para abrir la terminal de VSC y escribir

```bash
npm install
```

## ⚙️ 5. Configurar el archivo **.env**

```js
DB_HOST = localhost;
DB_USER = tu_usuario;
DB_PASSWORD = tu_contraseña;
DB_NAME = cursosDB;
PORT = 3306;
```

## 💻 6. Instalar e iniciar el servidor con _nodemon_

```
npm install -g nodemon
nodemon server
```

## 📬 7. Probar la API

Puedes utilizar Postman, ThunderClient u otro cliente REST para probar los siguientes endpoints:

| Método | Ruta   | Qué hace                           |
| ------ | ------ | ---------------------------------- |
| GET    | `/`    | Trae todos los registros           |
| GET    | `/:id` | Trae un registro específico por ID |
| POST   | `/`    | Crea un registro nuevo             |
| PUT    | `/:id` | Actualiza un registro existente    |
| DELETE | `/:id` | Borra un registro por su ID        |

## 🧑‍💻 Autor

```
https://github.com/ElLeoZalds
```
