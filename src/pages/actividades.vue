<script setup>
import { ref, computed, reactive } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import NavIcon from '../components/NavIcon.vue'
import CrucigramaVisual from '../components/CrucigramaVisual.vue'

// ── Persistencia ──────────────────────────────────────────────────────────────
const actScore = useLocalStorage('ova-actividades-score', { 1:0, 2:0, 3:0, 4:0, 5:0 })
const actOk    = useLocalStorage('ova-actividades-ok',    { 1:false, 2:false, 3:false, 4:false, 5:false })

// ── Estado UI ─────────────────────────────────────────────────────────────────
const moduloActivo    = ref(1)
const actividadActiva = ref(null)
const estado          = reactive({})

// ═══════════════════════════════════════════════════════════════════
// DATOS DE ACTIVIDADES
// ═══════════════════════════════════════════════════════════════════

// ── MÓDULO 1 ──────────────────────────────────────────────────────
const m1 = [
  {
    id:'m1a1', tipo:'match', titulo:'Emparejar: Componentes de una Solución',
    instruccion:'Haz clic en un término y luego en su definición correcta.',
    pares:[
      {izq:'Soluto',     der:'Componente que se disuelve en la solución'},
      {izq:'Solvente',   der:'Componente que disuelve al soluto'},
      {izq:'Solución',   der:'Mezcla homogénea de soluto y solvente'},
      {izq:'Coloide',    der:'Mezcla con partículas de 1 a 1000 nm'},
      {izq:'Suspensión', der:'Mezcla heterogénea con partículas que sedimentan'},
    ]
  },
  {
    id:'m1a2', tipo:'drag', titulo:'Clasificar Tipos de Mezclas',
    instruccion:'Arrastra cada ejemplo a la categoría correcta.',
    categorias:['Solución','Coloide','Suspensión'],
    items:[
      {texto:'Agua con sal',       cat:'Solución'},
      {texto:'Leche',              cat:'Coloide'},
      {texto:'Agua con harina',    cat:'Suspensión'},
      {texto:'Vinagre',            cat:'Solución'},
      {texto:'Mayonesa',           cat:'Coloide'},
      {texto:'Jugo con pulpa',     cat:'Suspensión'},
      {texto:'Aire',               cat:'Solución'},
      {texto:'Gelatina preparada', cat:'Coloide'},
    ]
  },
  {
    id:'m1a3', tipo:'truefalse', titulo:'Verdadero o Falso: Propiedades de las Soluciones',
    instruccion:'Indica si cada afirmación es verdadera o falsa.',
    items:[
      {texto:'El soluto está en mayor proporción que el solvente.',             resp:false},
      {texto:'Las soluciones son mezclas homogéneas a nivel molecular.',        resp:true},
      {texto:'Una suspensión nunca se separa aunque se deje reposar.',          resp:false},
      {texto:'El efecto Tyndall se observa en coloides pero no en soluciones.', resp:true},
      {texto:'El aire es un ejemplo de solución gaseosa.',                      resp:true},
      {texto:'Las soluciones solo pueden existir en estado líquido.',           resp:false},
    ]
  },
  {
    id:'m1a4', tipo:'fillblank', titulo:'Completar: Definiciones Clave',
    instruccion:'Escribe la palabra que completa cada oración.',
    items:[
      {enunciado:'El _____ es el componente que se disuelve.',                          respuesta:'soluto'},
      {enunciado:'La dispersión de luz en un coloide se llama efecto _____.',           respuesta:'tyndall'},
      {enunciado:'Una mezcla _____ tiene la misma composición en toda su extensión.',   respuesta:'homogenea'},
      {enunciado:'El agua es el solvente _____ porque disuelve gran variedad de sustancias.', respuesta:'universal'},
      {enunciado:'Las partículas de una _____ se sedimentan al dejar reposar.',         respuesta:'suspension'},
    ]
  },
  {
    id:'m1a5', tipo:'order', titulo:'Ordenar: Tamaño de Partículas',
    instruccion:'Ordena de MENOR a MAYOR tamaño de partícula arrastrando los elementos.',
    items:['Ión en solución verdadera','Molécula en solución','Partícula coloidal','Partícula en suspensión'],
    ordenCorr:[0,1,2,3]
  },
  {
    id:'m1a6', tipo:'mcq', titulo:'Selección Múltiple: Conceptos Básicos',
    instruccion:'Responde las 5 preguntas correctamente.',
    preguntas:[
      {texto:'¿Qué característica define a una solución verdadera?',
        opciones:['Partículas visibles a simple vista','Distribución homogénea a nivel molecular','Sedimentación al reposar','Dispersión de luz visible'],correcta:1},
      {texto:'¿Cuál es un ejemplo de solución sólida?',
        opciones:['Agua con sal','Aire','Bronce (Cu + Zn)','Leche'],correcta:2},
      {texto:'¿Por qué el agua se llama "solvente universal"?',
        opciones:['Porque es incolora e inodora','Porque puede disolver gran variedad de sustancias polares','Porque hierve a 100°C','Porque es líquida a temperatura ambiente'],correcta:1},
      {texto:'¿Cuál de estas mezclas NO es una solución?',
        opciones:['Agua + azúcar','Agua + etanol','Agua + arcilla','Agua + sal'],correcta:2},
      {texto:'En el suero fisiológico (agua + NaCl), ¿cuál es el soluto?',
        opciones:['El agua','El NaCl','Ambos por igual','Ninguno'],correcta:1},
    ]
  },
  {
    id:'m1a7', tipo:'match', titulo:'Emparejar: Ejemplos con Tipos de Mezcla',
    instruccion:'Conecta cada ejemplo con su tipo de mezcla.',
    pares:[
      {izq:'Suero oral',         der:'Solución líquida'},
      {izq:'Acero inoxidable',   der:'Solución sólida'},
      {izq:'Aire atmosférico',   der:'Solución gaseosa'},
      {izq:'Niebla',             der:'Coloide (aerosol)'},
      {izq:'Agua turbia de río', der:'Suspensión'},
    ]
  },
  {
    id:'m1a8', tipo:'crucigrama',
    titulo:'Crucigrama: Vocabulario del Módulo 1',
    instruccion:'Completa el crucigrama. Usa las flechas del teclado para moverte entre celdas.',
    palabras:[
      { num:1, dir:'V', row:0, col:2, pista:'Componente que disuelve al soluto',                     respuesta:'SOLVENTE'   },
      { num:2, dir:'H', row:1, col:1, pista:'Mezcla con partículas de 1 a 1000 nm',                 respuesta:'COLOIDE'    },
      { num:3, dir:'H', row:2, col:0, pista:'Mezcla homogénea de soluto y solvente',                 respuesta:'SOLUCION'   },
      { num:3, dir:'V', row:2, col:0, pista:'Mezcla heterogénea cuyas partículas sedimentan',        respuesta:'SUSPENSION' },
      { num:4, dir:'H', row:6, col:2, pista:'Efecto de dispersión de luz en coloides',               respuesta:'TYNDALL'    },
    ]
  },
  {
    id:'m1a9', tipo:'drag', titulo:'¿Es Solución o No?',
    instruccion:'Clasifica cada mezcla como "Solución" o "No es solución".',
    categorias:['Es solución','No es solución'],
    items:[
      {texto:'Agua + azúcar',       cat:'Es solución'},
      {texto:'Agua + aceite',       cat:'No es solución'},
      {texto:'Alcohol + agua',      cat:'Es solución'},
      {texto:'Arena + agua',        cat:'No es solución'},
      {texto:'Agua + sal',          cat:'Es solución'},
      {texto:'Leche con chocolate', cat:'No es solución'},
    ]
  },
  {
    id:'m1a10', tipo:'truefalse', titulo:'Verdadero o Falso: El Efecto Tyndall',
    instruccion:'¿Verdadero o falso sobre el efecto Tyndall?',
    items:[
      {texto:'El efecto Tyndall ocurre cuando la luz atraviesa una solución verdadera.', resp:false},
      {texto:'La leche dispersa la luz porque es un coloide.',                           resp:true},
      {texto:'El agua pura con sal dispersa la luz como un coloide.',                   resp:false},
      {texto:'El tamaño de partícula determina si ocurre el efecto Tyndall.',           resp:true},
      {texto:'Una solución de azúcar en agua mostrará efecto Tyndall.',                 resp:false},
      {texto:'Los coloides tienen partículas más grandes que las soluciones verdaderas.',resp:true},
    ]
  },
]

