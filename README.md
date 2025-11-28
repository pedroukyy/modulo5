# ✂️ Módulo 5: Frontend Acortador y Redirección

Este proyecto forma parte del parcial de Arquitectura Cloud. Consiste en una aplicación web moderna (SPA) desarrollada en React que permite acortar URLs y gestionar la redirección de los usuarios con una pantalla de espera interactiva.

## 🚀 Enlace en Vivo (Demo)
👉 **[https://d3dq2iz7mzphoj.cloudfront.net](https://d3dq2iz7mzphoj.cloudfront.net)**

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React.js + Vite
* **Routing:** React Router DOM (Manejo de rutas dinámicas)
* **Infraestructura (IaC):** Terraform
* **Nube AWS:**
    * **S3:** Alojamiento de sitio estático.
    * **CloudFront:** CDN para distribución global y HTTPS.
* **CI/CD:** GitHub Actions (Despliegue automático al hacer push a main).

## ✨ Funcionalidades

1.  **Generador de Links:** Formulario para ingresar una URL larga y recibir un código corto (Simulación de integración con Backend).
2.  **Pantalla de Redirección:** Al acceder a `/short/{codigo}`, el sistema:
    * Valida el código.
    * Muestra un contador regresivo de 5 segundos.
    * Redirige automáticamente al destino.
3.  **Manejo de Errores:** Pantalla 404 personalizada si el código no existe.

## 🏗️ Arquitectura y Despliegue

La infraestructura se despliega 100% como código usando Terraform.

### Estructura del Proyecto
* `/frontend`: Código fuente React.
* `/terraform`: Scripts `main.tf` para aprovisionar S3 y CloudFront.
* `/.github/workflows`: Pipeline de CI/CD.

### Cómo correr localmente
```bash
cd frontend
npm install
npm run dev