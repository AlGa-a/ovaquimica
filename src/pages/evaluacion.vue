<script setup>
import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import NavIcon from '../components/NavIcon.vue'
import { modulos } from '../data/soluciones'

// ── VueUse ────────────────────────────────────────────────────────────────────
const bestScores = useLocalStorage('ova-best-scores',      { 1:0,     2:0,     3:0,     4:0,     5:0     })
const vistos     = useLocalStorage('ova-vistos',           [])
const actScore   = useLocalStorage('ova-actividades-score',{ 1:0,     2:0,     3:0,     4:0,     5:0     })
const actOk      = useLocalStorage('ova-actividades-ok',   { 1:false, 2:false, 3:false, 4:false, 5:false })

// ── Estado ────────────────────────────────────────────────────────────────────
const testActivo  = ref(null)
const respuestas  = ref({})
const enviado     = ref(false)
const puntaje     = ref(0)

// ── Prerequisitos ─────────────────────────────────────────────────────────────
const UMBRAL = 12   // 12/15 = 80% ≈ 3.8/5

const todosVideosVistos = (n) => {
  const vids = modulos[n - 1]?.videos || []
  return vids.every(v => vistos.value.includes(v.id))
}

const puedeIniciar = (n) => {
  if (n === 1) return true
  return (
    (bestScores.value[n - 1] || 0) >= UMBRAL &&
    todosVideosVistos(n) &&
    (actOk.value[n] || false)
  )
}

const razonBloqueado = (n) => {
  const r = []
  if ((bestScores.value[n - 1] || 0) < UMBRAL)
    r.push(`Evaluación del Módulo ${n-1}: necesitas ${UMBRAL}/15 (tienes ${bestScores.value[n-1]||0})`)
  if (!todosVideosVistos(n))
    r.push(`Ver todos los videos del Módulo ${n} en Contenido`)
  if (!(actOk.value[n]))
    r.push(`Actividades del Módulo ${n}: necesitas 8/10 (tienes ${actScore.value[n]||0})`)
  return r
}

// ── BANCO DE PREGUNTAS — MÓDULO 1 ─────────────────────────────────────────────
const modulo1 = [
  { id:1,  nivel:'Conceptual',  texto:'Una solución química se define correctamente como:', opciones:['Una mezcla heterogénea donde el soluto se sedimenta con el tiempo.','Una mezcla homogénea formada por un soluto disuelto en un solvente.','Cualquier líquido que contenga partículas visibles en suspensión.','Una sustancia pura compuesta por dos elementos diferentes.'], correcta:1 },
  { id:2,  nivel:'Conceptual',  texto:'En la solución formada por agua y sal de mesa, ¿cuál es el componente que actúa como solvente?', opciones:['La sal (NaCl), porque es el componente que se disuelve.','El agua (H₂O), porque es el componente en mayor proporción.','Ambos componentes son solventes en igual medida.','Ninguno; en soluciones iónicas no hay solvente definido.'], correcta:1 },
  { id:3,  nivel:'Conceptual',  texto:'¿Cuál de las siguientes afirmaciones sobre las soluciones es correcta?', opciones:['Una solución siempre debe ser líquida; las soluciones gaseosas no existen.','El soluto siempre debe ser un sólido para que se forme una solución.','Las soluciones pueden existir en estado sólido, líquido o gaseoso.','En una solución, el soluto y el solvente siempre tienen la misma masa.'], correcta:2 },
  { id:4,  nivel:'Conceptual',  texto:'Una suspensión se diferencia de una solución verdadera principalmente porque:', opciones:['La suspensión contiene más soluto que la solución.','Las partículas de la suspensión son de mayor tamaño y se sedimentan con el tiempo.','La suspensión es siempre de color transparente, mientras que la solución es opaca.','En la suspensión no hay solvente presente.'], correcta:1 },
  { id:5,  nivel:'Conceptual',  texto:'El aire atmosférico es un ejemplo de solución porque:', opciones:['Contiene oxígeno, que es imprescindible para la vida.','Es una mezcla gaseosa homogénea de nitrógeno, oxígeno y otros gases.','Sus componentes se pueden separar mediante filtración.','Tiene partículas visibles que dispersan la luz.'], correcta:1 },
  { id:6,  nivel:'Analítico',   texto:'Al mezclar harina con agua y dejar reposar el recipiente, se observa que la harina se deposita en el fondo. Este comportamiento indica que la mezcla es:', opciones:['Una solución verdadera.','Un coloide tipo gel.','Una suspensión heterogénea.','Una emulsión estable.'], correcta:2 },
  { id:7,  nivel:'Analítico',   texto:'La leche es un ejemplo de coloide. ¿Cuál es la característica que la distingue de una solución verdadera?', opciones:['La leche no tiene solvente definido.','Sus partículas (entre 1 y 1000 nm) dispersan la luz (efecto Tyndall) pero no se sedimentan espontáneamente.','La leche es una mezcla heterogénea cuyos componentes se separan de forma inmediata.','Sus partículas son del mismo tamaño que las de una solución iónica.'], correcta:1 },
  { id:8,  nivel:'Analítico',   texto:'Un estudiante prepara tres mezclas: (A) agua + azúcar, (B) agua + aceite, (C) agua + colorante. ¿Cuáles corresponden a soluciones verdaderas?', opciones:['Solo A.','Solo C.','A y C.','A, B y C.'], correcta:2 },
  { id:9,  nivel:'Analítico',   texto:'El efecto Tyndall consiste en la dispersión de un haz de luz cuando atraviesa un coloide. ¿Por qué este efecto NO se observa en una solución verdadera?', opciones:['Porque las soluciones verdaderas absorben completamente la luz visible.','Porque las partículas del soluto son tan pequeñas (< 1 nm) que no dispersan la luz.','Porque el solvente actúa como pantalla que bloquea la luz.','Porque las soluciones verdaderas son siempre de color negro.'], correcta:1 },
  { id:10, nivel:'Analítico',   texto:'En una solución de etanol en agua, el etanol es el soluto. ¿Cuál es el criterio que permite identificarlo como soluto y no como solvente?', opciones:['El etanol tiene menor punto de ebullición que el agua.','El etanol es el componente que se encuentra en menor proporción en la mezcla.','El etanol es siempre líquido, mientras que el agua puede ser sólida.','El etanol tiene mayor masa molar que el agua.'], correcta:1 },
  { id:11, nivel:'Aplicación',  texto:'En el laboratorio, un técnico necesita preparar una solución acuosa de glucosa. El procedimiento correcto es:', opciones:['Agregar agua sobre glucosa sólida sin agitar para evitar reacciones.','Disolver la masa calculada de glucosa en un volumen definido de agua con agitación constante.','Calentar primero el agua hasta ebullición antes de agregar la glucosa.','Mezclar glucosa con cualquier solvente orgánico disponible.'], correcta:1 },
  { id:12, nivel:'Aplicación',  texto:'El suero fisiológico hospitalario es una solución de NaCl en agua. Si se inyecta por error una suspensión de almidón, ¿cuál sería el principal riesgo?', opciones:['Ninguno; ambas mezclas son equivalentes en propiedades biológicas.','Las partículas de almidón podrían obstruir los vasos sanguíneos.','El almidón reaccionaría con la hemoglobina cambiando el color de la sangre.','La suspensión causaría hipoglucemia inmediata.'], correcta:1 },
  { id:13, nivel:'Aplicación',  texto:'Un chef mezcla aceite y vinagre. Al reposar, las fases se separan. ¿Cómo se clasifica y qué se debe hacer para mantenerla homogénea?', opciones:['Es una solución; debe calentarse para homogeneizarla.','Es una emulsión inestable; debe agitarse justo antes de usarse.','Es una suspensión sólida; debe filtrarse para eliminar impurezas.','Es un coloide permanente; una vez mezclado, no se separa nunca.'], correcta:1 },
  { id:14, nivel:'Aplicación',  texto:'Un investigador tiene: (1) agua con sal transparente, (2) agua turbia con sedimento, (3) líquido blanco que dispersa la luz, (4) gas incoloro homogéneo. ¿Cuál es la clasificación correcta?', opciones:['1=suspensión, 2=solución, 3=coloide, 4=mezcla heterogénea.','1=solución, 2=suspensión, 3=coloide, 4=solución gaseosa.','1=coloide, 2=suspensión, 3=solución, 4=emulsión.','1=solución, 2=coloide, 3=suspensión, 4=mezcla pura.'], correcta:1 },
  { id:15, nivel:'Aplicación',  texto:'En farmacia, los jarabes son soluciones y las lociones son coloides. ¿Por qué es importante esta distinción en el uso médico?', opciones:['No hay diferencia; solo cambia el sabor del producto.','Las soluciones garantizan distribución uniforme del principio activo; los coloides pueden tener variación en la dosis.','Las lociones coloidales son siempre más seguras porque sus partículas no penetran en el organismo.','Los jarabes son más efectivos porque contienen más azúcar como principio activo.'], correcta:1 },
]

