<p align="center">
  <img src="apps/frontend/src/assets/ERCO.png" alt="Header ERCO GROUP" />
</p>

# Prueba Técnica Fullstack - ERCO GROUP

## Descripción
Sistema de compraventa de energía en tiempo real que permite a múltiples usuarios publicar, visualizar y comprar ofertas garantizando integridad y concurrencia.

---

## Instalación

1. Clonar el repositorio  
```bash
git clone https://github.com/OneTwoDan/erco-energy-market.git
cd erco-energy-market
```

2. Instalar dependencias backend  
```bash
cd backend
npm install
```

3. Instalar dependencias frontend  
```bash
cd ../frontend
npm install
```

---

## Configuración

Crear un archivo `.env` en la carpeta `backend` con las variables necesarias:

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
PORT=3001
JWT_SECRET=your_jwt_secret
```

---

## Ejecución

### Backend
Desde la carpeta `backend`:

```bash
npm run dev
```

### Frontend
Desde la carpeta `frontend`:

```bash
npm run dev
```

---

## Uso

- Registrarse o iniciar sesión  
- Usuarios pueden crear ofertas con cantidad, precio y ventana de tiempo  
- Usuarios ven ofertas activas en tiempo real y pueden comprar solo una oferta válida  
- Historial de transacciones disponible para cada usuario  

---

## Tecnologías

- Frontend: React, Vite, TailwindCSS, shadcn/ui
- Backend: Node.js, Express, Sequelize
- Base de datos: PostgreSQL 
- Autenticación: JWT  

---

## Notas adicionales

- El sistema controla la concurrencia para evitar que una oferta sea comprada por más de un usuario  
- Las ofertas expiran automáticamente según la ventana definida  
- Las actualizaciones de ofertas y compras se reflejan en tiempo real para todos los usuarios  

---
