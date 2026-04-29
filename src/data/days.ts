export interface QuestionData {
  q: string;
  hint: string;
}

export interface DayData {
  day: number;
  week: number;
  weekName: string;
  title: string;
  quote: string;
  quoteAuthor: string;
  context: string;
  questions: QuestionData[];
  exerciseTitle: string;
  exerciseSteps: string[];
  exerciseLabel: string;
  commitment: string;
  nextDay: string;
}

export const DAYS: DayData[] = [
  // ---- SEMANA 1: DESTRUIR EL VIEJO YO ----
  {
    day: 1, week: 1, weekName: "Semana 1: Destruir el viejo yo",
    title: "¿Quién eres realmente?",
    quote: "Antes de poder convertirte en quien debes ser, tienes que estar dispuesto a dejar de ser quien has sido.",
    quoteAuthor: "Hal Elrod",
    context: "La mayoría de las personas pasan toda su vida siendo un personaje que otros escribieron para ellos. Sus creencias, sus valores, incluso sus sueños — prestados, heredados, impuestos. Este diario comienza con la pregunta más incómoda que existe: ¿quién eres sin las etiquetas que te dieron? Hoy no respondes desde el hábito. Hoy respondes desde el silencio.",
    questions: [
      { q: "1. ¿Quién eres cuando nadie te está mirando?", hint: "No respondas con tu profesión, tu rol familiar o lo que haces. Responde desde lo que sientes cuando estás completamente solo." },
      { q: "2. ¿Cuáles son los 3 adjetivos que más escuchas de los demás sobre ti?", hint: "¿Cuáles de esos adjetivos te pertenecen y cuáles son jaulas que alguien más construyó?" },
      { q: "3. ¿Qué versión de ti mismo has estado escondiendo y por qué?", hint: "Hay una parte de ti que sabe exactamente quién quieres ser. ¿Por qué no le has dado permiso de existir?" },
      { q: "4. ¿Si no tuvieras miedo, ¿quién serías mañana?", hint: "Sé específico. No 'feliz' ni 'exitoso'. ¿Qué harías diferente? ¿Cómo te vestirías, hablarías, movería tu cuerpo?" }
    ],
    exerciseTitle: "El espejo sin filtros",
    exerciseSteps: [
      "Siéntate frente a un espejo. Mira tus ojos directamente durante 60 segundos sin apartar la mirada.",
      "Pregúntate en voz alta: '¿Quién eres tú realmente?' Observa la incomodidad sin huir de ella.",
      "Escribe debajo todo lo que surgió — emociones, imágenes, palabras sueltas, resistencia. Sin editar."
    ],
    exerciseLabel: "Lo que vi y sentí en el espejo:",
    commitment: "Hoy me comprometo a empezar a conocer al hombre que realmente soy, no al personaje que he interpretado. Me comprometo a mirar donde duele, porque ahí está la verdad.",
    nextDay: "Mañana descubrirás la mentira más grande que te contaste a ti mismo."
  },
  {
    day: 2, week: 1, weekName: "Semana 1: Destruir el viejo yo",
    title: "La mentira que te contaste",
    quote: "El primer paso para cambiar es reconocer que has estado mintiendo — primero que nadie, a ti mismo.",
    quoteAuthor: "Wayne Dyer",
    context: "Existe una narrativa que llevas repitiendo años. Una historia sobre por qué las cosas no funcionan, por qué no puedes, por qué no es tu momento. Esa narrativa no es la realidad. Es una mentira que repites tan seguido que se volvió tu verdad. Hoy la pones en papel para verla a la cara.",
    questions: [
      { q: "1. ¿Cuál es la frase que más te dices a ti mismo cuando algo sale mal?", hint: "Esa frase automática que aparece sin que la invites. ¿De dónde viene originalmente?" },
      { q: "2. ¿Cuál es la historia sobre ti mismo que justifica por qué no has avanzado?", hint: "'Soy así porque...', 'No puedo porque...', 'No es mi momento porque...' Escríbela completa." },
      { q: "3. ¿Quién fue el primer autor de esa mentira?", hint: "¿Una voz de tu infancia? ¿Una experiencia que interpretaste como evidencia? ¿Una derrota que generalizaste?" },
      { q: "4. Si esa historia fuera falsa, ¿qué sería posible para ti?", hint: "Describe en detalle cómo cambiaría tu vida si eliminases esa historia de raíz." }
    ],
    exerciseTitle: "La quema de narrativas",
    exerciseSteps: [
      "Escribe tu historia limitante completa en un papel separado — todo lo que crees que te detiene. Sin censura.",
      "Léela en voz alta una vez. Escucha cómo suena. ¿Es realmente tuya o es una voz prestada?",
      "Si puedes, quema ese papel de manera segura. Si no, rómpelo en pedazos. Escribe abajo cómo te sentiste."
    ],
    exerciseLabel: "Lo que sentí al confrontar y destruir esa mentira:",
    commitment: "Hoy me comprometo a dejar de ser el narrador de una historia que me limita. Esa historia termina aquí. Lo que viene después lo escribo yo.",
    nextDay: "Mañana convertirás tus creencias limitantes en palabras concretas en papel."
  },
  {
    day: 3, week: 1, weekName: "Semana 1: Destruir el viejo yo",
    title: "Tus creencias limitantes en papel",
    quote: "Las creencias tienen el poder de crear y el poder de destruir. Los seres humanos tienen el poder de tomar cualquier experiencia de sus vidas y crear un significado que los debilita o uno que los fortalece.",
    quoteAuthor: "Tony Robbins",
    context: "Una creencia limitante no es solo un pensamiento negativo. Es una conclusión que tomaste en algún momento de tu vida — generalmente en un momento de dolor o derrota — y que desde entonces has estado usando como mapa. El problema es que el mapa no es el territorio. Hoy trazamos el inventario completo de esos mapas rotos.",
    questions: [
      { q: "1. ¿Qué crees sobre el dinero y las personas que lo tienen?", hint: "Escribe las primeras cosas que vienen a tu mente. Sin filtrar. ¿Qué aprendiste sobre la riqueza en tu entorno de origen?" },
      { q: "2. ¿Qué crees sobre tu capacidad para alcanzar grandes metas?", hint: "¿Hay una parte de ti que no se cree merecedora del éxito? ¿De dónde viene esa sensación?" },
      { q: "3. ¿Qué crees sobre el tipo de personas que te rodean vs las que deberían rodearte?", hint: "¿Sientes que no encajas con personas de alto rendimiento? ¿Por qué?" },
      { q: "4. ¿Qué creencia sobre ti mismo te gustaría destruir para siempre hoy?", hint: "Nómbrala con precisión quirúrgica. No 'soy inseguro'. ¿Inseguro en qué contexto, frente a quién, bajo qué condiciones?" }
    ],
    exerciseTitle: "El inventario de cadenas",
    exerciseSteps: [
      "Haz una lista de al menos 10 creencias limitantes que identificas en ti. Número cada una.",
      "Al lado de cada creencia, escribe: '¿Es esto un hecho o una interpretación?'",
      "Elige la creencia más dañina y escribe debajo su versión opuesta, expandida y poderosa."
    ],
    exerciseLabel: "Mi creencia más dañina convertida en su opuesto poderoso:",
    commitment: "Hoy comienzo a ver mis creencias como lo que son: decisiones que tomé, no verdades absolutas. Y lo que se decide, se puede re-decidir.",
    nextDay: "Mañana harás el funeral del ego viejo — una de las prácticas más poderosas de este diario."
  },
  {
    day: 4, week: 1, weekName: "Semana 1: Destruir el viejo yo",
    title: "El funeral del ego viejo",
    quote: "Para nacer de nuevo, primero debes morir. El guerrero no teme a la muerte del ego — la celebra.",
    quoteAuthor: "Joseph Campbell",
    context: "El ego viejo no se va solo. Hay que enterrarlo con ceremonia, con intención, con precisión. No es un ejercicio metafórico superficial. Es un acto deliberado de declarar que quien fuiste ya no tiene jurisdicción sobre quien serás. Hoy escribes el obituario de tu versión anterior.",
    questions: [
      { q: "1. ¿Cuáles son los hábitos del 'yo viejo' que han estado saboteando tu avance?", hint: "Sé brutalmente honesto. Procrastinación, escapismo, victimismo, excesos. Nómbralos sin dramatismo y sin autocompasión." },
      { q: "2. ¿Cuáles son las relaciones que el yo viejo mantenía por miedo, costumbre o culpa?", hint: "No se trata de juzgar a nadie. Se trata de ver con claridad dónde has estado invirtiendo energía que ya no te sirve." },
      { q: "3. ¿Cuáles son las identidades que el yo viejo usaba como escudo?", hint: "'Soy el que siempre ayuda', 'soy el rebelde', 'soy el que no necesita a nadie'. ¿Cuáles de esas máscaras ya no te representan?" },
      { q: "4. ¿Qué legado quieres que tenga el yo viejo? ¿Qué aprendiste de él que vale la pena honrar?", hint: "No todo fue perdida. Hubo valor, lecciones, resistencia. ¿Qué te lleva de ese hombre al hombre nuevo?" }
    ],
    exerciseTitle: "El obituario del guerrero",
    exerciseSteps: [
      "Escribe un obituario completo para tu yo anterior. Incluye: su nombre, sus miedos principales, sus limitaciones, sus logros a pesar de todo.",
      "Termina el obituario con la frase: 'Descansa en paz. Yo tomo el testigo y prometo no desperdiciar lo que sufriste para conseguir.'",
      "Escribe abajo cómo te sientes después de haber escrito ese obituario."
    ],
    exerciseLabel: "El obituario de mi yo anterior:",
    commitment: "Hoy entierro con gratitud y respeto al hombre que era. No como derrota, sino como graduación. El funeral terminó. La vida nueva comienza.",
    nextDay: "Mañana mapearás tu identidad actual con total claridad."
  },
  {
    day: 5, week: 1, weekName: "Semana 1: Destruir el viejo yo",
    title: "El mapa de tu identidad actual",
    quote: "Tu identidad no es lo que te pasó. Es la historia que decides contarte sobre lo que te pasó.",
    quoteAuthor: "Brené Brown",
    context: "Antes de diseñar quien quieres ser, necesitas saber exactamente donde estás parado hoy. No desde el juicio, sino desde la geografía. El mapa no juzga el terreno — lo describe. Hoy describes tu terreno con toda la honestidad que puedas reunir.",
    questions: [
      { q: "1. ¿Cómo te describes a ti mismo en este momento en una sola oración?", hint: "No lo que aspiras ser. Quien eres hoy, en este instante, con todas sus luces y sombras." },
      { q: "2. ¿Cuáles son tus 5 valores más importantes actualmente?", hint: "No los que crees que deberías tener. Los que realmente guían tus decisiones diarias. ¿Cómo lo sabes? Mira en qué gastas tu tiempo y tu dinero." },
      { q: "3. ¿En qué áreas de tu vida estás operando con excelencia?", hint: "Serio. ¿Dónde está funcionando bien? El guerrero no solo ve lo que falta — también ve lo que ya construyó." },
      { q: "4. ¿En qué áreas estás saboteando tu propio crecimiento consistentemente?", hint: "No una vez. Consistentemente. Ese patrón que se repite aunque sepas que no funciona." }
    ],
    exerciseTitle: "La rueda del guerrero",
    exerciseSteps: [
      "Dibuja un círculo y divídelo en 8 secciones: Salud, Finanzas, Relaciones, Espiritualidad, Carrera, Familia, Mentalidad, Propósito.",
      "Puntúa cada área de 1 a 10 según tu honestidad actual, no según tus aspiraciones.",
      "Mira las áreas más bajas. Escribe una acción concreta que podrías tomar esta semana en cada una."
    ],
    exerciseLabel: "Mi rueda del guerrero — puntuaciones y acciones inmediatas:",
    commitment: "Veo mi realidad sin distorsiones. No me juzgo, me evalúo. Y me evalúo porque me importa lo que construya con lo que me queda de vida.",
    nextDay: "Mañana enfrentarás la pregunta que más asusta: ¿A quién le tienes miedo de ser?"
  },
  {
    day: 6, week: 1, weekName: "Semana 1: Destruir el viejo yo",
    title: "¿A quién le tienes miedo de ser?",
    quote: "Nuestro miedo más profundo no es que seamos inadecuados. Nuestro miedo más profundo es que somos poderosos más allá de toda medida.",
    quoteAuthor: "Marianne Williamson",
    context: "Hay una versión de ti que ya sabes que existe. La has visto en destellos — en momentos de claridad, en sueños, en conversaciones que te dejaron sin palabras. Y la tienes enterrada. No por falta de capacidad. Por miedo al costo que tiene vivir en ese nivel. Hoy la sacas a la luz.",
    questions: [
      { q: "1. ¿Cuál es la versión de ti mismo que más te asusta materializar? Descríbela.", hint: "No la que quieres ser. La que temes ser porque implicaría un cambio radical en tu vida tal como la conoces." },
      { q: "2. ¿Qué perderías si realmente te convirtieras en esa persona?", hint: "¿Relaciones? ¿Comodidad? ¿La validación de tu entorno actual? El miedo siempre protege algo. ¿Qué está protegiendo el tuyo?" },
      { q: "3. ¿Qué te diría esa versión futura de ti sobre las excusas que usas hoy?", hint: "Imagina que esa persona está sentada frente a ti ahora mismo. ¿Qué te dice? Escríbelo sin misericordia." },
      { q: "4. ¿Qué tendrías que hacer esta semana para empezar a convertirte en esa persona?", hint: "Una sola acción. Concreta. Medible. Que duela un poco." }
    ],
    exerciseTitle: "La carta al yo que temes ser",
    exerciseSteps: [
      "Escribe una carta desde ese yo futuro y poderoso, dirigida a quien eres hoy.",
      "Que sea directa, sin compasión innecesaria, sin sermones. Que diga lo que realmente necesitas escuchar.",
      "Termina la carta con una instrucción específica para los próximos 7 días."
    ],
    exerciseLabel: "Carta desde el yo que me da miedo ser:",
    commitment: "El miedo a mi propia grandeza termina hoy. No como declaración vacía, sino como decisión que respaldaré con acción.",
    nextDay: "Mañana completas la Semana 1 con el ritual de cierre más poderoso del diario."
  },
  {
    day: 7, week: 1, weekName: "Semana 1: Destruir el viejo yo",
    title: "Ritual de cierre de semana",
    quote: "El guerrero que revisa su batalla con honestidad es el único que puede mejorar su estrategia.",
    quoteAuthor: "Sun Tzu",
    context: "Siete días. Siete confrontaciones con las capas más profundas de quien has sido. Antes de cruzar al siguiente nivel — plantar la nueva mente — necesitas hacer el ritual de cierre. No como formalidad. Como acto de integración. Lo que no se integra, se repite.",
    questions: [
      { q: "1. ¿Cuál fue el día más difícil de esta semana y por qué?", hint: "¿Dónde sentiste más resistencia? La resistencia siempre señala hacia lo importante." },
      { q: "2. ¿Qué descubriste sobre ti mismo esta semana que no sabías?", hint: "Un patrón, una creencia, un miedo, una fuerza. ¿Qué emergió del trabajo de estos 7 días?" },
      { q: "3. ¿Cuál es el cambio más pequeño pero más real que ya empezaste a hacer?", hint: "No el que planeas. El que ya comenzó, aunque sea imperceptible para los demás." },
      { q: "4. ¿Qué le dirías a alguien que está a punto de comenzar este diario?", hint: "Desde tu experiencia de estos 7 días. Desde tu verdad, no desde el deber ser." }
    ],
    exerciseTitle: "El altar del guerrero",
    exerciseSteps: [
      "Busca un espacio tranquilo. Pon frente a ti algo que represente al hombre que quieres ser — puede ser una imagen, una palabra escrita, un objeto con significado.",
      "Siéntate en silencio durante 5 minutos. Solo respira. Sin agenda. Sin producir.",
      "Al terminar, escribe una promesa para la Semana 2. Una sola. Específica. No una lista."
    ],
    exerciseLabel: "Mi promesa para la Semana 2:",
    commitment: "Completé la primera semana. No perfectamente — con humanidad. Y eso es suficiente para ganar el derecho de continuar.",
    nextDay: "La Semana 2 comienza mañana. Ahora que destruiste al viejo yo, es momento de diseñar al guerrero que serás."
  },

  // ---- SEMANA 2: PLANTAR LA NUEVA MENTE ----
  {
    day: 8, week: 2, weekName: "Semana 2: Plantar la nueva mente",
    title: "Diseña al guerrero que serás",
    quote: "No encuentras al guerrero que eres. Lo construyes, con cada decisión que tomas cuando nadie te está aplaudiendo.",
    quoteAuthor: "Jafeth López",
    context: "Terminaste de limpiar el terreno. Ahora viene la parte que más energía requiere y que más personas evitan: diseñar con precisión arquitectónica quién serás. No desde el deseo vago. Desde la ingeniería de identidad. Cada atributo elegido, cada valor instalado, cada hábito seleccionado con intención.",
    questions: [
      { q: "1. ¿Cuáles son los 5 atributos de carácter que definen al guerrero que diseñas?", hint: "No virtudes genéricas. Atributos específicos que tú eliges conscientemente como columnas de tu nueva identidad." },
      { q: "2. ¿Cómo piensa ese guerrero cuando enfrenta obstáculos?", hint: "Describe su diálogo interno. ¿Qué se dice a sí mismo cuando algo sale mal? ¿Cómo procesa la adversidad?" },
      { q: "3. ¿Cómo gestiona ese guerrero su tiempo, energía y atención?", hint: "¿A qué dice no automáticamente? ¿Cómo empieza sus mañanas? ¿Qué protege como sagrado?" },
      { q: "4. ¿Cuál es la misión que ese guerrero lleva en el corazón?", hint: "No el trabajo. No el negocio. La misión — el 'para qué' profundo que lo mueve cuando nada más lo mueve." }
    ],
    exerciseTitle: "El diseño de identidad",
    exerciseSteps: [
      "Escribe una declaración de identidad que comience con: 'Yo soy el tipo de persona que...' — mínimo 10 líneas.",
      "Sé específico y presente. No 'quiero ser'. 'Soy'. Esta es la instalación del nuevo programa.",
      "Léela en voz alta tres veces. Con convicción. Aunque todavía no la sientas completamente verdadera."
    ],
    exerciseLabel: "Mi declaración de identidad — 'Yo soy el tipo de persona que...':",
    commitment: "Hoy no espero a convertirme en el guerrero que diseño. Comienzo a actuar desde esa identidad, ahora, aunque mis circunstancias aún no lo reflejen.",
    nextDay: "Mañana aprenderás las afirmaciones que realmente reprograman — no las vacías, las que transforman."
  },
  {
    day: 9, week: 2, weekName: "Semana 2: Plantar la nueva mente",
    title: "Afirmaciones que sí funcionan",
    quote: "Una afirmación sin emoción es solo ruido. Una afirmación con emoción es una orden al subconsciente.",
    quoteAuthor: "Bob Proctor",
    context: "Las afirmaciones tienen mala reputación porque la mayoría las hace mal. Las repiten sin emoción, sin convicción, sin imagen interna — como si fueran magia verbal. No lo son. Son una herramienta de reprogramación neural que solo funciona cuando viene acompañada de estado emocional elevado y de una imagen mental clara. Hoy aprendes a hacerlas bien.",
    questions: [
      { q: "1. ¿Cuáles son las 3 creencias sobre ti mismo que más necesitas instalar?", hint: "No el opuesto genérico de tus miedos. La creencia específica, detallada, que cambiaría tu comportamiento si fuera completamente real para ti." },
      { q: "2. ¿Cómo se siente el estado emocional que quieres instalar?", hint: "Cierra los ojos. Imagina que ya eres esa persona, que ya tienes eso que buscas. ¿Qué sientes en el cuerpo? Descríbelo físicamente." },
      { q: "3. ¿En qué momentos del día tienes más acceso a estados emocionales elevados?", hint: "¿Por las mañanas antes de que el mundo despierte? ¿Después de ejercitarte? ¿En la noche? Identifica tus ventanas de receptividad." },
      { q: "4. ¿Qué imagen mental acompañará tus afirmaciones diarias?", hint: "Una escena específica, detallada, con colores, sonidos, sensaciones. Tu mente necesita cinematografía, no palabras solas." }
    ],
    exerciseTitle: "Las 5 afirmaciones del guerrero",
    exerciseSteps: [
      "Crea 5 afirmaciones en primera persona, tiempo presente, cargadas de emoción y especificidad.",
      "Cada afirmación debe comenzar con 'Yo soy', 'Yo tengo', 'Yo vivo', 'Yo creo', o 'Yo elijo'.",
      "Escríbelas abajo y comprométete a leerlas en voz alta cada mañana y cada noche durante los próximos 14 días."
    ],
    exerciseLabel: "Mis 5 afirmaciones del guerrero:",
    commitment: "Las afirmaciones no son deseos. Son decretos. Los decreto con toda la convicción de alguien que ya sabe cómo termina la historia.",
    nextDay: "Mañana vas más profundo: la visualización guiada escrita."
  },
  {
    day: 10, week: 2, weekName: "Semana 2: Plantar la nueva mente",
    title: "Visualización guiada escrita",
    quote: "La imaginación es la vista del alma. Y el alma siempre crea lo que ve con suficiente intensidad.",
    quoteAuthor: "Thomas Troward",
    context: "El cerebro no distingue con claridad entre una experiencia real vivida intensamente y una experiencia imaginada con suficiente detalle emocional. Esta es la base neurocientífica de la visualización. No es pensamiento mágico — es ingeniería del cerebro. Hoy construyes, con palabras, la película de tu vida nueva con tanta precisión que tu subconsciente comienza a tratarla como instrucción.",
    questions: [
      { q: "1. ¿Cómo es un día ordinario en la vida del hombre que has diseñado?", hint: "Desde que abre los ojos. ¿Dónde está? ¿Con quién? ¿Qué siente al despertar? ¿Cómo es su cuerpo, su espacio, su ritmo?" },
      { q: "2. ¿Qué tipo de conversaciones tiene ese hombre con regularidad?", hint: "Con sus colaboradores, su familia, su pareja, sus mentores. ¿Sobre qué hablan? ¿Cuál es la energía de esas conversaciones?" },
      { q: "3. ¿Cuál es el logro que más te costaría creer que es posible para ti?", hint: "El más grande. El que tu ego dice que es arrogante incluso considerar. Escríbelo de todos modos." },
      { q: "4. ¿Cómo te sentirás cuando eso que más quieres finalmente sea tu realidad?", hint: "Emoción por emoción. No 'feliz'. ¿Orgullo? ¿Paz? ¿Gratitud profunda? ¿Liberat? Nómbralas todas." }
    ],
    exerciseTitle: "La película de tu vida nueva",
    exerciseSteps: [
      "Busca silencio completo. Pon música instrumental si ayuda. Cierra los ojos por 3 minutos e imagina un día en tu vida dentro de 3 años.",
      "Ahora ábrelos y escribe esa escena completa, en presente, con lujo de detalle sensorial.",
      "Termina escribiendo cómo te sientes al final de ese día imaginario."
    ],
    exerciseLabel: "La película de mi vida nueva — escrita en presente, con detalle completo:",
    commitment: "Visito esta película mental cada día. No como escape. Como entrenamiento. Mi mente practica mi futuro antes de que llegue.",
    nextDay: "Mañana trabajarás el concepto más transformador de todo el diario: el estado del ser."
  },
  {
    day: 11, week: 2, weekName: "Semana 2: Plantar la nueva mente",
    title: "El estado del ser",
    quote: "El estado interno crea el mundo externo. Quien cambia cómo es, cambia lo que tiene.",
    quoteAuthor: "Joe Dispenza",
    context: "La mayoría de las personas espera que sus circunstancias cambien para sentirse de otra manera. Pero la ley es exactamente al revés: tienes que ser primero — en estado interno, en frecuencia emocional, en identidad asumida — y las circunstancias eventualmente se reorganizan para reflejar lo que eres. Neville Goddard lo llamó 'vivir desde el fin'. Hoy practicas eso.",
    questions: [
      { q: "1. ¿Cuál es el estado emocional en el que vives la mayor parte del tiempo?", hint: "¿Ansiedad crónica? ¿Impaciencia? ¿Entusiasmo? ¿Duda? Sé honesto. No el que quisieras tener — el que tienes." },
      { q: "2. ¿Cuál es el estado que necesitas habitar para atraer lo que quieres?", hint: "Si ya tuvieras todo lo que buscas: tu negocio, tu salud, tus relaciones. ¿Desde qué estado emocional vivirías ese día?" },
      { q: "3. ¿Qué actividades o prácticas te elevan instantáneamente a ese estado?", hint: "¿Movimiento físico? ¿Música específica? ¿Oración? ¿Lectura? ¿Silencio? Mapea tus portales de estado." },
      { q: "4. ¿Cuántas horas por día vives en el estado que quieres instalar?", hint: "Sé honesto al contar. Y luego decide: ¿cuál es una acción concreta para aumentar ese número mañana?" }
    ],
    exerciseTitle: "El salto de estado",
    exerciseSteps: [
      "Identifica un estado emocional bajo en el que estés ahora o hayas estado hoy.",
      "Elige deliberadamente el estado que quieres. Pon música que lo evoque, cambia tu postura, respira profundo 10 veces.",
      "Escribe abajo qué cambió en tu cuerpo y en tus pensamientos cuando hiciste ese cambio deliberado de estado."
    ],
    exerciseLabel: "Mi experiencia del salto de estado deliberado:",
    commitment: "No espero a que el mundo me dé razones para sentirme bien. Yo creo el estado primero. Y desde ese estado, construyo.",
    nextDay: "Mañana tomarás las 3 decisiones más importantes de tu transformación."
  },
  {
    day: 12, week: 2, weekName: "Semana 2: Plantar la nueva mente",
    title: "Tus 3 decisiones irrevocables",
    quote: "En el momento de mayor compromiso, la providencia también se mueve. Lo que sea que puedas hacer, o sueñes que puedes, comienza. La audacia tiene genio, poder y magia.",
    quoteAuthor: "Goethe",
    context: "Una decisión irrevocable es diferente a una intención. Una intención tiene puerta trasera. Una decisión irrevocable quema los barcos. Es cuando tu mente deja de procesar alternativas y comienza a procesar solo rutas hacia el destino. Las personas que logran transformaciones reales no son las más inteligentes ni las más talentosas. Son las que tomaron decisiones sin salida de emergencia.",
    questions: [
      { q: "1. ¿En qué área de tu vida llevas posposit más tiempo? ¿Por qué?", hint: "El área que sabes que necesita una decisión grande pero que siempre encuentras razones para no tomarla." },
      { q: "2. ¿Cuál es el costo real de NO tomar esa decisión en los próximos 5 años?", hint: "Sé brutal. Financiero, emocional, físico, relacional. ¿Qué costo pagará la persona que no decide?" },
      { q: "3. ¿Qué necesitarías creer sobre ti mismo para tomar esa decisión hoy?", hint: "No la garantía externa. La creencia interna. ¿Qué tipo de persona toma ese tipo de decisión?" },
      { q: "4. ¿Si superas que el éxito está garantizado, qué decisión tomarías ahora mismo?", hint: "Sin el miedo al fracaso en la ecuación. ¿Qué harías?" }
    ],
    exerciseTitle: "Las 3 decisiones irrevocables",
    exerciseSteps: [
      "Escribe 3 decisiones que llevas tiempo evitando y que sabes que necesitas tomar.",
      "Para cada una, escribe: qué quemas al tomarla, qué ganas al quemarlo, y cuándo empieza.",
      "Fírmala. Ponle fecha. Trátala como contrato legal contigo mismo."
    ],
    exerciseLabel: "Mis 3 decisiones irrevocables — con fecha y firma:",
    commitment: "Hoy tomo decisiones, no intenciones. Y una vez tomadas, mi energía no va a evaluar si estuvieron bien — va a ejecutar.",
    nextDay: "Mañana recibirás una carta de tu yo futuro — la práctica más poderosa de esta semana."
  },
  {
    day: 13, week: 2, weekName: "Semana 2: Plantar la nueva mente",
    title: "Carta de tu yo futuro",
    quote: "El futuro no es algo que te pasa. Es algo que convocas desde adentro con suficiente claridad y suficiente fe.",
    quoteAuthor: "Neville Goddard",
    context: "Existe una versión de ti mismo que ya vive la vida que hoy solo imaginas. Que ya tomó las decisiones, superó los miedos, construyó lo que tú todavía sueñas. Esa versión quiere comunicarse contigo. No como fantasía — como ancla. Cuando escribes desde ese yo futuro hacia el tú de hoy, activas capas de motivación y claridad que la lógica sola no puede alcanzar.",
    questions: [
      { q: "1. ¿Cuántos años en el futuro situarás a tu yo futuro?", hint: "Elige un número específico que sea transformador pero alcanzable. ¿3 años? ¿5? ¿10? ¿Dónde ese hombre ya llegó?" },
      { q: "2. ¿Cuáles son las 3 cosas más importantes que ese yo futuro quiere que sepas hoy?", hint: "No clichés motivacionales. Las cosas reales. Las que solo alguien que ya vivió el proceso podría decirte." },
      { q: "3. ¿Qué te dirá ese yo futuro sobre los sacrificios que hiciste para llegar?", hint: "¿Valió la pena? ¿Qué te costó más? ¿Qué fue más fácil de lo que pensabas?" },
      { q: "4. ¿Cuál es la advertencia más importante que ese yo futuro te hace sobre el camino?", hint: "El obstáculo que probablemente enfrentarás. El error que probablemente cometerás. ¿Qué te diría para que no lo repitas?" }
    ],
    exerciseTitle: "La carta del tiempo",
    exerciseSteps: [
      "Siéntate en silencio 3 minutos. Visualiza a tu yo futuro sentado frente a ti, en paz, seguro, realizado.",
      "Ahora escribe la carta completa desde ese yo futuro, dirigida al tú de hoy. Mínimo una página.",
      "No edites. No perfecciones. Solo escribe sin parar hasta que sientas que terminó."
    ],
    exerciseLabel: "Carta de mi yo futuro hacia quien soy hoy:",
    commitment: "Me conecto con quien seré para encontrar la fuerza que necesito ahora. El futuro no está lejos — está en las decisiones de hoy.",
    nextDay: "Mañana es el ritual de revisión de la Semana 2 — un momento de integración antes del siguiente nivel."
  },
  {
    day: 14, week: 2, weekName: "Semana 2: Plantar la nueva mente",
    title: "Revisión de la semana",
    quote: "La reflexión honesta no es debilidad. Es la herramienta de mejora más sofisticada que existe.",
    quoteAuthor: "Ray Dalio",
    context: "Dos semanas completadas. Catorce días de confrontación, diseño y plantación. Antes de entrar a la Semana 3 — anclar la transformación — necesitas hacer inventario. No de lo que faltó, sino de lo que emergió. La transformación real ya comenzó. Hoy la reconoces.",
    questions: [
      { q: "1. ¿Cuál fue la práctica de esta semana que más movió algo en ti?", hint: "¿Las afirmaciones? ¿La visualización? ¿La carta de tu yo futuro? ¿Por qué esa en particular?" },
      { q: "2. ¿Qué cambio en tu comportamiento puedes observar ya, aunque sea pequeño?", hint: "No en tus pensamientos. En tu comportamiento observable. ¿Qué hiciste diferente esta semana?" },
      { q: "3. ¿Cuál de las decisiones irrevocables del Día 12 ya empezaste a ejecutar?", hint: "Si no empezaste ninguna, pregúntate honestamente: ¿qué historia estás contándote para justificarlo?" },
      { q: "4. ¿Qué necesitas de la Semana 3 para que este proceso sea completo?", hint: "¿Más claridad? ¿Más estructura? ¿Más silencio? ¿Más acción? Pídelo con precisión." }
    ],
    exerciseTitle: "El mapa de las dos semanas",
    exerciseSteps: [
      "Escribe una línea de tiempo simple: Día 1 → Día 14. Marca los momentos de mayor impacto con una estrella.",
      "Entre cada hito marcado, escribe en una frase qué cambió internamente.",
      "Al final del mapa, escribe: 'El hombre que empieza la Semana 3 es...'"
    ],
    exerciseLabel: "Mi mapa de las dos semanas y quién empieza la Semana 3:",
    commitment: "Dos semanas me cambiaron. Una semana más me ancla. Estoy listo.",
    nextDay: "La Semana 3 comienza mañana: anclar la transformación para que sea permanente."
  },

  // ---- SEMANA 3: ANCLAR LA TRANSFORMACIÓN ----
  {
    day: 15, week: 3, weekName: "Semana 3: Anclar la transformación",
    title: "El hábito maestro del guerrero",
    quote: "No somos lo que pensamos que somos. Somos lo que hacemos repetidamente. La excelencia no es un acto — es un hábito.",
    quoteAuthor: "Aristóteles",
    context: "Dos semanas de trabajo interno producen claridad y energía. Pero sin hábitos que anclen esa energía en acción diaria, la transformación se evapora. El guerrero no confía en la motivación — construye sistemas. Un hábito maestro es el hábito que, cuando está presente, hace que todos los demás sean más fáciles. Para muchos es la mañana. Para otros es el movimiento físico. Para ti puede ser algo diferente. Hoy lo identificas.",
    questions: [
      { q: "1. ¿Cuál es el hábito que, cuando lo tienes, todo lo demás fluye mejor?", hint: "Piensa en tus mejores días. ¿Qué hiciste en la mañana? ¿Qué no dejaste de hacer? Ahí está tu hábito maestro." },
      { q: "2. ¿Por qué no tienes ese hábito instalado de forma consistente?", hint: "No la razón superficial. La razón real. ¿Miedo al compromiso? ¿Identidad incompatible? ¿Sistema roto?" },
      { q: "3. ¿Cuál sería la versión más pequeña posible de ese hábito que podrías empezar mañana?", hint: "Tan pequeña que sea imposible no hacerla. James Clear llama a esto el 'hábito de dos minutos'. ¿Cuál es el tuyo?" },
      { q: "4. ¿Cómo medirás si el hábito está instalado después de 21 días?", hint: "Define el criterio de éxito con precisión. No 'lo hago seguido'. Define cuántos días por semana, a qué hora, bajo qué condición." }
    ],
    exerciseTitle: "El sistema del guerrero",
    exerciseSteps: [
      "Elige un solo hábito maestro para los próximos 90 días. Solo uno.",
      "Diseña el detonador (cuándo), la rutina (qué exactamente) y la recompensa (qué sigue).",
      "Escribe abajo el sistema completo y comprométete a rastrearlo cada día con un punto o una marca."
    ],
    exerciseLabel: "Mi sistema de hábito maestro — detonador, rutina, recompensa:",
    commitment: "Dejo de depender de la motivación. Construyo el sistema. Y el sistema me construye a mí.",
    nextDay: "Mañana explorarás cómo tu entorno físico refleja y moldea tu identidad."
  },
  {
    day: 16, week: 3, weekName: "Semana 3: Anclar la transformación",
    title: "Tu entorno como espejo",
    quote: "Eres el promedio de las cinco personas con las que más tiempo pasas, los cinco libros que más lees, y los cinco ambientes que más frecuentas.",
    quoteAuthor: "Jim Rohn",
    context: "Tu entorno no es neutral. Cada objeto en tu espacio, cada persona en tu círculo, cada contenido en tu feed — todo le está hablando a tu subconsciente. Le está diciendo quién eres y qué es normal para ti. Si tu entorno habla el idioma del yo viejo, es cuestión de tiempo antes de que tu transformación retroceda. Hoy auditas tu entorno con ojos nuevos.",
    questions: [
      { q: "1. ¿Tu espacio físico refleja al hombre que quieres ser o al que eras?", hint: "Tu cuarto, tu escritorio, tu carro. ¿Qué dice sobre tus valores actuales? ¿Qué cambiarías si esa persona nueva lo viera por primera vez?" },
      { q: "2. ¿Cuáles de las personas en tu círculo cercano están alineadas con quien te estás convirtiendo?", hint: "No los que quieres que estén. Los que realmente apoyan, entienden o al menos respetan tu proceso de transformación." },
      { q: "3. ¿Qué estás consumiendo — contenido, conversaciones, medios — que contradice tu nueva identidad?", hint: "Sin juicio. Solo observa. ¿Qué entra a tu mente regularmente que siembra duda, comparación o parálisis?" },
      { q: "4. ¿Qué cambio en tu entorno físico o social harías esta semana si de verdad creyeras que importa?", hint: "Un cambio concreto. No 'relacionarme con mejores personas'. ¿A quién específicamente llamarás, evitarás, o buscarás?" }
    ],
    exerciseTitle: "La auditoría del entorno",
    exerciseSteps: [
      "Camina por tu espacio principal de vida. Míralo como si fuera la primera vez. ¿Qué le habla al yo viejo y qué al nuevo?",
      "Haz dos listas: lo que eliminarás o reducirás, y lo que agregarás o aumentarás.",
      "Escoge una acción de cada lista y hazla hoy o mañana. Escribla abajo."
    ],
    exerciseLabel: "Mi auditoría del entorno — qué elimino, qué agrego, qué haré hoy:",
    commitment: "Diseño mi entorno para que trabaje para mí, no contra mí. Cada cambio en mi espacio es un voto por la persona que me estoy convirtiendo.",
    nextDay: "Mañana resolverás el debate eterno: ¿disciplina o motivación?"
  },
  {
    day: 17, week: 3, weekName: "Semana 3: Anclar la transformación",
    title: "Disciplina vs motivación",
    quote: "La motivación te lleva al gimnasio. La disciplina te mantiene yendo cuando no quieres ir.",
    quoteAuthor: "Brian Tracy",
    context: "La motivación es un estado emocional. Aparece y desaparece. Depender de ella para sostener tu transformación es como construir una casa sobre arena. La disciplina, en cambio, es una decisión de identidad: actúo porque eso es lo que yo hago, no porque me sienta inspirado. El guerrero no espera tener ganas. El guerrero actúa y las ganas aparecen después.",
    questions: [
      { q: "1. ¿En qué área de tu vida te has estado esperando a 'tener ganas' para actuar?", hint: "¿El ejercicio? ¿El proyecto? ¿La conversación difícil? Nombrala sin suavizarla." },
      { q: "2. ¿Cuál es la historia que te cuentas para justificar la espera?", hint: "'No es el momento', 'cuando tenga X', 'cuando me sienta listo'. ¿Cuánto tiempo llevas diciéndola?" },
      { q: "3. ¿Cuál sería el costo de esperar un año más para tomar esa acción?", hint: "Sé brutal con los números, las relaciones, la salud, la oportunidad perdida." },
      { q: "4. ¿Qué acción podrías tomar en los próximos 5 minutos que demuestre que no necesitas ganas para empezar?", hint: "No el proyecto completo. El primer paso físico. El más pequeño que sea irreversible." }
    ],
    exerciseTitle: "El contrato de disciplina",
    exerciseSteps: [
      "Identifica el área donde más te cuesta mantener disciplina.",
      "Escribe un contrato contigo mismo con tres elementos: qué harás, cuándo lo harás, y cuál es la consecuencia si no lo haces.",
      "La consecuencia debe ser real y significativa — no dolorosa, pero sí que importe."
    ],
    exerciseLabel: "Mi contrato de disciplina — qué, cuándo, consecuencia:",
    commitment: "No espero motivación. La disciplina es mi motor. Y la construyo actuando, especialmente cuando no quiero.",
    nextDay: "Mañana descubrirás la gratitud como frecuencia, no como práctica de bienestar."
  },
  {
    day: 18, week: 3, weekName: "Semana 3: Anclar la transformación",
    title: "La gratitud como frecuencia",
    quote: "La gratitud no es lo que haces. Es lo que eres. Y cuando eres gratitud, vives en la frecuencia que atrae más de lo que valoras.",
    quoteAuthor: "Joe Dispenza",
    context: "La gratitud mainstream — las listas de 'tres cosas buenas' — es superficial. La gratitud como frecuencia es diferente. Es entrar en un estado físico de reconocimiento genuino tan profundo que tu cuerpo literalmente cambia su química. Los guerreros que sostienen transformaciones de largo plazo operan desde esta frecuencia. No como práctica de bienestar — como táctica de rendimiento.",
    questions: [
      { q: "1. ¿Cuáles son los 5 aspectos de tu vida actual por los que sientes gratitud genuina y profunda?", hint: "No las cosas que crees que deberías agradecer. Las que realmente te llenan cuando las contemplas. Las que te harían falta si desaparecieran mañana." },
      { q: "2. ¿Cuáles son las adversidades pasadas que hoy puedes agradecer porque te fortalecieron?", hint: "Las heridas que se convirtieron en sabiduría. Los fracasos que te redirigieron. Las pérdidas que te enseñaron qué importa de verdad." },
      { q: "3. ¿Qué partes de tu proceso de transformación actual puedes agradecer, aunque todavía duelan?", hint: "La disciplina que construyes, los miedos que estás enfrentando, la incomodidad del crecimiento. ¿Puedes agradecer eso?" },
      { q: "4. ¿Cómo cambiaría tu día si empezara siempre desde una frecuencia genuina de gratitud?", hint: "No teóricamente. Específicamente. ¿Cómo tratarías a la gente? ¿Qué decisiones tomarías diferente? ¿Cómo respondería tu cuerpo?" }
    ],
    exerciseTitle: "El estado de gratitud profunda",
    exerciseSteps: [
      "Cierra los ojos. Piensa en algo o alguien por quien sientes amor genuino — un momento, una persona, un logro.",
      "Quédate con esa sensación en el pecho. Nómbrala. Expandela con la respiración. Mantén el estado por 3 minutos.",
      "Escribe abajo lo que surgió — emociones, imágenes, comprensiones."
    ],
    exerciseLabel: "Lo que surgió en mi práctica de gratitud profunda:",
    commitment: "La gratitud es mi punto de partida, no mi punto de llegada. Empiezo cada día desde ella, no hacia ella.",
    nextDay: "Mañana escribirás tu misión de vida completa en una sola página."
  },
  {
    day: 19, week: 3, weekName: "Semana 3: Anclar la transformación",
    title: "Tu misión de vida en 1 página",
    quote: "El hombre sin misión es como un barco sin timón: puede moverse, pero no llegar.",
    quoteAuthor: "Thomas Carlyle",
    context: "Una misión de vida no es una frase inspiradora. Es un documento de navegación. Responde tres preguntas fundamentales: ¿para qué estás aquí?, ¿a quién sirves?, y ¿qué quieres haber logrado cuando mires hacia atrás desde el final. El guerrero que opera desde una misión clara toma mejores decisiones, se recupera más rápido de las caídas, y cansa menos porque su energía no se divide.",
    questions: [
      { q: "1. ¿Para qué crees que estás aquí? (Tu propósito más profundo)", hint: "No la respuesta que impresiona. La que resuena en tu interior cuando el mundo está en silencio. ¿Qué sientes que viniste a hacer o a ser?" },
      { q: "2. ¿A quién quieres servir con tu vida y de qué manera?", hint: "¿Quién se beneficia de que tú seas tu mejor versión? ¿Tu familia? ¿Tu comunidad? ¿Una causa? ¿Cuál es la transformación que quieres generar en otros?" },
      { q: "3. ¿Qué quieres que digan de ti en tu funeral?", hint: "No el elogio estándar. Las tres cosas reales, específicas, que quieres que la gente sienta al recordarte." },
      { q: "4. ¿Cuál es el legado que quieres dejar cuando ya no estés?", hint: "¿Qué quedará de ti en el mundo? ¿Una obra, una familia, un movimiento, una comunidad, una idea?" }
    ],
    exerciseTitle: "La declaración de misión",
    exerciseSteps: [
      "Escribe tu declaración de misión en máximo una página. Debe incluir: propósito, a quién sirves, cómo lo haces, y qué legado dejas.",
      "Hazla personal, específica, y poderosa. No un template. Tu voz, tu verdad.",
      "Léela en voz alta al terminar. ¿Te hace sentir algo? Si no, profundiza más."
    ],
    exerciseLabel: "Mi misión de vida — completa, en mi voz:",
    commitment: "Vivo desde mi misión, no desde mis circunstancias. La misión es el timón. El resto es viento.",
    nextDay: "Mañana harás los compromisos más sagrados de todo el diario: tus compromisos al universo."
  },
  {
    day: 20, week: 3, weekName: "Semana 3: Anclar la transformación",
    title: "Compromisos al universo",
    quote: "En el momento en que uno se compromete plenamente, la providencia también se mueve.",
    quoteAuthor: "W. H. Murray",
    context: "Mañana es el último día. Antes de llegar a la celebración final, necesitas hacer los compromisos más importantes. No los compromisos que le haces a otras personas. Los que le haces al universo, a tu propósito, a las versiones futuras de ti mismo que dependen de que el hombre de hoy cumpla su palabra. Estos no son deseos. Son contratos.",
    questions: [
      { q: "1. ¿Cuál es el compromiso más importante que puedes hacer con tu salud física?", hint: "Específico. Medible. Con fecha de inicio. No 'cuidarme más'. ¿Qué exactamente, cuándo, cómo?" },
      { q: "2. ¿Cuál es el compromiso más importante que puedes hacer con tu propósito o misión?", hint: "Una acción concreta hacia tu misión. El primer paso que no volverás a posponer." },
      { q: "3. ¿Cuál es el compromiso más importante que puedes hacer con las personas que amas?", hint: "No el que suena bien. El que realmente necesitan de ti. El que has estado evitando." },
      { q: "4. ¿Cuál es el compromiso más importante que puedes hacer con tu crecimiento?", hint: "¿Leer? ¿Estudiar? ¿Mentoría? ¿Una comunidad? ¿Un programa? Define exactamente cuál y cuándo empieza." }
    ],
    exerciseTitle: "Los votos del guerrero",
    exerciseSteps: [
      "Escribe 7 compromisos al universo. Uno por cada área vital de tu vida.",
      "Comienza cada uno con: 'Me comprometo, ante lo más sagrado que reconozco, a...'",
      "Fírmalos con tu nombre completo y la fecha de hoy. Son votos, no notas."
    ],
    exerciseLabel: "Mis 7 votos del guerrero — firmados y fechados:",
    commitment: "No hago promesas que no cumpliré. Estos votos los respaldaré con mi tiempo, mi energía y mis decisiones. El universo verá mi consistencia.",
    nextDay: "Mañana es el Día 21. El nuevo yo. La celebración final."
  },
  {
    day: 21, week: 3, weekName: "Semana 3: Anclar la transformación",
    title: "El nuevo yo — celebración final",
    quote: "No eres quien eras. No todavía quien serás. Pero eres, por primera vez, completamente quien decides ser.",
    quoteAuthor: "Jafeth López",
    context: "Llegaste. Veintiún días de trabajo real. De confrontar lo que duele, de diseñar con intención, de anclar con disciplina. Este último día no es un examen. Es una celebración. No porque todo esté perfecto — sino porque cruzaste. Y el hecho de que estés aquí, en el Día 21, con las respuestas de los días anteriores en estas páginas, demuestra que eres el tipo de persona que sí termina lo que empieza.",
    questions: [
      { q: "1. ¿Quién eres hoy comparado con quien era el Día 1?", hint: "Sé específico. Qué cambió en tu mentalidad, tu lenguaje interno, tu comportamiento, tus decisiones. La transformación ya ocurrió — solo nómbrala." },
      { q: "2. ¿Cuál es el regalo más grande que este proceso te dio?", hint: "No el que esperabas. El que recibiste. A veces el proceso nos da algo diferente a lo que pedimos, pero siempre más necesario." },
      { q: "3. ¿A quién le compartirías este diario y por qué?", hint: "¿Hay alguien en tu vida que está en el punto donde tú estabas el Día 1? ¿Cómo le hablarías sobre esta experiencia?" },
      { q: "4. ¿Cuál es el primer acto del hombre nuevo que harás hoy, en las próximas horas?", hint: "Algo concreto. No mañana. Hoy. Un acto que demuestre que el hombre que entró al Día 1 ya no existe." }
    ],
    exerciseTitle: "La carta al mundo",
    exerciseSteps: [
      "Escribe una carta corta — para publicar, para guardar, o para enviarle a alguien — desde quien eres hoy.",
      "No expliques el proceso. Habla desde quien eres ahora. Con la voz de ese guerrero.",
      "Puede ser tu primera pieza de contenido para La Mente del Guerrero. O solo para ti. Pero escríbela."
    ],
    exerciseLabel: "Mi carta al mundo desde el guerrero que soy hoy:",
    commitment: "Veintiún días fue el inicio. Lo que sigue es la vida de un hombre que sabe quién es, hacia dónde va, y por qué vale la pena el costo.",
    nextDay: "Has completado el Diario de Reprogramación Mental. El nuevo yo ha nacido."
  }
];