// ── BANCO DE PREGUNTAS — MÓDULO 2 ─────────────────────────────────────────────
const modulo2 = [
  { id:1,  nivel:'Conceptual',  texto:'Una solución insaturada se define como aquella que:', opciones:['Ha alcanzado el límite máximo de soluto que puede disolver.','Puede disolver más soluto a la misma temperatura y presión.','Contiene más soluto del que normalmente puede disolverse.','Tiene igual cantidad de soluto y solvente en masa.'], correcta:1 },
  { id:2,  nivel:'Conceptual',  texto:'Una solución se denomina saturada cuando:', opciones:['El solvente ha disuelto la máxima cantidad posible de soluto a una temperatura determinada.','La concentración del soluto supera el límite de solubilidad.','No se puede agregar más solvente sin cambiar la temperatura.','El soluto y el solvente tienen la misma densidad.'], correcta:0 },
  { id:3,  nivel:'Conceptual',  texto:'Una solución sobresaturada se caracteriza por:', opciones:['Ser estable a cualquier temperatura y presión.','Contener más soluto disuelto del que corresponde al punto de saturación; es metaestable.','Tener menos soluto que una solución saturada a la misma temperatura.','Presentar siempre un precipitado visible en el fondo.'], correcta:1 },
  { id:4,  nivel:'Conceptual',  texto:'La diferencia fundamental entre una solución diluida y una concentrada es:', opciones:['El estado físico del soluto.','La cantidad relativa de soluto: la diluida tiene poco soluto y la concentrada tiene mucho.','La temperatura a la que fueron preparadas.','El tamaño de las partículas del soluto.'], correcta:1 },
  { id:5,  nivel:'Conceptual',  texto:'El agua con sal (NaCl) es una solución de tipo:', opciones:['Gas en líquido.','Sólido en sólido.','Sólido en líquido.','Líquido en gas.'], correcta:2 },
  { id:6,  nivel:'Analítico',   texto:'A 25 °C, la solubilidad del KNO₃ es 37 g por cada 100 mL de agua. Si se disuelven 30 g en 100 mL de agua a esa temperatura, la solución es:', opciones:['Saturada.','Sobresaturada.','Insaturada.','No puede clasificarse sin conocer la presión.'], correcta:2 },
  { id:7,  nivel:'Analítico',   texto:'Si se agregan 10 g adicionales de KNO₃ (total 40 g) a la solución anterior sin cambiar la temperatura, ¿qué se observa?', opciones:['La solución se convierte en sobresaturada sin cambio visible.','Los 10 g se disuelven completamente porque hay suficiente solvente.','La solución alcanza el punto de saturación con 37 g y los 3 g restantes quedan sin disolver.','Toda la sal precipita al fondo.'], correcta:2 },
  { id:8,  nivel:'Analítico',   texto:'Una solución sobresaturada de azúcar en agua se obtiene enfriando lentamente. ¿Por qué es metaestable?', opciones:['Porque el azúcar reacciona con el agua a baja temperatura.','Porque cualquier perturbación (agitación, polvo, cristal semilla) puede desencadenar la cristalización masiva.','Porque a baja temperatura el azúcar cambia de estado sólido a gaseoso.','Porque el solvente pierde su capacidad de disolver al enfriarse.'], correcta:1 },
  { id:9,  nivel:'Analítico',   texto:'Vaso A: 5 g NaCl/L; Vaso B: 80 g NaCl/L (solubilidad máxima = 360 g/L). ¿Cómo se clasifican?', opciones:['A = saturada, B = sobresaturada.','A = diluida e insaturada, B = concentrada e insaturada.','A = diluida e insaturada, B = concentrada y cercana a la saturación.','A = insaturada, B = saturada.'], correcta:2 },
  { id:10, nivel:'Analítico',   texto:'Un refresco de cola contiene CO₂ disuelto a presión. Al destapar, el gas escapa y la solución pasa de concentrada a diluida en CO₂. ¿Qué tipo de cambio ocurre?', opciones:['La solución pasa de insaturada a sobresaturada.','La solución pasa de saturada (a alta presión) a insaturada (a presión atmosférica).','La solución pasa de diluida a concentrada.','No hay cambio porque el CO₂ no es un soluto.'], correcta:1 },
  { id:11, nivel:'Aplicación',  texto:'En la elaboración de dulces cristalizados, se prepara una solución sobresaturada y se introduce un hilo. ¿Qué principio fisicoquímico se aplica?', opciones:['Osmosis inversa.','Cristalización nucleada: el hilo actúa como superficie de nucleación para la cristalización controlada del exceso de soluto.','Destilación fraccionada.','Fermentación.'], correcta:1 },
  { id:12, nivel:'Aplicación',  texto:'Un paciente recibe "solución fisiológica diluida al 0,45%". ¿Qué tipo de solución es y qué implica esta concentración?', opciones:['Una solución saturada; el 0,45% indica que está cerca del límite máximo.','Una solución diluida de NaCl; contiene 0,45 g de NaCl por cada 100 mL de agua.','Una solución sobresaturada; el 0,45% indica exceso de soluto.','Una suspensión; el porcentaje indica el tamaño de las partículas.'], correcta:1 },
  { id:13, nivel:'Aplicación',  texto:'Para disolver oro en minería se usa NaCN a 3 g/L (solubilidad = 820 g/L). ¿Cómo se clasifica esa solución respecto a la saturación?', opciones:['Saturada, porque se usa en grandes cantidades.','Insaturada, porque 3 g/L está muy por debajo del límite de 820 g/L.','Sobresaturada, porque el proceso requiere máxima eficiencia.','No se puede clasificar sin conocer la temperatura exacta.'], correcta:1 },
  { id:14, nivel:'Aplicación',  texto:'Un agricultor diluye fertilizante concentrado e insaturado con agua. Después de agregar mucha agua, el fertilizante se convierte en:', opciones:['Concentrado y saturado.','Diluido e insaturado.','Sobresaturado porque el agua desestabiliza el soluto.','La clasificación no cambia; solo cambia el volumen.'], correcta:1 },
  { id:15, nivel:'Aplicación',  texto:'Al preparar café, si se agrega demasiado café parte no se disuelve y queda como poso. ¿Cuál es el estado de la solución en ese momento?', opciones:['Insaturada, porque siempre hay más agua disponible.','Sobresaturada, porque el café se disuelve más de lo normal.','Saturada, porque el solvente alcanzó su capacidad máxima de disolver los compuestos del café.','Diluida, porque el café molido no es un soluto real.'], correcta:2 },
]

