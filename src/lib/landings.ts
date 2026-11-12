import type { ImageKey } from "@/lib/images";
import type { RequestTypeId } from "@/lib/requests";

export type ExtraField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "date" | "hidden";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  value?: string;
};

export type InfoCard = {
  title: string;
  text: string;
  href?: string;
};

export type Landing = {
  path: string;
  line: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  whatsappMessage: string;
  requestType: RequestTypeId;
  imageKey: ImageKey;
  trust: string[];
  audience: InfoCard[];
  offers: InfoCard[];
  steps: InfoCard[];
  reasons: InfoCard[];
  faqs: { question: string; answer: string }[];
  fields: ExtraField[];
  related: { href: string; label: string }[];
};

const plazo = {
  question: "¿En cuánto tiempo responden y entregan?",
  answer:
    "La cotización indica el plazo. Depende del equipo, el sitio y la disponibilidad. No publicamos un tiempo genérico.",
};

const cobertura = {
  question: "¿Atienden fuera del oriente del país?",
  answer:
    "El foco es la industria energética y petrolera en el oriente. Si la operación está en otra zona, indíquelo y confirmamos si podemos atenderla.",
};

const audience: InfoCard[] = [
  {
    title: "Operaciones petroleras y energéticas",
    text: "Paradas, mantenimiento y producción que necesitan un proveedor concreto, no un catálogo genérico.",
  },
  {
    title: "Mantenimiento industrial",
    text: "Repuestos, protección y equipos para plantas, talleres, tubería y estructura.",
  },
  {
    title: "Logística de campo",
    text: "Entrega en sitio y soporte cuando la operación está fuera de la ciudad.",
  },
];

const steps: InfoCard[] = [
  {
    title: "Describa la necesidad",
    text: "Indique qué requiere, el sitio y la urgencia. Con eso se arma la cotización.",
  },
  {
    title: "Reciba la cotización",
    text: "El equipo comercial responde por WhatsApp o correo en horario laboral, normalmente en menos de 30 minutos, con alcance, condiciones y plazo.",
  },
  {
    title: "Ejecución en sitio",
    text: "Se entrega el suministro o se moviliza el equipo, según lo cotizado.",
  },
];

const alquilerBase: ExtraField[] = [
  {
    name: "sitio_operacion",
    label: "Ubicación del sitio",
    type: "textarea",
    required: true,
    placeholder: "Estado, municipio, campo o planta. Con esto confirmamos si podemos atender esa zona.",
  },
  { name: "fecha_inicio", label: "Fecha de inicio", type: "date", required: true },
  {
    name: "duracion",
    label: "Duración estimada",
    type: "text",
    required: false,
    placeholder: "Opcional · Ej. 15 días",
  },
  {
    name: "operador",
    label: "¿Requiere operador?",
    type: "select",
    required: false,
    options: ["Sí, con operador", "No", "Por confirmar"],
  },
];