// ── MÓDULO 2 ──────────────────────────────────────────────────────
const m2 = [
  {
    id:'m2a1', tipo:'match', titulo:'Emparejar: Tipos de Solución por Saturación',
    instruccion:'Conecta cada tipo con su definición.',
    pares:[
      {izq:'Insaturada',    der:'Puede disolver más soluto a la misma temperatura'},
      {izq:'Saturada',      der:'Ha alcanzado el límite máximo de soluto disuelto'},
      {izq:'Sobresaturada', der:'Contiene más soluto del límite normal — metaestable'},
      {izq:'Diluida',       der:'Tiene poca cantidad de soluto en relación al solvente'},
      {izq:'Concentrada',   der:'Tiene mucha cantidad de soluto en relación al solvente'},
    ]
  },
  {
    id:'m2a2', tipo:'drag', titulo:'Clasificar: Insaturada / Saturada / Sobresaturada',
    instruccion:'Arrastra cada situación a su categoría.',
    categorias:['Insaturada','Saturada','Sobresaturada'],
    items:[
      {texto:'30 g KNO₃ en 100 mL (límite: 37 g)',           cat:'Insaturada'},
      {texto:'37 g KNO₃ en 100 mL (límite: 37 g)',           cat:'Saturada'},
      {texto:'Solución enfriada con exceso disuelto',          cat:'Sobresaturada'},
      {texto:'Pizca de sal en 1 litro de agua',               cat:'Insaturada'},
      {texto:'Primeros cristales que aparecen',               cat:'Saturada'},
      {texto:'Dulce cristalizado en estado metaestable',      cat:'Sobresaturada'},
    ]
  },
  {
    id:'m2a3', tipo:'truefalse', titulo:'Verdadero o Falso: Saturación',
    instruccion:'Indica si cada afirmación es verdadera o falsa.',
    items:[
      {texto:'Una solución sobresaturada siempre tiene cristales visibles.',              resp:false},
      {texto:'Al agregar más soluto a una saturada, el exceso precipita.',               resp:true},
      {texto:'Una solución diluida siempre es insaturada.',                              resp:false},
      {texto:'Al calentar una saturada se puede disolver más soluto (sólidos).',         resp:true},
      {texto:'Los dulces cristalizados se producen con soluciones sobresaturadas.',      resp:true},
      {texto:'Una solución concentrada es lo mismo que una solución saturada.',          resp:false},
    ]
  },
  {
    id:'m2a4', tipo:'fillblank', titulo:'Completar: Tipos de Soluciones',
    instruccion:'Completa cada oración con la palabra correcta.',
    items:[
      {enunciado:'Una solución que puede disolver más soluto se llama _____.',              respuesta:'insaturada'},
      {enunciado:'Al enfriar lentamente una saturada caliente puede volverse _____.',       respuesta:'sobresaturada'},
      {enunciado:'La solución con mayor cantidad relativa de soluto se llama _____.',       respuesta:'concentrada'},
      {enunciado:'El estado _____ es inestable: cualquier perturbación provoca cristalización.', respuesta:'sobresaturado'},
      {enunciado:'Una solución con poca cantidad de soluto se denomina _____.',             respuesta:'diluida'},
    ]
  },
  {
    id:'m2a5', tipo:'order', titulo:'Ordenar: De Menos a Más Soluto',
    instruccion:'Ordena de MENOR a MAYOR cantidad de soluto disuelto.',
    items:['Solución diluida','Solución concentrada insaturada','Solución saturada','Solución sobresaturada'],
    ordenCorr:[0,1,2,3]
  },
  {
    id:'m2a6', tipo:'mcq', titulo:'Selección Múltiple: Clasificación de Soluciones',
    instruccion:'Responde las 5 preguntas.',
    preguntas:[
      {texto:'A 25°C la solubilidad del NaCl es 36 g/100mL. Si disuelvo 20 g en 100 mL, es:',
        opciones:['Saturada','Sobresaturada','Insaturada','Precipitada'],correcta:2},
      {texto:'¿Qué caracteriza a una solución sobresaturada?',
        opciones:['Tiene menos soluto que la saturada','Es siempre estable','Contiene más soluto del normal','El soluto no está disuelto'],correcta:2},
      {texto:'Un café muy cargado es ejemplo de solución:',
        opciones:['Diluida e insaturada','Concentrada e insaturada o saturada','Sobresaturada','Coloidal'],correcta:1},
      {texto:'¿Cuándo está saturada una solución?',
        opciones:['Cuando tiene mucho soluto','Cuando no puede disolver más soluto a esa temperatura','Cuando el soluto es visible','Cuando el solvente se evapora'],correcta:1},
      {texto:'Al agregar un cristal a una sobresaturada, ¿qué ocurre?',
        opciones:['Nada','El cristal se disuelve','Se inicia la cristalización del exceso','La solución se vuelve insaturada'],correcta:2},
    ]
  },
  {
    id:'m2a7', tipo:'match', titulo:'Emparejar: Situación → Tipo de Solución',
    instruccion:'Conecta cada situación con el tipo de solución que describe.',
    pares:[
      {izq:'Refresco con mucho azúcar sin cristales',   der:'Concentrada saturada'},
      {izq:'Agua del mar con poca sal (0.1 g/L)',       der:'Diluida insaturada'},
      {izq:'Miel con cristales de azúcar en el fondo',  der:'Saturada con exceso'},
      {izq:'Solución de dulce enfriada sin cristalizar', der:'Sobresaturada'},
      {izq:'Suero fisiológico al 0.9%',                 der:'Diluida fisiológica'},
    ]
  },
  {
    id:'m2a8', tipo:'crucigrama',
    titulo:'Crucigrama: Vocabulario del Módulo 2',
    instruccion:'Completa el crucigrama. Usa las flechas del teclado para moverte entre celdas.',
    palabras:[
      { num:1, dir:'V', row:0, col:2, pista:'Proceso por el que el exceso de soluto forma sólido ordenado', respuesta:'CRISTAL'    },
      { num:2, dir:'V', row:0, col:6, pista:'Componente que se disuelve en el solvente',                     respuesta:'SOLUTO'     },
      { num:3, dir:'V', row:1, col:3, pista:'Solución que puede disolver más soluto',                        respuesta:'INSATURADA' },
      { num:4, dir:'H', row:3, col:3, pista:'Solución con la máxima cantidad de soluto disuelto',            respuesta:'SATURADA'   },
      { num:5, dir:'H', row:6, col:0, pista:'Solución con poca cantidad de soluto',                          respuesta:'DILUIDA'    },
    ]
  },
  {
    id:'m2a9', tipo:'drag', titulo:'Diluida vs Concentrada',
    instruccion:'Clasifica cada ejemplo en "Diluida" o "Concentrada".',
    categorias:['Diluida','Concentrada'],
    items:[
      {texto:'Agua de mar (3.5% sal)',            cat:'Concentrada'},
      {texto:'Agua con una pizca de sal',         cat:'Diluida'},
      {texto:'Ácido sulfúrico industrial (96%)',   cat:'Concentrada'},
      {texto:'Suero fisiológico (0.9% NaCl)',     cat:'Diluida'},
      {texto:'Jarabe de azúcar para repostería',  cat:'Concentrada'},
      {texto:'Infusión de té muy claro',          cat:'Diluida'},
    ]
  },
  {
    id:'m2a10', tipo:'order', titulo:'Pasos para Preparar una Solución Saturada',
    instruccion:'Ordena correctamente los pasos.',
    items:[
      'Agregar porciones pequeñas de soluto agitando',
      'Medir el volumen de solvente en el recipiente',
      'Observar cuándo el soluto ya no se disuelve',
      'Filtrar el exceso de soluto no disuelto',
      'Registrar la masa total de soluto agregado',
    ],
    ordenCorr:[1,0,2,3,4]
  },
]

