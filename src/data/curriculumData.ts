import { Locale } from '@/types/database';

export interface CurriculumQuestion {
  q: string;
  hint: string;
}

export interface CurriculumDay {
  day: number;
  stageNumber: 1 | 2 | 3;
  stageName: string;
  title: string;
  quote: string;
  quoteAuthor: string;
  context: string;
  questions: CurriculumQuestion[];
  exerciseTitle: string;
  exerciseSteps: string[];
  exerciseLabel: string;
  commitment: string;
  nextDay: string;
}

export const CURRICULUM_ES: Record<number, CurriculumDay> = {
  1: {
    day: 1,
    stageNumber: 1,
    stageName: "Etapa I: Observar el Patrón (Días 1–7)",
    title: "Mi punto de partida / ¿Quién eres realmente?",
    quote: "Antes de poder convertirte en quien debes ser, tienes que estar dispuesto a dejar de ser quien has sido.",
    quoteAuthor: "Hal Elrod",
    context: "La mayoría de las personas pasan toda su vida siendo un personaje que otros escribieron para ellos. Sus creencias, sus valores, incluso sus sueños fueron prestados, heredados o impuestos. La reprogramación mental no empieza acumulando nuevas metas, sino desnudando el punto de partida real con honestidad sin filtros.",
    questions: [
      { q: "¿Quién eres cuando nadie te está mirando?", hint: "No respondas con tu profesión, tu rol familiar o lo que haces. Responde desde lo que sientes cuando estás a solas." },
      { q: "¿Cuáles son los 3 adjetivos que más escuchas de los demás sobre ti?", hint: "¿Cuáles de esos adjetivos te pertenecen y cuáles son etiquetas que otros te impusieron?" },
      { q: "¿Qué versión de ti mismo has estado escondiendo por miedo al juicio?", hint: "Hay una parte de ti que sabe con precisión quién quiere ser. ¿Por qué no le has dado permiso de existir?" },
      { q: "Si supieras con certeza que no puedes fallar, ¿cómo actuarías mañana?", hint: "Sé quirúrgicamente específico. ¿Cómo hablarías, caminarías y tomarías decisiones?" }
    ],
    exerciseTitle: "El Espejo de la Realidad Cruda",
    exerciseSteps: [
      "Siéntate frente a un espejo o cierra los ojos 60 segundos observando tu respiración.",
      "Pregúntate en voz alta: '¿Quién soy realmente en este momento?'",
      "Escribe sin censura todo lo que surja: incomodidad, certezas y sombras."
    ],
    exerciseLabel: "Lo que descubrí al observar mi punto de partida:",
    commitment: "Hoy me comprometo a mirar mi realidad con honestidad radical, sin autoengaño.",
    nextDay: "Mañana desarmaremos tu modo piloto automático."
  },
  2: {
    day: 2,
    stageNumber: 1,
    stageName: "Etapa I: Observar el Patrón (Días 1–7)",
    title: "Mi piloto automático / La mentira que te contaste",
    quote: "El primer paso para cambiar es reconocer que has estado mintiendo — primero que nadie, a ti mismo.",
    quoteAuthor: "Wayne Dyer",
    context: "Existe una narrativa automática que se dispara cada vez que la incomodidad o el reto tocan tu puerta. No es la realidad objetiva; es un guion cognitivo de supervivencia que tu mente repite para mantenerte a salvo en lo conocido.",
    questions: [
      { q: "¿Cuál es la frase automática que te dices cuando algo sale mal?", hint: "Ese comentario interno recurrente que surge sin que lo decidas." },
      { q: "¿Cuál es la historia que justifica por qué aún no has alcanzado tu siguiente nivel?", hint: "'No puedo porque...', 'Soy así porque...'" },
      { q: "¿De quién fue la primera voz que te enseñó esa limitación?", hint: "¿Un padre, un maestro, un viejo fracaso que generalizaste?" },
      { q: "Si esa narrativa fuera completamente falsa, ¿qué espacio se abriría para ti?", hint: "Describe tu vida libre de esa justificación." }
    ],
    exerciseTitle: "Deconstrucción del Guion Automático",
    exerciseSteps: [
      "Escribe la excusa o justificación más repetitiva que usas en tu día.",
      "Analiza la evidencia real a favor y en contra de esa afirmación.",
      "Formula una declaración factual que desmonte la mentira."
    ],
    exerciseLabel: "La mentira desarmada y el hecho objetivo:",
    commitment: "Hoy renuncio a justificar mis limitaciones con historias del pasado.",
    nextDay: "Mañana identificaremos el estímulo disparador exacto."
  },
  3: {
    day: 3,
    stageNumber: 1,
    stageName: "Etapa I: Observar el Patrón (Días 1–7)",
    title: "El estímulo que activa mi respuesta",
    quote: "Quien domina el detonador, gobierna el resultado.",
    quoteAuthor: "Epicteto",
    context: "Toda reacción desproporcionada o hábito destructivo tiene un detonador concreto: una palabra específica, un tono de voz, el cansancio acumulado o la sensación de rechazo. Sin conocer el estímulo, eres rehén de la reacción.",
    questions: [
      { q: "¿Qué situaciones o personas detonan tu reactividad con mayor facilidad?", hint: "Identifica los contextos exactos (reuniones, conversaciones familiares, finanzas)." },
      { q: "¿Qué ocurre en tu cuerpo justo un segundo antes de reaccionar?", hint: "¿Tensión en la mandíbula, vacío en el estómago, aceleración cardíaca?" },
      { q: "¿Qué necesidad básica crees que está en peligro cuando ese estímulo ocurre?", hint: "¿Control, pertenencia, respeto, seguridad?" },
      { q: "¿Qué pasaría si observaras el estímulo durante 5 segundos antes de decir una sola palabra?", hint: "Anticipa el impacto del micro-retraso consciente." }
    ],
    exerciseTitle: "Mapeo Quirúrgico de Disparadores",
    exerciseSteps: [
      "Enumera 3 detonadores frecuentes que desatan frustración o evasión.",
      "Identifica el patrón común entre ellos.",
      "Asigna una señal de alerta corporal a cada uno."
    ],
    exerciseLabel: "Mis 3 detonadores críticos y sus alertas corporales:",
    commitment: "Hoy vigilaré mis detonadores como un centinela vigilando la entrada del santuario.",
    nextDay: "Mañana exploraremos la interpretación que construyes en milésimas de segundo."
  },
  4: {
    day: 4,
    stageNumber: 1,
    stageName: "Etapa I: Observar el Patrón (Días 1–7)",
    title: "La interpretación que construyo",
    quote: "No nos afecta lo que nos sucede, sino lo que nos decimos sobre lo que nos sucede.",
    quoteAuthor: "Marco Aurelio",
    context: "Entre lo que pasa en el mundo y tu emoción existe una máquina de significados: tu interpretación. Dos personas ante el mismo despido o crítica reaccionan de manera opuesta no por el hecho en sí, sino por la historia que le asignan.",
    questions: [
      { q: "¿Qué significado catastrófico tiendes a otorgarle a los desacuerdos o errores?", hint: "¿Asumes de inmediato desprecio, incompetencia o traición?" },
      { q: "¿Cómo saltas del hecho observable a la conclusión dramática?", hint: "Ejemplo: 'No me contestó en 2 horas' -> 'Ya no le importo'." },
      { q: "¿Qué pasaría si tu primera interpretación siempre fuera incorrecta?", hint: "¿Cómo cambiaría tu postura emocional y tu serenidad?" },
      { q: "¿Qué interpretación constructiva podrías adoptar ante tu mayor problema actual?", hint: "¿Cómo vería esta situación un estratega imparcial?" }
    ],
    exerciseTitle: "Separación Hecho vs. Interpretación",
    exerciseSteps: [
      "Elige un conflicto reciente.",
      "Escribe exclusivamente los HECHOS observables que una cámara de video captaría.",
      "Escribe al lado la INTERPRETACIÓN que tu mente agregó.",
      "Contrasta ambas realidades."
    ],
    exerciseLabel: "Hecho crudo vs. Mi narrativa construida:",
    commitment: "Hoy elijo cuestionar mis suposiciones antes de creerlas ciegamente.",
    nextDay: "Mañana conectaremos con las señales somáticas del cuerpo."
  },
  5: {
    day: 5,
    stageNumber: 1,
    stageName: "Etapa I: Observar el Patrón (Días 1–7)",
    title: "Emoción, cuerpo y señales somáticas",
    quote: "El cuerpo lleva la cuenta mucho antes de que la mente admita la batalla.",
    quoteAuthor: "Bessel van der Kolk",
    context: "La emoción es ante todo un fenómeno fisiológico: descargas de adrenalina, contracciones musculares, cambios en la respiración. Aprender a leer el cuerpo te permite desactivar el secuestro amigdalino antes de que tome el volante de tu vida.",
    questions: [
      { q: "¿En qué parte de tu anatomía física almacenas la ansiedad o la rabia?", hint: "¿Garganta cerrada, hombros rígidos, opresión pectoral?" },
      { q: "¿Qué haces cuando sientes una emoción incómoda: la reprimes, explotas o te anestesias?", hint: "Pantallas, comida, aislamiento, justificación." },
      { q: "¿Cómo cambia tu postura corporal cuando te sientes inseguro vs. cuando estás centrado?", hint: "Compara tu respiración, mirada y eje vertebral en ambos estados." },
      { q: "¿Cómo puedes usar tu respiración para regular tu sistema nervioso en 60 segundos?", hint: "Inhalación nasal profunda y exhalación prolongada." }
    ],
    exerciseTitle: "Escaneo Somático y Restauración",
    exerciseSteps: [
      "Haz 4 respiraciones diafragmáticas (4 seg inhalar, 6 seg exhalar).",
      "Escanea de la cabeza a los pies las zonas de tensión.",
      "Libera voluntariamente mandíbula, hombros y vientre."
    ],
    exerciseLabel: "Señales somáticas registradas y liberación corporal:",
    commitment: "Hoy honraré las señales de mi cuerpo como brújulas de alerta temprana.",
    nextDay: "Mañana calcularemos los costos ocultos de tu viejo patrón."
  },
  6: {
    day: 6,
    stageNumber: 1,
    stageName: "Etapa I: Observar el Patrón (Días 1–7)",
    title: "Las consecuencias y costos de mi patrón",
    quote: "La locura es hacer lo mismo una y otra vez esperando resultados distintos.",
    quoteAuthor: "Rita Mae Brown",
    context: "Todo patrón reactivo te cobra una factura: en relaciones deterioradas, proyectos abandonados, energía desperdiciada o pérdida de respeto propio. Hasta que el dolor de permanecer igual supere el miedo a cambiar, el cambio no ocurre.",
    questions: [
      { q: "¿Qué te ha costado tu patrón reactivo o evasivo en los últimos 3 años?", hint: "Calcula en dinero, oportunidades, paz mental y confianza." },
      { q: "¿A quiénes has lastimado cuando tu piloto automático toma el control?", hint: "Familia, socios, pareja, a ti mismo." },
      { q: "¿Dónde estarás en 5 años si continúas tolerando este mismo comportamiento?", hint: "Pinta el escenario realista y desalentador sin anestesia." },
      { q: "¿Qué se siente saber que hoy tienes el poder de trazar la línea final?", hint: "Reconoce el peso y la soberanía de tu decisión." }
    ],
    exerciseTitle: "El Balance de Costos Ocultos",
    exerciseSteps: [
      "Escribe el costo relacional, profesional e interno de no cambiar.",
      "Calcula cuánta energía te roba sostener ese ciclo vicioso.",
      "Declara por escrito el fin de ese ciclo."
    ],
    exerciseLabel: "El inventario de costos y mi declaración de quiebre:",
    commitment: "No volveré a pagar el precio de la complacencia ni del victimismo.",
    nextDay: "Mañana concluiremos la Etapa I con la Primera Revisión PAUSA."
  },
  7: {
    day: 7,
    stageNumber: 1,
    stageName: "Etapa I: Observar el Patrón (Días 1–7)",
    title: "Primera revisión / Método PAUSA: Percibir",
    quote: "El guerrero que se conoce a sí mismo jamás teme el resultado de cien batallas.",
    quoteAuthor: "Sun Tzu",
    context: "Culmina la primera semana. Has mapeado tu punto de partida, tu piloto automático, disparadores, interpretaciones, biología y consecuencias. Ahora integras el primer pilar del método: PERCIBIR con precisión quirúrgica.",
    questions: [
      { q: "¿Cuál ha sido la revelación más incómoda y lúcida de estos primeros 7 días?", hint: "Aquello que ya no puedes desver." },
      { q: "¿En qué momento de la semana lograste notar el patrón antes de caer en él?", hint: "Celebra el primer milisegundo de consciencia." },
      { q: "¿Qué viejas justificaciones ya no tienen poder sobre ti?", hint: "Enumera aquellas que han perdido credibilidad." },
      { q: "¿Cuál es tu intención inquebrantable para la Etapa II?", hint: "Pasar de observar el patrón a crear nuevas opciones deliberadas." }
    ],
    exerciseTitle: "Integración de la Etapa I",
    exerciseSteps: [
      "Revisa tus anotaciones de los días 1 al 6.",
      "Sintetiza en una sola frase el viejo patrón que hoy queda desactivado.",
      "Escribe tu estándar no negociable para los próximos 7 días."
    ],
    exerciseLabel: "Síntesis del viejo patrón superado y nuevo estándar:",
    commitment: "He completado la Etapa I. Mis ojos están abiertos. Estoy listo para diseñar mi respuesta.",
    nextDay: "La Etapa II comienza mañana: El espacio sagrado entre estímulo y respuesta."
  },
  8: {
    day: 8,
    stageNumber: 2,
    stageName: "Etapa II: Crear Otras Opciones (Días 8–14)",
    title: "El espacio entre el estímulo y la respuesta",
    quote: "Entre el estímulo y la respuesta hay un espacio. En ese espacio reside nuestro poder para elegir nuestra respuesta. En nuestra respuesta yace nuestro crecimiento y nuestra libertad.",
    quoteAuthor: "Viktor Frankl",
    context: "El animal reacciona por reflejo biológico. El ser humano consciente habita la brecha. En ese espacio de apenas 2 a 5 segundos se juega toda tu madurez emocional y tu destino. Hoy aprendes a ensanchar ese espacio.",
    questions: [
      { q: "¿Cuánto tiempo transcurre normalmente entre una provocación y tu reacción?", hint: "Sé honesto: ¿segundos, milisegundos, o eres capaz de respirar?" },
      { q: "¿Qué sientes en ese microsegundo antes de hablar o actuar en caliente?", hint: "Un impulso de descarga, de ganar el argumento, de tener la razón." },
      { q: "¿Qué ganarías si pudieras introducir un espacio de 5 segundos de silencio deliberado?", hint: "Claridad, autoridad, serenidad, control situacional." },
      { q: "¿Cómo sería tu respuesta si actuaras desde tu visión a 10 años en vez de tu impulso inmediato?", hint: "Proyecta la sabiduría a largo plazo." }
    ],
    exerciseTitle: "El Anclaje del Espacio Sagrado",
    exerciseSteps: [
      "Define una frase mantra para cuando sientas el impulso reactivo (ej. 'Habito la brecha').",
      "Practica una pausa física de 5 segundos contados con tu mano.",
      "Documenta cómo cambia tu sensación de poder personal."
    ],
    exerciseLabel: "Mi mantra de anclaje y protocolo de pausa de 5 segundos:",
    commitment: "Hoy reclamo el espacio entre el estímulo y mi respuesta como territorio de libertad.",
    nextDay: "Mañana diseñaremos tu protocolo físico y mental de pausa."
  },
  9: {
    day: 9,
    stageNumber: 2,
    stageName: "Etapa II: Crear Otras Opciones (Días 8–14)",
    title: "Diseñar mi pausa física y mental",
    quote: "La serenidad no es la ausencia de tormenta, sino la calma en el centro del huracán.",
    quoteAuthor: "Séneca",
    context: "Una pausa no puede ser una vaga idea teórica. Necesitas un protocolo cinético concreto: cambiar la respiración, bajar el centro de gravedad, relajar la lengua del paladar y oxigenar la corteza prefrontal.",
    questions: [
      { q: "¿Cuál será tu ancla corporal inmediata para activar la pausa?", hint: "Apretar el pulgar con el índice, tocar tu muñeca, exhalar por la boca." },
      { q: "¿Qué le dirás a la otra persona cuando necesites ganar tiempo de procesamiento?", hint: "'Dame un momento para procesar lo que dices', 'Hablemos de esto en 10 minutos'." },
      { q: "¿Cómo evitas que la pausa se convierta en evasión pasivo-agresiva?", hint: "Aclarando que volverás a abordar el tema con claridad." },
      { q: "¿En qué situación de hoy pondrás a prueba este protocolo?", hint: "Visualiza una conversación o tarea demandante." }
    ],
    exerciseTitle: "Diseño del Protocolo PAUSA Físico",
    exerciseSteps: [
      "1. Postura erguida y pies plantados en el suelo.",
      "2. Tres respiraciones lentas con exhalación doble.",
      "3. Pregunta interna: '¿Qué respuesta honra a quien elijo ser?'"
    ],
    exerciseLabel: "Mi protocolo de pausa paso a paso:",
    commitment: "Entreno mi cuerpo para pausar antes de disparar palabras o decisiones.",
    nextDay: "Mañana aprenderemos a desmantelar interpretaciones automáticas."
  },
  10: {
    day: 10,
    stageNumber: 2,
    stageName: "Etapa II: Crear Otras Opciones (Días 8–14)",
    title: "Cuestionar mis interpretaciones automáticas",
    quote: "La mente no iluminada cree todo lo que piensa.",
    quoteAuthor: "Byron Katie",
    context: "Tus pensamientos automáticos son hipótesis neurológicas, no verdades reveladas. El guerrero aplica el método socrático a su propio cerebro: ¿Es esto verdad? ¿Puedo estar 100% seguro de que esto es verdad? ¿Quién soy cuando creo este pensamiento?",
    questions: [
      { q: "¿Qué interpretación automática te ha estado quitando el sueño esta semana?", hint: "'No soy suficiente', 'Me van a traicionar', 'Voy a fracasar'." },
      { q: "¿Qué evidencia real e incontrovertible tienes de que eso sea 100% cierto?", hint: "Diferencia la opinión del dato comprobable." },
      { q: "¿Quién eres y cómo te comportas cuando compras ese pensamiento?", hint: "Inseguro, defensivo, retraído, hostil." },
      { q: "¿Quién serías sin esa historia en tu mente?", hint: "Libre, enfocado, resolutivo, audaz." }
    ],
    exerciseTitle: "Las 4 Preguntas de Interrogatorio Cognitivo",
    exerciseSteps: [
      "Escribe un pensamiento limitante recurrente.",
      "Aplica las 4 preguntas de desafío.",
      "Redacta la inversión positiva y realista de dicho pensamiento."
    ],
    exerciseLabel: "Pensamiento interrogado y su inversión fortalecedora:",
    commitment: "Hoy me niego a creer ciegamente en mis pensamientos de escasez y miedo.",
    nextDay: "Mañana descubriremos que tu identidad no es una sentencia de cadena perpetua."
  },
  11: {
    day: 11,
    stageNumber: 2,
    stageName: "Etapa II: Crear Otras Opciones (Días 8–14)",
    title: "Mi identidad no es una sentencia / Es una práctica",
    quote: "No eres una obra terminada; eres un proceso continuo de creación deliberada.",
    quoteAuthor: "James Clear",
    context: "Decir 'yo soy tímido', 'yo soy colérico' o 'yo soy desorganizado' es confundir un hábito reiterado con la esencia del ser. Tu identidad es la suma de los votos que emites con tus acciones cotidianas. Puedes cambiar de identidad cambiando tus votos.",
    questions: [
      { q: "¿Qué etiqueta de identidad has cargado como si fuera un tatuaje imborrable?", hint: "'El que siempre se autosabotea', 'El que no sabe de negocios'." },
      { q: "¿A quién le sirvió originalmente que tú creyeras esa etiqueta?", hint: "A menudo servía para no asumir riesgos o para complacer a otros." },
      { q: "¿Qué tres votos o pequeñas acciones demostrarían tu nueva identidad hoy?", hint: "1 voto = 1 acción alineada (ej. tender la cama, hacer la llamada)." },
      { q: "Si ya fueras el guerrero que admiras, ¿cómo comenzaría tu día?", hint: "Visualiza su ritmo, su energía y sus prioridades." }
    ],
    exerciseTitle: "El Manifiesto de la Nueva Identidad",
    exerciseSteps: [
      "Escribe una lista de 3 etiquetas obsoletas que hoy revocas.",
      "Redacta 3 afirmaciones de identidad en tiempo presente: 'Soy el tipo de persona que...'",
      "Elige una acción inmediata de 2 minutos para sellar cada una."
    ],
    exerciseLabel: "Etiquetas revocadas y votos de mi nueva identidad:",
    commitment: "Mi pasado no define mi identidad. Mi próxima decisión la determina.",
    nextDay: "Mañana haremos el ensayo mental de alta fidelidad."
  },
  12: {
    day: 12,
    stageNumber: 2,
    stageName: "Etapa II: Crear Otras Opciones (Días 8–14)",
    title: "Ensayar mentalmente una respuesta alternativa",
    quote: "El cerebro no distingue entre una experiencia real y una ensayada con vívida emoción.",
    quoteAuthor: "Dr. Joe Dispenza",
    context: "Los atletas de élite y los cirujanos ensayan mentalmente sus movimientos antes de ejecutarlos. Tu sistema nervioso puede pre-cablearse para la serenidad ensayando el momento difícil antes de que acontezca.",
    questions: [
      { q: "¿Qué escenario de alta tensión anticipas en los próximos días?", hint: "Una negociación, un reclamo, una tentación, un reto laboral." },
      { q: "¿Cómo solía reaccionar tu viejo yo en ese escenario?", hint: "Gritando, evadiendo, congelándose, disculpándose en exceso." },
      { q: "¿Cómo luce tu respuesta maestra ideal en cámara lenta?", hint: "Mira tu postura, tu voz pausada, tu mirada firme y compasiva." },
      { q: "¿Qué emoción de triunfo sientes al verte actuar con maestría?", hint: "Orgullo sobrio, paz profunda, dominio propio." }
    ],
    exerciseTitle: "Simulación Mental Cinematográfica",
    exerciseSteps: [
      "Cierra los ojos durante 3 minutos.",
      "Ejecuta en tu mente la escena difícil de principio a fin.",
      "Visualízate ejecutando la pausa y respondiendo con precisión quirúrgica.",
      "Registra los detalles sensoriales abajo."
    ],
    exerciseLabel: "La escena ensayada y mi respuesta maestra:",
    commitment: "Entreno mi mente en el santuario para que mi respuesta sea automática en el campo.",
    nextDay: "Mañana diseñaremos un entorno que apoye tu transformación."
  },
  13: {
    day: 13,
    stageNumber: 2,
    stageName: "Etapa II: Crear Otras Opciones (Días 8–14)",
    title: "Diseñar un entorno que facilite el cambio",
    quote: "La fuerza de voluntad está sobrevalorada; el diseño de entorno es supremo.",
    quoteAuthor: "B.J. Fogg",
    context: "Si compites contra tu entorno usando solo fuerza de voluntad, eventualmente perderás. Tu entorno físico, digital y social debe hacer que la respuesta correcta sea la más sencilla y que el viejo hábito tenga fricción insoportable.",
    questions: [
      { q: "¿Qué elementos de tu espacio físico invitan a la distracción o la pereza?", hint: "Teléfono en la mesa de noche, desorden, alimentos tóxicos a la vista." },
      { q: "¿Qué fricciones puedes añadir a tus malos hábitos para sabotearlos?", hint: "Eliminar apps, guardar bajo llave, apagar notificaciones." },
      { q: "¿Qué facilitadores puedes colocar frente a tus ojos para el buen hábito?", hint: "Libro sobre la almohada, ropa de ejercicio lista, diario abierto." },
      { q: "¿Quién en tu entorno te devuelve a tu viejo personaje y cómo pondrás límites?", hint: "Conversaciones, quejas colectivas, ambientes decadentes." }
    ],
    exerciseTitle: "Auditoría Espacial y Digital",
    exerciseSteps: [
      "Elimina 1 distracción masiva de tu espacio de trabajo o descanso.",
      "Añade 1 disparador visual que te recuerde a tu guerrero interior.",
      "Establece una regla inquebrantable de fricción para tu teléfono móvil."
    ],
    exerciseLabel: "Modificaciones al entorno físico y digital realizadas:",
    commitment: "Construyo una arquitectura de entorno que hace inevitable mi grandeza.",
    nextDay: "Mañana cerramos la Etapa II con la Segunda Revisión PAUSA."
  },
  14: {
    day: 14,
    stageNumber: 2,
    stageName: "Etapa II: Crear Otras Opciones (Días 8–14)",
    title: "Segunda revisión / Método PAUSA: Analizar y Destapar",
    quote: "La libertad consiste en saber que tienes opciones cuando otros creen que solo hay un camino.",
    quoteAuthor: "Jafeth López",
    context: "Has cruzado dos semanas de reentrenamiento. Ya no eres la víctima refleja del estímulo. Tienes la pausa, cuestionas tus interpretaciones, ensayas tus respuestas y blindas tu entorno. Hoy revisamos la creación deliberada de opciones.",
    questions: [
      { q: "¿Cómo ha evolucionado tu capacidad para percibir y analizar tus reacciones?", hint: "Compara el día 1 con el día 14 con métricas concretas." },
      { q: "¿Cuál ha sido la opción de respuesta alternativa más poderosa que descubriste?", hint: "Esa alternativa que antes ni siquiera contemplabas." },
      { q: "¿Qué resistencia interna has sentido y cómo la has atravesado?", hint: "La pereza, la duda, el ego queriendo tener la razón." },
      { q: "¿Estás preparado para pasar a la fase de práctica e integración implacable?", hint: "Sella tu determinación para los últimos 7 días." }
    ],
    exerciseTitle: "Matriz de Opciones del Guerrero",
    exerciseSteps: [
      "Toma tus 2 detonadores principales.",
      "Escribe al menos 3 respuestas alternativas viables para cada uno.",
      "Selecciona la respuesta dorada que practicarás en la Etapa III."
    ],
    exerciseLabel: "Matriz de 3 opciones alternativas por detonador:",
    commitment: "Sé que tengo opciones. Ya no estoy atrapado. Entro a la Etapa III listo para ejecutar.",
    nextDay: "La Etapa III comienza mañana: La regla 'Si ocurre X, haré Y'."
  },
  15: {
    day: 15,
    stageNumber: 3,
    stageName: "Etapa III: Practicar e Integrar (Días 15–21)",
    title: "Si ocurre X, haré Y / Intenciones de Implementación",
    quote: "Los que planean cómo responderán ante el obstáculo tienen el triple de probabilidades de vencer.",
    quoteAuthor: "Peter Gollwitzer",
    context: "La psicología cognitiva demuestra que las intenciones vagas ('voy a comer mejor' o 'no me voy a enojar') fracasan miserablemente. Lo que funciona es el algoritmo condicional: 'SI ocurre [situación X], ENTONCES ejecutaré [acción Y]'. Hoy codificas tus algoritmos personales.",
    questions: [
      { q: "¿Cuál es el obstáculo más predecible que enfrentarás esta semana?", hint: "Esa situación que sabes perfectamente que ocurrirá." },
      { q: "¿Cuál será tu condición 'SI...' redactada con máxima precisión?", hint: "Ejemplo: 'Si mi colega interrumpe mi presentación...'" },
      { q: "¿Cuál será tu acción 'ENTONCES...' inmediata y medible?", hint: "Ejemplo: '...entonces respiraré 3 segundos y diré: anotado, permíteme cerrar la idea'." },
      { q: "¿Cuántos algoritmos 'Si X, entonces Y' necesitas activos en tu vida ahora mismo?", hint: "Identifica 3 áreas críticas: salud, relaciones, trabajo." }
    ],
    exerciseTitle: "Codificación de Algoritmos Conductuales",
    exerciseSteps: [
      "Algoritmo 1 (Estrés): Si siento ganas de explotar, entonces...",
      "Algoritmo 2 (Procrastinación): Si abro redes sociales por aburrimiento, entonces...",
      "Algoritmo 3 (Conflicto): Si alguien me critica injustamente, entonces..."
    ],
    exerciseLabel: "Mis 3 algoritmos 'Si X, entonces Y':",
    commitment: "Hoy reemplazo la improvisación por algoritmos claros de respuesta consciente.",
    nextDay: "Mañana practicaremos en baja intensidad para calibrar el músculo."
  },
  16: {
    day: 16,
    stageNumber: 3,
    stageName: "Etapa III: Practicar e Integrar (Días 15–21)",
    title: "Practicar en baja intensidad / Laboratorio seguro",
    quote: "Quien no sabe tolerar el grano de arena, colapsará ante la montaña.",
    quoteAuthor: "Proverbio Zen",
    context: "No entrenas tu primer sparring contra el campeón mundial. Entrenas la calma en situaciones cotidianas de baja intensidad: en el tráfico, en la fila del supermercado, ante una conexión lenta de internet. Cada molestia menor es tu gimnasio mental.",
    questions: [
      { q: "¿Qué pequeños inconvenientes cotidianos suelen robarte la paz innecesariamente?", hint: "El semáforo en rojo, la sopa fría, un mensaje no respondido." },
      { q: "¿Cómo puedes transformar esa molestia en una sesión de entrenamiento deliberado?", hint: "Diciéndote: 'Excelente, aquí está mi gimnasio de paciencia'." },
      { q: "¿Qué hiciste hoy cuando una pequeña incomodidad tocó tu día?", hint: "¿Reaccionaste o la usaste como práctica de maestría?" },
      { q: "¿Cómo cambia tu energía cuando dejas de luchar contra las pequeñas cosas del destino?", hint: "Aparece una ligereza y sobriedad indestructibles." }
    ],
    exerciseTitle: "El Gimnasio Cotidiano de Micro-Paz",
    exerciseSteps: [
      "Elige voluntariamente la fila más lenta o cede el paso a 3 autos hoy.",
      "Observa la impaciencia emerger en tu cuerpo sin alimentarla.",
      "Sonríe internamente y conserva la respiración abdominal profunda."
    ],
    exerciseLabel: "Mi práctica voluntaria de micro-incomodidad y su resultado:",
    commitment: "Uso los pequeños roces de la vida como piedras de afilar para mi carácter.",
    nextDay: "Mañana aprenderemos a capitalizar un desliz sin culpas."
  },
  17: {
    day: 17,
    stageNumber: 3,
    stageName: "Etapa III: Practicar e Integrar (Días 15–21)",
    title: "Aprender de una reacción automática sin juzgarme",
    quote: "El error no te define; lo que haces en el minuto posterior al error, sí.",
    quoteAuthor: "Jafeth López",
    context: "En el camino de la transformación habrá deslices donde el piloto automático vuelva a saltar. El novato cae en la culpa y el abandono. El guerrero no gasta un solo gramo de energía en autoflagelarse; ejecuta un debrief militar inmediato y aprende la lección.",
    questions: [
      { q: "¿Cuándo fue la última vez que caíste en una vieja reacción reactiva?", hint: "Identifícala sin drama ni victimismo." },
      { q: "¿Qué factores de vulnerabilidad estaban presentes en ese momento?", hint: "¿Hambre, fatiga, soledad, estrés acumulado (HALT: Hungry, Angry, Lonely, Tired)?" },
      { q: "¿Cómo te trataste a ti mismo después de reaccionar mal?", hint: "¿Con insultos internos o con firmeza compasiva?" },
      { q: "¿Qué ajuste específico en tu algoritmo evitará que se repita la próxima vez?", hint: "Estrategia táctica preventiva." }
    ],
    exerciseTitle: "Protocolo Post-Desliz / Debrief Militar",
    exerciseSteps: [
      "1. ¿Qué ocurrió exactamente? (Hechos sin adjetivos).",
      "2. ¿Dónde falló la alerta temprana?",
      "3. ¿Qué reparación o disculpa debo ofrecer hoy mismo?",
      "4. ¿Qué aprendí para blindar el futuro?"
    ],
    exerciseLabel: "Mi análisis post-desliz y ajuste preventivo:",
    commitment: "No temo tropezar. Temo no aprender. Me levanto más sabio y más humilde.",
    nextDay: "Mañana aprenderemos a calibrar la estrategia cuando la primera opción no funcione."
  },
  18: {
    day: 18,
    stageNumber: 3,
    stageName: "Etapa III: Practicar e Integrar (Días 15–21)",
    title: "Adaptar mi estrategia cuando la primera opción falla",
    quote: "Ningún plan sobrevive intacto al primer contacto con el enemigo. La flexibilidad es la victoria.",
    quoteAuthor: "Helmuth von Moltke",
    context: "Intentas tu respuesta calmada y la otra persona redobla la agresión. O aplicas tu rutina y surge una emergencia imprevista. La rigidez se quiebra; la mente del guerrero es como el agua: si una puerta se cierra, fluye por la rendija.",
    questions: [
      { q: "¿En qué situación reciente tu plan ideal se desmoronó por completo?", hint: "Negociaciones truncadas, imprevistos familiares o de salud." },
      { q: "¿Cuánto tiempo perdiste quejándote de que las cosas no salieron como querías?", hint: "La fricción inútil entre el deseo y la realidad." },
      { q: "¿Cuál es tu protocolo de Plan B cuando la primera opción no prospera?", hint: "¿Retirada estratégica, replanteamiento de términos, pausa táctica?" },
      { q: "¿Cómo mantienes el centro interno independientemente de la respuesta del entorno?", hint: "Anclándote en lo que depende 100% de ti." }
    ],
    exerciseTitle: "Plan de Contingencia y Adaptabilidad Fluida",
    exerciseSteps: [
      "Identifica tu principal objetivo de este mes.",
      "Imagina que tu estrategia principal queda bloqueada hoy.",
      "Diseña 2 rutas alternas no convencionales para alcanzar el mismo desenlace."
    ],
    exerciseLabel: "Mis dos rutas alternas de contingencia:",
    commitment: "Permanezco firme en mi propósito pero infinitamente flexible en mi táctica.",
    nextDay: "Mañana hablaremos de repetición, contexto y consolidación sinérgica."
  },
  19: {
    day: 19,
    stageNumber: 3,
    stageName: "Etapa III: Practicar e Integrar (Días 15–21)",
    title: "Repetición y contexto / Consolidación del hábito",
    quote: "Somos lo que hacemos día tras día. De modo que la excelencia no es un acto, sino un hábito.",
    quoteAuthor: "Will Durant",
    context: "La mielinización neuronal requiere repetición bajo contexto específico. No basta con entender conceptualmente la reprogramación mental; necesitas grabarla en tus ganglios basales a través de la consistencia implacable.",
    questions: [
      { q: "¿Cuál de todas las prácticas de estos 19 días se siente ya como parte natural de ti?", hint: "Ese cambio que ya no requiere esfuerzo titánico." },
      { q: "¿En qué momentos del día necesitas consolidar anclajes inquebrantables?", hint: "La primera hora de la mañana y la última antes de dormir." },
      { q: "¿Cómo protegerás tu nuevo estándar cuando regreses a la rutina cotidiana?", hint: "Monitoreo semanal, lecturas de refuerzo, comunidad." },
      { q: "¿A quién le rendirás cuentas para asegurar que no bajes la guardia?", hint: "Tu mentor, un compañero de camino, tu propio diario." }
    ],
    exerciseTitle: "El Ancla Diaria de Consolidación",
    exerciseSteps: [
      "Define tu ritual diario de 10 minutos para revisar este diario.",
      "Establece una métrica simple de seguimiento (ej. semáforo verde/rojo diario).",
      "Escribe qué recompensa no material te otorgarás por mantenerte firme."
    ],
    exerciseLabel: "Mi ritual diario no negociable de mantenimiento:",
    commitment: "La repetición es la madre de la maestría. Abrazo la disciplina cotidiana con devoción.",
    nextDay: "Mañana redactaremos tu Protocolo Personal de Respuesta Inmediata."
  },
  20: {
    day: 20,
    stageNumber: 3,
    stageName: "Etapa III: Practicar e Integrar (Días 15–21)",
    title: "Mi protocolo personal de respuesta inmediata",
    quote: "Bajo presión extrema no te elevas a la altura de tus expectativas; desciendes al nivel de tu entrenamiento.",
    quoteAuthor: "Arquíloco",
    context: "Estás a un día de la graduación. Hoy condensas todo lo aprendido en una tarjeta de combate mental: tu protocolo de emergencia para cuando la vida te golpee con fuerza. Si el fuego se desata, sabes con exactitud qué hacer.",
    questions: [
      { q: "¿Cuáles son las 3 reglas de oro de tu código de conducta personal?", hint: "1. No responder en ira. 2. Respirar antes de decidir. 3. Honrar mi palabra." },
      { q: "¿Qué harás en los primeros 60 segundos ante una crisis o provocación grave?", hint: "Tus pasos mecánicos e inmediatos." },
      { q: "¿Cuál es tu frase de poder que corta el pánico de raíz?", hint: "Tu declaración de soberanía interior." },
      { q: "¿Qué valores son intransables bajo cualquier circunstancia?", hint: "Integridad, honor, serenidad, templanza." }
    ],
    exerciseTitle: "La Tarjeta de Combate del Guerrero",
    exerciseSteps: [
      "Paso 1: Detonador detectado -> Detener palabras.",
      "Paso 2: Biología -> 3 respiraciones profundas y relajar mandíbula.",
      "Paso 3: Análisis -> ¿Hecho o narrativa?",
      "Paso 4: Elección -> Respuesta que honra mi código.",
      "Paso 5: Acción -> Ejecución firme sin culpa ni resentimiento."
    ],
    exerciseLabel: "Mi tarjeta de combate personal de 5 pasos:",
    commitment: "Este protocolo es mi armadura y mi brújula. Viviré a la altura de este estándar.",
    nextDay: "Mañana es el Día 21: El nuevo yo, evaluación final y plan de 30 días."
  },
  21: {
    day: 21,
    stageNumber: 3,
    stageName: "Etapa III: Practicar e Integrar (Días 15–21)",
    title: "Evaluación final, síntesis y plan de 30 días",
    quote: "No eres el mismo que empezó esta página hace 21 días. Ese hombre murió. El guerrero que eres ahora tiene cicatrices nuevas, claridad nueva, y un fuego que no tiene extinción.",
    quoteAuthor: "Jafeth López",
    context: "Has llegado. Veintiún días de trabajo real y visceral. Has desarmado el viejo personaje, creado el espacio sagrado y practicado una arquitectura de respuesta consciente. Este no es el final de la travesía; es tu ordenación como guerrero de tu propia mente.",
    questions: [
      { q: "¿Quién eras el Día 1 y quién eres hoy al completar el Día 21?", hint: "Contrasta tus estados emocionales, tu lucidez y tu fortaleza." },
      { q: "¿Cuál ha sido el cambio de comportamiento más tangible que otros ya pueden notar?", hint: "Tu tono de voz, tu serenidad, tu capacidad de escuchar sin reaccionar." },
      { q: "¿Cuáles son tus 3 compromisos sagrados para los próximos 30 días?", hint: "Acciones no negociables para continuar este camino." },
      { q: "¿Qué mensaje le dejas al guerrero del futuro cuando vuelva a leer estas páginas?", hint: "Tus palabras de aliento y testimonio personal." }
    ],
    exerciseTitle: "El Juramento del Guerrero & Plan de Continuidad de 30 Días",
    exerciseSteps: [
      "Revisa la totalidad de tus reflexiones acumuladas.",
      "Redacta tu juramento de honor personal.",
      "Establece una fecha en 30 días para volver a auditar tu progreso con tu mentor."
    ],
    exerciseLabel: "Mi Juramento del Guerrero y plan para los próximos 30 días:",
    commitment: "El viejo yo ha muerto. El guerrero camina firme. Honraré esta transformación cada día de mi vida.",
    nextDay: "Has completado la reprogramación de 21 días. Tu nuevo yo ha nacido."
  }
};