export const landings: Landing[] = [
  {
    path: "alquiler",
    line: "Alquiler de equipos",
    metaTitle: "Alquiler de maquinaria y equipos",
    metaDescription:
      "Cotice vacuum, grúas con operador certificado, soldadura y transporte de campo para operaciones energéticas en el oriente.",
    eyebrow: "Alquiler",
    title: "Maquinaria y equipos para su operación",
    subtitle:
      "Vacuum y cisternas, grúas con operador certificado, soldadura y transporte de campo para industria energética en el oriente. Respondemos en horario comercial. Indique sitio, fecha y capacidad.",
    whatsappMessage: "Hola, quiero cotizar alquiler de equipos.",
    requestType: "alquiler",
    imageKey: "alquiler",
    trust: ["Prioridad HSE", "Entrega en sitio", "Operador cuando aplica", "Flota de campo"],
    audience,
    offers: [
      {
        title: "Vacuum y cisternas",
        text: "Manejo, transporte y disposición de efluentes e hidrocarburos.",
        href: "/alquiler/vacuum-cisternas",
      },
      {
        title: "Grúas industriales",
        text: "Izaje de carga pesada con operadores certificados.",
        href: "/alquiler/gruas",
      },
      {
        title: "Máquinas de soldar",
        text: "Equipos de 300A a 400A y más, para tubería y estructura.",
        href: "/alquiler/soldadura",
      },
      {
        title: "Transporte y campamentos",
        text: "Camiones de carga, camionetas 4x4 y tráilers para campo.",
        href: "/alquiler/transporte",
      },
    ],
    steps,
    reasons: [
      {
        title: "El equipo va con la operación",
        text: "La cotización sale del sitio, la fecha y el tipo de trabajo, no de una tarifa suelta.",
      },
      {
        title: "Operador cuando el trabajo lo exige",
        text: "Las grúas se cotizan con operador certificado. En las demás líneas usted indica si lo necesita.",
      },
      {
        title: "Seguridad primero",
        text: "La integridad del personal y de las instalaciones manda sobre el apuro de la movilización.",
      },
      {
        title: "Un solo contacto comercial",
        text: "WhatsApp o formulario. La solicitud queda con la línea y la campaña de origen.",
      },
    ],
    faqs: [
      plazo,
      cobertura,
      {
        question: "¿El alquiler incluye operador?",
        answer:
          "En grúas, sí: se cotiza con operador certificado. En vacuum, soldadura y transporte, indíquelo en el formulario y lo confirmamos en la cotización.",
      },
    ],
    fields: [
      {
        name: "tipo_equipo",
        label: "Tipo de equipo",
        type: "select",
        required: true,
        options: [
          "Vacuum o cisterna",
          "Grúa industrial",
          "Máquina de soldar",
          "Transporte o campamento",
          "Otro",
        ],
      },
      ...alquilerBase,
    ],
    related: [
      { href: "/suministros", label: "Comprar suministros" },
      { href: "/servicios", label: "Solicitar un servicio" },
      { href: "/epp", label: "Comprar EPP" },
    ],
  },
  {
    path: "alquiler/vacuum-cisternas",
    line: "Alquiler de vacuum y cisternas",
    metaTitle: "Alquiler de vacuum y cisternas",
    metaDescription:
      "Cotice camiones vacuum y cisternas para manejo, transporte y disposición de efluentes e hidrocarburos.",
    eyebrow: "Alquiler · Vacuum y cisternas",
    title: "Vacuum y cisternas para efluentes e hidrocarburos",
    subtitle:
      "Manejo, transporte y disposición en el oriente. Respondemos en horario comercial. Indique fluido, volumen, sitio y fecha.",
    whatsappMessage: "Hola, quiero cotizar alquiler de vacuum o cisterna.",
    requestType: "alquiler",
    imageKey: "vacuum",
    trust: ["Efluentes e hidrocarburos", "Oriente", "Disposición", "Entrega en sitio"],
    audience,
    offers: [
      {
        title: "Camiones vacuum",
        text: "Para succión y manejo de efluentes en operaciones de campo y planta.",
      },
      {
        title: "Cisternas",
        text: "Transporte de fluidos cuando el trabajo pide volumen y ruta definida.",
      },
      {
        title: "Disposición",
        text: "El alcance de la disposición se confirma en la cotización según el fluido y el sitio.",
      },
    ],
    steps,
    reasons: [
      {
        title: "El fluido define el equipo",
        text: "No cotizamos un vacuum genérico. Pedimos tipo de fluido y volumen antes de confirmar.",
      },
      {
        title: "Transporte y disposición en el mismo pedido",
        text: "La cotización deja claro qué incluye el manejo y qué queda fuera.",
      },
      {
        title: "Sitio real de la operación",
        text: "La ubicación cambia equipo, ruta y plazo. Por eso es un dato obligatorio.",
      },
      {
        title: "Prioridad HSE",
        text: "El manejo de efluentes e hidrocarburos se coordina con la seguridad de la operación.",
      },
    ],
    faqs: [
      plazo,
      cobertura,
      {
        question: "¿Qué datos necesitan para cotizar?",
        answer:
          "Tipo de fluido, volumen, ubicación, fecha y duración. Si requiere operador, indíquelo. Con eso confirmamos equipo y alcance de disposición.",
      },
    ],
    fields: [
      { name: "equipo", label: "Equipo", type: "hidden", value: "Vacuum o cisterna" },
      {
        name: "fluido",
        label: "Tipo de fluido",
        type: "text",
        required: true,
        placeholder: "Ej. agua aceitosa, hidrocarburo, lodo",
      },
      {
        name: "volumen",
        label: "Volumen estimado",
        type: "text",
        required: false,
        placeholder: "Opcional · Ej. 80 barriles o 3 viajes",
      },
      ...alquilerBase,
    ],
    related: [
      { href: "/alquiler/gruas", label: "Alquilar grúas" },
      { href: "/alquiler/transporte", label: "Alquilar transporte" },
      { href: "/servicios", label: "Solicitar un servicio" },
    ],
  },
  {
    path: "alquiler/gruas",
    line: "Alquiler de grúas",
    metaTitle: "Alquiler de grúas industriales",
    metaDescription:
      "Cotice grúas industriales para izaje de carga pesada, con operador certificado, en el oriente del país.",
    eyebrow: "Alquiler · Grúas",
    title: "Grúas industriales con operador certificado",
    subtitle:
      "Izaje de carga pesada para montaje, mantenimiento y paradas en el oriente. Respondemos en horario comercial. Indique capacidad, sitio y fecha.",
    whatsappMessage: "Hola, quiero cotizar alquiler de grúa.",
    requestType: "alquiler",
    imageKey: "gruas",
    trust: ["Operador certificado", "Carga pesada", "Oriente", "Prioridad HSE"],
    audience,
    offers: [
      {
        title: "Izaje de carga pesada",
        text: "Equipos de elevación para maniobras de planta, patio y campo.",
      },
      {
        title: "Operador certificado",
        text: "La grúa se cotiza con operador. No es un extra que se descubre después.",
      },
      {
        title: "Maniobra coordinada",
        text: "Capacidad, fecha y sitio definen el equipo. La cotización confirma el alcance.",
      },
    ],
    steps,
    reasons: [
      {
        title: "Operador incluido en la cotización",
        text: "El izaje sale con personal certificado. La seguridad de la maniobra no se improvisa.",
      },
      {
        title: "La capacidad manda",
        text: "Pedimos el izaje requerido para no ofrecer un equipo corto o sobrado.",
      },
      {
        title: "Fecha y sitio",
        text: "La movilización se confirma contra la ventana de la parada o el montaje.",
      },
      {
        title: "Integridad de personas e instalaciones",
        text: "Si la maniobra no se puede hacer con seguridad, no se fuerza.",
      },
    ],
    faqs: [
      plazo,
      cobertura,
      {
        question: "¿La grúa incluye operador?",
        answer:
          "Sí. El alquiler de grúas se cotiza con operador certificado. Indique capacidad de izaje, sitio, fecha y duración.",
      },
    ],
    fields: [
      { name: "equipo", label: "Equipo", type: "hidden", value: "Grúa industrial" },
      {
        name: "capacidad",
        label: "Capacidad de izaje",
        type: "text",
        required: true,
        placeholder: "Ej. 40 toneladas, radio aproximado",
      },
      ...alquilerBase.filter((field) => field.name !== "operador"),
      {
        name: "operador",
        label: "Operador",
        type: "hidden",
        value: "Sí, con operador certificado",
      },
    ],
    related: [
      { href: "/alquiler/transporte", label: "Alquilar transporte" },
      { href: "/alquiler/soldadura", label: "Alquilar soldadura" },
      { href: "/servicios", label: "Solicitar un servicio" },
    ],
  },
  {
    path: "alquiler/soldadura",
    line: "Alquiler de soldadura",
    metaTitle: "Alquiler de máquinas de soldar",
    metaDescription:
      "Cotice máquinas de soldar de 300A a 400A y más para tubería y estructura.",
    eyebrow: "Alquiler · Soldadura",
    title: "Máquinas de soldar de 300A a 400A y más",
    subtitle:
      "Equipos de alta capacidad para tubería y estructura. Indique el amperaje, el tipo de trabajo y el sitio.",
    whatsappMessage: "Hola, quiero cotizar alquiler de máquinas de soldar.",
    requestType: "alquiler",
    imageKey: "soldadura",
    trust: ["300A a 400A y más", "Tubería", "Estructura", "Entrega en sitio"],
    audience,
    offers: [
      {
        title: "Alta capacidad",
        text: "Equipos desde 300A hasta 400A y más, según el trabajo.",
      },
      {
        title: "Tubería",
        text: "Para frentes de soldadura en líneas y reparaciones de planta.",
      },
      {
        title: "Estructura",
        text: "Para fabricación y montaje donde el amperaje no puede quedarse corto.",
      },
    ],
    steps,
    reasons: [
      {
        title: "El amperaje se pide antes",
        text: "Así el equipo coincide con el procedimiento, no con lo que haya en patio.",
      },
      {
        title: "Tubería y estructura",
        text: "Dos usos distintos. El tipo de trabajo cambia la cotización.",
      },
      {
        title: "Con o sin operador",
        text: "Usted indica si el frente ya tiene soldadores o si hay que incluir personal.",
      },
      {
        title: "Entrega en el sitio del trabajo",
        text: "La ubicación y la fecha forman parte de la cotización.",
      },
    ],
    faqs: [
      plazo,
      cobertura,
      {
        question: "¿Qué amperaje manejan?",
        answer:
          "Equipos de alta capacidad, de 300A a 400A y más. Indique el amperaje que exige el procedimiento y el tipo de trabajo.",
      },
    ],
    fields: [
      { name: "equipo", label: "Equipo", type: "hidden", value: "Máquina de soldar" },
      {
        name: "amperaje",
        label: "Amperaje requerido",
        type: "text",
        required: true,
        placeholder: "Ej. 400A",
      },
      {
        name: "tipo_trabajo",
        label: "Tipo de trabajo",
        type: "select",
        required: false,
        options: ["Tubería", "Estructura", "Tubería y estructura", "Otro"],
      },
      ...alquilerBase,
    ],
    related: [
      { href: "/alquiler/gruas", label: "Alquilar grúas" },
      { href: "/suministros", label: "Comprar consumibles" },
      { href: "/epp", label: "Comprar EPP" },
    ],
  },
  {
    path: "alquiler/transporte",
    line: "Alquiler de transporte",
    metaTitle: "Transporte, 4x4 y campamentos móviles",
    metaDescription:
      "Cotice camiones de carga, camionetas 4x4 y campamentos móviles para operaciones de campo.",
    eyebrow: "Alquiler · Transporte",
    title: "Carga, camionetas 4x4 y campamentos móviles",
    subtitle:
      "Flota para operaciones de campo. Indique la ruta, el tipo de carga y si necesita campamento.",
    whatsappMessage: "Hola, quiero cotizar transporte o campamento móvil.",
    requestType: "alquiler",
    imageKey: "transporte",
    trust: ["Carga", "Camionetas 4x4", "Campamentos móviles", "Operaciones de campo"],
    audience,
    offers: [
      {
        title: "Camiones de carga",
        text: "Para mover equipos, materiales y carga de la operación.",
      },
      {
        title: "Camionetas 4x4",
        text: "Unidades de trabajo para acceso a campo.",
      },
      {
        title: "Tráilers y campamentos",
        text: "Campamentos móviles cuando el personal tiene que quedarse en sitio.",
      },
    ],
    steps,
    reasons: [
      {
        title: "La ruta forma parte del precio",
        text: "Origen, destino y tipo de carga evitan una cotización a ciegas.",
      },
      {
        title: "Campo, no ciudad",
        text: "Las 4x4 y los campamentos están pensados para operación, no para traslado urbano.",
      },
      {
        title: "Campamento solo si hace falta",
        text: "Se pregunta aparte para no mezclarlo con un flete simple.",
      },
      {
        title: "Ventana de la operación",
        text: "Fecha y duración definen la unidad y la permanencia en sitio.",
      },
    ],
    faqs: [
      plazo,
      cobertura,
      {
        question: "¿Puedo pedir solo la camioneta o solo el campamento?",
        answer:
          "Sí. Indique el tipo de carga, la ruta y si necesita campamento. La cotización separa cada unidad.",
      },
    ],
    fields: [
      { name: "equipo", label: "Equipo", type: "hidden", value: "Transporte o campamento" },
      {
        name: "ruta",
        label: "Ruta",
        type: "text",
        required: true,
        placeholder: "Origen y destino",
      },
      {
        name: "tipo_carga",
        label: "Tipo de carga",
        type: "text",
        required: false,
        placeholder: "Opcional · Ej. tubería, personal, equipo de izaje",
      },
      {
        name: "campamento",
        label: "¿Necesita campamento móvil?",
        type: "select",
        required: false,
        options: ["Sí", "No", "Por confirmar"],
      },
      ...alquilerBase,
    ],
    related: [
      { href: "/alquiler/vacuum-cisternas", label: "Alquilar vacuum" },
      { href: "/alquiler/gruas", label: "Alquilar grúas" },
      { href: "/servicios", label: "Solicitar un servicio" },
    ],
  },
  {
    path: "suministros",
    line: "Suministros industriales",
    metaTitle: "Suministros y procura industrial",
    metaDescription:
      "Cotice repuestos originales, consumibles y materiales, con procura internacional y entrega en sitio.",
    eyebrow: "Compra · Suministros",
    title: "Repuestos y materiales, entregados en su sitio",
    subtitle:
      "Procura para producción, mantenimiento y refinación. Si el insumo no está en el país, gestionamos la compra internacional.",
    whatsappMessage: "Hola, quiero cotizar un suministro o repuesto.",
    requestType: "repuestos",
    imageKey: "suministros",
    trust: ["Originales cuando aplica", "Procura internacional", "Entrega en sitio", "Mantenimiento y refinación"],
    audience,
    offers: [
      {
        title: "Repuestos y consumibles",
        text: "Piezas y materiales para industria pesada y energética.",
      },
      {
        title: "Compra internacional",
        text: "Cuando la referencia hay que traerla, la logística entra en la cotización.",
      },
      {
        title: "Equipos de producción y mantenimiento",
        text: "Equipos especializados para producción, mantenimiento y refinación.",
      },
    ],
    steps,
    reasons: [
      {
        title: "La referencia manda",
        text: "Pedimos ítem, cantidad y especificación para cotizar lo que la operación usa.",
      },
      {
        title: "Original cuando se exige",
        text: "Si la especificación pide repuesto original, se procura original. Una alternativa se informa antes de comprar.",
      },
      {
        title: "Entrega en sitio",
        text: "El lugar de entrega forma parte del pedido, no de un segundo trámite.",
      },
      {
        title: "Urgencia visible",
        text: "Una parada y una compra planificada no se atienden con el mismo plazo.",
      },
    ],
    faqs: [
      plazo,
      cobertura,
      {
        question: "¿Los repuestos son originales?",
        answer:
          "Cuando la especificación lo exige, procuramos el repuesto original. Si existe una alternativa, se la indicamos antes de comprar.",
      },
      {
        question: "¿Hacen compra internacional?",
        answer:
          "Sí. La cotización incluye la gestión de compra y la entrega en sitio cuando el material viene de fuera.",
      },
    ],
    fields: [
      {
        name: "item",
        label: "Ítem o referencia",
        type: "textarea",
        required: true,
        placeholder: "Descripción, número de parte o especificación",
      },
      {
        name: "cantidad",
        label: "Cantidad",
        type: "text",
        required: true,
        placeholder: "Ej. 12 unidades",
      },
      {
        name: "entrega",
        label: "Lugar de entrega",
        type: "textarea",
        required: true,
        placeholder: "Estado, municipio, planta o almacén. Con esto confirmamos si podemos atender esa zona.",
      },
    ],
    related: [
      { href: "/epp", label: "Comprar EPP" },
      { href: "/maquinaria", label: "Comprar maquinaria" },
      { href: "/alquiler", label: "Alquilar equipos" },
    ],
  },
  {
    path: "epp",
    line: "EPP y HSE",
    metaTitle: "EPP y equipos HSE",
    metaDescription:
      "Cotice indumentaria ignífuga, calzado, protección personal, detección de gases, líneas de vida y contingencias ambientales.",
    eyebrow: "Compra · EPP y HSE",
    title: "Protección para su personal y su instalación",
    subtitle:
      "Indumentaria ignífuga, calzado de seguridad, protección respiratoria, visual y auditiva, detección de gases, líneas de vida y materiales para contingencias ambientales.",
    whatsappMessage: "Hola, quiero cotizar EPP o equipos HSE.",
    requestType: "epp",
    imageKey: "epp",
    trust: ["Indumentaria ignífuga", "Detección de gases", "Líneas de vida", "Contingencias ambientales"],
    audience,
    offers: [
      {
        title: "Indumentaria y calzado",
        text: "Ropa de protección ignífuga y calzado de seguridad para la dotación.",
      },
      {
        title: "Protección respiratoria, visual y auditiva",
        text: "Equipos para el riesgo concreto del frente de trabajo.",
      },
      {
        title: "Gases, líneas de vida y ambiente",
        text: "Detección de gases, líneas de vida y materiales para prevenir y atender contingencias ambientales.",
      },
    ],
    steps,
    reasons: [
      {
        title: "La dotación se arma por rubro",
        text: "Pedimos qué necesita, para cuántas personas y con qué especificación.",
      },
      {
        title: "Norma, si ya la tiene",
        text: "Si el contrato exige una norma, la cotización sale de esa norma.",
      },
      {
        title: "Fecha en sitio",
        text: "La protección que llega tarde no protege. La fecha de necesidad va en el pedido.",
      },
      {
        title: "Personas e instalaciones",
        text: "El criterio es la integridad del personal y de la operación, no el precio suelto.",
      },
    ],
    faqs: [
      plazo,
      cobertura,
      {
        question: "¿Puedo cotizar solo un rubro?",
        answer:
          "Sí. Indique el rubro, la cantidad y, si la tiene, la norma o especificación. No hace falta armar un paquete completo.",
      },
    ],
    fields: [
      {
        name: "rubro",
        label: "Rubro",
        type: "select",
        required: true,
        options: [
          "Indumentaria ignífuga",
          "Calzado de seguridad",
          "Protección respiratoria",
          "Protección visual o auditiva",
          "Detección de gases",
          "Líneas de vida",
          "Contingencias ambientales",
          "Varios rubros",
        ],
      },
      {
        name: "cantidad",
        label: "Cantidad",
        type: "text",
        required: true,
        placeholder: "Personas o unidades",
      },
      {
        name: "norma",
        label: "Norma o especificación",
        type: "text",
        required: false,
        placeholder: "Opcional · Si ya la tiene el contrato",
      },
      {
        name: "fecha_sitio",
        label: "Fecha en que lo necesita en sitio",
        type: "date",
        required: true,
      },
    ],
    related: [
      { href: "/suministros", label: "Comprar suministros" },
      { href: "/servicios", label: "Solicitar un servicio" },
      { href: "/alquiler", label: "Alquilar equipos" },
    ],
  },
  {
    path: "maquinaria",
    line: "Venta de maquinaria",
    metaTitle: "Venta de maquinaria pesada",
    metaDescription:
      "Cotice la compra de maquinaria pesada para producción, mantenimiento y refinación.",
    eyebrow: "Venta · Maquinaria pesada",
    title: "Maquinaria pesada para su operación",
    subtitle:
      "Venta y comercialización de equipos de producción, mantenimiento y refinación. Indique el tipo, la capacidad y si busca equipo nuevo o usado.",
    whatsappMessage: "Hola, quiero cotizar la compra de maquinaria pesada.",
    requestType: "equipos",
    imageKey: "alquiler",
    trust: ["Venta", "Comercialización", "Producción", "Mantenimiento y refinación"],
    audience,
    offers: [
      {
        title: "Producción",
        text: "Equipos para sostener la operación, no para exhibición.",
      },
      {
        title: "Mantenimiento",
        text: "Maquinaria de apoyo a paradas, talleres y frentes de trabajo.",
      },
      {
        title: "Refinación",
        text: "Equipos especializados cuando el proceso lo pide.",
      },
    ],
    steps,
    reasons: [
      {
        title: "Primero el uso",
        text: "Tipo de máquina, capacidad y condición buscada definen la búsqueda.",
      },
      {
        title: "Nueva o usada, dicho de frente",
        text: "Si acepta usada, la cotización no se limita a equipo de fábrica.",
      },
      {
        title: "Plazo y sitio",
        text: "Dónde tiene que trabajar y para cuándo cambia la oferta.",
      },
      {
        title: "Comercialización, no vitrina",
        text: "Conseguimos y cotizamos el equipo. Esta página no es un catálogo con precios.",
      },
    ],
    faqs: [
      plazo,
      cobertura,
      {
        question: "¿Publican precios o stock?",
        answer:
          "No. Cada máquina se cotiza según tipo, capacidad, condición y sitio. El formulario abre esa cotización.",
      },
    ],
    fields: [
      {
        name: "tipo_maquina",
        label: "Tipo de máquina",
        type: "text",
        required: true,
        placeholder: "Ej. grúa, compresor, equipo de producción",
      },
      {
        name: "capacidad",
        label: "Capacidad",
        type: "text",
        required: false,
        placeholder: "Opcional · La capacidad que exige el trabajo",
      },
      {
        name: "condicion",
        label: "Condición buscada",
        type: "select",
        required: false,
        options: ["Nueva", "Usada", "La que tengan disponible"],
      },
      {
        name: "plazo",
        label: "Plazo",
        type: "text",
        required: false,
        placeholder: "Opcional · Ej. antes de la parada de marzo",
      },
    ],
    related: [
      { href: "/importacion", label: "Importar maquinaria desde China" },
      { href: "/alquiler", label: "Alquilar en lugar de comprar" },
      { href: "/suministros", label: "Comprar repuestos" },
    ],
  },
  {
    path: "importacion",
    line: "Importación por encargo",
    metaTitle: "Importación de maquinaria desde China",
    metaDescription:
      "Cotice importación por encargo de maquinaria desde China: procura según especificación, sin catálogo fijo.",
    eyebrow: "Importación · China",
    title: "Maquinaria desde China, por encargo",
    subtitle:
      "Si el equipo no está en plaza, lo cotizamos por encargo desde China según su especificación. Hoy el origen de procura es China.",
    whatsappMessage: "Hola, quiero cotizar importación por encargo de maquinaria desde China.",
    requestType: "importacion",
    imageKey: "transporte",
    trust: ["Por encargo", "Origen China", "Según especificación", "Sin catálogo fijo"],
    audience,
    offers: [
      {
        title: "Maquinaria industrial",
        text: "Equipos de producción, mantenimiento o apoyo a planta que deba traerse bajo pedido.",
      },
      {
        title: "Según su ficha técnica",
        text: "La cotización sale de la especificación, capacidad y condición que usted indique.",
      },
      {
        title: "Procura en China",
        text: "Por ahora la importación por encargo se gestiona desde proveedores en China.",
      },
    ],
    steps: [
      {
        title: "Describa el equipo",
        text: "Tipo de máquina, capacidad, norma si aplica y para cuándo lo necesita.",
      },
      {
        title: "Reciba la cotización",
        text: "El equipo comercial responde con alcance, condiciones y plazo estimado de importación.",
      },
      {
        title: "Encargo e importación",
        text: "Si acepta, se gestiona la compra en China y el proceso de llegada a su zona.",
      },
    ],
    reasons: [
      {
        title: "Por encargo, no de showroom",
        text: "No publicamos stock ni precios fijos. Cada pedido se arma a medida.",
      },
      {
        title: "China como origen actual",
        text: "La línea está enfocada en procura desde China. Si necesita otro origen, indíquelo y lo evaluamos.",
      },
      {
        title: "Especificación primero",
        text: "Sin dato técnico mínimo no hay cotización seria de importación.",
      },
      {
        title: "Zona de entrega",
        text: "Confirmamos si podemos atender la ubicación donde necesita el equipo.",
      },
    ],
    faqs: [
      plazo,
      cobertura,
      {
        question: "¿Importan desde otros países además de China?",
        answer:
          "Por ahora esta línea está enfocada en China. Si requiere otro origen, indíquelo en la solicitud y confirmamos si podemos gestionarlo.",
      },
      {
        question: "¿Tienen catálogo o precios publicados?",
        answer:
          "No. La importación es por encargo: se cotiza según el equipo, la especificación y el plazo que usted indique.",
      },
    ],
    fields: [
      {
        name: "tipo_maquina",
        label: "Tipo de máquina",
        type: "text",
        required: true,
        placeholder: "Ej. compresor, torneado, equipo de producción",
      },
      {
        name: "capacidad",
        label: "Capacidad o especificación",
        type: "textarea",
        required: true,
        placeholder: "Capacidad, modelo de referencia, norma o ficha que ya tenga",
      },
      {
        name: "condicion",
        label: "Condición buscada",
        type: "select",
        required: false,
        options: ["Nueva", "Usada", "La que tengan disponible"],
      },
      {
        name: "plazo",
        label: "Plazo deseado",
        type: "text",
        required: false,
        placeholder: "Opcional · Ej. en 90 días",
      },
      {
        name: "cobertura",
        label: "Ubicación / zona de entrega",
        type: "textarea",
        required: true,
        placeholder: "Estado, municipio, planta o puerto de referencia. Confirmamos si podemos atender esa zona.",
      },
    ],
    related: [
      { href: "/maquinaria", label: "Comprar maquinaria en plaza" },
      { href: "/suministros", label: "Comprar suministros" },
      { href: "/alquiler", label: "Alquilar equipos" },
    ],
  },
  {
    path: "servicios",
    line: "Servicios en campo",
    metaTitle: "Servicios y soporte operacional",
    metaDescription:
      "Solicite soporte operacional, logística de campo y gestión en sitio para industria energética y petrolera.",
    eyebrow: "Servicios",
    title: "Soporte operacional cuando el trabajo es en campo",
    subtitle:
      "Cuando no necesita solo un equipo o un insumo, sino la operación resuelta en sitio: logística, procura y ejecución coordinadas.",
    whatsappMessage: "Hola, quiero cotizar un servicio en campo.",
    requestType: "servicios",
    imageKey: "servicios",
    trust: ["Soporte operacional", "Logística de campo", "Gestión en sitio", "Prioridad HSE"],
    audience,
    offers: [
      {
        title: "Soporte a la operación",
        text: "Personal, equipos y materiales coordinados para el alcance que usted defina.",
      },
      {
        title: "Logística de campo",
        text: "Movilización, transporte y permanencia en sitio.",
      },
      {
        title: "Procura ligada al trabajo",
        text: "Si el servicio necesita un repuesto o un EPP, se cotiza junto, no en otro canal.",
      },
    ],
    steps,
    reasons: [
      {
        title: "El alcance se escribe",
        text: "Sin alcance no hay cotización seria. El formulario pide qué hay que resolver.",
      },
      {
        title: "Especificación, si existe",
        text: "Si ya tiene un documento técnico, lo indica y la cotización sale de ahí.",
      },
      {
        title: "Fecha y sitio",
        text: "El servicio se confirma contra la ventana real de la operación.",
      },
      {
        title: "Seguridad como condición",
        text: "El trabajo en campo se planifica con la integridad del personal y de las instalaciones.",
      },
    ],
    faqs: [
      plazo,
      cobertura,
      {
        question: "¿En qué se diferencia de alquilar un equipo?",
        answer:
          "El alquiler entrega un equipo. El servicio busca dejar resuelta una parte de la operación: logística, procura y ejecución en sitio.",
      },
    ],
    fields: [
      {
        name: "alcance",
        label: "Alcance del trabajo",
        type: "textarea",
        required: true,
        placeholder: "Qué hay que resolver en campo",
      },
      {
        name: "sitio_operacion",
        label: "Ubicación del sitio",
        type: "textarea",
        required: true,
        placeholder: "Estado, municipio, campo o planta. Con esto confirmamos si podemos atender esa zona.",
      },
      {
        name: "fecha",
        label: "Fecha",
        type: "date",
        required: true,
      },
      {
        name: "especificacion",
        label: "¿Tiene especificación técnica?",
        type: "select",
        required: false,
        options: ["Sí, la compartiré por WhatsApp", "No", "Está en borrador"],
      },
    ],
    related: [
      { href: "/alquiler", label: "Alquilar equipos" },
      { href: "/suministros", label: "Comprar suministros" },
      { href: "/epp", label: "Comprar EPP" },
    ],
  },
  {
    path: "contacto",
    line: "Cotización general",
    metaTitle: "Pedir cotización",
    metaDescription:
      "Cuéntenos qué necesita alquilar, comprar o resolver en sitio. Energía Nuevo Oriente le responde con una cotización.",
    eyebrow: "Cotización",
    title: "Cuéntenos qué necesita y le cotizamos",
    subtitle:
      "Alquiler, suministros, EPP, maquinaria o un servicio en sitio. Un solo formulario para el equipo comercial.",
    whatsappMessage: "Hola, quiero cotizar con Energía Nuevo Oriente.",
    requestType: "otra",
    imageKey: "about",
    trust: ["Alquiler", "Suministros", "Maquinaria", "Servicios en sitio"],
    audience,
    offers: [
      {
        title: "Alquilar equipos",
        text: "Vacuum, grúas, soldadura y transporte.",
        href: "/alquiler",
      },
      {
        title: "Comprar suministros",
        text: "Repuestos, consumibles y procura internacional.",
        href: "/suministros",
      },
      {
        title: "Comprar EPP",
        text: "Protección personal, gases y contingencias.",
        href: "/epp",
      },
      {
        title: "Comprar maquinaria",
        text: "Equipos de producción, mantenimiento y refinación.",
        href: "/maquinaria",
      },
      {
        title: "Importación por encargo",
        text: "Maquinaria desde China según especificación.",
        href: "/importacion",
      },
      {
        title: "Pedir un servicio",
        text: "Soporte operacional en campo.",
        href: "/servicios",
      },
    ],
    steps,
    reasons: [
      {
        title: "Una solicitud, una línea",
        text: "Si ya sabe el rubro, entre por su landing. Si no, describa la necesidad aquí.",
      },
      {
        title: "Datos para cotizar",
        text: "Empresa, zona y urgencia evitan una conversación de ida y vuelta.",
      },
      {
        title: "WhatsApp si prefiere escribir",
        text: "El mensaje sale con el motivo. El formulario deja el respaldo.",
      },
      {
        title: "Sin precios publicados",
        text: "Cada operación se cotiza. Esta página no muestra una tarifa genérica.",
      },
    ],
    faqs: [plazo, cobertura],
    fields: [
      {
        name: "cobertura",
        label: "Ubicación / zona de la operación",
        type: "textarea",
        required: true,
        placeholder: "Estado, municipio, campo o planta. Confirmamos si podemos atender esa zona.",
      },
    ],
    related: [
      { href: "/alquiler", label: "Alquilar equipos" },
      { href: "/suministros", label: "Comprar suministros" },
      { href: "/maquinaria", label: "Comprar maquinaria" },
    ],
  },
];

const byPath = new Map(landings.map((landing) => [landing.path, landing]));

export function getLanding(path: string) {
  return byPath.get(path);
}

export function landingParams() {
  return landings.map((landing) => ({ slug: landing.path.split("/") }));
}