// ── MÓDULO 3 ──────────────────────────────────────────────────────
const m3 = [
  {
    id:'m3a1', tipo:'match', titulo:'Emparejar: Factor → Efecto en Solubilidad',
    instruccion:'Conecta cada factor con su efecto sobre la solubilidad.',
    pares:[
      {izq:'Aumentar temperatura (sólidos)',    der:'Aumenta la solubilidad'},
      {izq:'Aumentar temperatura (gases)',      der:'Disminuye la solubilidad'},
      {izq:'Aumentar presión (gases)',          der:'Aumenta la solubilidad (Ley de Henry)'},
      {izq:'Soluto polar en solvente polar',    der:'Alta solubilidad (similia similibus)'},
      {izq:'Soluto apolar en solvente polar',   der:'Baja solubilidad'},
    ]
  },
  {
    id:'m3a2', tipo:'drag', titulo:'Sólidos vs Gases: Efecto de la Temperatura',
    instruccion:'Arrastra cada afirmación a la categoría correcta.',
    categorias:['Sólidos','Gases'],
    items:[
      {texto:'Su solubilidad aumenta al calentar',            cat:'Sólidos'},
      {texto:'Su solubilidad disminuye al calentar',          cat:'Gases'},
      {texto:'La Ley de Henry aplica principalmente a estos', cat:'Gases'},
      {texto:'El KNO₃ es un ejemplo típico',                  cat:'Sólidos'},
      {texto:'El CO₂ en refrescos es un ejemplo',             cat:'Gases'},
      {texto:'Su disolución suele ser endotérmica',           cat:'Sólidos'},
      {texto:'El O₂ disuelto en agua sigue este patrón',     cat:'Gases'},
      {texto:'El NaCl casi no cambia su solubilidad con T°', cat:'Sólidos'},
    ]
  },
  {
    id:'m3a3', tipo:'truefalse', titulo:'Verdadero o Falso: Ley de Henry y Solubilidad',
    instruccion:'Evalúa cada afirmación.',
    items:[
      {texto:'La Ley de Henry establece que la solubilidad de un gas aumenta con la presión.',  resp:true},
      {texto:'El O₂ disuelto en agua de lago aumenta en verano.',                              resp:false},
      {texto:'La polaridad del soluto no influye en su solubilidad.',                           resp:false},
      {texto:'El aceite se disuelve mejor en hexano que en agua.',                             resp:true},
      {texto:'La efervescencia al destapar una gaseosa se explica por la Ley de Henry.',       resp:true},
      {texto:'La presión afecta igualmente la solubilidad de sólidos y gases.',               resp:false},
    ]
  },
  {
    id:'m3a4', tipo:'fillblank', titulo:'Completar: Principios de Solubilidad',
    instruccion:'Completa cada oración con el término correcto.',
    items:[
      {enunciado:'El principio "_____ disuelve a lo semejante" explica la miscibilidad.',       respuesta:'similia similibus'},
      {enunciado:'La solubilidad de un gas es proporcional a su _____ parcial (Ley de Henry).', respuesta:'presion'},
      {enunciado:'Al aumentar la temperatura, la solubilidad de los _____ en agua disminuye.',  respuesta:'gases'},
      {enunciado:'La disolución de la mayoría de sólidos es un proceso _____.',                respuesta:'endotermico'},
      {enunciado:'La _____ es la cantidad máxima de soluto en 100 g de solvente.',             respuesta:'solubilidad'},
    ]
  },
  {
    id:'m3a5', tipo:'order', titulo:'Ordenar: Solubilidad del O₂ con Temperatura',
    instruccion:'Ordena de MAYOR a MENOR solubilidad del O₂ al aumentar la temperatura.',
    items:['O₂ a 40°C (6.4 mg/L)','O₂ a 20°C (9.1 mg/L)','O₂ a 10°C (11.3 mg/L)','O₂ a 0°C (14.6 mg/L)'],
    ordenCorr:[3,2,1,0]
  },
  {
    id:'m3a6', tipo:'mcq', titulo:'Selección Múltiple: Solubilidad',
    instruccion:'Responde las 5 preguntas.',
    preguntas:[
      {texto:'KNO₃: 31 g/100mL a 20°C y 64 g/100mL a 40°C. Al enfriar de 40°C a 20°C, ¿cuánto cristaliza?',
        opciones:['31 g','79 g','33 g','Nada'],correcta:2},
      {texto:'¿Por qué un buzo que sube muy rápido sufre descompresión?',
        opciones:['Por el frío','El N₂ disuelto a alta presión sale de solución formando burbujas','Por la presión del traje','Por falta de oxígeno'],correcta:1},
      {texto:'¿Qué explica que el yodo (I₂) se disuelva en alcohol pero no en agua?',
        opciones:['El yodo es más pesado','El yodo es apolar y el alcohol es menos polar que el agua','El yodo reacciona con el agua','La temperatura'],correcta:2},
      {texto:'Al abrir una gaseosa, el CO₂ escapa porque:',
        opciones:['La temperatura sube','La presión disminuye (Ley de Henry)','El CO₂ reacciona con el O₂','Cambia de envase'],correcta:1},
      {texto:'¿Cómo cristalizar una sal cuya solubilidad disminuye al calentar?',
        opciones:['Enfriando','Calentando','Agitando','Añadiendo más solvente'],correcta:1},
    ]
  },
  {
    id:'m3a7', tipo:'match', titulo:'Emparejar: Sustancia y Tipo de Solvente',
    instruccion:'Relaciona cada sustancia con el solvente donde es más soluble.',
    pares:[
      {izq:'Sal (NaCl) — iónico',       der:'Agua (polar)'},
      {izq:'Aceite — apolar',            der:'Hexano (apolar)'},
      {izq:'Azúcar — polar',             der:'Agua (polar)'},
      {izq:'Yodo (I₂) — apolar',         der:'Cloroformo (apolar)'},
      {izq:'Etanol — anfipático',        der:'Agua y alcohol (ambos)'},
    ]
  },
  {
    id:'m3a8', tipo:'crucigrama',
    titulo:'Crucigrama: Vocabulario del Módulo 3',
    instruccion:'Completa el crucigrama. Usa las flechas del teclado para moverte entre celdas.',
    palabras:[
      { num:1, dir:'V', row:1, col:3, pista:'Ley que relaciona solubilidad de gases con presión',      respuesta:'PRESION' },
      { num:2, dir:'H', row:2, col:2, pista:'Representación visual de la solubilidad vs temperatura',  respuesta:'GRAFICA' },
      { num:3, dir:'H', row:3, col:2, pista:'Científico cuya ley describe gases disueltos a presión',  respuesta:'HENRY'   },
      { num:4, dir:'H', row:4, col:3, pista:'Que puede disolverse: dícese de una sustancia',           respuesta:'SOLUBLE' },
      { num:5, dir:'H', row:6, col:2, pista:'Tipo de solvente que disuelve sustancias polares',        respuesta:'POLAR'   },
    ]
  },
  {
    id:'m3a9', tipo:'drag', titulo:'Clasificar: Endotérmico o Exotérmico',
    instruccion:'Clasifica cada proceso según si absorbe o libera calor.',
    categorias:['Endotérmico (absorbe)','Exotérmico (libera)'],
    items:[
      {texto:'Disolución de KNO₃ en agua',              cat:'Endotérmico (absorbe)'},
      {texto:'Disolución de NaOH en agua',              cat:'Exotérmico (libera)'},
      {texto:'Disolución del CO₂ en agua',              cat:'Exotérmico (libera)'},
      {texto:'Solubilidad de KNO₃ aumenta con T',       cat:'Endotérmico (absorbe)'},
      {texto:'Solubilidad del O₂ disminuye con T',      cat:'Exotérmico (libera)'},
      {texto:'Disolución de NH₄NO₃ (frío instantáneo)', cat:'Endotérmico (absorbe)'},
    ]
  },
  {
    id:'m3a10', tipo:'fillblank', titulo:'Completar: Lectura de Gráfica de Solubilidad',
    instruccion:'Usa los datos de la gráfica de KNO₃ para completar.',
    items:[
      {enunciado:'A 20°C la solubilidad del KNO₃ es _____ g/100 mL.',                      respuesta:'31'},
      {enunciado:'A 40°C la solubilidad del KNO₃ es _____ g/100 mL.',                      respuesta:'64'},
      {enunciado:'Al enfriar de 40°C a 20°C, cristalizan _____ g por cada 100 mL.',        respuesta:'33'},
      {enunciado:'La curva de solubilidad del KNO₃ tiene pendiente _____ (positiva/negativa).', respuesta:'positiva'},
      {enunciado:'A mayor temperatura, la solubilidad del KNO₃ _____ (aumenta/disminuye).', respuesta:'aumenta'},
    ]
  },
]

// ── MÓDULO 4 ──────────────────────────────────────────────────────
const m4 = [
  {
    id:'m4a1', tipo:'match', titulo:'Emparejar: Unidades de Concentración',
    instruccion:'Conecta cada unidad con su fórmula o descripción.',
    pares:[
      {izq:'Molaridad (M)', der:'mol de soluto / L de solución'},
      {izq:'Molalidad (m)', der:'mol de soluto / kg de solvente'},
      {izq:'% m/m',         der:'(masa soluto / masa solución) × 100'},
      {izq:'ppm',           der:'mg de soluto / L de solución'},
      {izq:'% v/v',         der:'(volumen soluto / volumen solución) × 100'},
    ]
  },
  {
    id:'m4a2', tipo:'mcq', titulo:'Cálculos de Molaridad',
    instruccion:'Resuelve cada problema de molaridad.',
    preguntas:[
      {texto:'Se disuelven 5.85 g de NaCl (M=58.5 g/mol) en 500 mL. ¿Molaridad?',
        opciones:['0.1 M','0.2 M','1.0 M','2.0 M'],correcta:1},
      {texto:'¿Cuántos moles hay en 2 L de solución 0.5 M?',
        opciones:['0.25 mol','1 mol','2.5 mol','4 mol'],correcta:1},
      {texto:'Para 250 mL de NaOH 0.5M (M=40 g/mol), ¿qué masa se necesita?',
        opciones:['2.5 g','5.0 g','10.0 g','20.0 g'],correcta:1},
      {texto:'Agua con 0.5 mg F⁻ por litro. ¿Concentración en ppm?',
        opciones:['0.05 ppm','0.5 ppm','5 ppm','50 ppm'],correcta:1},
      {texto:'18 g de glucosa (M=180 g/mol) en 500 mL. ¿Molaridad?',
        opciones:['0.1 M','0.2 M','0.5 M','1.0 M'],correcta:1},
    ]
  },
  {
    id:'m4a3', tipo:'truefalse', titulo:'Verdadero o Falso: Concentración',
    instruccion:'Evalúa cada afirmación sobre concentración.',
    items:[
      {texto:'La molaridad cambia con la temperatura porque el volumen varía.',           resp:true},
      {texto:'La molalidad es independiente de la temperatura.',                          resp:true},
      {texto:'2 M significa 2 gramos de soluto por litro de solución.',                  resp:false},
      {texto:'Las ppm se usan principalmente para contaminantes en agua.',               resp:true},
      {texto:'El % m/m siempre suma 100 con el porcentaje del solvente.',               resp:true},
      {texto:'La molalidad se calcula dividiendo moles entre litros de solución.',       resp:false},
    ]
  },
  {
    id:'m4a4', tipo:'order', titulo:'Pasos para Preparar una Solución Molar',
    instruccion:'Ordena correctamente los pasos para preparar 1 L de NaCl 1 M.',
    items:[
      'Calcular la masa: m = M × V × M_molar',
      'Pesar la masa calculada de NaCl',
      'Disolver en una pequeña cantidad de agua destilada',
      'Trasvasar al matraz aforado de 1 L',
      'Completar con agua destilada hasta la marca de 1 L',
    ],
    ordenCorr:[0,1,2,3,4]
  },
  {
    id:'m4a5', tipo:'drag', titulo:'Clasificar: Unidades por Uso',
    instruccion:'Arrastra cada situación a la unidad de concentración más adecuada.',
    categorias:['Molaridad (M)','ppm','% m/m'],
    items:[
      {texto:'Fluoruro en agua potable: 0.5 mg/L',         cat:'ppm'},
      {texto:'HCl en laboratorio de química analítica',    cat:'Molaridad (M)'},
      {texto:'Agua oxigenada para heridas: 3%',            cat:'% m/m'},
      {texto:'Solución buffer en bioquímica',              cat:'Molaridad (M)'},
      {texto:'Plomo en agua de río: 0.01 mg/L',           cat:'ppm'},
      {texto:'Vinagre: 5% de ácido acético',              cat:'% m/m'},
    ]
  },
  {
    id:'m4a6', tipo:'fillblank', titulo:'Completar: Fórmulas de Concentración',
    instruccion:'Completa con el resultado o término correcto.',
    items:[
      {enunciado:'M = n / V. Si n = 0.1 mol y V = 0.5 L, entonces M = _____ mol/L.', respuesta:'0.2'},
      {enunciado:'La fórmula de molaridad es M = _____ / V(L).',                      respuesta:'n'},
      {enunciado:'Para 2 L de solución 3 M, se necesitan _____ moles de soluto.',     respuesta:'6'},
      {enunciado:'La concentración en mg/L equivale a _____ (unidad).',               respuesta:'ppm'},
      {enunciado:'% m/m = (masa soluto / masa _____) × 100.',                         respuesta:'solucion'},
    ]
  },
  {
    id:'m4a7', tipo:'match', titulo:'Emparejar: Concentración con Contexto Real',
    instruccion:'Conecta cada concentración con su aplicación real.',
    pares:[
      {izq:'0.9% NaCl',          der:'Suero fisiológico hospitalario'},
      {izq:'37% HCl',            der:'Ácido clorhídrico concentrado industrial'},
      {izq:'0.5 ppm F⁻',         der:'Agua potable fluorada'},
      {izq:'10 M H₂SO₄',         der:'Solución stock de laboratorio'},
      {izq:'12 g/dL hemoglobina', der:'Concentración normal en sangre'},
    ]
  },
  {
    id:'m4a8', tipo:'crucigrama',
    titulo:'Crucigrama: Vocabulario del Módulo 4',
    instruccion:'Completa el crucigrama. Usa las flechas del teclado para moverte entre celdas.',
    palabras:[
      { num:1, dir:'V', row:0, col:3, pista:'Cantidad de espacio que ocupa la solución (V en M=n/V)',    respuesta:'VOLUMEN'   },
      { num:2, dir:'H', row:1, col:2, pista:'Unidad mol/L usada en química analítica',                   respuesta:'MOLARIDAD' },
      { num:2, dir:'V', row:1, col:2, pista:'Unidad mol/kg solvente, no cambia con la temperatura',      respuesta:'MOLALIDAD' },
      { num:3, dir:'H', row:2, col:1, pista:'Cantidad de materia expresada en mol',                      respuesta:'MOLES'     },
      { num:4, dir:'H', row:4, col:0, pista:'Unidad de masa del sistema internacional',                  respuesta:'GRAMOS'    },
    ]
  },
  {
    id:'m4a9', tipo:'mcq', titulo:'Conversión y Comparación de Unidades',
    instruccion:'Responde las preguntas de conversión.',
    preguntas:[
      {texto:'2.0 g/L de NaOH (M=40 g/mol). ¿Molaridad?',
        opciones:['0.05 M','0.1 M','0.5 M','2.0 M'],correcta:0},
      {texto:'HCl al 37% (d=1.19 g/mL, M=36.5 g/mol). Moles en 1 L:',
        opciones:['10.15','12.06','8.50','37.0'],correcta:1},
      {texto:'Glucosa sanguínea 126 mg/dL. ¿Cuánto en 1 L?',
        opciones:['12.6 mg','126 mg','1260 mg','12600 mg'],correcta:2},
      {texto:'¿Cuál unidad NO depende de la temperatura?',
        opciones:['Molaridad','Molalidad','% v/v','Normalidad'],correcta:1},
      {texto:'KMnO₄ 0.02 M (M=158 g/mol). Concentración en mg/L:',
        opciones:['3.16','31.6','316','3160'],correcta:3},
    ]
  },
  {
    id:'m4a10', tipo:'fillblank', titulo:'Aplicar: Cálculos de % m/m',
    instruccion:'Completa los cálculos de porcentaje en masa.',
    items:[
      {enunciado:'10 g de NaCl en 190 g de agua → masa solución = _____ g.',           respuesta:'200'},
      {enunciado:'% m/m = (10 / 200) × 100 = _____ %.',                                respuesta:'5'},
      {enunciado:'Una solución al 20% tiene 20 g de soluto por cada _____ g de solución.', respuesta:'100'},
      {enunciado:'Si la solución es 100 g y el soluto es 15 g, el % m/m es _____ %.',   respuesta:'15'},
      {enunciado:'Para 500 g de solución al 10%, se necesitan _____ g de soluto.',      respuesta:'50'},
    ]
  },
]