export const CURRICULUM_EN: Record<number, CurriculumDay> = {
  1: {
    day: 1,
    stageNumber: 1,
    stageName: "Stage I: Observe the Pattern (Days 1–7)",
    title: "My Starting Point / Who are you really?",
    quote: "Before you can become who you need to be, you must be willing to stop being who you have been.",
    quoteAuthor: "Hal Elrod",
    context: "Most people spend their entire lives playing a character that others scripted for them. Their beliefs, values, and even ambitions were borrowed, inherited, or imposed. Mental reprogramming does not begin by piling on new goals, but by stripping away the illusion to confront your raw starting point with unflinching honesty.",
    questions: [
      { q: "Who are you when no one is watching?", hint: "Do not answer with your career, family title, or tasks. Answer from what you genuinely feel in total solitude." },
      { q: "What are the 3 adjectives you hear most often from others about you?", hint: "Which of these belong to your truth, and which are cages someone else constructed?" },
      { q: "What version of yourself have you been hiding out of fear of judgment?", hint: "There is a core of you that knows exactly who it wants to become. Why haven't you granted it permission to exist?" },
      { q: "If you knew with absolute certainty that you could not fail, how would you act tomorrow?", hint: "Be surgically specific. How would you speak, stand, and make decisions?" }
    ],
    exerciseTitle: "The Raw Reality Mirror",
    exerciseSteps: [
      "Sit in front of a mirror or close your eyes for 60 seconds observing your breath.",
      "Ask aloud: 'Who am I really at this very moment?'",
      "Write without filtering whatever arises: discomfort, quiet truths, and shadows."
    ],
    exerciseLabel: "What I uncovered observing my starting point:",
    commitment: "Today I commit to facing my current reality with radical honesty, without self-deception.",
    nextDay: "Tomorrow we dismantle your autopilot mode."
  },
  2: {
    day: 2,
    stageNumber: 1,
    stageName: "Stage I: Observe the Pattern (Days 1–7)",
    title: "My Autopilot Mode / The lie you told yourself",
    quote: "The first step toward change is recognizing you've been lying — first and foremost to yourself.",
    quoteAuthor: "Wayne Dyer",
    context: "There is an automatic narrative that fires every time discomfort or a challenge knocks at your door. It is not objective reality; it is a cognitive survival script your brain repeats to keep you safe inside the familiar.",
    questions: [
      { q: "What automatic sentence do you recite when something goes wrong?", hint: "The default internal voice that speaks up uninvited." },
      { q: "What is the story that justifies why you haven't reached your next level?", hint: "'I can't because...', 'I'm like this because...'" },
      { q: "Whose was the first voice that taught you that limitation?", hint: "A parent, teacher, or an early defeat that you generalized?" },
      { q: "If that narrative were completely false, what space would open for you?", hint: "Describe your life liberated from that justification." }
    ],
    exerciseTitle: "Deconstructing the Automatic Script",
    exerciseSteps: [
      "Write out the most repetitive excuse you rely on day to day.",
      "Analyze the verifiable evidence for and against that statement.",
      "Craft a factual statement that dismantles the lie."
    ],
    exerciseLabel: "The dismantled lie and the objective fact:",
    commitment: "Today I refuse to justify my limits with stories from the past.",
    nextDay: "Tomorrow we identify the exact stimulus behind your reaction."
  },
  3: {
    day: 3,
    stageNumber: 1,
    stageName: "Stage I: Observe the Pattern (Days 1–7)",
    title: "The Trigger Behind My Reaction",
    quote: "He who masters the trigger governs the outcome.",
    quoteAuthor: "Epictetus",
    context: "Every disproportionate reaction or destructive habit has a concrete trigger: a specific word, a tone of voice, accumulated fatigue, or the sensation of being dismissed. Without identifying the stimulus, you are held hostage by the reaction.",
    questions: [
      { q: "What situations or individuals trigger your reactivity most reliably?", hint: "Identify exact contexts (meetings, family talks, finances)." },
      { q: "What occurs in your body just one second before you react?", hint: "Jaw tension, pit in the stomach, racing heartbeat?" },
      { q: "What primal need feels threatened when that trigger occurs?", hint: "Control, belonging, respect, physical security?" },
      { q: "What would happen if you observed the trigger for 5 seconds before uttering a single word?", hint: "Anticipate the power of a conscious micro-delay." }
    ],
    exerciseTitle: "Surgical Trigger Mapping",
    exerciseSteps: [
      "List 3 frequent triggers that spark frustration or avoidance.",
      "Identify the common cognitive thread linking them.",
      "Assign a somatic warning signal to each."
    ],
    exerciseLabel: "My 3 critical triggers and somatic warnings:",
    commitment: "Today I will watch my triggers like a sentry guarding the gates of the citadel.",
    nextDay: "Tomorrow we examine the interpretation you construct in milliseconds."
  },
  4: {
    day: 4,
    stageNumber: 1,
    stageName: "Stage I: Observe the Pattern (Days 1–7)",
    title: "The Interpretation I Construct",
    quote: "We are not disturbed by things, but by the view which we take of them.",
    quoteAuthor: "Marcus Aurelius",
    context: "Between what happens in the physical world and your emotional state sits a meaning-making engine: your cognitive interpretation. Two people facing the same critique react oppositely not because of the event, but because of the story they attach to it.",
    questions: [
      { q: "What catastrophic meaning do you automatically assign to disagreements or setbacks?", hint: "Do you instantly infer contempt, failure, or betrayal?" },
      { q: "How do you jump from the observable fact to the dramatic conclusion?", hint: "e.g., 'They haven't texted in 2 hours' -> 'They no longer respect me'." },
      { q: "What if your first automatic interpretation was almost always mistaken?", hint: "How would that shift your emotional posture and composure?" },
      { q: "What constructive interpretation could you adopt regarding your biggest current challenge?", hint: "How would an impartial strategist frame this reality?" }
    ],
    exerciseTitle: "Separating Fact from Interpretation",
    exerciseSteps: [
      "Choose a recent friction point or conflict.",
      "Write down solely the observable FACTS a video camera could verify.",
      "Beside them, write the INTERPRETATION your mind superimposed.",
      "Contrast both realities."
    ],
    exerciseLabel: "Raw fact vs. My constructed narrative:",
    commitment: "Today I choose to question my assumptions before blindly obeying them.",
    nextDay: "Tomorrow we tune in to somatic signals and the body."
  },
  5: {
    day: 5,
    stageNumber: 1,
    stageName: "Stage I: Observe the Pattern (Days 1–7)",
    title: "Emotion, Body, and Somatic Signals",
    quote: "The body keeps the score long before the intellect admits the battle.",
    quoteAuthor: "Bessel van der Kolk",
    context: "Emotion is primarily physiological: adrenaline spikes, muscular contractions, altered respiration. Learning to read your somatic signs allows you to defuse amygdala hijacking before it seizes control of your conduct.",
    questions: [
      { q: "Where in your anatomy do you physically store anxiety or fury?", hint: "Tight throat, rigid shoulders, chest compression?" },
      { q: "What do you do when an uncomfortable emotion arises: repress, explode, or numb?", hint: "Screens, food, isolation, excessive justification." },
      { q: "How does your posture change when insecure vs. when fully centered?", hint: "Compare breathing rhythm, gaze, and spinal alignment in both states." },
      { q: "How can you use breathwork to regulate your autonomic nervous system in 60 seconds?", hint: "Deep nasal inhale paired with prolonged exhalation." }
    ],
    exerciseTitle: "Somatic Body Scan & Reset",
    exerciseSteps: [
      "Take 4 diaphragmatic breaths (4s inhale, 6s exhale).",
      "Scan head to toe for stored tension nodes.",
      "Voluntarily release jaw, shoulder girdle, and belly."
    ],
    exerciseLabel: "Somatic signals observed and release protocol:",
    commitment: "Today I honor my somatic cues as early-warning navigation instruments.",
    nextDay: "Tomorrow we tally the hidden costs of your recurring pattern."
  },
  6: {
    day: 6,
    stageNumber: 1,
    stageName: "Stage I: Observe the Pattern (Days 1–7)",
    title: "The Hidden Costs of My Pattern",
    quote: "Insanity is doing the same thing over and over again and expecting different results.",
    quoteAuthor: "Rita Mae Brown",
    context: "Every reactive pattern demands a severe toll: strained bonds, abandoned ambitions, squandered vitality, or eroded self-respect. Until the pain of staying the same eclipses the discomfort of change, transformation remains a wish.",
    questions: [
      { q: "What has your reactive or avoidant pattern cost you over the last 3 years?", hint: "Calculate in finances, key relationships, peace of mind, and confidence." },
      { q: "Who have you harmed when your autopilot assumed command?", hint: "Family, peers, partners, yourself." },
      { q: "Where will you be in 5 years if you continue tolerating this exact behavior?", hint: "Paint the sobering, unvarnished scenario." },
      { q: "What does it feel like knowing you possess the authority to draw the line today?", hint: "Acknowledge the sobriety and sovereignty of this choice." }
    ],
    exerciseTitle: "Tallying the True Costs",
    exerciseSteps: [
      "Document the relational, professional, and internal tolls of inaction.",
      "Calculate the energy hemorrhaged sustaining this vicious loop.",
      "Write a definitive declaration ending the cycle."
    ],
    exerciseLabel: "My cost inventory and final line in the sand:",
    commitment: "I refuse to continue paying the price of complacency and victimhood.",
    nextDay: "Tomorrow we conclude Stage I with the first PAUSE review."
  },
  7: {
    day: 7,
    stageNumber: 1,
    stageName: "Stage I: Observe the Pattern (Days 1–7)",
    title: "Weekly Review I / PAUSE Method: Perceive",
    quote: "The warrior who knows himself never fears the outcome of a hundred battles.",
    quoteAuthor: "Sun Tzu",
    context: "The opening week concludes. You have mapped your starting point, autopilot habits, triggers, interpretations, somatic cues, and costs. Now you synthesize the foundational pillar of the method: PERCEIVE with absolute clarity.",
    questions: [
      { q: "What was the most confronting and lucid breakthrough of these first 7 days?", hint: "The revelation you can no longer unsee." },
      { q: "When this week did you notice the trigger before succumbing to it?", hint: "Celebrate that critical initial millisecond of awareness." },
      { q: "Which old justifications have officially lost their grip on your mind?", hint: "List those that have lost all credibility." },
      { q: "What is your unwavering resolve as you step into Stage II?", hint: "Moving from observing the pattern to generating deliberate alternatives." }
    ],
    exerciseTitle: "Stage I Synthesis & Integration",
    exerciseSteps: [
      "Review your recorded entries from Days 1 through 6.",
      "Summarize in one clear sentence the old pattern now dismantled.",
      "Write your non-negotiable standard for the upcoming 7 days."
    ],
    exerciseLabel: "Dismantled pattern summary and incoming standard:",
    commitment: "I have completed Stage I. My eyes are open. I am ready to design my response.",
    nextDay: "Stage II begins tomorrow: The gap between stimulus and response."
  },
  8: {
    day: 8,
    stageNumber: 2,
    stageName: "Stage II: Create Alternative Responses (Days 8–14)",
    title: "The Gap Between Stimulus and Response",
    quote: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.",
    quoteAuthor: "Viktor Frankl",
    context: "The animal reacts by biological reflex. The conscious human inhabits the gap. In that slender opening of 2 to 5 seconds, all your emotional maturity and future destiny are decided. Today you widen that gap.",
    questions: [
      { q: "How much time usually elapses between a provocation and your reaction?", hint: "Be honest: milliseconds, or do you take a conscious breath?" },
      { q: "What do you feel in that microsecond before speaking or acting rashly?", hint: "An urge to discharge tension, win the argument, or prove a point." },
      { q: "What would you gain by inserting a deliberate 5-second silence?", hint: "Composure, authority, situational mastery." },
      { q: "What would your response look like if guided by your 10-year vision rather than immediate impulse?", hint: "Project long-range wisdom." }
    ],
    exerciseTitle: "Anchoring the Sacred Space",
    exerciseSteps: [
      "Select a reminder mantra for when tension spikes (e.g., 'I inhabit the gap').",
      "Practice a physical 5-second pause counted on your fingertips.",
      "Notice how your sense of personal sovereignty expands."
    ],
    exerciseLabel: "My anchor mantra and 5-second pause protocol:",
    commitment: "Today I claim the space between stimulus and response as the sanctuary of my freedom.",
    nextDay: "Tomorrow we design your physical and mental pause protocol."
  },
  9: {
    day: 9,
    stageNumber: 2,
    stageName: "Stage II: Create Alternative Responses (Days 8–14)",
    title: "Designing My Physical and Mental Pause",
    quote: "Serenity is not the absence of the storm, but peace at the eye of the hurricane.",
    quoteAuthor: "Seneca",
    context: "A pause cannot exist as a vague abstraction. You need an embodied protocol: reset breathing, lower center of gravity, drop tongue from the roof of the mouth, and supply oxygen to your prefrontal cortex.",
    questions: [
      { q: "What physical anchor will instantly engage your pause state?", hint: "Pressing thumb to index finger, touching your wrist, long mouth exhale." },
      { q: "What will you say to buy cognitive processing time in conversations?", hint: "'Give me a moment to process this', 'Let's revisit this in ten minutes'." },
      { q: "How do you ensure the pause does not devolve into passive-aggressive stonewalling?", hint: "By confirming you will return to the topic with clarity." },
      { q: "In what scenario today will you field-test this protocol?", hint: "Anticipate a demanding conversation or task." }
    ],
    exerciseTitle: "Building the PAUSE Somatic Protocol",
    exerciseSteps: [
      "1. Grounded posture, feet planted flat.",
      "2. Three measured breaths with extended exhalations.",
      "3. Internal question: 'What response honors the person I choose to be?'"
    ],
    exerciseLabel: "My step-by-step physical pause protocol:",
    commitment: "I train my physiology to pause before releasing words or decisions.",
    nextDay: "Tomorrow we dismantle automatic interpretations."
  },
  10: {
    day: 10,
    stageNumber: 2,
    stageName: "Stage II: Create Alternative Responses (Days 8–14)",
    title: "Challenging Automatic Interpretations",
    quote: "The unexamined mind believes everything it thinks.",
    quoteAuthor: "Byron Katie",
    context: "Your automatic thoughts are neurological hypotheses, not gospel truths. The warrior interrogates their own brain: Is this true? Can I be 100% sure this is true? Who am I when I entertain this belief?",
    questions: [
      { q: "What automatic interpretation has been stealing your peace this week?", hint: "'I am inadequate', 'They will abandon me', 'This will collapse'." },
      { q: "What incontrovertible proof exists that this is 100% accurate?", hint: "Distinguish subjective anxiety from verifiable evidence." },
      { q: "Who are you and how do you carry yourself when you buy that story?", hint: "Defensive, insecure, hostile, paralyzed." },
      { q: "Who would you be without that narrative running in your mind?", hint: "Composed, fearless, solution-oriented." }
    ],
    exerciseTitle: "The 4 Questions of Cognitive Interrogation",
    exerciseSteps: [
      "Write down a recurring limiting belief.",
      "Apply the 4 inquiry questions directly.",
      "Formulate the realistic, empowering turnaround of that thought."
    ],
    exerciseLabel: "Interrogated thought and its empowering turnaround:",
    commitment: "Today I refuse to surrender my sovereignty to unverified thoughts of fear.",
    nextDay: "Tomorrow we prove that identity is a practice, not a life sentence."
  },
  11: {
    day: 11,
    stageNumber: 2,
    stageName: "Stage II: Create Alternative Responses (Days 8–14)",
    title: "Identity is a Practice, Not a Life Sentence",
    quote: "You are not a finished product; you are a continuous process of deliberate creation.",
    quoteAuthor: "James Clear",
    context: "Stating 'I am hot-tempered', 'I am disorganized', or 'I am insecure' mistakes a practiced habit for immutable essence. Your identity is merely the cumulative tally of votes cast by your daily choices. Cast new votes to construct a new identity.",
    questions: [
      { q: "What identity label have you worn as if it were a permanent sentence?", hint: "'The procrastinator', 'The one who isn't good with money'." },
      { q: "Who did it originally benefit when you accepted that label?", hint: "Often it shielded you from the discomfort of accountability." },
      { q: "What 3 concrete votes or micro-actions will cast for your new identity today?", hint: "1 vote = 1 aligned deed (make the bed, make the difficult call)." },
      { q: "If you were already the warrior you aspire to be, how would your morning start?", hint: "Envision their tempo, physical state, and priorities." }
    ],
    exerciseTitle: "New Identity Manifesto",
    exerciseSteps: [
      "Revoke 3 obsolete labels you have outgrown.",
      "Write 3 present-tense identity declarations: 'I am the kind of person who...'",
      "Pick a 2-minute immediate action to seal each declaration."
    ],
    exerciseLabel: "Revoked labels and votes for my new identity:",
    commitment: "My history does not dictate my identity. My next choice defines it.",
    nextDay: "Tomorrow we practice high-fidelity mental rehearsal."
  },
  12: {
    day: 12,
    stageNumber: 2,
    stageName: "Stage II: Create Alternative Responses (Days 8–14)",
    title: "Mental Rehearsal of an Alternative Response",
    quote: "The brain cannot tell the difference between an event experienced and one rehearsed with vivid emotion.",
    quoteAuthor: "Dr. Joe Dispenza",
    context: "Elite athletes and neurosurgeons mentally rehearse complex executions prior to performance. Your neural pathways can be pre-wired for grace and poise by walking through pressure situations before they arrive.",
    questions: [
      { q: "What high-stakes situation do you anticipate over the next few days?", hint: "A tense negotiation, an old temptation, a difficult confrontation." },
      { q: "How did your former self habitually blunder in that situation?", hint: "Overreacting, freezing, appeasing, over-explaining." },
      { q: "What does your ideal master response look like in vivid slow motion?", hint: "Observe posture, measured vocal tone, and unwavering poise." },
      { q: "What somatic victory do you feel seeing yourself execute with mastery?", hint: "Quiet pride, grounded peace, self-command." }
    ],
    exerciseTitle: "Cinematic Cognitive Simulation",
    exerciseSteps: [
      "Close your eyes for 3 uninterrupted minutes.",
      "Run the demanding scenario from beginning to end.",
      "See yourself engage the pause and reply with surgical composure.",
      "Log the sensory details below."
    ],
    exerciseLabel: "The rehearsed scene and my master response:",
    commitment: "I train in the quiet so that mastery is automatic under pressure.",
    nextDay: "Tomorrow we engineer an environment that supports change."
  },
  13: {
    day: 13,
    stageNumber: 2,
    stageName: "Stage II: Create Alternative Responses (Days 8–14)",
    title: "Designing an Environment That Supports Change",
    quote: "Willpower is overrated; environmental architecture is supreme.",
    quoteAuthor: "B.J. Fogg",
    context: "If you pit raw willpower against a counterproductive environment, your stamina will eventually run dry. Your spatial, digital, and relational conditions must make noble choices frictionless and destructive impulses burdensome.",
    questions: [
      { q: "What elements in your physical surroundings provoke drift and indolence?", hint: "Phone by the pillow, cluttered desk, junk snacks in plain sight." },
      { q: "What friction can you introduce to sabotage self-defeating habits?", hint: "Remove apps, lock devices, disable push notifications." },
      { q: "What cues can you place in your direct line of sight to inspire discipline?", hint: "Journal open on desk, training gear set out, book ready." },
      { q: "Who in your circle pulls you back toward the old identity, and what boundary will you set?", hint: "Chronic complainers, cynical environments." }
    ],
    exerciseTitle: "Spatial & Digital Architecture Audit",
    exerciseSteps: [
      "Eliminate 1 prominent distraction from your primary work or sleeping area.",
      "Position 1 visual cue honoring your warrior identity.",
      "Establish an unbreakable phone friction rule."
    ],
    exerciseLabel: "Environmental and digital changes implemented:",
    commitment: "I construct an environment where my growth is natural and sustained.",
    nextDay: "Tomorrow we conclude Stage II with the second PAUSE review."
  },
  14: {
    day: 14,
    stageNumber: 2,
    stageName: "Stage II: Create Alternative Responses (Days 8–14)",
    title: "Weekly Review II / PAUSE Method: Analyze & Uncover",
    quote: "Freedom is knowing you have choices where others believe there is only one route.",
    quoteAuthor: "Jafeth López",
    context: "Two weeks completed. You are no longer a reflexive creature of habit. You possess the pause, interrogate interpretations, rehearse master responses, and curate your environment. Today we audit your arsenal of conscious options.",
    questions: [
      { q: "How has your capacity to analyze and uncover alternative responses progressed?", hint: "Contrast Day 1 with Day 14 using tangible examples." },
      { q: "What was the most empowering alternative response you discovered?", hint: "An option you previously never even considered." },
      { q: "What subtle resistances surfaced, and how did you conquer them?", hint: "Fatigue, ego wanting to be right, old excuses." },
      { q: "Are you ready to enter the relentless practice and integration phase?", hint: "Reaffirm your resolve for the final 7 days." }
    ],
    exerciseTitle: "The Warrior's Response Matrix",
    exerciseSteps: [
      "Select your 2 primary recurring triggers.",
      "List at least 3 viable, constructive alternative responses for each.",
      "Select the golden response you will drill in Stage III."
    ],
    exerciseLabel: "Matrix of 3 alternative options per trigger:",
    commitment: "I know I have options. I am no longer trapped. I enter Stage III ready to execute.",
    nextDay: "Stage III starts tomorrow: Implementation intentions ('If X, then Y')."
  },
  15: {
    day: 15,
    stageNumber: 3,
    stageName: "Stage III: Practice and Integrate (Days 15–21)",
    title: "Implementation Intentions / If X happens, I will do Y",
    quote: "Those who plan specifically how they will respond to obstacles are three times more likely to succeed.",
    quoteAuthor: "Peter Gollwitzer",
    context: "Vague good intentions ('I will be calmer' or 'I will stay disciplined') collapse under real-world pressure. Cognitive science proves what works is conditional logic: 'IF situation X occurs, THEN I will execute action Y'. Today you write those algorithms.",
    questions: [
      { q: "What predictable obstacle will you inevitably encounter this week?", hint: "A friction point you know with certainty will appear." },
      { q: "What is your surgical 'IF...' trigger statement?", hint: "e.g., 'If my colleague interrupts my presentation...'" },
      { q: "What is your immediate, measurable 'THEN...' response statement?", hint: "e.g., '...then I will pause for 2 seconds and state: Noted, allow me to complete the point'." },
      { q: "How many 'If X, then Y' algorithms do you need operational right now?", hint: "Map 3 vital domains: health, relationships, productivity." }
    ],
    exerciseTitle: "Encoding Behavioral Algorithms",
    exerciseSteps: [
      "Algorithm 1 (Stress): If I feel an urge to explode, then...",
      "Algorithm 2 (Drift): If I open social media out of boredom, then...",
      "Algorithm 3 (Critique): If someone criticizes me unfairly, then..."
    ],
    exerciseLabel: "My 3 behavioral algorithms ('If X, then Y'):",
    commitment: "Today I replace improvisation with battle-tested conscious algorithms.",
    nextDay: "Tomorrow we practice in low-stakes situations."
  },
  16: {
    day: 16,
    stageNumber: 3,
    stageName: "Stage III: Practice and Integrate (Days 15–21)",
    title: "Low-Stakes Situational Practice",
    quote: "He who cannot endure the grain of sand will crumble before the mountain.",
    quoteAuthor: "Zen Proverb",
    context: "You don't begin sparring against the world heavyweight champion. You train poise in low-stakes daily moments: slow traffic, checkout lines, sluggish internet connections. Every minor irritation is your personal mental gymnasium.",
    questions: [
      { q: "What minor inconveniences usually rob you of peace without warrant?", hint: "Red lights, cold coffee, delayed replies." },
      { q: "How can you reframe that irritation into a deliberate mental gym session?", hint: "Tell yourself: 'Outstanding, here is my patience training ground'." },
      { q: "How did you respond today when a small friction entered your path?", hint: "Did you react, or leverage it as a lesson in mastery?" },
      { q: "How does your energy elevate when you stop resisting the minor friction of life?", hint: "An unshakeable levity and quiet power emerge." }
    ],
    exerciseTitle: "The Everyday Micro-Peace Gymnasium",
    exerciseSteps: [
      "Voluntarily pick the slowest line or yield to 3 drivers today.",
      "Notice irritation rising in your chest without fueling it.",
      "Smile inwardly and maintain rhythmic diaphragmatic breathing."
    ],
    exerciseLabel: "My deliberate micro-friction drill and outcome:",
    commitment: "I treat the small abrasions of life as whetstones to sharpen my character.",
    nextDay: "Tomorrow we learn to capitalize on slips without self-punishment."
  },
  17: {
    day: 17,
    stageNumber: 3,
    stageName: "Stage III: Practice and Integrate (Days 15–21)",
    title: "Learning from Slip-Ups Without Self-Judgment",
    quote: "The mistake does not define you; what you do in the minute following the mistake does.",
    quoteAuthor: "Jafeth López",
    context: "Along the path of transformation, autopilot will occasionally misfire. The novice surrenders to guilt and quits. The warrior wastes zero energy on self-flagellation; they execute an immediate debrief and extract the tactical lesson.",
    questions: [
      { q: "When was the last time you fell back into an old reactive loop?", hint: "Acknowledge it without drama or self-pity." },
      { q: "What vulnerability factors were at play in that moment?", hint: "Hungry, Angry, Lonely, Tired (HALT)?" },
      { q: "How did you speak to yourself following the misstep?", hint: "With internal vitriol, or with compassionate firmness?" },
      { q: "What precise adjustment to your algorithm will prevent a repeat occurrence?", hint: "Concrete tactical adjustment." }
    ],
    exerciseTitle: "Post-Incident Debrief Protocol",
    exerciseSteps: [
      "1. Exactly what occurred? (Objective facts without adjectives).",
      "2. Where did the early warning system fail?",
      "3. What reparation or amends must be made today?",
      "4. What lesson fortifies my future conduct?"
    ],
    exerciseLabel: "My post-incident debrief and protective adjustment:",
    commitment: "I do not fear stumbling. I fear failing to learn. I rise wiser and more humble.",
    nextDay: "Tomorrow we calibrate strategy when the first response fails."
  },
  18: {
    day: 18,
    stageNumber: 3,
    stageName: "Stage III: Practice and Integrate (Days 15–21)",
    title: "Calibrating Strategy When the First Response Fails",
    quote: "No plan survives contact with the enemy intact. Fluidity is victory.",
    quoteAuthor: "Helmuth von Moltke",
    context: "You present your calm response and the counterparty escalates aggression. Or your routine is interrupted by an unforeseen crisis. Rigidity breaks; the warrior's mind flows like water: if one door is blocked, it moves through the seam.",
    questions: [
      { q: "In what recent event did your ideal plan completely unravel?", hint: "A derailed negotiation, sudden personal emergency." },
      { q: "How much time did you waste complaining that reality defied your script?", hint: "The futile friction between expectation and reality." },
      { q: "What is your Plan B contingency protocol when option A hits a wall?", hint: "Tactical retreat, reframing terms, strategic pause?" },
      { q: "How do you maintain your inner center regardless of outer turmoil?", hint: "By anchoring strictly in what is 100% within your command." }
    ],
    exerciseTitle: "Contingency Matrix & Dynamic Adaptability",
    exerciseSteps: [
      "Identify your primary objective for this month.",
      "Imagine your lead strategy is completely blocked today.",
      "Design 2 alternative routes to arrive at the same destination."
    ],
    exerciseLabel: "My two contingency operational paths:",
    commitment: "I remain uncompromising in my vision yet infinitely adaptable in my tactics.",
    nextDay: "Tomorrow we examine repetition, context, and habit consolidation."
  },
  19: {
    day: 19,
    stageNumber: 3,
    stageName: "Stage III: Practice and Integrate (Days 15–21)",
    title: "Repetition, Context, and Habit Consolidation",
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    quoteAuthor: "Will Durant",
    context: "Neural myelination demands repetition rooted in specific context. Intellectual understanding of mental reprogramming is not enough; you must imprint it into your basal ganglia through relentless daily execution.",
    questions: [
      { q: "Which practice from these 19 days already feels like your natural operating system?", hint: "The shift that no longer demands monumental willpower." },
      { q: "At what times of the day do you need unbreakable anchor habits?", hint: "The first hour after waking and the hour before sleep." },
      { q: "How will you guard this standard when you return to ordinary routine?", hint: "Weekly self-audits, review readings, community support." },
      { q: "To whom will you remain accountable to ensure standards never slip?", hint: "Your mentor, a trusted ally, your own written journal." }
    ],
    exerciseTitle: "The Daily Consolidation Anchor",
    exerciseSteps: [
      "Define a non-negotiable 10-minute daily review ritual.",
      "Establish a simple tracking metric (e.g., daily green/red indicator).",
      "Decide on an intrinsic reward for maintaining unbroken consistency."
    ],
    exerciseLabel: "My non-negotiable daily maintenance ritual:",
    commitment: "Repetition is the mother of mastery. I embrace daily discipline with devotion.",
    nextDay: "Tomorrow we draft your Personal Immediate Response Protocol."
  },
  20: {
    day: 20,
    stageNumber: 3,
    stageName: "Stage III: Practice and Integrate (Days 15–21)",
    title: "My Personal Immediate Response Protocol",
    quote: "Under extreme pressure you do not rise to the occasion; you sink to the level of your training.",
    quoteAuthor: "Archilochus",
    context: "You stand one day from graduation. Today you distill all 20 days into a battle card: your emergency protocol for when life strikes hard. When the fire breaks out, you know exactly what sequence to execute.",
    questions: [
      { q: "What are the 3 golden laws of your personal code of conduct?", hint: "1. Never reply in anger. 2. Breathe before deciding. 3. Honor my word." },
      { q: "What will you execute in the initial 60 seconds of a grave provocation?", hint: "Your somatic and procedural sequence." },
      { q: "What is your power phrase that silences panic instantly?", hint: "Your declaration of sovereign self-command." },
      { q: "What values are non-negotiable under any circumstance?", hint: "Integrity, honor, equanimity, temperance." }
    ],
    exerciseTitle: "The Warrior's Battle Card",
    exerciseSteps: [
      "Step 1: Trigger Detected -> Stop vocalization.",
      "Step 2: Biology -> 3 deep breaths and jaw release.",
      "Step 3: Analysis -> Observable fact vs. mental story?",
      "Step 4: Choice -> Select response that honors my code.",
      "Step 5: Action -> Execute firmly without lingering resentment."
    ],
    exerciseLabel: "My 5-step emergency response battle card:",
    commitment: "This protocol is my armor and compass. I will live up to this standard.",
    nextDay: "Tomorrow is Day 21: Final synthesis, evaluation, and the 30-day roadmap."
  },
  21: {
    day: 21,
    stageNumber: 3,
    stageName: "Stage III: Practice and Integrate (Days 15–21)",
    title: "Final Synthesis, Evaluation, and 30-Day Continuity",
    quote: "You are not the one who began this page 21 days ago. That man has died. The warrior you are now bears new scars, new clarity, and an inextinguishable fire.",
    quoteAuthor: "Jafeth López",
    context: "You have arrived. Twenty-one days of visceral, relentless work. You have dismantled the old character, inhabited the gap, and mastered conscious response architecture. This is not the conclusion of the path; it is your initiation as master of your own mind.",
    questions: [
      { q: "Who were you on Day 1, and who are you today on Day 21?", hint: "Contrast your emotional poise, mental clarity, and strength." },
      { q: "What is the most tangible behavioral shift others now observe in you?", hint: "Your tone of voice, calm composure, and ability to listen without reacting." },
      { q: "What are your 3 sacred commitments for the next 30 days?", hint: "Non-negotiable practices to sustain this momentum." },
      { q: "What message do you leave for your future self when revisiting this journal?", hint: "Your words of courage and personal testimony." }
    ],
    exerciseTitle: "The Warrior's Oath & 30-Day Continuity Roadmap",
    exerciseSteps: [
      "Review your accumulated journal entries across all 21 days.",
      "Draft your personal oath of honor.",
      "Set a calendar date 30 days out to audit your progress with your mentor."
    ],
    exerciseLabel: "My Warrior's Oath and 30-day continuity plan:",
    commitment: "The old self has perished. The warrior walks with resolve. I will honor this transformation every single day.",
    nextDay: "You have completed the 21-Day Mental Reprogramming. Your new self is born."
  }
};

export function getCurriculumDay(dayNumber: number, locale: Locale = 'es'): CurriculumDay {
  const dataset = locale === 'en' ? CURRICULUM_EN : CURRICULUM_ES;
  return dataset[dayNumber] || CURRICULUM_ES[dayNumber] || CURRICULUM_ES[1];
}
