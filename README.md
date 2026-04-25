# Carpeta Mágica 📁✨

Este proyecto es una aplicación web y de backend diseñada como un sistema de **Almacenamiento y Procesamiento de Archivos Automatizado**. Incluye dos grandes componentes:

1. **Backend (NestJS)**: Encargado de la base de datos, la gestión de usuarios, el manejo de webhooks (para servicios en la nube como Dropbox) y los trabajos de procesamiento asíncrono (conversiones a WebP, extracción OCR, marcas de agua, etc).
2. **Frontend (Vue 3 + Vite)**: Aplicación de cliente desarrollada en Typescript que proporciona una interfaz moderna y rápida.

---

## 🛠️ Herramientas Necesarias para Instalación

Para ejecutar este proyecto de forma local, necesitas tener instalado lo siguiente en tu máquina:

1. **Node.js** (Versión 18 o superior)
   - [Descargar Node.js](https://nodejs.org/es/download/)
   - Esto incluye `npm`, el gestor de paquetes que usaremos.

2. **PostgreSQL** (Versión 14 o superior)
   - [Descargar PostgreSQL](https://www.postgresql.org/download/)
   - Utilizaremos esta base de datos relacional para todo el almacenamiento del sistema (Usuarios, Webhooks, Carpetas, Estado de tareas, etc).

3. (Recomendado) **DBeaver, pgAdmin o TablePlus**
   - Para visualizar el contenido de las tablas creadas o revisar que la conexión sea correcta.

---

## 🚀 Despliegue del Entorno Local

Descarga o clona el repositorio y sigue los pasos por cada componente.

### 1. Base de Datos
1. Inicia sesión en tu PostgreSQL (puede ser en tu terminal con `psql` o a través de pgAdmin).
2. Crea una base de datos vacía llamada `carpeta_magica`:
   ```sql
   CREATE DATABASE carpeta_magica;
   ```
*(Asegúrate de que tus credenciales de Postgres coincidan con las del `.env` que configuraremos abajo).*

### 2. Configuración del Backend (NestJS + TypeORM)

La API cuenta con todo lo necesario para interactuar con la Base de Datos mediante el ORM (TypeORM).

1. Ingresa a la carpeta del backend y ejecuta la instalación:
   ```bash
   cd backend
   npm install
   ```

2. Valida o ajusta tus variables de entorno en el archivo **`backend/.env`**.
   Puedes partir desde el archivo **`.env.example`** y copiarlo como `.env`:
   ```bash
   # desde la raiz del proyecto
   copy .env.example backend\.env
   ```
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=contrasena # Cambia esto por tu contraseña real
   DB_DATABASE=carpeta_magica
   ```

3. **Migraciones:** Ejecuta el comando de TypeORM para generar las primeras tablas e inicializar la estructura según el código.
   *(Nota: Asegúrate de que las migraciones se generen primero tomando como base el código en TypeScript).*
   ```bash
   # 1. Generar la migración principal (Leer entidades a un archivo .ts)
   npm run migration:generate --name=InitialSchema

   # 2. Impactar la base de datos (Aplicar migración a Postgres)
   npm run migration:run
   ```

4. **Datos Semilla (Seeding):** Crea la configuración básica inicial que incluye:
   - Un Administrador de Prueba (`admin@carpetamagica.com`).
   - Dos carpetas tipo (1 `Entrada Mágica`, 1 `Salida Procesada`).
   - Configuración dummy de cuenta cloud (Ej. Dropbox).
   
   Ejecuta:
   ```bash
   npm run seed
   ```

5. **Iniciar el backend:**
   ```bash
   npm run start:dev
   ```
   *Tu servidor de NestJS estará corriendo en el entorno local listo para empezar.*

---

### 3. Configuración del Frontend (Vue 3 + Vite)

El frontend contiene la interfaz de usuario con Typecript. Podrás ver los resultados de forma rápida y optimizada.

1. Abre **otra o nueva terminal** (asegúrate de empezar en la raíz).
2. Ingresa e instala las dependencias:
   ```bash
   cd frontend
   npm install
   ```
3. Ejecuta el entorno de desarrollo:
   ```bash
   npm run dev
   ```
4. Ingresa a la url indicada en tu consola (usualmente `http://localhost:5173/`).




### Usuario de prueba
Credenciales del usuario seed:

- Email: admin@carpetamagica.com
- Contrasena: MomichisVault123!