// ── MÓDULO 5 ──────────────────────────────────────────────────────
const m5 = [
  {
    id:'m5a1', tipo:'match', titulo:'Emparejar: Variables de C₁V₁ = C₂V₂',
    instruccion:'Conecta cada variable con su significado en la fórmula de dilución.',
    pares:[
      {izq:'C₁',      der:'Concentración inicial (solución madre)'},
      {izq:'V₁',      der:'Volumen inicial tomado de la solución madre'},
      {izq:'C₂',      der:'Concentración final (solución diluida)'},
      {izq:'V₂',      der:'Volumen total final de la solución diluida'},
      {izq:'V₂ − V₁', der:'Volumen de solvente que se debe agregar'},
    ]
  },
  {
    id:'m5a2', tipo:'fillblank', titulo:'Aplicar la Fórmula de Dilución',
    instruccion:'Resuelve usando C₁V₁ = C₂V₂. Escribe solo el número.',
    items:[
      {enunciado:'C₁=6M, V₁=50mL, C₂=2M → V₂ = _____ mL.',              respuesta:'150'},
      {enunciado:'C₁=12M, C₂=0.6M, V₂=250mL → V₁ = _____ mL.',          respuesta:'12.5'},
      {enunciado:'C₁=5M, V₁=80mL, C₂=2M → V₂ = _____ mL.',              respuesta:'200'},
      {enunciado:'C₁=5M, V₁=80mL, C₂=2M → Agua a agregar = _____ mL.',  respuesta:'120'},
      {enunciado:'C₁=18M, C₂=0.9M, V₂=500mL → V₁ = _____ mL.',          respuesta:'25'},
    ]
  },
  {
    id:'m5a3', tipo:'truefalse', titulo:'Verdadero o Falso: Dilución',
    instruccion:'Evalúa cada afirmación sobre dilución.',
    items:[
      {texto:'En una dilución, el número de moles de soluto no cambia.',                resp:true},
      {texto:'V₂ es el volumen de agua que se agrega, no el volumen final.',            resp:false},
      {texto:'Una dilución 1:10 reduce la concentración a una décima parte.',           resp:true},
      {texto:'Al diluir, la concentración puede aumentar si se agrega más soluto.',     resp:false},
      {texto:'En laboratorio, siempre se agrega el ácido sobre el agua.',              resp:true},
      {texto:'C₁V₁ = C₂V₂ es válida porque los moles de soluto se conservan.',        resp:true},
    ]
  },
  {
    id:'m5a4', tipo:'order', titulo:'Pasos para Realizar una Dilución en Laboratorio',
    instruccion:'Ordena correctamente los pasos de una dilución segura.',
    items:[
      'Calcular V₁ usando C₁V₁ = C₂V₂',
      'Agregar agua destilada al matraz aforado',
      'Medir el volumen V₁ de la solución madre',
      'Verter lentamente V₁ sobre el agua (ácido sobre agua)',
      'Completar con agua hasta la marca V₂',
    ],
    ordenCorr:[0,1,2,3,4]
  },
  {
    id:'m5a5', tipo:'drag', titulo:'¿Se Está Diluyendo o Concentrando?',
    instruccion:'Clasifica cada acción como dilución o concentración.',
    categorias:['Dilución','Concentración'],
    items:[
      {texto:'Agregar agua a ácido sulfúrico de laboratorio',  cat:'Dilución'},
      {texto:'Hervir una solución para evaporar solvente',     cat:'Concentración'},
      {texto:'Tomar 10 mL de HCl 12M y llevar a 100 mL',     cat:'Dilución'},
      {texto:'Añadir más NaCl a una solución existente',       cat:'Concentración'},
      {texto:'Diluir jugo concentrado con agua',               cat:'Dilución'},
      {texto:'Dejar evaporar agua de salmuera',                cat:'Concentración'},
    ]
  },
  {
    id:'m5a6', tipo:'mcq', titulo:'Problemas de Dilución',
    instruccion:'Resuelve cada problema.',
    preguntas:[
      {texto:'50 mL de HCl 6M se diluyen a 150 mL. ¿Concentración final?',
        opciones:['1M','2M','3M','6M'],correcta:1},
      {texto:'Preparar 200 mL de glucosa 5% desde solución al 50%. ¿Cuánto tomar?',
        opciones:['5 mL','10 mL','20 mL','50 mL'],correcta:2},
      {texto:'Dilución 1:10 cuatro veces desde 10⁶ bacterias/mL. ¿Concentración final?',
        opciones:['1000','100','10','10000'],correcta:1},
      {texto:'C₁=12M, C₂=0.5M, V₂=480mL. ¿V₁?',
        opciones:['10 mL','20 mL','24 mL','40 mL'],correcta:1},
      {texto:'80 mL de H₂SO₄ 5M para obtener 2M. ¿Qué agua agregar?',
        opciones:['80 mL','120 mL','160 mL','200 mL'],correcta:1},
    ]
  },
  {
    id:'m5a7', tipo:'match', titulo:'Emparejar: Tipo de Dilución → Descripción',
    instruccion:'Conecta cada tipo de dilución con su descripción.',
    pares:[
      {izq:'Dilución simple',        der:'Agregar solvente a una solución para reducir su concentración'},
      {izq:'Dilución en serie 1:10', der:'Diluciones sucesivas de factor 10 para concentraciones muy bajas'},
      {izq:'Dilución por mezcla',    der:'Mezclar dos soluciones de diferente concentración'},
      {izq:'Dilución stock',         der:'Preparar solución diluida a partir de solución madre'},
      {izq:'Microdilución',          der:'Diluciones en volúmenes pequeños para análisis clínico'},
    ]
  },
  {
    id:'m5a8', tipo:'crucigrama',
    titulo:'Crucigrama: Vocabulario del Módulo 5',
    instruccion:'Completa el crucigrama. Usa las flechas del teclado para moverte entre celdas.',
    palabras:[
      { num:1, dir:'H', row:0, col:1, pista:'Solución de alta concentración de referencia',            respuesta:'MADRE'   },
      { num:2, dir:'V', row:0, col:3, pista:'Proceso de reducir la concentración añadiendo solvente',  respuesta:'DILUCION'},
      { num:3, dir:'H', row:6, col:2, pista:'Expresión matemática que rige el proceso: C₁V₁=C₂V₂',    respuesta:'FORMULA' },
      { num:4, dir:'V', row:6, col:5, pista:'Los moles de soluto se _____ durante la dilución',        respuesta:'MOLES'   },
      { num:5, dir:'H', row:7, col:4, pista:'Cantidad total de espacio de la solución diluida',        respuesta:'VOLUMEN' },
    ]
  },
  {
    id:'m5a9', tipo:'fillblank', titulo:'Dilución en Serie',
    instruccion:'Completa sobre diluciones seriadas.',
    items:[
      {enunciado:'Una dilución 1:10 reduce la concentración a _____ de la original.',          respuesta:'1/10'},
      {enunciado:'Dos diluciones 1:10 sucesivas equivalen a una dilución de factor _____.',    respuesta:'100'},
      {enunciado:'Si inicio con 10⁶ UFC/mL y hago 3 diluciones 1:10, obtengo _____ UFC/mL.', respuesta:'1000'},
      {enunciado:'En cada dilución 1:10 tomo _____ mL y los llevo a 10 mL totales.',          respuesta:'1'},
      {enunciado:'La dilución en serie se usa para contar _____ en placas microbiológicas.',   respuesta:'bacterias'},
    ]
  },
  {
    id:'m5a10', tipo:'mcq', titulo:'Aplicaciones Reales de la Dilución',
    instruccion:'Responde sobre aplicaciones de la dilución.',
    preguntas:[
      {texto:'Glucosada 5% desde 50%. Para 200 mL:',
        opciones:['1 mL','5 mL','20 mL','50 mL'],correcta:2},
      {texto:'Agua oxigenada 10% → 100 mL al 1.5%:',
        opciones:['5 mL','10 mL','15 mL','20 mL'],correcta:2},
      {texto:'Vino 14% → 2 L al 8% (con agua). ¿Cuánto vino?',
        opciones:['571 mL','800 mL','1143 mL','1600 mL'],correcta:2},
      {texto:'¿Qué NO cambia durante una dilución?',
        opciones:['La concentración','El volumen','Los moles de soluto','La densidad'],correcta:2},
      {texto:'Al diluir ácido sulfúrico se debe:',
        opciones:['Agregar agua sobre ácido','Agregar ácido sobre agua','Mezclar simultáneamente','Calentar primero'],correcta:1},
    ]
  },
]