// ── BANCO DE PREGUNTAS — MÓDULO 3 ─────────────────────────────────────────────
const modulo3 = [
  { id:1,  nivel:'Conceptual',  texto:'La solubilidad de una sustancia se define como:', opciones:['La cantidad de soluto que puede disolverse en cualquier volumen de solvente.','La masa máxima de soluto que se disuelve en 100 g de solvente a temperatura y presión definidas.','La velocidad a la que el soluto se disuelve en el solvente.','La capacidad del solvente de evaporarse después de disolver el soluto.'], correcta:1 },
  { id:2,  nivel:'Conceptual',  texto:'¿Cuál de los siguientes factores NO afecta la solubilidad de un sólido en un líquido?', opciones:['La temperatura del solvente.','La naturaleza química del soluto y el solvente.','El tamaño de las partículas del soluto.','La presión del sistema.'], correcta:3 },
  { id:3,  nivel:'Conceptual',  texto:'Según la Ley de Henry, la solubilidad de un gas en un líquido es:', opciones:['Inversamente proporcional a la temperatura del líquido.','Directamente proporcional a la presión parcial del gas sobre la solución.','Independiente de la presión cuando el gas es ideal.','Igual para todos los gases a la misma temperatura.'], correcta:1 },
  { id:4,  nivel:'Conceptual',  texto:'La regla "lo semejante disuelve a lo semejante" indica que:', opciones:['Los solutos con igual masa molar se disuelven mutuamente.','Las sustancias polares se disuelven mejor en solventes polares, y las apolares en solventes apolares.','Las sustancias con el mismo punto de fusión son miscibles.','Solo las sustancias iónicas pueden actuar como soluto.'], correcta:1 },
  { id:5,  nivel:'Conceptual',  texto:'En una gráfica de solubilidad vs temperatura para sólidos, la curva generalmente:', opciones:['Decrece, porque a mayor temperatura el soluto se descompone.','Es una línea horizontal porque la temperatura no afecta a los sólidos.','Aumenta, porque en la mayoría de los sólidos la disolución es endotérmica.','Decrece siempre, igual que ocurre con los gases.'], correcta:2 },
  { id:6,  nivel:'Analítico',   texto:'La solubilidad del NaCl a 20 °C es 36 g/100 mL y a 100 °C es 39 g/100 mL. ¿Qué concluyes sobre el proceso de disolución del NaCl?', opciones:['Es fuertemente endotérmico porque la solubilidad aumenta mucho con la temperatura.','Es ligeramente endotérmico; el aumento de solubilidad con la temperatura es pequeño.','Es exotérmico porque libera calor al aumentar la temperatura.','La temperatura no influye; la diferencia se debe a impurezas.'], correcta:1 },
  { id:7,  nivel:'Analítico',   texto:'El oxígeno disuelto en el agua de un lago disminuye en verano cuando la temperatura sube. ¿Qué consecuencia ecológica tiene esto?', opciones:['Los peces tienen más energía porque nadan más rápido con el calor.','La fotosíntesis acuática se detiene completamente al no haber O₂.','Se reduce el oxígeno disponible para los organismos acuáticos, lo que puede causar mortalidad de peces.','El agua se evapora más rápido, aumentando la concentración de O₂.'], correcta:2 },
  { id:8,  nivel:'Analítico',   texto:'A 40 °C la solubilidad del KNO₃ es 64 g/100 mL y a 20 °C es 31 g/100 mL. Si tienes una solución saturada a 40 °C y la enfrías a 20 °C, ¿cuántos gramos de KNO₃ cristalizan por cada 100 mL?', opciones:['31 g','64 g','33 g','95 g'], correcta:2 },
  { id:9,  nivel:'Analítico',   texto:'El yodo (I₂) se disuelve mejor en etanol que en agua. El aceite de oliva se disuelve en hexano pero no en agua. ¿Qué principio explica ambos comportamientos?', opciones:['Ley de Henry aplicada a líquidos.','La regla "lo semejante disuelve a lo semejante": polaridad compatible entre soluto y solvente favorece la disolución.','El principio de Le Chatelier: las soluciones se ajustan para minimizar el cambio.','La ley de Raoult: la presión de vapor determina la miscibilidad.'], correcta:1 },
  { id:10, nivel:'Analítico',   texto:'En una botella de refresco sellada, el CO₂ está disuelto a 3 atm de presión. Al abrirla, la presión cae a 1 atm. ¿Qué ocurre con la solubilidad del CO₂?', opciones:['La solubilidad aumenta porque hay más espacio en la botella abierta.','La solubilidad no cambia; solo cambia la temperatura.','La solubilidad disminuye (Ley de Henry) y el CO₂ en exceso escapa como gas (efervescencia).','La solubilidad aumenta porque el CO₂ reacciona con el agua.'], correcta:2 },
  { id:11, nivel:'Aplicación',  texto:'Un químico disuelve 80 g de sal en 100 mL de agua a 80 °C (sol. = 85 g/100 mL a 80 °C y 35 g/100 mL a 20 °C) y luego enfría a 20 °C. ¿Cuántos gramos cristalizan?', opciones:['35 g','45 g','80 g','85 g'], correcta:1 },
  { id:12, nivel:'Aplicación',  texto:'Las latas de refresco están presurizadas con CO₂. ¿Qué pasaría si se almacenaran a 50 °C en vez de 4 °C?', opciones:['La presurización no es necesaria. A 50 °C no habría diferencia.','La solubilidad del CO₂ disminuiría, aumentando la presión interna y el riesgo de deformación o explosión.','La solubilidad del CO₂ aumenta, por lo que la lata sería más segura.','A 50 °C se evaporaría todo el CO₂.'], correcta:1 },
  { id:13, nivel:'Aplicación',  texto:'Un buzo que asciende demasiado rápido puede sufrir la "enfermedad de descompresión". ¿Qué principio fisicoquímico explica este fenómeno?', opciones:['Ley de Graham: los gases difunden más rápido con la presión.','Ley de Henry: el N₂ era más soluble a alta presión; al ascender bruscamente, la presión baja y el N₂ sale de solución formando burbujas.','Ley de Raoult: el N₂ reduce la presión de vapor de la sangre.','Principio de Le Chatelier: la sangre expulsa N₂ para estabilizar la temperatura.'], correcta:1 },
  { id:14, nivel:'Aplicación',  texto:'En la preparación de caramelos duros, se hierve una solución de azúcar hasta 150-160 °C. ¿Por qué el producto final es duro y vítreo?', opciones:['A esas temperaturas el azúcar se hidroliza completamente en glucosa y fructosa sólidas.','Al evaporarse el agua, la concentración aumenta enormemente y el azúcar forma una masa supercooled (sobrefundida) que vitrifica al enfriar.','El calor hace que el azúcar recristalice en una estructura ordenada y dura.','El azúcar reacciona con el oxígeno del aire para formar un polímero sólido.'], correcta:1 },
  { id:15, nivel:'Aplicación',  texto:'La solubilidad del Ce₂(SO₄)₃ disminuye al aumentar la temperatura. ¿Cómo clasificarías el proceso y cómo cristalizarías esta sal?', opciones:['Endotérmico; para cristalizarla se debe calentar la solución.','Exotérmico; para cristalizarla se debe calentar la solución, pues a mayor temperatura la solubilidad decrece.','No tiene relación con la termodinámica; la cristalización solo depende de la agitación.','Exotérmico; para cristalizarla se debe enfriar la solución, ya que la solubilidad crece al bajar temperatura.'], correcta:1 },
]

