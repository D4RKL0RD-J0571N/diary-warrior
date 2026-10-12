import { UserProfile, UserProgressRecord, JournalEntryRecord, OrderRecord, MentorFeedbackRecord } from '@/types/database';

export const INITIAL_STUDENTS: (UserProfile & { progress: UserProgressRecord; order: OrderRecord })[] = [
  {
    id: "user-student-1",
    email: "carlos.mendoza@example.com",
    name: "Carlos Mendoza",
    role: "STUDENT",
    preferredLanguage: "es",
    createdAt: "2026-03-20T10:00:00Z",
    updatedAt: "2026-04-10T14:30:00Z",
    progress: {
      userId: "user-student-1",
      currentDay: 15,
      completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      completedDaysCount: 14,
      isPaid: true,
      isCompleted: false,
      lastActiveAt: "2026-04-11T09:15:00Z",
      updatedAt: "2026-04-11T09:15:00Z"
    },
    order: {
      id: "ord-101",
      userId: "user-student-1",
      customerEmail: "carlos.mendoza@example.com",
      customerName: "Carlos Mendoza",
      provider: "stripe",
      sessionId: "cs_live_998418291823_carlos",
      amount: 4700,
      currency: "usd",
      status: "COMPLETED",
      createdAt: "2026-03-20T10:05:00Z"
    }
  },
  {
    id: "user-student-2",
    email: "elena.vargas@example.com",
    name: "Elena Vargas",
    role: "STUDENT",
    preferredLanguage: "es",
    createdAt: "2026-03-15T08:00:00Z",
    updatedAt: "2026-04-05T19:00:00Z",
    progress: {
      userId: "user-student-2",
      currentDay: 21,
      completedDays: Array.from({ length: 21 }, (_, i) => i + 1),
      completedDaysCount: 21,
      isPaid: true,
      isCompleted: true,
      lastActiveAt: "2026-04-05T19:00:00Z",
      updatedAt: "2026-04-05T19:00:00Z"
    },
    order: {
      id: "ord-102",
      userId: "user-student-2",
      customerEmail: "elena.vargas@example.com",
      customerName: "Elena Vargas",
      provider: "stripe",
      sessionId: "cs_live_382910482910_elena",
      amount: 4700,
      currency: "usd",
      status: "COMPLETED",
      createdAt: "2026-03-15T08:05:00Z"
    }
  },
  {
    id: "user-student-3",
    email: "michael.stone@example.com",
    name: "Michael Stone",
    role: "STUDENT",
    preferredLanguage: "en",
    createdAt: "2026-04-01T15:20:00Z",
    updatedAt: "2026-04-04T12:00:00Z",
    progress: {
      userId: "user-student-3",
      currentDay: 4,
      completedDays: [1, 2, 3],
      completedDaysCount: 3,
      isPaid: true,
      isCompleted: false,
      lastActiveAt: "2026-04-04T12:00:00Z", // Inactive > 7 days (At risk)
      updatedAt: "2026-04-04T12:00:00Z"
    },
    order: {
      id: "ord-103",
      userId: "user-student-3",
      customerEmail: "michael.stone@example.com",
      customerName: "Michael Stone",
      provider: "lemonsqueezy",
      sessionId: "ls_ord_88491028_stone",
      amount: 4700,
      currency: "usd",
      status: "COMPLETED",
      createdAt: "2026-04-01T15:25:00Z"
    }
  },
  {
    id: "user-student-4",
    email: "sofia.torres@example.com",
    name: "Sofía Torres",
    role: "STUDENT",
    preferredLanguage: "es",
    createdAt: "2026-04-08T11:00:00Z",
    updatedAt: "2026-04-11T16:45:00Z",
    progress: {
      userId: "user-student-4",
      currentDay: 5,
      completedDays: [1, 2, 3, 4],
      completedDaysCount: 4,
      isPaid: true,
      isCompleted: false,
      lastActiveAt: "2026-04-11T16:45:00Z",
      updatedAt: "2026-04-11T16:45:00Z"
    },
    order: {
      id: "ord-104",
      userId: "sofia.torres@example.com",
      customerEmail: "sofia.torres@example.com",
      customerName: "Sofía Torres",
      provider: "stripe",
      sessionId: "cs_live_7726152819_sofia",
      amount: 4700,
      currency: "usd",
      status: "COMPLETED",
      createdAt: "2026-04-08T11:04:00Z"
    }
  }
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntryRecord[] = [
  {
    userId: "user-student-1",
    dayNumber: 1,
    languageUsed: "es",
    responses: {
      q0: "En soledad me siento cansado de aparentar seguridad cuando por dentro dudo a menudo.",
      q1: "Escucho 'exigente', 'trabajador', 'distante'. El último es el que más duele porque es mi armadura.",
      q2: "He escondido mi vulnerabilidad y mi deseo de escribir creativamente por miedo a la burla.",
      q3: "Hablaría con calma, dejaría de complacer por compromiso y me vestiría sin pretensiones.",
      exercise: "Al mirarme al espejo vi ojos con mucha fatiga pero con una chispa intacta.",
      commitment: "Dejar el celular a las 9 PM y cenar en silencio con mi familia.",
      sig_name: "Carlos Mendoza",
      sig_date: "2026-03-21",
      sig_time: "21:30"
    },
    isCompleted: true,
    completedAt: "2026-03-21T21:30:00Z",
    updatedAt: "2026-03-21T21:30:00Z"
  },
  {
    userId: "user-student-1",
    dayNumber: 8,
    languageUsed: "es",
    responses: {
      q0: "Apenas 1 segundo. Solía interrumpir de inmediato con un tono defensivo.",
      q1: "Un nudo en la garganta y una urgencia eléctrica de no quedar como perdedor.",
      q2: "Total soberanía sobre el desenlace de la conversación y respeto genuino del equipo.",
      q3: "Escucharía completo, asentiría y diría 'Interesante punto, déjame reflexionar 1 minuto'.",
      exercise: "Mantra: 'Habito la brecha'. Practiqué los 5 segundos antes de contestar un correo tenso.",
      commitment: "Aplicar la pausa de 5 segundos en la reunión de comité de las 11 AM.",
      sig_name: "Carlos Mendoza",
      sig_date: "2026-03-29",
      sig_time: "08:15"
    },
    isCompleted: true,
    completedAt: "2026-03-29T08:15:00Z",
    updatedAt: "2026-03-29T08:15:00Z"
  },
  {
    userId: "user-student-3",
    dayNumber: 1,
    languageUsed: "en",
    responses: {
      q0: "When alone, I realize how much energy I waste chasing shallow external validation.",
      q1: "Driven, anxious, restless. Restless is definitely not my core truth, it's anxiety.",
      q2: "My authentic creative curiosity. I shut it down to chase corporate safety.",
      q3: "I would start leading with calm conviction rather than pleasing everyone in meetings.",
      exercise: "Looked into my eyes. Stared past the fatigue and felt a surge of grounded power.",
      commitment: "Write 500 words for my personal thesis and turn off notifications.",
      sig_name: "Michael Stone",
      sig_date: "2026-04-01",
      sig_time: "20:00"
    },
    isCompleted: true,
    completedAt: "2026-04-01T20:00:00Z",
    updatedAt: "2026-04-01T20:00:00Z"
  }
];

export const INITIAL_MENTOR_FEEDBACK: MentorFeedbackRecord[] = [
  {
    id: "fb-1",
    userId: "user-student-1",
    mentorId: "admin-jafeth",
    dayNumber: 8,
    privateNote: "Carlos demostró un salto cuántico de madurez en la reunión de comité. Se nota que la brecha Frankl está funcionando.",
    mentorFeedback: "Carlos: Excelente trabajo habitando la brecha. Recuerda que no necesitas ganar cada argumento en el momento; tu calma proyecta 10 veces más autoridad que cualquier respuesta apresurada.",
    createdAt: "2026-03-29T18:00:00Z"
  },
  {
    id: "fb-2",
    userId: "user-student-3",
    mentorId: "admin-jafeth",
    dayNumber: 3,
    privateNote: "Michael lleva 7 días inactivo en el Día 4. Podría estar experimentando fricción al deconstruir su máscara corporativa.",
    mentorFeedback: "Michael: Notice when the resistance appears. Day 4 is where the mind pushes back the hardest. Take 5 deep breaths and write just one honest sentence.",
    createdAt: "2026-04-05T10:00:00Z"
  }
];