// ── Motor de actividades ─────────────────────────────────────────
const banco = { 1:m1, 2:m2, 3:m3, 4:m4, 5:m5 }
const actividadesDelModulo = computed(() => banco[moduloActivo.value] || [])

const completadasDelModulo = computed(() =>
  actividadesDelModulo.value.filter(a => estado[a.id]?.completada).length
)
const puntajeDelModulo = computed(() =>
  actividadesDelModulo.value.reduce((s,a) => s + (estado[a.id]?.puntaje || 0), 0)
)

const actualizarModulo = () => {
  const mod = moduloActivo.value
  const pts = puntajeDelModulo.value
  actScore.value = { ...actScore.value, [mod]: pts }
  if (pts >= 8) actOk.value = { ...actOk.value, [mod]: true }
}

// ── Estado por tipo ──────────────────────────────────────────────
const matchState = reactive({})
const dragState  = reactive({})
const tfState    = reactive({})
const fbState    = reactive({})
const orderState = reactive({})
const mcqState   = reactive({})
const cruciState = reactive({})
const resultados = reactive({})

// ── Abrir actividad ──────────────────────────────────────────────
const abrirActividad = (act) => {
  actividadActiva.value = act

  if (!matchState[act.id] && act.tipo === 'match') {
    matchState[act.id] = {
      selIzq: null, pares: [],
      izqShuffle: [...act.pares].map(p=>p.izq).sort(()=>Math.random()-.5),
      derShuffle: [...act.pares].map(p=>p.der).sort(()=>Math.random()-.5),
    }
  }
  if (!dragState[act.id] && act.tipo === 'drag') {
    dragState[act.id] = {
      buckets: Object.fromEntries(act.categorias.map(c=>[c,[]])),
      remaining: [...act.items].sort(()=>Math.random()-.5),
      dragging: null,
    }
  }
  if (!tfState[act.id] && act.tipo === 'truefalse') {
    tfState[act.id] = { resp: Array(act.items.length).fill(null) }
  }
  if (!fbState[act.id] && act.tipo === 'fillblank') {
    fbState[act.id] = { inputs: Array(act.items.length).fill('') }
  }
  if (!orderState[act.id] && act.tipo === 'order') {
    orderState[act.id] = { items: [...act.items].sort(()=>Math.random()-.5), dragIdx: null }
  }
  if (!mcqState[act.id] && act.tipo === 'mcq') {
    mcqState[act.id] = { resp: Array(act.preguntas.length).fill(null) }
  }
  if (!cruciState[act.id] && act.tipo === 'crucigrama') {
    const cells = {}
    for (const p of act.palabras) {
      for (let i = 0; i < p.respuesta.length; i++) {
        const r = p.dir === 'H' ? p.row : p.row + i
        const c = p.dir === 'H' ? p.col + i : p.col
        const key = `${r}_${c}`
        if (!cells[key]) cells[key] = ''
      }
    }
    cruciState[act.id] = { cells }
  }
}

// ── Match ────────────────────────────────────────────────────────
const matchClick = (id, tipo, valor) => {
  const s = matchState[id]
  if (resultados[id]?.checked) return
  if (tipo === 'izq') { s.selIzq = valor }
  else {
    if (!s.selIzq) return
    s.pares.push({ izq: s.selIzq, der: valor })
    s.selIzq = null
  }
}
const matchYaUsado = (id, tipo, valor) =>
  matchState[id]?.pares.some(p => p[tipo==='izq'?'izq':'der'] === valor)

const matchPareColor = (id, valor, tipo) => {
  if (!resultados[id]?.checked) return matchState[id]?.selIzq===valor ? 'rgba(124,58,237,0.2)' : 'transparent'
  const par = matchState[id]?.pares.find(p => p[tipo==='izq'?'izq':'der'] === valor)
  if (!par) return 'rgba(248,113,113,0.12)'
  const act = actividadActiva.value
  const ok  = act.pares.some(p => p.izq===par.izq && p.der===par.der)
  return ok ? 'rgba(16,185,129,0.15)' : 'rgba(248,113,113,0.12)'
}

// ── Drag & Drop ──────────────────────────────────────────────────
const dragStart = (id, item) => { dragState[id].dragging = item }
const dragDrop  = (id, cat)  => {
  const s = dragState[id]
  if (!s.dragging) return
  s.buckets[cat].push(s.dragging)
  s.remaining = s.remaining.filter(i => i !== s.dragging)
  s.dragging  = null
}
const dragOver = (e) => e.preventDefault()

// ── Order ────────────────────────────────────────────────────────
const orderDragStart = (id, idx) => { orderState[id].dragIdx = idx }
const orderDrop = (id, targetIdx) => {
  const s = orderState[id]
  const arr = [...s.items]
  const [removed] = arr.splice(s.dragIdx, 1)
  arr.splice(targetIdx, 0, removed)
  s.items = arr
  s.dragIdx = null
}

// ── Verificar respuestas ─────────────────────────────────────────
const verificar = (act) => {
  let pts = 0, total = 0
  const id = act.id

  if (act.tipo === 'match') {
    total = act.pares.length
    pts   = matchState[id].pares.filter(p =>
      act.pares.some(cp => cp.izq===p.izq && cp.der===p.der)
    ).length
  }
  else if (act.tipo === 'drag') {
    total = act.items.length
    act.categorias.forEach(cat => {
      dragState[id].buckets[cat].forEach(item => { if (item.cat===cat) pts++ })
    })
  }
  else if (act.tipo === 'truefalse') {
    total = act.items.length
    tfState[id].resp.forEach((r,i) => { if (r===act.items[i].resp) pts++ })
  }
  else if (act.tipo === 'fillblank') {
    total = act.items.length
    fbState[id].inputs.forEach((v,i) => {
      if (v.trim().toLowerCase() === act.items[i].respuesta.toLowerCase()) pts++
    })
  }
  else if (act.tipo === 'order') {
    total = act.items.length
    const orden = act.ordenCorr || act.items.map((_,i)=>i)
    orderState[id].items.forEach((item,i) => {
      if (orden[i] === act.items.indexOf(item)) pts++
    })
  }
  else if (act.tipo === 'mcq') {
    total = act.preguntas.length
    mcqState[id].resp.forEach((r,i) => { if (r===act.preguntas[i].correcta) pts++ })
  }
  else if (act.tipo === 'crucigrama') {
    total = act.palabras.length
    for (const p of act.palabras) {
      let ok = true
      for (let i = 0; i < p.respuesta.length; i++) {
        const r = p.dir==='H' ? p.row : p.row+i
        const c = p.dir==='H' ? p.col+i : p.col
        const input = (cruciState[id]?.cells[`${r}_${c}`]||'').toUpperCase()
        if (input !== p.respuesta[i]) { ok = false; break }
      }
      if (ok) pts++
    }
  }

  const puntajeNorm = Math.round((pts/total)*10)/10
  resultados[id] = { pts, total, puntajeNorm, checked:true, passed: puntajeNorm>=6 }
  if (!estado[id]) estado[id] = {}
  estado[id].completada = true
  estado[id].puntaje    = puntajeNorm>=6 ? 1 : 0
  actualizarModulo()
}

const puedeVerificar = (act) => {
  const id = act.id
  if (resultados[id]?.checked) return false
  if (act.tipo === 'match')      return (matchState[id]?.pares?.length||0) === act.pares.length
  if (act.tipo === 'drag')       return (dragState[id]?.remaining?.length||999) === 0
  if (act.tipo === 'truefalse')  return tfState[id]?.resp?.every(r => r!==null)
  if (act.tipo === 'fillblank')  return fbState[id]?.inputs?.every(v => v.trim())
  if (act.tipo === 'order')      return true
  if (act.tipo === 'mcq')        return mcqState[id]?.resp?.every(r => r!==null)
  if (act.tipo === 'crucigrama') {
    const s = cruciState[id]
    return s ? Object.values(s.cells).every(v => (v||'').trim()!=='') : false
  }
  return false
}