// ── BANCO DE PREGUNTAS — MÓDULO 4 ─────────────────────────────────────────────
const modulo4 = [
  { id:1,  nivel:'Conceptual',  texto:'La molaridad (M) de una solución se define como:', opciones:['La masa en gramos del soluto por litro de solución.','El número de moles del soluto por litro de solución.','El número de moles del soluto por kilogramo de solvente.','La masa del soluto dividida entre la masa total de la solución.'], correcta:1 },
  { id:2,  nivel:'Conceptual',  texto:'El porcentaje en masa (% m/m) se calcula como:', opciones:['(masa soluto / volumen solución) × 1000','(masa soluto / masa solución) × 100','(moles soluto / litros solución) × 100','(volumen soluto / volumen solución) × 100'], correcta:1 },
  { id:3,  nivel:'Conceptual',  texto:'Las partes por millón (ppm) son una unidad de concentración utilizada principalmente cuando:', opciones:['La concentración del soluto es muy alta y necesita escala ampliada.','El soluto está presente en cantidades muy pequeñas, como contaminantes en agua.','La solución tiene un volumen mayor de un millón de litros.','Se trabaja con soluciones de gases a alta presión.'], correcta:1 },
  { id:4,  nivel:'Conceptual',  texto:'La molalidad (m) difiere de la molaridad (M) principalmente en que:', opciones:['La molalidad usa moles de solvente, mientras que la molaridad usa litros de solución.','La molalidad usa moles de soluto por kilogramo de solvente, mientras que la molaridad usa moles de soluto por litro de solución.','La molalidad solo se aplica a soluciones sólidas.','La molaridad es independiente de la temperatura, mientras que la molalidad no.'], correcta:1 },
  { id:5,  nivel:'Conceptual',  texto:'Si la molaridad de una solución es 2 M, esto significa que en 1 litro de solución hay:', opciones:['2 gramos del soluto.','2 moles del soluto.','2 milimoles del soluto.','2 litros del soluto.'], correcta:1 },
  { id:6,  nivel:'Analítico',   texto:'Se disuelven 5,85 g de NaCl (M = 58,5 g/mol) en agua para preparar 500 mL de solución. ¿Cuál es la molaridad?', opciones:['0,1 M','0,2 M','1,0 M','2,0 M'], correcta:1 },
  { id:7,  nivel:'Analítico',   texto:'Una solución de H₂SO₄ tiene una concentración del 20% en masa y una densidad de 1,14 g/mL. ¿Cuántos gramos de H₂SO₄ hay en 250 mL de esta solución?', opciones:['28,5 g','57,0 g','50,0 g','22,8 g'], correcta:1 },
  { id:8,  nivel:'Analítico',   texto:'Si el agua potable de una ciudad contiene 0,5 mg de flúor por litro, ¿cuál es la concentración en ppm?', opciones:['0,5 ppm','5 ppm','50 ppm','500 ppm'], correcta:0 },
  { id:9,  nivel:'Analítico',   texto:'Se disuelven 18 g de glucosa (C₆H₁₂O₆, M = 180 g/mol) en 500 mL de solución. ¿Cuál es la molaridad?', opciones:['0,1 M','0,2 M','0,36 M','0,05 M'], correcta:1 },
  { id:10, nivel:'Analítico',   texto:'La molaridad de una solución cambia si la temperatura varía porque:', opciones:['La masa del soluto cambia con la temperatura.','El volumen de la solución se expande o contrae, alterando los litros por los que se divide.','El número de moles del soluto aumenta al aumentar la temperatura.','La temperatura destruye las moléculas del soluto.'], correcta:1 },
  { id:11, nivel:'Aplicación',  texto:'Un estudiante debe preparar 250 mL de una solución de NaOH 0,5 M (M_NaOH = 40 g/mol). ¿Qué masa de NaOH debe pesar?', opciones:['5,0 g','10,0 g','20,0 g','2,5 g'], correcta:0 },
  { id:12, nivel:'Aplicación',  texto:'El agua de un acuario tiene una concentración de amoniaco de 2 ppm (límite seguro = 0,5 ppm). ¿Cuántas veces supera el límite seguro?', opciones:['2 veces','4 veces','10 veces','0,5 veces'], correcta:1 },
  { id:13, nivel:'Aplicación',  texto:'En un análisis clínico, la glucosa en sangre de un paciente es 126 mg/dL. Si 1 dL = 100 mL, ¿cuántos mg de glucosa contiene 1 litro de sangre?', opciones:['12,6 mg','126 mg','1260 mg','12600 mg'], correcta:2 },
  { id:14, nivel:'Aplicación',  texto:'Se tiene una solución de HCl al 37% en masa con densidad 1,19 g/mL. ¿Cuántos moles de HCl (M = 36,5 g/mol) hay en 1 litro de esta solución?', opciones:['10,15 mol','12,06 mol','8,50 mol','37,0 mol'], correcta:1 },
  { id:15, nivel:'Aplicación',  texto:'Un laboratorio recibe 2 L de una solución de KMnO₄ de 0,02 M. El técnico necesita reportar la concentración en mg/L (M = 158 g/mol). ¿Cuál es la concentración en mg/L?', opciones:['0,316 mg/L','3,16 mg/L','31,6 mg/L','3160 mg/L'], correcta:3 },
]

// ── BANCO DE PREGUNTAS — MÓDULO 5 ─────────────────────────────────────────────
const modulo5 = [
  { id:1,  nivel:'Conceptual',  texto:'La dilución es un proceso en el que:', opciones:['Se agrega más soluto a una solución para aumentar su concentración.','Se agrega solvente a una solución para disminuir su concentración.','Se elimina solvente para aumentar la concentración del soluto.','Se cambia el soluto manteniendo el mismo solvente.'], correcta:1 },
  { id:2,  nivel:'Conceptual',  texto:'La fórmula C₁V₁ = C₂V₂ es válida porque durante la dilución:', opciones:['El volumen del soluto se mantiene constante.','La concentración final siempre es el doble de la inicial.','La cantidad de moles (o masa) del soluto permanece constante; solo cambia el volumen.','La densidad de la solución no cambia al agregar solvente.'], correcta:2 },
  { id:3,  nivel:'Conceptual',  texto:'En la fórmula C₁V₁ = C₂V₂, si C₂ < C₁, entonces V₂:', opciones:['Es menor que V₁.','Es igual a V₁.','Es mayor que V₁.','No puede determinarse sin datos adicionales.'], correcta:2 },
  { id:4,  nivel:'Conceptual',  texto:'La dilución en serie se utiliza en microbiología y medicina para:', opciones:['Aumentar la concentración de una muestra de forma controlada.','Obtener concentraciones muy bajas mediante diluciones sucesivas a partir de una solución madre.','Separar los componentes de una mezcla por diferencias de densidad.','Saturar una solución con un soluto específico.'], correcta:1 },
  { id:5,  nivel:'Conceptual',  texto:'¿Cuál es la diferencia entre el volumen V₂ de la solución diluida y el volumen de agua que se agrega?', opciones:['Son exactamente iguales.','V₂ es el volumen total final; el agua agregada es V₂ − V₁.','El agua agregada es siempre el doble de V₁.','V₂ es menor que V₁ porque parte del soluto precipita.'], correcta:1 },
  { id:6,  nivel:'Analítico',   texto:'Se dispone de 50 mL de HCl 6 M. ¿Cuántos mL de agua se deben agregar para obtener una solución de HCl 2 M?', opciones:['100 mL de agua (V₂ = 150 mL)','50 mL de agua','150 mL de agua','200 mL de agua'], correcta:0 },
  { id:7,  nivel:'Analítico',   texto:'¿Qué volumen inicial de NaOH 5 M se necesita para preparar 300 mL de NaOH 0,5 M?', opciones:['15 mL','30 mL','60 mL','150 mL'], correcta:1 },
  { id:8,  nivel:'Analítico',   texto:'Se tienen 80 mL de H₂SO₄ 5 M y se desea preparar una solución de 2 M. ¿Cuál debe ser el volumen final?', opciones:['120 mL','160 mL','200 mL','250 mL'], correcta:2 },
  { id:9,  nivel:'Analítico',   texto:'Una dilución 1:10 significa tomar 1 parte y llevar a 10 totales. Si la solución original es de 2 M, ¿cuál es la concentración final?', opciones:['0,1 M','0,2 M','1,0 M','20 M'], correcta:1 },
  { id:10, nivel:'Analítico',   texto:'Un estudiante agrega V₂ − V₁ de agua adicional a V₁ en vez de completar hasta V₂ con matraz aforado. ¿Cuál sería el error?', opciones:['Ninguno; ambos procedimientos son equivalentes siempre.','El volumen final sería mayor que V₂ porque los volúmenes no son aditivos perfectamente.','La concentración resultante sería mayor que C₂ porque añadió menos agua de la necesaria.','La concentración resultante sería menor que C₂ porque añadió agua en exceso.'], correcta:1 },
  { id:11, nivel:'Aplicación',  texto:'Se dispone de H₂SO₄ concentrado (18 M). Se necesitan 500 mL de H₂SO₄ 0,9 M. ¿Qué volumen del ácido concentrado se debe medir?', opciones:['25 mL','50 mL','90 mL','10 mL'], correcta:0 },
  { id:12, nivel:'Aplicación',  texto:'Un médico prescribe solución glucosada al 5% (50 g/L). La farmacia solo tiene la solución al 50% (500 g/L). ¿Cuántos mL de la solución concentrada deben tomarse para preparar 200 mL al 5%?', opciones:['10 mL','20 mL','40 mL','100 mL'], correcta:1 },
  { id:13, nivel:'Aplicación',  texto:'En un laboratorio microbiológico se hace una dilución en serie 1:10 cuatro veces consecutivas a partir de 10⁶ bacterias/mL. ¿Cuántas bacterias/mL hay en la dilución final?', opciones:['100 bacterias/mL','1000 bacterias/mL','10 bacterias/mL','10000 bacterias/mL'], correcta:0 },
  { id:14, nivel:'Aplicación',  texto:'Para limpiar una herida, una enfermera necesita agua oxigenada al 1,5% v/v. Solo tiene la solución al 10% v/v. ¿Cuántos mL de la solución concentrada necesita para preparar 100 mL al 1,5%?', opciones:['5 mL','10 mL','15 mL','20 mL'], correcta:2 },
  { id:15, nivel:'Aplicación',  texto:'Un enólogo tiene vino de 14% de alcohol y quiere preparar 2 litros de una mezcla con 8% de alcohol (con agua). ¿Cuántos mL de vino debe usar?', opciones:['571 mL','800 mL','1143 mL','400 mL'], correcta:2 },
]

