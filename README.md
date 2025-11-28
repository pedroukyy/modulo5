# ✂️ Módulo 5: Frontend Acortador y Redirección

**Desarrollado por:** Pedro Herrera  
**Curso:** Arquitectura Cloud  
**Estado:** 🚀 Desplegado y Operativo

---

## 📖 Descripción

Este proyecto es el **Cliente Principal** del sistema de arquitectura cloud. Es una aplicación web moderna (SPA) desarrollada en React que actúa como el punto de entrada para los usuarios.

Tiene dos funciones críticas:
1.  **Interfaz de Creación:** Permite a los usuarios generar links cortos conectados al Backend.
2.  **Motor de Redirección:** Gestiona el tráfico entrante, cuenta las visitas y redirige al destino final.

## 🚀 Enlace en Vivo (Demo)
👉 **[https://d3dq2iz7mzphoj.cloudfront.net](https://d3dq2iz7mzphoj.cloudfront.net)**

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React.js + Vite
* **Routing:** React Router DOM (Manejo de rutas dinámicas y vistas).
* **HTTP Client:** Axios (Conexión con APIs REST).
* **Infraestructura (IaC):** Terraform.
* **Nube AWS:**
    * **S3:** Alojamiento de sitio estático de alto rendimiento.
    * **CloudFront:** CDN para distribución global, caché y HTTPS.
* **CI/CD:** GitHub Actions (Despliegue automático a producción).

---

## ✨ Funcionalidades Implementadas

1.  **Generador de Links (Integración Real):**
    * Conectado al **Módulo 1 (Backend API)**.
    * Envía la URL larga y recibe un código único (`short_id`) generado por AWS Lambda.
    * Genera automáticamente el enlace al **Dashboard de Estadísticas**.

2.  **Sistema de Redirección Inteligente:**
    * Ruta dinámica: `/short/{codigo}`.
    * Conectado al **Módulo 3 (Backend Lectura)**.
    * **Contador de Visitas:** Al cargar la redirección, el sistema suma automáticamente una visita (+1) en la base de datos DynamoDB.
    * Pantalla de espera interactiva con cuenta regresiva (5 segundos).
    * Redirección automática al finalizar el tiempo.

3.  **Navegación Cruzada:**
    * Botón directo para "Ver Estadísticas" que lleva al usuario al **Módulo 4**.

4.  **Manejo de Errores:**
    * Detección de errores de red (CORS).
    * Pantalla 404 si el código no existe en la base de datos.

---

## 🏗️ Arquitectura y Despliegue

La infraestructura se despliega 100% como código (IaC) usando Terraform, garantizando un entorno reproducible.

### Estructura del Proyecto
* `/frontend`: Código fuente React (Componentes `Home.jsx`, `Redirect.jsx`).
* `/terraform`: Scripts `main.tf` para aprovisionar bucket S3 y distribución CloudFront.
* `/.github/workflows`: Pipeline de CI/CD para automatizar el build y deploy.

### 💻 Cómo correr localmente

```bash
cd frontend
npm install
npm run dev
© 2025 Pedro Herrera - Parcial de Arquitectura Cloud