const reiniciarActividad = (act) => {
  delete resultados[act.id]
  delete matchState[act.id]
  delete dragState[act.id]
  delete tfState[act.id]
  delete fbState[act.id]
  delete orderState[act.id]
  delete mcqState[act.id]
  delete cruciState[act.id]
  abrirActividad(act)
}

// ── Colores ──────────────────────────────────────────────────────
const modColors = { 1:'#7C3AED', 2:'#0EA5E9', 3:'#10B981', 4:'#FBBF24', 5:'#F87171' }
const modBgs    = {
  1:'rgba(124,58,237,0.15)', 2:'rgba(14,165,233,0.15)',
  3:'rgba(16,185,129,0.15)', 4:'rgba(251,191,36,0.15)',
  5:'rgba(248,113,113,0.15)'
}
const modNames  = { 1:'¿Qué es una Solución?', 2:'Tipos de Soluciones', 3:'Solubilidad', 4:'Concentración', 5:'Dilución' }
const tipoLabel = { match:'Emparejar', drag:'Arrastrar', truefalse:'V / F', fillblank:'Completar', order:'Ordenar', mcq:'Opción Múltiple', crucigrama:'Crucigrama' }
const letras    = ['A','B','C','D']
</script>

<template>
  <div class="act-root">

    <!-- ══ LISTA DE ACTIVIDADES ══ -->
    <template v-if="!actividadActiva">

      <div class="act-header">
        <v-chip color="primary" variant="tonal" size="small" class="mb-2">Actividades</v-chip>
        <h1 class="act-title">Actividades Interactivas</h1>
        <p class="act-desc">10 actividades por módulo: emparejar, arrastrar, crucigrama, completar y más. Necesitas <strong>8/10</strong> para desbloquear la evaluación.</p>
      </div>

      <!-- Tabs -->
      <div class="mod-tabs">
        <button v-for="n in 5" :key="n" class="mod-tab"
          :class="{'mod-tab--active': moduloActivo===n}"
          :style="moduloActivo===n ? `border-color:${modColors[n]};background:${modBgs[n]};color:${modColors[n]};` : ''"
          @click="moduloActivo=n">
          <span class="mod-tab-num" :style="moduloActivo===n?`background:${modColors[n]};color:white;`:''">{{ n }}</span>
          <span>{{ modNames[n] }}</span>
        </button>
      </div>

      <!-- Progreso -->
      <div class="mod-progress-card" :style="`border-left:4px solid ${modColors[moduloActivo]} !important;`">
        <div class="prog-inner">
          <div>
            <div class="prog-num" :style="`color:${modColors[moduloActivo]};`">{{ completadasDelModulo }}/10</div>
            <div class="prog-label">Completadas</div>
          </div>
          <v-progress-linear
            :model-value="completadasDelModulo*10"
            :color="modColors[moduloActivo]"
            bg-color="rgba(255,255,255,0.1)"
            rounded height="8" style="flex:1;"
          />
          <div>
            <div class="prog-num" :style="`color:${puntajeDelModulo>=8?'#10B981':modColors[moduloActivo]};`">{{ puntajeDelModulo }}/10</div>
            <div class="prog-label">Puntaje</div>
          </div>
          <v-chip v-if="actOk[moduloActivo]" color="success" variant="tonal" size="small" style="font-weight:800;">
            <NavIcon name="check" :size="12" style="margin-right:3px;" /> Módulo OK
          </v-chip>
        </div>
      </div>

      <!-- Grid de actividades -->
      <div class="act-grid">
        <div v-for="(act,i) in actividadesDelModulo" :key="act.id"
          class="act-card"
          :style="`border-top:3px solid ${estado[act.id]?.completada?(estado[act.id]?.puntaje>0?'#10B981':'#F87171'):modColors[moduloActivo]} !important;`"
          @click="abrirActividad(act)">
          <div class="ac-head">
            <div class="ac-num" :style="`background:${modBgs[moduloActivo]};color:${modColors[moduloActivo]};`">{{ i+1 }}</div>
            <v-chip size="x-small" :color="modColors[moduloActivo]" variant="tonal" style="font-size:.58rem;font-weight:800;">
              {{ tipoLabel[act.tipo] }}
            </v-chip>
            <div v-if="estado[act.id]?.completada" class="ac-status">
              <NavIcon :name="estado[act.id]?.puntaje>0?'check':'close'" :size="13"
                :style="`color:${estado[act.id]?.puntaje>0?'#10B981':'#F87171'};`"/>
            </div>
          </div>
          <div class="ac-title">{{ act.titulo }}</div>
          <div class="ac-instruc">{{ act.instruccion }}</div>
          <v-btn :color="modColors[moduloActivo]" variant="tonal" size="small"
            rounded="lg" style="text-transform:none;font-weight:700;margin-top:8px;" block>
            {{ estado[act.id]?.completada ? 'Revisar' : 'Comenzar' }}
          </v-btn>
        </div>
      </div>
    </template>

    <!-- ══ ACTIVIDAD ACTIVA ══ -->
    <template v-else>
      <div class="actv-bar">
        <v-btn variant="text" color="primary" size="small"
          @click="actividadActiva=null" style="text-transform:none;font-weight:700;">
          <template #prepend><NavIcon name="chevron" :size="14" style="transform:rotate(180deg);" /></template>
          Actividades
        </v-btn>
        <v-chip :color="modColors[moduloActivo]" variant="tonal" size="small" style="font-weight:800;">
          {{ tipoLabel[actividadActiva.tipo] }}
        </v-chip>
        <div class="actv-title">{{ actividadActiva.titulo }}</div>
      </div>

      <div class="actv-card">

        <div class="actv-instruc">
          <NavIcon name="info" :size="14" style="color:#7C3AED;flex-shrink:0;" />
          {{ actividadActiva.instruccion }}
        </div>

        <!-- RESULTADO -->
        <div v-if="resultados[actividadActiva.id]?.checked" class="resultado-box"
          :style="`background:${resultados[actividadActiva.id].passed?'rgba(16,185,129,0.12)':'rgba(248,113,113,0.1)'}; border:1px solid ${resultados[actividadActiva.id].passed?'rgba(16,185,129,0.4)':'rgba(248,113,113,0.3)'};`">
          <NavIcon :name="resultados[actividadActiva.id].passed?'check':'close'" :size="18"
            :style="`color:${resultados[actividadActiva.id].passed?'#10B981':'#F87171'};`"/>
          <div>
            <div style="font-weight:800;" :style="`color:${resultados[actividadActiva.id].passed?'#6EE7B7':'#FCA5A5'};`">
              {{ resultados[actividadActiva.id].passed ? '¡Actividad superada!' : 'Inténtalo de nuevo' }} —
              {{ resultados[actividadActiva.id].pts }}/{{ resultados[actividadActiva.id].total }} correctas
            </div>
            <div style="font-size:.78rem;" :style="`color:${resultados[actividadActiva.id].passed?'#6EE7B7':'#FCA5A5'};`">
              {{ resultados[actividadActiva.id].passed ? 'Obtuviste 1 punto para tu módulo.' : 'Necesitas al menos 60% para obtener el punto.' }}
            </div>
          </div>
          <v-btn variant="outlined" :color="modColors[moduloActivo]" size="small"
            @click="reiniciarActividad(actividadActiva)"
            style="text-transform:none;font-weight:700;margin-left:auto;flex-shrink:0;">
            <template #prepend><NavIcon name="refresh" :size="13"/></template>
            Reintentar
          </v-btn>
        </div>

        <!-- ══ MATCH ══ -->
        <template v-if="actividadActiva.tipo==='match'">
          <div class="match-grid">
            <div class="match-col">
              <div class="match-col-label">Términos</div>
              <div v-for="t in matchState[actividadActiva.id]?.izqShuffle" :key="t"
                class="match-item"
                :class="{'match-item--sel': matchState[actividadActiva.id]?.selIzq===t,'match-item--used': matchYaUsado(actividadActiva.id,'izq',t)}"
                :style="`background:${matchPareColor(actividadActiva.id,t,'izq')};border-color:${matchState[actividadActiva.id]?.selIzq===t?modColors[moduloActivo]:'rgba(124,58,237,0.25)'};`"
                @click="!matchYaUsado(actividadActiva.id,'izq',t)&&!resultados[actividadActiva.id]?.checked&&matchClick(actividadActiva.id,'izq',t)">
                {{ t }}
              </div>
            </div>
            <div class="match-col">
              <div class="match-col-label">Definiciones</div>
              <div v-for="d in matchState[actividadActiva.id]?.derShuffle" :key="d"
                class="match-item"
                :class="{'match-item--used': matchYaUsado(actividadActiva.id,'der',d)}"
                :style="`background:${matchPareColor(actividadActiva.id,d,'der')};border-color:rgba(124,58,237,0.25);`"
                @click="!matchYaUsado(actividadActiva.id,'der',d)&&!resultados[actividadActiva.id]?.checked&&matchClick(actividadActiva.id,'der',d)">
                {{ d }}
              </div>
            </div>
          </div>
          <div class="pares-hechos" v-if="matchState[actividadActiva.id]?.pares?.length">
            <div class="ph-label">Pares formados:</div>
            <div v-for="p in matchState[actividadActiva.id].pares" :key="p.izq" class="par-chip">
              <span>{{ p.izq }}</span>
              <NavIcon name="arrow" :size="12" style="color:#8B7BAF;"/>
              <span>{{ p.der }}</span>
            </div>
          </div>
        </template>

        <!-- ══ DRAG ══ -->
        <template v-else-if="actividadActiva.tipo==='drag'">
          <div class="drag-items" v-if="dragState[actividadActiva.id]?.remaining?.length">
            <div class="drag-label">Arrastra estos elementos:</div>
            <div class="drag-pool">
              <div v-for="item in dragState[actividadActiva.id].remaining" :key="item.texto"
                class="drag-chip" draggable="true"
                @dragstart="dragStart(actividadActiva.id,item)">
                <NavIcon name="list" :size="12" style="color:#8B7BAF;"/>
                {{ item.texto }}
              </div>
            </div>
          </div>
          <div class="drag-buckets">
            <div v-for="cat in actividadActiva.categorias" :key="cat"
              class="drag-bucket"
              :style="`border-color:${modColors[moduloActivo]}40;`"
              @dragover="dragOver" @drop="dragDrop(actividadActiva.id,cat)">
              <div class="bucket-label" :style="`color:${modColors[moduloActivo]};`">{{ cat }}</div>
              <div v-for="item in dragState[actividadActiva.id]?.buckets[cat]" :key="item.texto"
                class="bucket-item"
                :style="resultados[actividadActiva.id]?.checked?`background:${item.cat===cat?'rgba(16,185,129,0.15)':'rgba(248,113,113,0.12)'};border-color:${item.cat===cat?'rgba(16,185,129,0.4)':'rgba(248,113,113,0.3)'};`:''">
                {{ item.texto }}
              </div>
              <div v-if="!dragState[actividadActiva.id]?.buckets[cat]?.length" class="bucket-empty">Suelta aquí</div>
            </div>
          </div>
        </template>

        <!-- ══ TRUE/FALSE ══ -->
        <template v-else-if="actividadActiva.tipo==='truefalse'">
          <div class="tf-list">
            <div v-for="(item,i) in actividadActiva.items" :key="i" class="tf-item">
              <div class="tf-texto">{{ i+1 }}. {{ item.texto }}</div>
              <div class="tf-btns">
                <button class="tf-btn tf-v"
                  :style="tfState[actividadActiva.id]?.resp[i]===true?'background:rgba(16,185,129,0.18);border-color:rgba(16,185,129,0.5);color:#6EE7B7;font-weight:800;':''"
                  :disabled="resultados[actividadActiva.id]?.checked"
                  @click="tfState[actividadActiva.id].resp[i]=true">Verdadero</button>
                <button class="tf-btn tf-f"
                  :style="tfState[actividadActiva.id]?.resp[i]===false?'background:rgba(248,113,113,0.15);border-color:rgba(248,113,113,0.4);color:#FCA5A5;font-weight:800;':''"
                  :disabled="resultados[actividadActiva.id]?.checked"
                  @click="tfState[actividadActiva.id].resp[i]=false">Falso</button>
                <span v-if="resultados[actividadActiva.id]?.checked" class="tf-feedback">
                  <NavIcon :name="tfState[actividadActiva.id].resp[i]===item.resp?'check':'close'" :size="14"
                    :style="`color:${tfState[actividadActiva.id].resp[i]===item.resp?'#10B981':'#F87171'};`"/>
                  {{ item.resp ? 'Verdadero' : 'Falso' }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <!-- ══ FILL BLANK ══ -->
        <template v-else-if="actividadActiva.tipo==='fillblank'">
          <div class="fb-list">
            <div v-for="(item,i) in actividadActiva.items" :key="i" class="fb-item">
              <div class="fb-num">{{ i+1 }}</div>
              <div class="fb-content">
                <div class="fb-texto">{{ item.enunciado }}</div>
                <div class="fb-input-row">
                  <input v-model="fbState[actividadActiva.id].inputs[i]"
                    class="fb-input"
                    :disabled="resultados[actividadActiva.id]?.checked"
                    :style="resultados[actividadActiva.id]?.checked?(fbState[actividadActiva.id].inputs[i].trim().toLowerCase()===item.respuesta.toLowerCase()?'border-color:rgba(16,185,129,0.5);background:rgba(16,185,129,0.12);':'border-color:rgba(248,113,113,0.4);background:rgba(248,113,113,0.1);'):''"
                    placeholder="Tu respuesta..." />
                  <span v-if="resultados[actividadActiva.id]?.checked" class="fb-correct">✓ {{ item.respuesta }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- ══ ORDER ══ -->
        <template v-else-if="actividadActiva.tipo==='order'">
          <div class="order-list">
            <div v-for="(item,i) in orderState[actividadActiva.id]?.items" :key="item"
              class="order-item" draggable="true"
              @dragstart="orderDragStart(actividadActiva.id,i)"
              @dragover="dragOver" @drop="orderDrop(actividadActiva.id,i)">
              <div class="order-num" :style="`background:${modBgs[moduloActivo]};color:${modColors[moduloActivo]};`">{{ i+1 }}</div>
              <NavIcon name="list" :size="14" style="color:#8B7BAF;"/>
              <span>{{ item }}</span>
            </div>
          </div>
          <div v-if="resultados[actividadActiva.id]?.checked" class="order-correct">
            <div class="oc-label">Orden correcto:</div>
            <div v-for="(idx,i) in (actividadActiva.ordenCorr||actividadActiva.items.map((_,i)=>i))" :key="i" class="oc-item">
              <span class="oc-n" :style="`background:${modColors[moduloActivo]};`">{{ i+1 }}</span>
              {{ actividadActiva.items[idx] }}
            </div>
          </div>
        </template>

        <!-- ══ MCQ ══ -->
        <template v-else-if="actividadActiva.tipo==='mcq'">
          <div class="mcq-list">
            <div v-for="(preg,i) in actividadActiva.preguntas" :key="i" class="mcq-item">
              <div class="mcq-q">{{ i+1 }}. {{ preg.texto }}</div>
              <div class="mcq-opts">
                <div v-for="(op,j) in preg.opciones" :key="j"
                  class="mcq-op"
                  :style="mcqState[actividadActiva.id]?.resp[i]===j?`border-color:${modColors[moduloActivo]};background:${modBgs[moduloActivo]};`:resultados[actividadActiva.id]?.checked&&j===preg.correcta?'border-color:rgba(16,185,129,0.5);background:rgba(16,185,129,0.12);':resultados[actividadActiva.id]?.checked&&mcqState[actividadActiva.id]?.resp[i]===j?'border-color:rgba(248,113,113,0.4);background:rgba(248,113,113,0.1);':''"
                  @click="!resultados[actividadActiva.id]?.checked&&(mcqState[actividadActiva.id].resp[i]=j)">
                  <div class="mcq-letter" :style="mcqState[actividadActiva.id]?.resp[i]===j?`background:${modColors[moduloActivo]};color:white;`:''">
                    {{ letras[j] }}
                  </div>
                  <span>{{ op }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- ══ CRUCIGRAMA VISUAL ══ -->
        <template v-else-if="actividadActiva.tipo==='crucigrama'">
          <CrucigramaVisual
            v-if="cruciState[actividadActiva.id]"
            :palabras="actividadActiva.palabras"
            v-model="cruciState[actividadActiva.id].cells"
            :checked="!!resultados[actividadActiva.id]?.checked"
            :mod-color="modColors[moduloActivo]"
          />
        </template>

      </div>

      <!-- Botón verificar -->
      <div class="verify-bar" v-if="!resultados[actividadActiva.id]?.checked">
        <v-btn variant="elevated" :color="modColors[moduloActivo]" size="small" rounded="lg"
          :disabled="!puedeVerificar(actividadActiva)"
          @click="verificar(actividadActiva)"
          style="text-transform:none;font-weight:800;">
          <template #prepend><NavIcon name="check" :size="14" style="color:white;"/></template>
          Verificar respuestas
        </v-btn>
        <span class="verify-hint">
          {{ puedeVerificar(actividadActiva) ? '' : 'Completa todos los campos para verificar' }}
        </span>
      </div>

    </template>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
*,*::before,*::after { box-sizing:border-box; font-family:'Nunito',sans-serif; }

.act-root { min-height:100%; background:var(--bg); padding:var(--page-px); }
.act-header { margin-bottom:16px; }
.act-title { font-family:'Poppins',sans-serif; font-weight:900; font-size:clamp(1.3rem,4vw,1.6rem); color:var(--text); margin:4px 0 8px; }
.act-desc  { font-size:clamp(.8rem,2.5vw,.86rem); color:var(--muted); line-height:1.65; max-width:620px; margin:0; }
.act-desc strong { color:var(--primary); }

/* Tabs */
.mod-tabs { display:flex; gap:6px; flex-wrap:nowrap; overflow-x:auto; margin-bottom:14px; padding-bottom:4px; scrollbar-width:none; }
.mod-tabs::-webkit-scrollbar { display:none; }
.mod-tab {
  flex-shrink:0; display:flex; align-items:center; gap:7px;
  background:var(--surface-2); border:1.5px solid var(--border);
  border-radius:10px; padding:7px 12px; cursor:pointer;
  font-size:clamp(.68rem,2vw,.78rem); font-weight:700; color:var(--muted);
  transition:all .18s; font-family:'Nunito',sans-serif;
}
.mod-tab:hover { border-color:var(--primary-bd); color:var(--primary); }
.mod-tab-num {
  width:20px; height:20px; border-radius:5px;
  background:var(--border); font-size:.68rem; font-weight:800;
  display:flex; align-items:center; justify-content:center;
  color:var(--muted); transition:all .18s;
}

/* Progreso */
.mod-progress-card {
  background:var(--surface); border:1px solid var(--border);
  border-radius:12px; padding:12px 16px; margin-bottom:16px;
  box-shadow:var(--shadow-sm);
}
.prog-inner { display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.prog-num   { font-family:'Poppins',sans-serif; font-weight:900; font-size:1.2rem; }
.prog-label { font-size:.6rem; color:var(--muted); font-weight:700; text-transform:uppercase; letter-spacing:.8px; }

/* Grid */
.act-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:12px; }
.act-card {
  background:var(--surface); border:1px solid var(--border) !important;
  border-radius:14px; padding:14px; cursor:pointer;
  transition:transform .2s, box-shadow .2s; box-shadow:var(--shadow-sm);
}
@media (hover:hover) {
  .act-card:hover { transform:translateY(-2px); box-shadow:var(--shadow-md) !important; border-color:var(--primary-bd) !important; }
}
.ac-head { display:flex; align-items:center; gap:7px; margin-bottom:8px; }
.ac-num  { width:24px; height:24px; border-radius:7px; display:flex; align-items:center; justify-content:center; font-family:'Poppins',sans-serif; font-weight:900; font-size:.75rem; }
.ac-status { margin-left:auto; }
.ac-title   { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(.8rem,2.5vw,.86rem); color:var(--text); margin-bottom:4px; }
.ac-instruc { font-size:clamp(.68rem,2vw,.73rem); color:var(--muted); line-height:1.45; }

/* Actividad activa */
.actv-bar  { display:flex; align-items:center; gap:10px; margin-bottom:12px; flex-wrap:wrap; }
.actv-title { font-family:'Poppins',sans-serif; font-weight:700; color:var(--text); font-size:clamp(.82rem,2.5vw,.9rem); }
.actv-card {
  background:var(--surface); border:1px solid var(--border);
  border-radius:14px; padding:clamp(14px,4vw,20px); margin-bottom:12px;
  box-shadow:var(--shadow-sm);
}
.actv-instruc {
  display:flex; align-items:flex-start; gap:7px;
  background:var(--primary-soft); border:1px solid var(--primary-bd);
  border-radius:9px; padding:10px 13px; font-size:clamp(.78rem,2.5vw,.84rem);
  color:var(--primary); line-height:1.55; margin-bottom:16px;
}
.resultado-box { display:flex; align-items:flex-start; gap:10px; border-radius:10px; padding:12px 14px; margin-bottom:14px; flex-wrap:wrap; }

/* MATCH */
.match-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:12px; }
.match-col-label { font-size:.62rem; font-weight:800; color:var(--muted); text-transform:uppercase; letter-spacing:1px; margin-bottom:6px; }
.match-item {
  border:1.5px solid var(--border); border-radius:8px;
  padding:9px 12px; font-size:clamp(.78rem,2.5vw,.84rem); color:var(--text-2);
  cursor:pointer; transition:all .15s; margin-bottom:5px;
  min-height:40px; display:flex; align-items:center; background:var(--surface-2);
}
.match-item:hover:not(.match-item--used) { border-color:var(--primary); background:var(--primary-soft); color:var(--primary); }
.match-item--used { opacity:.45; cursor:default; }
.match-item--sel  { border-color:var(--primary) !important; background:var(--primary-soft) !important; color:var(--primary) !important; font-weight:700; }
.pares-hechos { margin-top:10px; }
.ph-label { font-size:.62rem; font-weight:800; color:var(--muted); text-transform:uppercase; letter-spacing:1px; margin-bottom:6px; }
.par-chip {
  display:inline-flex; align-items:center; gap:6px;
  background:var(--primary-soft); border:1px solid var(--primary-bd);
  border-radius:20px; padding:4px 10px; font-size:.75rem;
  color:var(--primary); margin:0 4px 5px 0;
}

/* DRAG */
.drag-items  { margin-bottom:14px; }
.drag-label  { font-size:.62rem; font-weight:800; color:var(--muted); text-transform:uppercase; letter-spacing:1px; margin-bottom:8px; }
.drag-pool   { display:flex; flex-wrap:wrap; gap:7px; }
.drag-chip {
  display:flex; align-items:center; gap:5px;
  background:var(--surface-2); border:1.5px solid var(--border);
  border-radius:20px; padding:7px 12px; font-size:clamp(.76rem,2.5vw,.82rem);
  color:var(--text-2); cursor:grab; transition:all .15s; min-height:36px;
}
.drag-chip:hover { border-color:var(--primary); background:var(--primary-soft); color:var(--primary); }
.drag-buckets { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:10px; }
.drag-bucket {
  min-height:90px; border:2px dashed var(--border);
  border-radius:12px; padding:12px; transition:background .15s; background:var(--bg-alt);
}
.drag-bucket:hover { background:var(--primary-soft); border-color:var(--primary-bd); }
.bucket-label { font-size:.68rem; font-weight:800; text-transform:uppercase; letter-spacing:.8px; margin-bottom:8px; color:var(--primary); }
.bucket-item  { background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:6px 9px; font-size:clamp(.72rem,2vw,.78rem); color:var(--text-2); margin-bottom:4px; }
.bucket-empty { font-size:.74rem; color:var(--muted); font-style:italic; }

/* TRUE/FALSE */
.tf-list { display:flex; flex-direction:column; gap:10px; }
.tf-item  { background:var(--surface-2); border:1px solid var(--border); border-radius:10px; padding:12px 14px; }
.tf-texto { font-size:clamp(.82rem,2.5vw,.88rem); color:var(--text); font-weight:600; line-height:1.45; margin-bottom:10px; }
.tf-btns  { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.tf-btn   {
  border-radius:8px; padding:7px 16px; font-size:clamp(.74rem,2.5vw,.8rem); font-weight:700;
  cursor:pointer; border:1.5px solid var(--border); background:var(--surface);
  color:var(--text-2); transition:all .15s; font-family:'Nunito',sans-serif; min-height:38px;
}
.tf-btn:hover:not(:disabled) { border-color:var(--primary); color:var(--primary); background:var(--primary-soft); }
.tf-btn:disabled { opacity:.65; cursor:default; }
.tf-feedback { display:flex; align-items:center; gap:4px; font-size:.75rem; font-weight:700; margin-left:8px; }

/* FILL BLANK */
.fb-list { display:flex; flex-direction:column; gap:10px; }
.fb-item { display:flex; align-items:flex-start; gap:10px; background:var(--surface-2); border:1px solid var(--border); border-radius:10px; padding:12px 14px; }
.fb-num  { width:24px; height:24px; border-radius:7px; background:var(--primary-soft); color:var(--primary); font-size:.72rem; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; border:1px solid var(--primary-bd); }
.fb-content { flex:1; min-width:0; }
.fb-texto { font-size:clamp(.82rem,2.5vw,.86rem); color:var(--text); font-weight:600; line-height:1.45; margin-bottom:7px; }
.fb-input-row { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.fb-input {
  border:1.5px solid var(--border); border-radius:8px; padding:7px 10px;
  font-size:clamp(.82rem,2.5vw,.86rem); font-family:'Nunito',sans-serif;
  font-weight:600; color:var(--text); background:var(--surface);
  outline:none; transition:all .15s; min-width:120px; max-width:100%;
}
.fb-input:focus { border-color:var(--primary); background:var(--primary-soft); }
.fb-input:disabled { opacity:.7; background:var(--surface-3); }
.fb-correct { font-size:.75rem; font-weight:700; color:#059669; white-space:nowrap; }

/* ORDER */
.order-list { display:flex; flex-direction:column; gap:7px; margin-bottom:10px; }
.order-item {
  display:flex; align-items:center; gap:9px;
  background:var(--surface); border:1.5px solid var(--border);
  border-radius:9px; padding:10px 12px; cursor:grab;
  font-size:clamp(.8rem,2.5vw,.86rem); color:var(--text-2); transition:all .15s; min-height:44px;
}
.order-item:hover { border-color:var(--primary); background:var(--primary-soft); color:var(--primary); }
.order-num { width:24px; height:24px; border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:.72rem; font-weight:800; flex-shrink:0; }
.order-correct { background:#ECFDF5; border:1px solid #86EFAC; border-radius:10px; padding:10px 14px; margin-top:8px; }
.oc-label { font-size:.62rem; font-weight:800; color:#059669; text-transform:uppercase; letter-spacing:.8px; margin-bottom:6px; }
.oc-item  { display:flex; align-items:center; gap:7px; font-size:clamp(.78rem,2.5vw,.84rem); color:#065F46; margin-bottom:3px; }
.oc-n     { width:18px; height:18px; border-radius:5px; background:#059669; color:white; font-size:.65rem; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

/* MCQ */
.mcq-list { display:flex; flex-direction:column; gap:14px; }
.mcq-item { background:var(--surface-2); border:1px solid var(--border); border-radius:10px; padding:12px 14px; }
.mcq-q    { font-size:clamp(.84rem,2.5vw,.9rem); font-weight:700; color:var(--text); line-height:1.45; margin-bottom:10px; }
.mcq-opts { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.mcq-op   {
  display:flex; align-items:flex-start; gap:8px; padding:8px 10px;
  border:1.5px solid var(--border); border-radius:8px;
  cursor:pointer; background:var(--surface); transition:all .15s;
  font-size:clamp(.76rem,2.5vw,.82rem); color:var(--text-2); min-height:40px;
}
.mcq-op:hover { border-color:var(--primary); background:var(--primary-soft); color:var(--primary); }
.mcq-letter { width:22px; height:22px; border-radius:6px; background:var(--surface-3); color:var(--muted); font-size:.65rem; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .15s; }

/* VERIFY BAR */
.verify-bar { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.verify-hint { font-size:.74rem; color:var(--muted); }

/* RESPONSIVE */
@media (max-width:600px) {
  .act-root { padding:12px; }
  .match-grid { grid-template-columns:1fr; }
  .mcq-opts   { grid-template-columns:1fr; }
  .act-grid   { grid-template-columns:1fr 1fr; gap:10px; }
  .drag-buckets { grid-template-columns:1fr; }
  .tf-btn { min-height:44px; flex:1; }
  .fb-input { width:100%; min-width:unset; }
}
@media (max-width:380px) { .act-grid { grid-template-columns:1fr; } }

/* ── Modo oscuro (order-correct especial) ── */
[data-theme="dark"] .order-correct { background:rgba(16,185,129,0.12); border-color:rgba(16,185,129,0.3); }
[data-theme="dark"] .oc-label { color:#10B981; }
[data-theme="dark"] .oc-item  { color:#6EE7B7; }
[data-theme="dark"] .fb-correct { color:#10B981; }
</style>