// ── JUSTIFICACIONES ───────────────────────────────────────────────────────────
const just = {
  1: [
    'Una solución es una mezcla homogénea. Las mezclas heterogéneas no son soluciones porque sus componentes no están uniformemente distribuidos a nivel molecular.',
    'El solvente es el componente en mayor proporción que disuelve al soluto. El agua constituye más del 90% del suero oral.',
    'Las soluciones existen en los tres estados: gaseosas (aire), líquidas (agua+sal) y sólidas (aleaciones como el bronce).',
    'La sedimentación es la característica definitoria de una suspensión. Sus partículas (>1000 nm) precipitan por gravedad.',
    'La homogeneidad a nivel molecular y la ausencia de interfaces de fase definen al aire como solución gaseosa.',
    'La harina no se disuelve en agua; sus partículas sedimentan — suspensión heterogénea.',
    'El efecto Tyndall es característico de coloides (1–1000 nm). Las soluciones verdaderas (<1 nm) no dispersan la luz visiblemente.',
    'Agua+azúcar y agua+colorante son soluciones verdaderas. Agua+aceite es una emulsión inestable por ser inmiscibles.',
    'En soluciones verdaderas el soluto está disperso a nivel molecular (<1 nm). Partículas tan pequeñas no producen dispersión visible.',
    'El soluto es el componente en menor proporción. En bebidas alcohólicas típicas, el etanol es menor al 40% y el agua supera el 60%.',
    'El protocolo estándar incluye pesar la masa exacta y disolver en volumen predefinido de solvente con agitación.',
    'Las partículas de una suspensión son demasiado grandes para los capilares — riesgo de embolia.',
    'La vinagreta es una emulsión inestable. Aceite y vinagre son inmiscibles; la agitación crea una emulsión temporal.',
    'Clasificación: 1=solución (homogénea), 2=suspensión (sedimento), 3=coloide (dispersa luz), 4=solución gaseosa.',
    'En soluciones la distribución del fármaco es perfectamente uniforme, garantizando dosificación exacta.',
  ],
  2: [
    'Insaturada: 30 g < 37 g (límite). Puede disolver más soluto sin cambiar condiciones.',
    'Solo pueden disolverse 37 g (límite de saturación). Los 3 g restantes (de 40 g totales) precipitan al fondo.',
    'Una solución sobresaturada es metaestable porque cualquier perturbación proporciona el sitio de nucleación para cristalizar.',
    '5 g/L y 80 g/L están muy lejos del límite de 360 g/L: ambas son insaturadas, pero A es más diluida que B.',
    'A alta presión el CO₂ es soluble (saturada), pero al abrir la presión cae y el CO₂ ya no puede mantenerse disuelto (Ley de Henry).',
    'La cristalización de dulces usa el principio de que la solución sobresaturada libera el exceso. El hilo actúa como núcleo.',
    'Suero fisiológico 0,45% = 0,45 g de NaCl por 100 mL. Solución diluida — hipotónica respecto a la sangre normal (0,9%).',
    'Con 3 g/L de NaCN y solubilidad de 820 g/L, la solución solo usa el 0,37% de su capacidad — extremadamente insaturada.',
    'Al diluir la concentración disminuye (diluido=insaturado). Los términos diluido/concentrado y saturado/insaturado son independientes.',
    'Al saturarse con los primeros 36 g, el equilibrio dinámico se alcanza. El exceso queda como sólido sin disolver.',
  ],
  3: [
    'La solubilidad es una propiedad intensiva específica para cada par soluto-solvente a temperatura y presión dadas.',
    'El tamaño de partícula afecta la VELOCIDAD de disolución, no la cantidad máxima que se disuelve.',
    'Ley de Henry: S = kH × P. A mayor presión parcial del gas, mayor cantidad permanece disuelta.',
    'La polaridad determina las interacciones intermoleculares: dipolo-dipolo y enlaces H favorecen la disolución entre sustancias polares.',
    'La mayoría de sólidos tiene proceso de disolución endotérmico. Aumentar T desplaza el equilibrio hacia la disolución (Le Chatelier).',
    'El pequeño incremento de 36 a 39 g/100 mL indica proceso ligeramente endotérmico.',
    'Menos O₂ disuelto significa menos oxígeno para la respiración aeróbica de peces — hipoxia y mortalidad.',
    'Diferencia de solubilidad: 64−31 = 33 g cristalizan al enfriar de 40°C a 20°C por cada 100 mL.',
    'La regla "similia similibus" se basa en interacciones intermoleculares: las sustancias se disuelven mejor cuando las fuerzas son compatibles.',
    'Ley de Henry: S ∝ P. Al abrir, P cae de 3 a 1 atm — el CO₂ en exceso escapa formando burbujas (efervescencia).',
    'Diferencia de solubilidad entre 80°C (85 g) y 20°C (35 g) = 50 g disponibles; como se disolvieron 80 g, solo quedan 35 g → cristalizan 45 g.',
    'A mayor temperatura, menor solubilidad del CO₂ (Ley de Henry). La presión interna aumenta → riesgo de deformación.',
    'N₂ disuelto a alta presión en profundidad. Al ascender bruscamente, la presión baja y el N₂ supersaturado forma burbujas en tejidos.',
    'A 150-160 °C casi toda el agua se evapora. El azúcar forma una masa amorfa que vitrifica al enfriar rápidamente.',
    'Si la solubilidad disminuye al calentar, el proceso es exotérmico. Para cristalizar Ce₂(SO₄)₃ se calienta la solución saturada.',
  ],
  4: [
    'M = n/V (mol/L). Es la unidad de concentración más usada en química analítica y laboratorio.',
    '% m/m = (masa soluto / masa total) × 100. Es adimensional y no depende de la temperatura.',
    'ppm = mg/L. Se usa para concentraciones traza como contaminantes, medicamentos o minerales en agua potable.',
    'La molalidad (mol/kg solvente) no depende del volumen, por lo que no cambia con la temperatura. La molaridad sí.',
    '2 M significa 2 moles de soluto por cada litro de solución preparada.',
    'n = 5,85/58,5 = 0,1 mol; M = 0,1/0,5 = 0,2 M. Error común: no convertir mL a L.',
    'Masa solución = 250 mL × 1,14 g/mL = 285 g. Masa H₂SO₄ = 0,20 × 285 = 57 g.',
    '0,5 mg/L = 0,5 mg/1000 g ≈ 0,5 ppm (partes por millón en masa/masa).',
    'n = 18/180 = 0,1 mol; M = 0,1/0,5 = 0,2 M.',
    'El volumen de la solución se expande al aumentar T. Al haber más litros, la molaridad (mol/L) disminuye aunque los moles sean los mismos.',
    'n = 0,5 mol/L × 0,25 L = 0,125 mol; masa = 0,125 × 40 = 5,0 g de NaOH.',
    '2 ppm / 0,5 ppm = 4 veces el límite seguro. Requiere cambio inmediato del agua del acuario.',
    '126 mg/dL × 10 dL/L = 1260 mg/L de sangre.',
    'Masa HCl en 1 L = 1190 g × 0,37 = 440,3 g. Moles = 440,3/36,5 ≈ 12,06 mol.',
    '0,02 mol/L × 158 g/mol = 3,16 g/L = 3160 mg/L.',
  ],
  5: [
    'Dilución = agregar solvente para disminuir concentración. El número de moles del soluto no cambia.',
    'n₁ = n₂ (moles conservados). Como n = C×V, se tiene C₁V₁ = C₂V₂.',
    'Si C₂ < C₁, entonces V₂ debe ser mayor que V₁ para mantener constante el producto C×V.',
    'Las diluciones seriadas permiten bajar progresivamente la concentración para trabajar con microorganismos o estándares de calibración.',
    'V₂ es el volumen TOTAL final. El solvente a agregar es V₂ − V₁. Confundir esto es el error más frecuente en laboratorio.',
    'C₁V₁ = C₂V₂ → V₂ = (6×50)/2 = 150 mL total. Agua a agregar = 150 − 50 = 100 mL.',
    'V₁ = (C₂×V₂)/C₁ = (0,5×300)/5 = 30 mL de NaOH 5 M.',
    'V₂ = (C₁×V₁)/C₂ = (5×80)/2 = 200 mL total. Agua a agregar = 200 − 80 = 120 mL.',
    'Dilución 1:10 → C₂ = C₁/10 = 2/10 = 0,2 M.',
    'Si agrega V₂−V₁ de agua adicional a V₁, el volumen final es V₁+(V₂−V₁) = V₂ solo si los volúmenes son perfectamente aditivos. La diferencia es pequeña pero real.',
    'V₁ = (0,9×500)/18 = 25 mL. Agregar siempre el ácido lentamente sobre el agua.',
    'C₁V₁ = C₂V₂ → V₁ = (50×200)/500 = 20 mL de la solución al 50%.',
    'Dilución 1:10 cuatro veces: 10⁶ × 10⁻⁴ = 10² = 100 bacterias/mL.',
    'V₁ = (1,5×100)/10 = 15 mL de agua oxigenada 10%.',
    'V₁ = (8×2000)/14 = 1142,8 ≈ 1143 mL de vino. Agua a agregar = 2000 − 1143 = 857 mL.',
  ],
}

