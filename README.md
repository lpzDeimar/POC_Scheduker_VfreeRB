# POC React Big Scheduler

Este proyecto es una prueba de concepto (POC) que implementa un calendario interactivo utilizando la biblioteca `react-big-schedule`. El objetivo es demostrar las capacidades de programación y gestión de eventos en tiempo real.

**Autor:** Deimar Lopez

## 🚀 Características

- 📅 Visualización de eventos en diferentes vistas (día, semana, mes)
- 🎨 Interfaz de usuario moderna y responsiva
- ✨ Creación de eventos mediante modal interactivo
- 🎯 Drag & drop para mover eventos
- 📏 Redimensionamiento de eventos
- 🎨 Colores aleatorios para cada evento
- 🌐 Soporte para múltiples recursos (usuarios)
- 📱 Diseño adaptable a diferentes tamaños de pantalla

## 🛠️ Tecnologías Utilizadas

- React
- react-big-schedule
- Material-UI
- dayjs
- react-dnd (Drag and Drop)

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 💻 Uso

### Crear un Evento
1. Haz clic en cualquier espacio vacío del calendario
2. Se abrirá un modal donde podrás ingresar:
   - Nombre del evento
   - Descripción (opcional)
3. Haz clic en "Create" para guardar el evento

### Gestionar Eventos
- **Mover**: Arrastra y suelta el evento a la nueva ubicación
- **Redimensionar**: Arrastra los bordes del evento para ajustar su duración
- **Ver detalles**: Haz clic en un evento para ver su información
- **Editar**: Utiliza el botón "Edit" en el menú contextual del evento

## 🔧 Configuración

El proyecto incluye las siguientes configuraciones por defecto:

- Vista inicial: Semanal
- Recursos predefinidos (usuarios)
- Eventos de ejemplo
- Localización en inglés
- Colores aleatorios para nuevos eventos

## 📝 Notas de Desarrollo

- Este es un POC y no está destinado para producción
- La persistencia de datos no está implementada
- Los eventos se mantienen en memoria durante la sesión

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 🙏 Agradecimientos

- [react-big-schedule](https://github.com/StephenChou1017/react-big-scheduler)
- [Material-UI](https://mui.com/)
- [React DnD](https://react-dnd.github.io/react-dnd/about)

## Web Site
- [view](https://schedulerpoc.netlify.app/)

## 📞 Contacto

Para cualquier pregunta o sugerencia, por favor abre un issue en el repositorio.

**Autor:** Deimar Lopez
