/* ===== SHARED SELECTED-WORK DATA + LOGIC ===== */
/* Used by selected-work.html (standalone page) and index.html (inline overlay). */
(function () {
  const projects = {
    "diy-cheap-camera": {
      description: [
        "Camara digital experimental hecha con una Seeed Studio XIAO ESP32S3 Sense, una pantalla redonda GC9A01, botones fisicos y un receptor en Python. El sistema muestra una vista en vivo pixelada, permite cambiar paletas cromaticas y envia capturas por USB/Serial al computador para guardarlas como imagenes escaladas."
      ],
      source: "https://github.com/matbutom/cheap-diy-camera",
      sourceLabel: "código fuente",
      media: [
        { type: "image", src: "assets/diy-cheap-camera/DSC_8149.jpg", alt: "DIY Cheap Camera", w: 1539, h: 2048 },
        { type: "image", src: "assets/diy-cheap-camera/DSC_8152.jpg", alt: "DIY Cheap Camera", w: 1447, h: 2048 },
        { type: "image", src: "assets/diy-cheap-camera/foto_esp32_20260529_120309.jpg", alt: "DIY Cheap Camera capture", w: 240, h: 240 },
        { type: "image", src: "assets/diy-cheap-camera/foto_esp32_20260529_121009_HD.jpg", alt: "DIY Cheap Camera capture", w: 1920, h: 1920 },
        { type: "image", src: "assets/diy-cheap-camera/foto_esp32_20260529_122152_HD.png", alt: "DIY Cheap Camera capture", w: 1920, h: 1920 },
        { type: "image", src: "assets/diy-cheap-camera/foto_esp32_20260529_124516_HD.png", alt: "DIY Cheap Camera capture", w: 1920, h: 1920 },
        { type: "image", src: "assets/diy-cheap-camera/foto_esp32_20260529_124531_HD.png", alt: "DIY Cheap Camera capture", w: 1920, h: 1920 },
        { type: "image", src: "assets/diy-cheap-camera/foto_esp32_20260529_124544_HD.png", alt: "DIY Cheap Camera capture", w: 1920, h: 1920 },
        { type: "image", src: "assets/diy-cheap-camera/foto_esp32_20260529_124554_HD.png", alt: "DIY Cheap Camera capture", w: 1920, h: 1920 },
        { type: "image", src: "assets/diy-cheap-camera/foto_esp32_20260529_124608_HD.png", alt: "DIY Cheap Camera capture", w: 1920, h: 1920 }
      ]
    },
    parla: {
      description: [
        "Parla es un parlante de escritorio con amplificador mono construido alrededor del circuito integrado LM386. Un proyecto de electrónica que explora el diseño de objetos sonoros análogos, desde el esquema del circuito hasta el enclosure físico."
      ],
      source: "projects/parla.html",
      sourceLabel: "página del proyecto",
      media: [
        { type: "image", src: "assets/parla/DSC_6417.jpg", alt: "Parla", w: 1704, h: 2274 },
        { type: "image", src: "assets/parla/DSC_6395.jpg", alt: "Parla", w: 2592, h: 3872 },
        { type: "image", src: "assets/parla/DSC_6407.jpg", alt: "Parla", w: 2592, h: 3872 },
        { type: "image", src: "assets/parla/DSC_6433.jpg", alt: "Parla", w: 1531, h: 2144 }
      ]
    },
    "go-skate-day": {
      description: [
        "GoSkateDay es una celebración internacional del skateboarding. En esta edición en Santiago, Chile, fuimos responsables de la identidad visual y las ilustraciones del evento, desarrollando afiches, stickers y gráficos para camisetas. El trabajo combinó estética urbana y elementos propios de la cultura skate."
      ],
      source: "projects/GoSkateDay.html",
      sourceLabel: "página del proyecto",
      media: [
        { type: "image", src: "assets/GoSkateDay/thumb/gsd thumb design.png", alt: "Go Skate Day", w: 1080, h: 1080 },
        { type: "image", src: "assets/GoSkateDay/thumb/GSD_IG-02.jpg", alt: "Go Skate Day", w: 1080, h: 1350 },
        { type: "image", src: "assets/GoSkateDay/assets/GSD_IG-03.jpg", alt: "Go Skate Day", w: 1080, h: 1350 },
        { type: "image", src: "assets/GoSkateDay/assets/GSD_IG-04.jpg", alt: "Go Skate Day", w: 1080, h: 1350 },
        { type: "image", src: "assets/GoSkateDay/assets/GSD_IG-05.jpg", alt: "Go Skate Day", w: 1080, h: 1350 },
        { type: "image", src: "assets/GoSkateDay/assets/GSD_IG-06.jpg", alt: "Go Skate Day", w: 1080, h: 1350 },
        { type: "image", src: "assets/GoSkateDay/assets/GSD_IG_Mesa de trabajo 1.jpg", alt: "Go Skate Day", w: 1080, h: 1350 }
      ]
    },
    "radio-regalon": {
      description: [
        "Radio Regalón es un proyecto de Aarón Montoya-Moraga desde Santiago de Chile para el mundo. Brand design by Mateo Arce :)",
        "Este proyecto y diseño de marcas fue hecho completamente con código. La diagramación y diseño fueron programados en p5.js. Además, se desarrollaron visuales pensadas para conciertos y pantallas interactivas con sonido."
      ],
      source: "https://github.com/matbutom/radioregalon.github.io",
      sourceLabel: "código fuente",
      media: [
        { type: "image", src: "assets/radio-regalon/logo_animado.gif", alt: "Radio Regalon", w: 1080, h: 1080 },
        { type: "image", src: "assets/radio-regalon/radio regalón tee.png", alt: "Radio Regalon", w: 1024, h: 1440 },
        { type: "image", src: "assets/radio-regalon/LOGO DEMOS/Captura de pantalla 2025-06-01 a la(s) 18.22.58.png", alt: "Radio Regalon", w: 1920, h: 913 },
        { type: "video", src: "assets/radio-regalon/LOGO DEMOS/grabacion01.mp4", alt: "Radio Regalon", w: 1920, h: 932 },
        { type: "video", src: "assets/radio-regalon/LOGO DEMOS/grabacion02.mp4", alt: "Radio Regalon", w: 1920, h: 932 },
        { type: "image", src: "assets/radio-regalon/LOGO DEMOS/radio_regalon_demo-02.jpg", alt: "Radio Regalon", w: 1080, h: 1080 },
        { type: "image", src: "assets/radio-regalon/LOGO DEMOS/radio_regalon_demo-03.jpg", alt: "Radio Regalon", w: 1080, h: 1080 },
        { type: "image", src: "assets/radio-regalon/LOGO DEMOS/radio_regalon_demo_Mesa de trabajo 1.jpg", alt: "Radio Regalon", w: 1080, h: 1080 }
      ]
    },
    "subela-news": {
      description: [
        "Fuimos preseleccionados por súbela para el rebranding de Súbela Radio. Se desarrollaron variedad de logos, entre ellos el logo principal de la radio, y distintos programas que vendrían durante el año (El Chile que Viene y Elecciones Súbela 2024)."
      ],
      source: "projects/Subela-News.html",
      sourceLabel: "página del proyecto",
      media: [
        { type: "image", src: "assets/SubelaNews/Subela_OK.001.jpeg", alt: "Subela News", w: 1024, h: 768 },
        { type: "image", src: "assets/SubelaNews/Subela_OK.002.jpeg", alt: "Subela News", w: 1024, h: 768 },
        { type: "image", src: "assets/SubelaNews/Subela_OK.003.jpeg", alt: "Subela News", w: 1024, h: 768 },
        { type: "image", src: "assets/SubelaNews/Subela_OK.004.jpeg", alt: "Subela News", w: 1024, h: 768 },
        { type: "image", src: "assets/SubelaNews/Subela_OK.005.jpeg", alt: "Subela News", w: 1024, h: 768 },
        { type: "image", src: "assets/SubelaNews/Subela_OK.006.jpeg", alt: "Subela News", w: 1024, h: 768 },
        { type: "image", src: "assets/SubelaNews/Subela_OK.007.jpeg", alt: "Subela News", w: 1024, h: 768 },
        { type: "image", src: "assets/SubelaNews/Subela_OK.008.jpeg", alt: "Subela News", w: 1024, h: 768 }
      ]
    },
    "colonia-dignidad": {
      description: [
        "Para el encargo, se escogió un hito histórico Chileno, que pudiera dar pie a diseñar una marca, infografías y baldosas de cerámica, con el objetivo de recordar este acontecimiento."
      ],
      source: "projects/Colonia-Dignidad copy.html",
      sourceLabel: "página del proyecto",
      media: [
        { type: "image", src: "assets/Colonia-Dignidad/Colonia Dignidad Marca.001.png", alt: "Colonia Dignidad", w: 586, h: 768 },
        { type: "image", src: "assets/Colonia-Dignidad/Colonia Dignidad Lamina.jpg", alt: "Colonia Dignidad", w: 8268, h: 28346 },
        { type: "image", src: "assets/Colonia-Dignidad/Arce-Salamanca-Sepulveda_Mesa de trabajo 1 copia 2.jpg", alt: "Colonia Dignidad", w: 1080, h: 1080 },
        { type: "image", src: "assets/Colonia-Dignidad/Arce-Salamanca-Sepulveda_Mesa de trabajo 1 copia 3.jpg", alt: "Colonia Dignidad", w: 1080, h: 1080 },
        { type: "image", src: "assets/Colonia-Dignidad/Arce-Salamanca-Sepulveda_Mesa de trabajo 1 copia 4.jpg", alt: "Colonia Dignidad", w: 1080, h: 1080 },
        { type: "image", src: "assets/Colonia-Dignidad/Arce-Salamanca-Sepulveda_Mesa de trabajo 1 copia 5.jpg", alt: "Colonia Dignidad", w: 1080, h: 1080 },
        { type: "image", src: "assets/Colonia-Dignidad/Arce-Salamanca-Sepulveda_Mesa de trabajo 1 copia.jpg", alt: "Colonia Dignidad", w: 1080, h: 1080 },
        { type: "image", src: "assets/Colonia-Dignidad/IMG_3526.jpg", alt: "Colonia Dignidad", w: 2268, h: 4032 },
        { type: "image", src: "assets/Colonia-Dignidad/IMG_3535.JPG", alt: "Colonia Dignidad", w: 4032, h: 3024 },
        { type: "image", src: "assets/Colonia-Dignidad/IMG_3536.JPG", alt: "Colonia Dignidad", w: 4032, h: 3024 },
        { type: "image", src: "assets/Colonia-Dignidad/IMG_3540.JPG", alt: "Colonia Dignidad", w: 4032, h: 3024 },
        { type: "image", src: "assets/Colonia-Dignidad/IMG_3541.jpg", alt: "Colonia Dignidad", w: 2268, h: 4032 }
      ]
    },
    "interactive-letters": {
      description: [
        "Exploración visual interactiva con letras y animación generativa. Proyecto experimental diseñado para postular a convocatoria de obras en Museo Interactivo Mirador. Utiliza programación creativa para manipular letras de forma interactiva y visualmente atractiva, combinando código y diseño gráfico."
      ],
      source: "https://github.com/matbutom/interactive-letters",
      sourceLabel: "código fuente",
      media: [
        { type: "video", src: "assets/interactive-letters/interactive_letters01.mp4", alt: "Interactive Letters", w: 924, h: 1280 },
        { type: "video", src: "assets/interactive-letters/interactive_letters02.mp4", alt: "Interactive Letters", w: 2842, h: 1474 },
        { type: "video", src: "assets/interactive-letters/interactive_letters03.mp4", alt: "Interactive Letters", w: 2842, h: 1474 }
      ]
    },
    "lateral-image-editor": {
      description: [
        "Proyecto realizado para criti.ca y su medio digital Lateral. Se programó una herramienta en mechanic.design para editar imágenes de forma fácil, diseñando una interfaz con filtros activables para ver los efectos en tiempo real."
      ],
      source: "https://github.com/criticaLateral/practica-mateo-2024",
      sourceLabel: "código fuente",
      media: [
        { type: "image", src: "assets/Lateral Image Editor/Logo/LIE_logo.png", alt: "Lateral Image Editor", w: 4500, h: 4500 },
        { type: "image", src: "assets/Lateral Image Editor/Imagenes con efectos/captura01.png", alt: "Lateral Image Editor", w: 1920, h: 942 },
        { type: "image", src: "assets/Lateral Image Editor/Imagenes con efectos/captura02.png", alt: "Lateral Image Editor", w: 1920, h: 928 },
        { type: "image", src: "assets/Lateral Image Editor/Imagenes con efectos/captura03.png", alt: "Lateral Image Editor", w: 1920, h: 1016 },
        { type: "image", src: "assets/Lateral Image Editor/Imagenes con efectos/blendColors-2024-09-23-18-08 (1).png", alt: "Lateral Image Editor", w: 2214, h: 1476 },
        { type: "image", src: "assets/Lateral Image Editor/Imagenes con efectos/halftonePruebas-2024-09-23-18-08 (1).png", alt: "Lateral Image Editor", w: 2214, h: 1476 },
        { type: "image", src: "assets/Lateral Image Editor/Imagenes con efectos/imagen-bitmap (1).png", alt: "Lateral Image Editor", w: 2967, h: 1978 },
        { type: "image", src: "assets/Lateral Image Editor/Imagenes con efectos/lateralImageEditor-2024-11-15-12-50 (1).png", alt: "Lateral Image Editor", w: 2967, h: 1978 },
        { type: "image", src: "assets/Lateral Image Editor/Imagenes con efectos/lateralImageEditor-2024-11-15-12-54 (1).png", alt: "Lateral Image Editor", w: 2967, h: 1978 },
        { type: "image", src: "assets/Lateral Image Editor/Imagenes con efectos/lateralImageEditor-2024-11-15-12-56 (1).png", alt: "Lateral Image Editor", w: 2967, h: 1978 }
      ]
    },
    "pcd-visualizer": {
      description: [
        "Web diseñada y programada para generar posts de Instagram a invitar a la comunidad de Processing a participar en el evento anual \"Processing Community Day\" en la FaAAD, Universidad Diego portales. El sitio permite a los usuarios personalizar el post con animaciones de fondo, videos, grillas, etc. Las animaciones de fondo son creadas con p5.js, generando una imagen que pueden compartir en sus redes sociales para promover el evento. Proyecto realizado en Github, con ayuda de Claude Code."
      ],
      source: "https://github.com/matbutom/PCD-graficas-2026",
      sourceLabel: "código fuente",
      links: [
        { href: "https://github.com/matbutom/PCD-graficas-2026", label: "código fuente" },
        { href: "https://matbutom.github.io/PCD-graficas-2026/", label: "sitio web" }
      ],
      media: [
        { type: "image", src: "assets/PCD-visualizer/banner.png", alt: "PCD Visualizer", w: 1600, h: 400 },
        { type: "video", src: "assets/PCD-visualizer/thumb.mp4", alt: "PCD Visualizer", w: 1080, h: 1350 },
        { type: "image", src: "assets/PCD-visualizer/pcd2026-01.png", alt: "PCD Visualizer", w: 3164, h: 2070 },
        { type: "image", src: "assets/PCD-visualizer/pcd2026-02.png", alt: "PCD Visualizer", w: 1080, h: 1350 },
        { type: "video", src: "assets/PCD-visualizer/pcd2026-01.mp4", alt: "PCD Visualizer", w: 1080, h: 1350 },
        { type: "video", src: "assets/PCD-visualizer/pcd2026-02.mp4", alt: "PCD Visualizer", w: 1080, h: 1350 },
        { type: "video", src: "assets/PCD-visualizer/pcd2026-03.mp4", alt: "PCD Visualizer", w: 1080, h: 1350 },
        { type: "video", src: "assets/PCD-visualizer/pcd2026-04.mp4", alt: "PCD Visualizer", w: 1080, h: 1350 },
        { type: "video", src: "assets/PCD-visualizer/pcd2026-05.mp4", alt: "PCD Visualizer", w: 1080, h: 1350 },
        { type: "video", src: "assets/PCD-visualizer/pcd2026-06.mp4", alt: "PCD Visualizer", w: 1080, h: 1350 },
        { type: "video", src: "assets/PCD-visualizer/pcd2026-07.mp4", alt: "PCD Visualizer", w: 1080, h: 1350 },
        { type: "video", src: "assets/PCD-visualizer/pcd2026-08.mp4", alt: "PCD Visualizer", w: 1080, h: 1350 },
        { type: "video", src: "assets/PCD-visualizer/pcd2026-09.mp4", alt: "PCD Visualizer", w: 1080, h: 1350 },
        { type: "video", src: "assets/PCD-visualizer/pcd2026-10.mp4", alt: "PCD Visualizer", w: 1080, h: 1350 }
      ]
    },
    "rafita-coding-projects": {
      description: [
        "Proyectos realizados para el ramo de Programación Creativa Multimedia, aprendiendo a usar p5.js y programar."
      ],
      source: "projects/rafita-coding-projects.html",
      sourceLabel: "página del proyecto",
      media: [
        { type: "image", src: "assets/rafita-coding-projects/Rafita_coding_pro_thumb.jpg", alt: "Rafita Coding Projects", w: 4500, h: 3910 },
        { type: "video", src: "assets/rafita-coding-projects/Rafita Type Creator.mp4", alt: "Rafita Coding Projects", w: 722, h: 1260 },
        { type: "video", src: "assets/rafita-coding-projects/Grabación de pantalla 2024-07-12 a la(s) 16.47.32.mp4", alt: "Rafita Coding Projects", w: 830, h: 888 },
        { type: "video", src: "assets/rafita-coding-projects/Grabación de pantalla 2024-07-12 a la(s) 16.48.41.mp4", alt: "Rafita Coding Projects", w: 734, h: 1028 }
      ]
    },
    "typografica-propagandistica": {
      description: [
        "Typográfica Propagandística investiga cómo la tipografía en afiches políticos latinoamericanos comunica ideas y emociones, apropiándonos de ella y dándole una nueva identidad generativa."
      ],
      source: "https://github.com/matbutom/typo-grafica-propagandistica",
      sourceLabel: "código fuente",
      links: [
        { href: "https://github.com/matbutom/typo-grafica-propagandistica", label: "código fuente" },
        { href: "https://matbutom.github.io/typ-web/", label: "sitio web" }
      ],
      media: [
        { type: "video", src: "assets/typografica-propagandistica/capturas.mp4", alt: "Typografica Propagandistica", w: 1080, h: 1350 },
        { type: "video", src: "assets/typografica-propagandistica/01.mp4", alt: "Typografica Propagandistica", w: 3016, h: 1874 },
        { type: "image", src: "assets/typografica-propagandistica/12.jpeg", alt: "Typografica Propagandistica", w: 1200, h: 1600 },
        { type: "image", src: "assets/typografica-propagandistica/13.jpeg", alt: "Typografica Propagandistica", w: 1200, h: 1600 },
        { type: "video", src: "assets/typografica-propagandistica/02.mp4", alt: "Typografica Propagandistica", w: 3104, h: 1962 },
        { type: "video", src: "assets/typografica-propagandistica/03.mp4", alt: "Typografica Propagandistica", w: 1920, h: 1212 },
        { type: "video", src: "assets/typografica-propagandistica/04.mp4", alt: "Typografica Propagandistica", w: 1920, h: 1212 },
        { type: "video", src: "assets/typografica-propagandistica/05.mp4", alt: "Typografica Propagandistica", w: 1538, h: 1540 },
        { type: "video", src: "assets/typografica-propagandistica/06.mp4", alt: "Typografica Propagandistica", w: 1920, h: 1212 },
        { type: "video", src: "assets/typografica-propagandistica/07.mp4", alt: "Typografica Propagandistica", w: 1920, h: 1212 },
        { type: "video", src: "assets/typografica-propagandistica/08.mp4", alt: "Typografica Propagandistica", w: 1920, h: 1128 },
        { type: "video", src: "assets/typografica-propagandistica/09.mp4", alt: "Typografica Propagandistica", w: 1080, h: 1920 },
        { type: "video", src: "assets/typografica-propagandistica/10.mp4", alt: "Typografica Propagandistica", w: 848, h: 480 },
        { type: "video", src: "assets/typografica-propagandistica/11.mp4", alt: "Typografica Propagandistica", w: 848, h: 480 },
        { type: "video", src: "assets/typografica-propagandistica/12.mp4", alt: "Typografica Propagandistica", w: 1080, h: 1920 },
        { type: "video", src: "assets/typografica-propagandistica/13.mp4", alt: "Typografica Propagandistica", w: 1080, h: 1920 },
        { type: "video", src: "assets/typografica-propagandistica/14.mp4", alt: "Typografica Propagandistica", w: 848, h: 480 },
        { type: "video", src: "assets/typografica-propagandistica/entrenamientos.mp4", alt: "Typografica Propagandistica", w: 1080, h: 1350 },
        { type: "video", src: "assets/typografica-propagandistica/recortes.mp4", alt: "Typografica Propagandistica", w: 1080, h: 1350 }
      ]
    },
    "inter-ferencia": {
      description: [
        "Instalacion interactiva hecha en Processing con webcam, vision computacional y sonido. El sistema captura el fondo, detecta la silueta de las personas como diferencia de imagen, la traduce a caracteres ASCII y dispara notas cuando el cuerpo cruza seis barras invisibles en la pantalla."
      ],
      source: "https://github.com/matbutom/inter-ferencia",
      sourceLabel: "código fuente",
      mediaColumns: 1,
      mediaWidth: "58%",
      media: [
        { type: "image", src: "assets/inter-ferencia/DSC_8134.jpg", alt: "Inter-Ferencia", w: 2048, h: 1375 },
        { type: "image", src: "assets/inter-ferencia/DSC_8137.jpg", alt: "Inter-Ferencia", w: 2048, h: 1375 },
        { type: "image", src: "assets/inter-ferencia/DSC_8157.jpg", alt: "Inter-Ferencia", w: 1375, h: 2048 },
        { type: "image", src: "assets/inter-ferencia/DSC_8158.jpg", alt: "Inter-Ferencia", w: 2048, h: 1375 },
        { type: "image", src: "assets/inter-ferencia/DSC_8166.jpg", alt: "Inter-Ferencia", w: 2048, h: 1375 },
        { type: "image", src: "assets/inter-ferencia/DSC_8169.jpg", alt: "Inter-Ferencia", w: 2048, h: 1375 },
        { type: "image", src: "assets/inter-ferencia/DSC_8170.jpg", alt: "Inter-Ferencia", w: 2048, h: 1375 },
        { type: "image", src: "assets/inter-ferencia/DSC_8173.jpg", alt: "Inter-Ferencia", w: 2048, h: 1375 },
        { type: "image", src: "assets/inter-ferencia/DSC_8247.jpg", alt: "Inter-Ferencia", w: 2048, h: 1375 },
        { type: "image", src: "assets/inter-ferencia/DSC_8248.jpg", alt: "Inter-Ferencia", w: 2048, h: 1375 },
        { type: "image", src: "assets/inter-ferencia/DSC_8250.jpg", alt: "Inter-Ferencia", w: 1375, h: 2048 }
      ]
    },
    "coloring-book": {
      description: [
        "Libro para colorear ilustrado, impreso y diseñado para los amantes de los perritos. 🐶❤️"
      ],
      source: "projects/Coloring-Book.html",
      sourceLabel: "página del proyecto",
      media: [
        { type: "image", src: "assets/Coloring-Book/ColouringBook_v1.jpg", alt: "Coloring Book", w: 1748, h: 2480 },
        { type: "image", src: "assets/Coloring-Book/ColouringBook_v12.jpg", alt: "Coloring Book", w: 3496, h: 2480 },
        { type: "image", src: "assets/Coloring-Book/ColouringBook_v13.jpg", alt: "Coloring Book", w: 3496, h: 2480 },
        { type: "image", src: "assets/Coloring-Book/ColouringBook_v14.jpg", alt: "Coloring Book", w: 3496, h: 2480 },
        { type: "image", src: "assets/Coloring-Book/ColouringBook_v15.jpg", alt: "Coloring Book", w: 3496, h: 2480 },
        { type: "image", src: "assets/Coloring-Book/ColouringBook_v16.jpg", alt: "Coloring Book", w: 3496, h: 2480 },
        { type: "image", src: "assets/Coloring-Book/ColouringBook_v17.jpg", alt: "Coloring Book", w: 1748, h: 2480 }
      ]
    },
    "animaciones-benny": {
      description: [
        "Hicimos 4 animaciones distintas para una canción de un artista emergente, en este caso, bennytheghost. Los estilos de animación fueron: animación digital, rotoscopía, animación audiovisual y stop motion"
      ],
      source: "projects/animaciones-benny.html",
      sourceLabel: "página del proyecto",
      media: [
        { type: "video", src: "assets/animaciones-benny/arce_salamanca_animacion_digital.mp4", alt: "Animaciones Benny", w: 1920, h: 1080 },
        { type: "video", src: "assets/animaciones-benny/arce_salamanca_rotoscopia.mp4", alt: "Animaciones Benny", w: 1920, h: 1080 }
      ]
    },
    "biblioteca-cuir": {
      description: ["Texto placeholder para Biblioteca Cuir."],
      mediaColumns: 1,
      mediaWidth: "100%",
      media: []
    },
    "otra-ciudad": {
      description: ["Texto placeholder para Otra Ciudad."],
      mediaColumns: 1,
      mediaWidth: "100%",
      media: []
    },
    "rafita-studio": {
      description: ["Texto placeholder para Rafita Studio."],
      mediaColumns: 1,
      mediaWidth: "100%",
      media: []
    }
  };

  function shuffleMedia(items) {
    return items
      .map(function (item) {
        return { item: item, order: Math.random() };
      })
      .sort(function (a, b) {
        return a.order - b.order;
      })
      .map(function (entry) {
        return entry.item;
      });
  }

  function initWorkPanel(root, opts) {
    opts = opts || {};
    root = root || document;

    const detail = root.querySelector(".work-detail");
    const grid = root.querySelector(".work-media-grid");
    const title = root.querySelector(".work-project-title");
    const description = root.querySelector(".work-project-description");
    const source = root.querySelector(".work-project-source");
    const projectLinks = root.querySelectorAll("[data-project]");

    if (!detail || !grid || !description || !source) {
      return null;
    }

    function createMedia(item) {
      const element = document.createElement(item.type === "video" ? "video" : "img");
      element.className = "work-media-grid-item";
      element.src = item.src;
      element.alt = item.alt || "";
      if (item.w && item.h) {
        element.style.aspectRatio = item.w + " / " + item.h;
      }
      if (item.type === "video") {
        element.autoplay = true;
        element.loop = true;
        element.muted = true;
        element.playsInline = true;
      }
      return element;
    }

    function isAllHorizontal(media) {
      return media.every(function (item) {
        return item.w && item.h && item.w >= item.h;
      });
    }

    function openProject(key) {
      const project = projects[key];
      if (!project) return false;

      detail.classList.remove("is-switching");

      const activeLink = root.querySelector('[data-project="' + key + '"]');
      if (title) {
        title.textContent = activeLink ? activeLink.textContent.trim() : key;
      }

      const columns = project.mediaColumns || (isAllHorizontal(project.media) ? 1 : 2);
      grid.classList.toggle("is-single", columns === 1);
      grid.style.maxWidth = project.mediaWidth || "";
      grid.replaceChildren(...shuffleMedia(project.media).map(createMedia));
      description.replaceChildren(
        ...project.description.map(function (text) {
          const paragraph = document.createElement("p");
          paragraph.textContent = text;
          return paragraph;
        })
      );
      const links =
        project.links ||
        (/^https?:\/\//.test(project.source || "")
          ? [{ href: project.source, label: project.sourceLabel || "código fuente" }]
          : []);

      source.replaceChildren(
        ...links.map(function (link, linkIndex) {
          const anchor = document.createElement("a");
          const arrow = document.createElement("span");
          const label = document.createElement("span");

          arrow.className = "work-item-arrow work-source-arrow";
          arrow.setAttribute("aria-hidden", "true");
          label.textContent = link.label;

          anchor.className = "work-source-link";
          anchor.href = link.href;
          anchor.target = "_blank";
          anchor.rel = "noopener noreferrer";
          anchor.append(arrow, label);

          if (linkIndex === 0) return anchor;

          const separator = document.createElement("span");
          separator.textContent = " · ";
          const fragment = document.createDocumentFragment();
          fragment.append(separator, anchor);
          return fragment;
        })
      );
      source.hidden = links.length === 0;
      detail.hidden = false;
      detail.scrollTop = 0;
      document.body.classList.add("has-active-work");
      detail.offsetHeight;
      detail.classList.add("is-switching");

      projectLinks.forEach(function (link) {
        link.classList.toggle("is-active", link.dataset.project === key);
      });

      if (activeLink) {
        const folder = activeLink.closest("details");
        if (folder) folder.open = true;
      }

      if (typeof opts.onOpen === "function") opts.onOpen(key);
      return true;
    }

    projectLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        openProject(link.dataset.project);
      });
    });

    return { openProject: openProject, hasProject: function (key) { return !!projects[key]; } };
  }

  window.WorkPanel = {
    projects: projects,
    init: initWorkPanel
  };
})();