// ── Lógica ────────────────────────────────────────────────────────────────────
const banco = { 1:modulo1, 2:modulo2, 3:modulo3, 4:modulo4, 5:modulo5 }

const preguntasActivas = computed(() => testActivo.value ? banco[testActivo.value] : [])
const justActivas      = computed(() => testActivo.value ? just[testActivo.value] : [])
const respondidas      = computed(() => Object.keys(respuestas.value).length)
const totalPregs       = computed(() => preguntasActivas.value.length)

const iniciarTest = (n) => {
  if (!puedeIniciar(n)) return
  testActivo.value = n
  respuestas.value = {}
  enviado.value    = false
  puntaje.value    = 0
}

const enviar = () => {
  let pts = 0
  preguntasActivas.value.forEach(p => { if (respuestas.value[p.id] === p.correcta) pts++ })
  puntaje.value = pts
  enviado.value = true
  if (pts > (bestScores.value[testActivo.value] || 0))
    bestScores.value = { ...bestScores.value, [testActivo.value]: pts }
  window.scrollTo({ top:0, behavior:'smooth' })
}

const reiniciar  = () => { respuestas.value = {}; enviado.value = false; puntaje.value = 0 }
const volverMenu = () => { testActivo.value = null; respuestas.value = {}; enviado.value = false }

const testInfo = [
  { n:1, titulo:'Módulo 1', subtitulo:'Definición de Solución', iconKey:'beaker',     color:'#4A6FA5', bg:'#EEF3FA' },
  { n:2, titulo:'Módulo 2', subtitulo:'Tipos de Soluciones',    iconKey:'flask',      color:'#6D5BA3', bg:'#F0EDFB' },
  { n:3, titulo:'Módulo 3', subtitulo:'Solubilidad',            iconKey:'chart',      color:'#059669', bg:'#ECFDF5' },
  { n:4, titulo:'Módulo 4', subtitulo:'Concentración',          iconKey:'calculator', color:'#D97706', bg:'#FFFBEB' },
  { n:5, titulo:'Módulo 5', subtitulo:'Dilución',               iconKey:'drop',       color:'#DC2626', bg:'#FEF2F2' },
]

const letras = ['A','B','C','D']

const nivelColor = { 'Conceptual':'#4A6FA5', 'Analítico':'#6D5BA3', 'Aplicación':'#059669' }
const nivelBg    = { 'Conceptual':'#EEF3FA', 'Analítico':'#F0EDFB', 'Aplicación':'#ECFDF5' }

const scoreInfo = computed(() => {
  const r = puntaje.value / totalPregs.value
  const pasaNext = puntaje.value >= UMBRAL
  if (r >= 0.9) return { icon:'trophy', color:'#D97706', msg:`Desempeño excelente. ${pasaNext ? 'El siguiente módulo está desbloqueado.' : ''}` }
  if (r >= 0.8) return { icon:'check',  color:'#059669', msg:`Módulo superado (${puntaje.value}/15 ≥ 12). ${pasaNext ? 'El siguiente módulo está desbloqueado.' : ''}` }
  if (r >= 0.5) return { icon:'alert',  color:'#D97706', msg:`Resultado regular. Necesitas ${UMBRAL}/15 para desbloquear el siguiente módulo (tienes ${puntaje.value}).` }
  return              { icon:'books',   color:'#DC2626', msg:`Necesitas reforzar este módulo. Revisa los videos y actividades antes de reintentar.` }
})

const currentTestInfo = computed(() => testInfo.find(t => t.n === testActivo.value))
</script>

