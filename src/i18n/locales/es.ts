export default {
  common: {
    appName: "CVal",
    history: "Historial",
    about: "Acerca de",
    evaluateNew: "Nueva evaluación",
    back: "Volver",
    loading: "Cargando...",
    light: "Claro",
    dark: "Oscuro",
    verifying: "Verificando tu identidad",
  },
  home: {
    welcome: "Bienvenido a CVal",
    subtitle: "Sube tu currículum y obtén comentarios con IA al instante",
    dropzoneText:
      "Arrastra y suelta tu archivo de CV aquí o haz clic para navegar",
    dropzoneHint: "Compatible con archivos PDF y DOC",
    jobTitle: "Titulo del Puesto",
    jobTitlePlaceholder: "Ejemplo: Ingeniero de Software Backend Jr",
    evaluateButton: "Evaluar mi CV",
    features: {
      title: "Características",
      ai: "Análisis impulsado por IA",
      score: "Puntuación completa",
      keywords: "Recomendaciones de palabras clave",
      suggestions: "Sugerencias de mejora personalizadas",
    },
    howItWorks: {
      title: "Cómo Funciona",
      step1: "Sube tu CV",
      step2: "Nuestra IA analiza tu documento",
      step3: "Recibe comentarios y recomendaciones",
      step4: "Mejora tu CV y aumenta tus posibilidades",
    },
    processingTitle: "Procesando tu CV",
    processingStep1: "Leyendo el documento",
    processingStep2: "Analizando el documento usando IA",
  },
  history: {
    title: "Historial",
    subtitle:
      "Tus evaluaciones previas de CV (Estos datos se guardan en tu navegador local)",
    search: "Buscar resultados previos",
    date: "Fecha",
    score: "Puntuación",
    clear: "Limpiar",
  },
  results: {
    title: "Resultados de Evaluación",
    tabs: {
      overview: "Visión General",
      experience: "Experiencia",
      education: "Educación",
      skills: "Habilidades",
      languages: "Idiomas",
      format: "Formato",
      recommendations: "Recomendaciones",
    },
    experience: {
      projects: "Proyectos",
    },
    skills: {
      listed: "En listado",
      missing: "Faltantes",
      leftover: "Sobrante (Irrelevantes para el puesto)",
    },
    education: {
      certifications: "Certificaciones",
      certificationsList: "Lista de Certificaciones",
    },
    languages: {
      detected: "Detectados",
    },
    format: {
      issues: "Problemas",
    },
    recommendations: {
      priority: "Prioridad",
      general: "Generales",
    },
    summary: "Resumen",
    strengths: "Fortalezas",
    weaknesses: "Áreas de Mejora",
    share: "Compartir",
    downloadPdf: "Descargar como PDF",
    tips: "Consejos de mejora (Generales)",
  },
  about: {
    title: "Acerca de CVal",
    subtitle: "Evaluación de CV con IA simplificada",
    mission: {
      title: "Nuestra Misión",
      description:
        "Nuestro objetivo es simplificar la evaluación de CVs para que los candidatos tengan una mejor oportunidad de destacarse en el mercado laboral.",
    },
    featuresTitle: "Características",
    features: {
      ai: {
        title: "Análisis impulsado por IA",
        description:
          "Utilizamos algoritmos avanzados de IA para analizar tu currículo y proporcionar comentarios útiles para destacar en el mercado laboral.",
      },

      scoring: {
        title: "Puntuación completa",
        description:
          "Obten una puntuación completa de tu CV, incluyendo contenido, formato y relevancia.",
      },

      suggestions: {
        title: "Sugerencias de mejora personalizadas",
        description:
          "Obten sugerencias de mejora personalizadas para tu CV basadas en tus habilidades y experiencia.",
      },

      privacy: {
        title: "Privacidad",
        description:
          "Tu privacidad es importante para nosotros. Tus datos no se almacenarán en nuestros servidores. El historial de tus evaluaciones previas de CV se guarda en tu navegador local.",
      },
    },
    faqTitle: "Preguntas Frecuentes",
    faq: {
      question1: "¿Cuantas veces puedo evaluar mi CV?",
      answer1:
        "Las veces que desees. Sin embargo te pedimos que uses el servicio con prudencia. De lo contrario, podemos afectar tu experiencia de usuario o bloquear tu acceso.",
      question2: "¿Es seguro usar CVal?",
      answer2:
        "Siempre. Nuestro servicio es seguro y privado. Tus datos no se almacenarán en nuestros servidores. El historial de tus evaluaciones previas de CV se guarda en tu navegador local.",
      question3: "¿Cuál es el costo de usar CVal?",
      answer3: "Gratis. CVal es un servicio gratuito para todos los usuarios.",
      question4: "¿Como está construido CVal?",
      answer4:
        "CVal es de código abierto. Te invitamos a ver el repositorio de GitHub de CVal para conocer el código fuente y las tecnologías usadas para desarrollarlo.",
    },
    madeWith: "CVal fue desarrollado con",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
  },
  tips: {
    summary: {
      strong: "Tu Resumen Profesional es fuerte",
      present: "Necesitas Mejorar el Resumen Profesional",
      missing: "Resumen Profesional Incompleto",
    },
    experience: {
      strong: "Tienes una experiencia laboral sólida ({{years}} años)",
      present: "Necesitas Mejorar tu Experiencia Laboral",
      missing: "Experiencia Laboral Incompleta",
    },
    education: {
      strong: "Tu Educación es fuerte ({{leval}})",
      present: "Necesitas Mejorar tu nivel de Educación en el CV",
      missing: "Falta Información de Educación",
    },
    skills: {
      strong: "Tienes una buena puntuación de Habilidades",
      missing: "Habilidades faltantes necesarias: {{missing}}",
      general: {
        0: "Añade a tu currículum las habilidades que te faltan y que ya posees.",
        1: "Considere mejorar sus habilidades en las áreas faltantes a través de cursos o certificaciones en línea.",
        2: "Priorizar las habilidades técnicas y duras que puedan verificarse.",
        3: "Agrupe habilidades similares para una mejor legibilidad.",
      },
    },
    languages: {
      strong: "Buen dominio del idioma",
      present: "La sección de Idiomas necesita mejorar",
      missing: "Falta Información de Idiomas",
      general: {
        0: "Utilice niveles de competencia estandarizados (p. ej., Fluido, Nativo, C1, B2).",
        1: "Incluya certificaciones de idiomas si las tiene.",
        2: "Enumere únicamente los idiomas en los que realmente puede comunicarse.",
      },
    },
    format: {
      clean: {
        yes: "Tu CV tiene un buen formato",
        yesSort: "Limpio",
        no: "Tu CV necesita mejorar su formato",
        noSort: "Desordenado",
      },
      general: {
        0: "Utilice una fuente uniforme en todo su currículum (Arial, Calibri o Times New Roman).",
        1: "Mantenga un espaciado y márgenes uniformes (de 0,5 a 1 pulgada en todos los lados).",
        2: "Asegúrese de que todas las viñetas y encabezados de sección sigan el mismo formato.",
      },
    },
    recommendations: {
      general: {
        0: "Adapta tu currículum a cada solicitud de empleo para destacar las habilidades y la experiencia relevantes.",
        1: "Usa verbos de acción para comenzar a describir tu experiencia con viñetas.",
        2: 'Cuantifique sus logros siempre que sea posible (p. ej., "Aumento de las ventas en un 20 %").',
        3: "Limite su currículum a 1 o 2 páginas, dependiendo de su nivel de experiencia.",
      },
    },
  },
};