<template>
  <div class="eval-root">

    <!-- ══ MENÚ PRINCIPAL ══ -->
    <template v-if="!testActivo">
      <div class="ev-header">
        <v-chip color="primary" variant="tonal" size="small" class="mb-2">Evaluación</v-chip>
        <h1 class="ev-title">Evaluaciones por módulo</h1>
        <p class="ev-desc">
          Cada evaluación contiene <strong>15 preguntas</strong> en tres niveles: <strong>conceptual</strong>,
          <strong>analítico</strong> y <strong>aplicación</strong>. Necesitas
          <strong>12/15 (≈ 3.8/5)</strong> para desbloquear el siguiente módulo.
          Tu mejor puntaje se guarda automáticamente.
        </p>
      </div>

      <!-- Leyenda de requisitos -->
      <v-card color="surface" rounded="lg" elevation="1" class="req-legend">
        <v-card-text style="padding:12px 16px; display:flex; align-items:flex-start; gap:10px;">
          <NavIcon name="info" :size="16" style="color:#4A6FA5; flex-shrink:0; margin-top:2px;" />
          <div>
            <div style="font-weight:700; color:#1E293B; font-size:.84rem; margin-bottom:4px;">Para desbloquear la evaluación de cada módulo (excepto el Módulo 1):</div>
            <div class="req-items">
              <div class="req-item"><NavIcon name="check" :size="12" style="color:#059669;" /> Puntaje ≥ 12/15 en la evaluación del módulo anterior</div>
              <div class="req-item"><NavIcon name="play"  :size="12" style="color:#4A6FA5;" /> Haber visto todos los videos del módulo en Contenido</div>
              <div class="req-item"><NavIcon name="flask" :size="12" style="color:#6D5BA3;" /> Puntaje ≥ 8/10 en las actividades del módulo</div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- Grid de tests -->
      <div class="test-grid">
        <v-card
          v-for="t in testInfo" :key="t.n"
          color="surface" rounded="lg" elevation="2"
          class="test-card"
          :style="`
            border-top: 3px solid ${puedeIniciar(t.n) ? t.color : '#CBD5E1'} !important;
            opacity: ${puedeIniciar(t.n) ? 1 : 0.8};
          `"
        >
          <v-card-text style="padding:16px;">
            <div class="tc-head">
              <div class="tc-icon"
                :style="`background:${puedeIniciar(t.n) ? t.bg : '#F1F5F9'}; border:1px solid ${puedeIniciar(t.n) ? t.color+'30' : '#E2E8F0'};`">
                <NavIcon v-if="puedeIniciar(t.n)" :name="t.iconKey" :size="22" :style="`color:${t.color};`" />
                <NavIcon v-else name="close" :size="22" style="color:#CBD5E1;" />
              </div>
              <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                <v-chip v-if="bestScores[t.n]" size="x-small" color="warning" variant="tonal" style="font-weight:800;">
                  <NavIcon name="trophy" :size="10" style="margin-right:2px;" />
                  {{ bestScores[t.n] }}/15
                </v-chip>
                <v-chip v-if="bestScores[t.n] >= UMBRAL" size="x-small" color="success" variant="tonal" style="font-weight:800;">
                  <NavIcon name="check" :size="10" style="margin-right:2px;" /> Aprobado
                </v-chip>
              </div>
            </div>

            <div class="tc-module" :style="`color:${puedeIniciar(t.n) ? t.color : '#94A3B8'};`">{{ t.titulo }}</div>
            <div class="tc-name">{{ t.subtitulo }}</div>

            <!-- Bloqueado -->
            <template v-if="!puedeIniciar(t.n)">
              <div class="tc-locked-label">
                <NavIcon name="close" :size="11" style="color:#DC2626;" />
                Pendiente:
              </div>
              <ul class="tc-req-list">
                <li v-for="(r,ri) in razonBloqueado(t.n)" :key="ri">{{ r }}</li>
              </ul>
            </template>

            <!-- Disponible -->
            <template v-else>
              <div class="tc-chips">
                <span class="tc-chip">
                  <NavIcon name="info" :size="10" style="color:#94A3B8;" />
                  15 preguntas
                </span>
                <span class="tc-chip">
                  <NavIcon name="layers" :size="10" style="color:#94A3B8;" />
                  3 niveles
                </span>
                <span class="tc-chip" style="color:#D97706;">
                  <NavIcon name="trophy" :size="10" style="color:#D97706;" />
                  Mín. 12/15 para continuar
                </span>
              </div>
            </template>
          </v-card-text>

          <v-divider />
          <v-card-actions style="padding:10px 14px;">
            <v-btn
              variant="elevated"
              :color="puedeIniciar(t.n) ? t.color : 'grey'"
              :disabled="!puedeIniciar(t.n)"
              size="small" rounded="lg" block
              style="text-transform:none; font-weight:700;"
              @click="iniciarTest(t.n)"
            >
              <template #prepend>
                <NavIcon v-if="puedeIniciar(t.n)" name="play" :size="14" style="color:white;" />
                <NavIcon v-else name="close" :size="14" style="color:white;" />
              </template>
              {{ puedeIniciar(t.n) ? 'Iniciar evaluación' : 'Bloqueado' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </template>

    <!-- ══ RESULTADO ══ -->
    <template v-else-if="enviado">
      <v-card color="surface" rounded="lg" elevation="2" class="result-card">
        <v-card-text style="text-align:center; padding:32px 24px;">
          <div class="result-icon-wrap" :style="`background:${scoreInfo.color}15; border:2px solid ${scoreInfo.color}30;`">
            <NavIcon :name="scoreInfo.icon" :size="36" :style="`color:${scoreInfo.color};`" />
          </div>
          <div class="result-score">
            <span class="result-num" :style="`color:${scoreInfo.color};`">{{ puntaje }}</span>
            <span class="result-denom"> / {{ totalPregs }}</span>
          </div>
          <div class="result-pct">{{ Math.round((puntaje/totalPregs)*100) }}% de respuestas correctas</div>
          <v-progress-linear
            :model-value="(puntaje/totalPregs)*100"
            :color="scoreInfo.color" bg-color="#F1F5F9"
            rounded height="8" class="mx-auto my-3"
            style="max-width:320px;"
          />
          <!-- Badge de estado -->
          <v-chip
            :color="puntaje >= UMBRAL ? 'success' : 'error'"
            variant="tonal" size="small" style="font-weight:800; margin-bottom:10px;"
          >
            <NavIcon :name="puntaje >= UMBRAL ? 'check' : 'close'" :size="12" style="margin-right:3px;" />
            {{ puntaje >= UMBRAL ? `Módulo aprobado — siguiente módulo desbloqueado` : `Necesitas ${UMBRAL - puntaje} respuestas más para aprobar` }}
          </v-chip>
          <p class="result-msg">{{ scoreInfo.msg }}</p>
          <div class="result-actions">
            <v-btn variant="outlined" color="primary" size="small" @click="reiniciar" style="text-transform:none; font-weight:700;">
              <template #prepend><NavIcon name="refresh" :size="14" /></template>
              Intentar de nuevo
            </v-btn>
            <v-btn variant="elevated" color="primary" size="small" @click="volverMenu" style="text-transform:none; font-weight:700;">
              <template #prepend><NavIcon name="grid" :size="14" style="color:white;" /></template>
              Ver todos los tests
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

      <!-- Revisión -->
      <div class="review-label">
        <NavIcon name="eye" :size="14" style="color:#94A3B8;" />
        Revisión detallada de respuestas
      </div>

      <div class="review-list">
        <v-card
          v-for="(p, idx) in preguntasActivas" :key="p.id"
          color="surface" rounded="lg" elevation="1"
          class="review-card"
          :style="`border-left: 3px solid ${respuestas[p.id]===p.correcta ? '#059669' : '#DC2626'} !important;`"
        >
          <v-card-text style="padding:14px 16px;">
            <div class="ri-head">
              <div class="ri-status"
                :style="`background:${respuestas[p.id]===p.correcta?'#ECFDF5':'#FEF2F2'}; border:1px solid ${respuestas[p.id]===p.correcta?'#86EFAC':'#FCA5A5'};`">
                <NavIcon :name="respuestas[p.id]===p.correcta?'check':'close'" :size="13"
                  :style="`color:${respuestas[p.id]===p.correcta?'#059669':'#DC2626'};`" />
              </div>
              <span class="ri-nivel"
                :style="`background:${nivelBg[p.nivel]}; color:${nivelColor[p.nivel]};`">
                {{ p.nivel }}
              </span>
              <span class="ri-num">Pregunta {{ idx+1 }}</span>
            </div>

            <div class="ri-texto">{{ p.texto }}</div>

            <div class="ri-opciones">
              <div v-for="(op, i) in p.opciones" :key="i" class="ri-op"
                :style="`
                  background:${i===p.correcta?'#ECFDF5':respuestas[p.id]===i?'#FEF2F2':'#F8F9FC'};
                  border-color:${i===p.correcta?'#86EFAC':respuestas[p.id]===i?'#FCA5A5':'#E2E8F0'};
                `">
                <div class="ri-letter"
                  :style="`background:${i===p.correcta?'#059669':respuestas[p.id]===i?'#DC2626':'#F1F5F9'}; color:${i===p.correcta||respuestas[p.id]===i?'white':'#64748B'};`">
                  {{ letras[i] }}
                </div>
                <span :style="`color:${i===p.correcta?'#065F46':respuestas[p.id]===i?'#7F1D1D':'#475569'}; font-weight:${i===p.correcta?700:400};`">
                  {{ op }}
                </span>
                <NavIcon v-if="i===p.correcta" name="check" :size="13" style="color:#059669; margin-left:auto; flex-shrink:0;" />
                <NavIcon v-else-if="respuestas[p.id]===i" name="close" :size="13" style="color:#DC2626; margin-left:auto; flex-shrink:0;" />
              </div>
            </div>

            <div class="ri-just">
              <NavIcon name="lightbulb" :size="12" style="color:#D97706; flex-shrink:0; margin-top:2px;" />
              <span>{{ justActivas[idx] }}</span>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </template>

    <!-- ══ TEST ACTIVO ══ -->
    <template v-else>
      <div class="active-bar">
        <button class="back-btn" @click="volverMenu">
          <NavIcon name="chevron" :size="14" style="transform:rotate(180deg);" />
          <span>Evaluaciones</span>
        </button>
        <div class="active-info">
          <div class="active-icon" :style="`background:${currentTestInfo.bg};`">
            <NavIcon :name="currentTestInfo.iconKey" :size="15" :style="`color:${currentTestInfo.color};`" />
          </div>
          <span :style="`color:${currentTestInfo.color}; font-weight:700; font-size:.85rem;`">{{ currentTestInfo.titulo }}</span>
          <span style="color:#94A3B8; font-size:.8rem;">— {{ currentTestInfo.subtitulo }}</span>
        </div>
        <div class="active-count">{{ respondidas }}/{{ totalPregs }}</div>
      </div>

      <v-progress-linear
        :model-value="(respondidas/totalPregs)*100"
        :color="currentTestInfo.color"
        bg-color="#F1F5F9"
        rounded height="4"
        class="mb-5"
      />

      <!-- Preguntas -->
      <div class="q-list">
        <v-card
          v-for="(p, idx) in preguntasActivas" :key="p.id"
          color="surface" rounded="lg" elevation="1"
          class="q-card"
        >
          <v-card-text style="padding:14px 16px;">
            <div class="q-head">
              <div class="q-num" :style="`background:${currentTestInfo.color}; color:white;`">{{ idx+1 }}</div>
              <span class="q-nivel"
                :style="`background:${nivelBg[p.nivel]}; color:${nivelColor[p.nivel]};`">
                {{ p.nivel }}
              </span>
            </div>

            <div class="q-texto">{{ p.texto }}</div>

            <div class="q-opciones">
              <div
                v-for="(op, i) in p.opciones" :key="i"
                class="q-op"
                :style="respuestas[p.id]===i ? `border-color:${currentTestInfo.color}; background:${currentTestInfo.bg};` : ''"
                @click="respuestas[p.id] = i"
              >
                <div class="q-letter"
                  :style="respuestas[p.id]===i ? `background:${currentTestInfo.color}; color:white;` : ''">
                  {{ letras[i] }}
                </div>
                <span class="q-op-text"
                  :style="respuestas[p.id]===i ? `color:${currentTestInfo.color}; font-weight:700;` : ''">
                  {{ op }}
                </span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- Enviar -->
      <div class="submit-area">
        <div class="submit-info"
          :style="`color:${respondidas<totalPregs?'#D97706':'#059669'};`">
          <NavIcon :name="respondidas<totalPregs?'alert':'check'" :size="15" />
          <span>
            {{ respondidas < totalPregs
              ? `Faltan ${totalPregs-respondidas} preguntas por responder`
              : 'Todas las preguntas respondidas. Puedes enviar.' }}
          </span>
        </div>
        <v-btn
          variant="elevated" color="primary" size="large"
          :disabled="respondidas < totalPregs"
          @click="enviar"
          rounded="lg"
          style="text-transform:none; font-weight:800; min-width:220px;"
        >
          <template #prepend><NavIcon name="send" :size="16" style="color:white;" /></template>
          Enviar evaluación
        </v-btn>
      </div>
    </template>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
*,*::before,*::after { box-sizing:border-box; font-family:'Nunito',sans-serif; }

.eval-root { min-height:100%; background:#0B0620; padding:26px 28px 40px; }
.ev-header { margin-bottom:16px; }
.ev-title { font-family:'Poppins',sans-serif; font-weight:900; font-size:1.6rem; color:#F1F5F9; margin:4px 0 8px; }
.ev-desc  { font-size:.86rem; color:#8B7BAF; line-height:1.65; max-width:600px; margin:0; }
.ev-desc strong { color:#C4B5FD; }

.req-legend { border:1px solid rgba(124,58,237,0.3) !important; background:rgba(124,58,237,0.1) !important; margin-bottom:18px; }
.req-items  { display:flex; gap:14px; flex-wrap:wrap; }
.req-item   { display:flex; align-items:center; gap:5px; font-size:.78rem; color:#C4B5FD; font-weight:600; }

.test-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:14px; }
.test-card { border:1px solid rgba(124,58,237,0.2) !important; background:#140B33 !important; transition:transform .2s,box-shadow .2s; }
.test-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.4) !important; border-color:rgba(124,58,237,0.4) !important; }
.tc-head   { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:10px; }
.tc-icon   { width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; }
.tc-module { font-size:.62rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:2px; }
.tc-name   { font-family:'Poppins',sans-serif; font-weight:800; font-size:.9rem; color:#F1F5F9; margin-bottom:8px; }
.tc-chips  { display:flex; gap:5px; flex-wrap:wrap; }
.tc-chip   { display:flex; align-items:center; gap:4px; font-size:.62rem; font-weight:700; color:#8B7BAF; background:rgba(124,58,237,0.12); border-radius:20px; padding:2px 8px; }
.tc-locked-label { display:flex; align-items:center; gap:5px; font-size:.63rem; font-weight:800; color:#F87171; text-transform:uppercase; letter-spacing:.8px; margin-bottom:4px; }
.tc-req-list { margin:0; padding-left:14px; font-size:.71rem; color:#8B7BAF; line-height:1.7; }

.result-card { border:1px solid rgba(124,58,237,0.25) !important; background:#140B33 !important; margin-bottom:20px; }
.result-icon-wrap { width:72px; height:72px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; }
.result-score { display:flex; align-items:baseline; gap:4px; justify-content:center; }
.result-num   { font-family:'Poppins',sans-serif; font-weight:900; font-size:2.8rem; }
.result-denom { font-size:1.3rem; color:#8B7BAF; font-weight:700; }
.result-pct   { font-size:.82rem; color:#8B7BAF; font-weight:700; }
.result-msg   { font-size:.88rem; color:#8B7BAF; max-width:400px; margin:0 auto; line-height:1.6; }
.result-actions { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-top:16px; }

.review-label { display:flex; align-items:center; gap:7px; font-size:.63rem; font-weight:800; color:#8B7BAF; letter-spacing:1.2px; text-transform:uppercase; margin:20px 0 12px; }
.review-list  { display:flex; flex-direction:column; gap:10px; }
.review-card  { border:1px solid rgba(124,58,237,0.2) !important; background:#140B33 !important; }
.ri-head    { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
.ri-status  { width:26px; height:26px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.ri-nivel   { font-size:.6rem; font-weight:800; text-transform:uppercase; letter-spacing:.8px; padding:2px 8px; border-radius:20px; }
.ri-num     { font-size:.65rem; color:#8B7BAF; font-weight:700; margin-left:auto; }
.ri-texto   { font-size:.9rem; font-weight:700; color:#F1F5F9; line-height:1.45; margin-bottom:10px; }
.ri-opciones { display:flex; flex-direction:column; gap:5px; margin-bottom:10px; }
.ri-op      { display:flex; align-items:flex-start; gap:8px; padding:7px 10px; border-radius:8px; border:1px solid; }
.ri-letter  { width:22px; height:22px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:.65rem; font-weight:800; flex-shrink:0; }
.ri-just    { display:flex; align-items:flex-start; gap:6px; background:rgba(251,191,36,0.08); border:1px solid rgba(251,191,36,0.2); border-radius:8px; padding:9px 11px; font-size:.78rem; color:#FDE68A; line-height:1.55; }

.active-bar  { display:flex; align-items:center; gap:10px; margin-bottom:8px; flex-wrap:wrap; }
.back-btn    { display:flex; align-items:center; gap:5px; background:none; border:1px solid rgba(124,58,237,0.3); border-radius:9px; padding:6px 12px; color:#8B7BAF; font-size:.78rem; font-weight:700; cursor:pointer; font-family:'Nunito',sans-serif; transition:all .15s; }
.back-btn:hover { border-color:#7C3AED; color:#C4B5FD; }
.active-info { display:flex; align-items:center; gap:8px; }
.active-icon { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; }
.active-count { margin-left:auto; font-size:.75rem; font-weight:800; color:#8B7BAF; background:rgba(124,58,237,0.15); border-radius:20px; padding:2px 10px; }

.q-list  { display:flex; flex-direction:column; gap:10px; }
.q-card  { border:1px solid rgba(124,58,237,0.2) !important; background:#140B33 !important; }
.q-head  { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
.q-num   { width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:.75rem; font-weight:900; flex-shrink:0; font-family:'Poppins',sans-serif; }
.q-nivel { font-size:.6rem; font-weight:800; text-transform:uppercase; letter-spacing:.8px; padding:2px 8px; border-radius:20px; }
.q-texto { font-size:.9rem; font-weight:700; color:#F1F5F9; line-height:1.45; margin-bottom:12px; }
.q-opciones { display:flex; flex-direction:column; gap:6px; }
.q-op    { display:flex; align-items:flex-start; gap:9px; padding:9px 11px; border-radius:9px; border:1.5px solid rgba(124,58,237,0.2); cursor:pointer; transition:all .15s; background:#1C1040; }
.q-op:hover { border-color:rgba(124,58,237,0.4); background:#241452; }
.q-letter   { width:23px; height:23px; border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:.65rem; font-weight:800; flex-shrink:0; background:rgba(124,58,237,0.2); color:#C4B5FD; transition:all .15s; }
.q-op-text  { font-size:.83rem; color:#C4B5FD; line-height:1.4; font-weight:500; }

.submit-area { margin-top:20px; display:flex; flex-direction:column; gap:10px; align-items:center; }
.submit-info { display:flex; align-items:center; gap:6px; font-size:.8rem; font-weight:700; }

/* ── RESPONSIVE EVALUACIÓN ── */
@media (max-width: 600px) {
  .eval-root { padding: 14px 14px 30px; }
  .ev-title  { font-size: 1.3rem; }
  .ev-desc   { font-size: .82rem; }

  .req-legend :deep(.v-card-text) { padding: 10px 12px; }
  .req-items  { flex-direction: column; gap: 8px; }

  .test-grid  { grid-template-columns: 1fr 1fr; gap: 10px; }

  .q-texto  { font-size: .86rem; }
  .q-op     { padding: 10px; min-height: 44px; }
  .q-letter { width: 26px; height: 26px; font-size: .7rem; }

  .ri-texto   { font-size: .85rem; }
  .ri-op      { padding: 8px; }

  .result-num { font-size: 2.2rem; }
  .result-actions { flex-direction: column; align-items: stretch; }
  .result-actions .v-btn { width: 100%; }

  .active-bar { flex-wrap: wrap; gap: 6px; }
  .active-info span { font-size: .75rem; }
}

@media (max-width: 400px) {
  .test-grid { grid-template-columns: 1fr; }
}
</style>