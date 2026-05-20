<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTextToSpeech } from '../composables/useTextToSpeech'
import NavIcon from '../components/NavIcon.vue'

const router = useRouter()
const { speak, speakingId } = useTextToSpeech()

const seccionActiva = ref('graficas')
const graficaIdx    = ref(0)
const mentefactoActivo = ref(0)
const panelAbierto  = ref([0])

const secciones = [
  { id:'graficas',    label:'Gráficas',    iconKey:'chart'  },
  { id:'mentefactos', label:'Mentefactos', iconKey:'list'   },
  { id:'glosario',    label:'Glosario',    iconKey:'books'  },
]

const graficas = [
  {
    id:'g1', titulo:'Solubilidad de sólidos vs. temperatura', subtitulo:'Curvas endotérmicas típicas',
    descripcion:'La mayoría de los sólidos iónicos muestran una relación directa entre solubilidad y temperatura. A medida que el solvente gana energía térmica, las interacciones soluto-solvente se intensifican, permitiendo disolver mayor cantidad de soluto.',
    nota:'Pendiente positiva → proceso endotérmico (absorbe calor)',
    color:'#4A6FA5',
    puntos:[{t:'0°C',a:13,b:35.7},{t:'20°C',a:31,b:36},{t:'40°C',a:64,b:36.6},{t:'60°C',a:110,b:37.3},{t:'80°C',a:169,b:38.4}],
    sustancias:[{n:'KNO₃',c:'#4A6FA5',p:'muy pronunciada'},{n:'NaCl',c:'#059669',p:'casi plana'}],
    maxVal:180
  },
  {
    id:'g2', titulo:'Solubilidad de gases vs. temperatura', subtitulo:'Comportamiento inverso — Ley de Henry',
    descripcion:'Los gases disueltos en líquidos exhiben el comportamiento opuesto: su solubilidad disminuye al aumentar la temperatura. El aumento de energía cinética facilita que las moléculas gaseosas escapen de la fase líquida.',
    nota:'Pendiente negativa → proceso exotérmico (libera calor)',
    color:'#0EA5E9',
    puntos:[{t:'0°C',a:14.6,b:14.6},{t:'10°C',a:11.3,b:11.3},{t:'20°C',a:9.1,b:9.1},{t:'30°C',a:7.6,b:7.6},{t:'40°C',a:6.4,b:6.4}],
    sustancias:[{n:'O₂ (mg/L)',c:'#0EA5E9',p:'negativa moderada'},{n:'CO₂',c:'#6D5BA3',p:'pronunciada negativa'}],
    maxVal:16
  },
  {
    id:'g3', titulo:'Zonas de saturación', subtitulo:'Interpretación de regiones en la gráfica',
    descripcion:'La curva de solubilidad divide el diagrama en regiones. Por debajo de la curva: soluciones insaturadas. Sobre la curva: soluciones saturadas. Por encima: soluciones sobresaturadas (estado metaestable).',
    nota:'Zona superior = sobresaturada · Sobre la curva = saturada · Zona inferior = insaturada',
    color:'#059669',
    zonas:[{label:'Sobresaturada',color:'#DC2626',desc:'Estado metaestable — por encima de la curva'},{label:'Saturada',color:'#D97706',desc:'Sobre la curva — máximo de soluto disuelto'},{label:'Insaturada',color:'#059669',desc:'Por debajo — puede disolver más soluto'}]
  },
]
const graficaActual = computed(() => graficas[graficaIdx.value])

const mentefactos = [
  {
    id:'m1', concepto:'SOLUCIÓN QUÍMICA', color:'#4A6FA5',
    supraordinada:{ concepto:'MEZCLA HOMOGÉNEA', descripcion:'Toda solución es una mezcla homogénea, pero no toda mezcla homogénea es una solución en sentido estricto.' },
    exclusiones:[{c:'SUSPENSIÓN',r:'Partículas > 1000 nm; se sedimentan por gravedad.'},{c:'COLOIDE',r:'Partículas entre 1–1000 nm; efecto Tyndall visible.'},{c:'MEZCLA PURA',r:'Una sustancia pura no involucra dos componentes distintos.'}],
    infraordinadas:[{c:'Solución gaseosa',e:'Aire (N₂ + O₂ + otros)'},{c:'Solución líquida',e:'Agua salada (NaCl + H₂O)'},{c:'Solución sólida',e:'Bronce (Cu + Zn)'}],
    propiedades:['Mezcla homogénea a nivel molecular','Partículas < 1 nm','No presenta efecto Tyndall','El soluto no se sedimenta']
  },
  {
    id:'m2', concepto:'SOLUBILIDAD', color:'#059669',
    supraordinada:{ concepto:'PROPIEDAD FISICOQUÍMICA', descripcion:'La solubilidad es una propiedad intensiva que depende de la naturaleza del sistema, no de la cantidad de sustancia.' },
    exclusiones:[{c:'VELOCIDAD DE DISOLUCIÓN',r:'La velocidad no determina la cantidad máxima que se disuelve.'},{c:'MISCIBILIDAD',r:'Aplica a líquidos; la solubilidad abarca sólidos, líquidos y gases.'},{c:'CONCENTRACIÓN',r:'La concentración describe una solución existente, no el límite máximo.'}],
    infraordinadas:[{c:'Solubilidad de sólidos',e:'Aumenta con la temperatura (endotérmica)'},{c:'Solubilidad de gases',e:'Disminuye con la temperatura (Ley de Henry)'},{c:'Solubilidad de líquidos',e:'Depende de la polaridad (similia similibus)'}],
    propiedades:['Expresada en g soluto / 100 g solvente','Depende de temperatura y presión','Determinada por la naturaleza del par soluto-solvente','Define el punto de saturación']
  },
  {
    id:'m3', concepto:'DILUCIÓN', color:'#D97706',
    supraordinada:{ concepto:'PROCESO DE PREPARACIÓN', descripcion:'La dilución es una operación básica de laboratorio dentro del grupo de técnicas de preparación y estandarización de soluciones.' },
    exclusiones:[{c:'CONCENTRACIÓN',r:'La concentración aumenta la relación soluto/solvente; la dilución la disminuye.'},{c:'EVAPORACIÓN',r:'La evaporación reduce el solvente; la dilución lo aumenta.'},{c:'PRECIPITACIÓN',r:'La precipitación elimina soluto sólido; no modifica el solvente.'}],
    infraordinadas:[{c:'Dilución simple',e:'Agregar agua destilada a una solución madre'},{c:'Dilución en serie',e:'Diluciones sucesivas 1:10 en microbiología'},{c:'Dilución por mezcla',e:'Combinar dos soluciones de diferente concentración'}],
    propiedades:['Se rige por C₁V₁ = C₂V₂','Los moles de soluto se conservan','El volumen final siempre es mayor que el inicial','La concentración final siempre es menor que la inicial']
  },
]
const mentefactoActual = computed(() => mentefactos[mentefactoActivo.value])

const glosario = [
  {
    modulo:'Módulo 1 — Fundamentos de Soluciones', iconKey:'beaker', color:'#4A6FA5',
    terminos:[
      {t:'Solución',         d:'Mezcla homogénea a nivel molecular de dos o más sustancias en proporciones variables.'},
      {t:'Soluto',           d:'Componente de la solución que se encuentra en menor proporción y que se disuelve en el solvente.'},
      {t:'Solvente',         d:'Componente en mayor proporción que disuelve al soluto. El agua es el "solvente universal" por su alta polaridad.'},
      {t:'Suspensión',       d:'Mezcla heterogénea con partículas mayores a 1000 nm que sedimentan por gravedad con el tiempo.'},
      {t:'Coloide',          d:'Sistema disperso cuyas partículas (1–1000 nm) no se sedimentan pero dispersan la luz (efecto Tyndall).'},
      {t:'Efecto Tyndall',   d:'Dispersión visible de un haz de luz al atravesar un coloide, debido al tamaño de sus partículas dispersas.'},
      {t:'Solución acuosa',  d:'Solución cuyo solvente es el agua. La más frecuente en sistemas biológicos y procesos industriales.'},
    ]
  },
  {
    modulo:'Módulo 2 y 3 — Propiedades y Clasificación', iconKey:'chart', color:'#059669',
    terminos:[
      {t:'Solubilidad',            d:'Masa máxima de soluto (g) que se puede disolver en 100 g de solvente a una temperatura y presión definidas.'},
      {t:'Solución insaturada',    d:'Solución que contiene menos soluto del máximo posible; puede disolver más soluto sin cambiar condiciones.'},
      {t:'Solución saturada',      d:'Solución que ha alcanzado la capacidad máxima de disolución a una temperatura determinada.'},
      {t:'Solución sobresaturada', d:'Solución metaestable que contiene más soluto disuelto del que corresponde al punto de saturación.'},
      {t:'Ley de Henry',           d:'La solubilidad de un gas en un líquido es directamente proporcional a la presión parcial del gas sobre la solución.'},
      {t:'Cristalización',         d:'Proceso por el cual el soluto en exceso en una solución sobresaturada pasa a la fase sólida de forma ordenada.'},
      {t:'Similia similibus',      d:'Principio que establece que las sustancias polares se disuelven mejor en solventes polares y las apolares en apolares.'},
    ]
  },
  {
    modulo:'Módulo 4 y 5 — Concentración y Dilución', iconKey:'calculator', color:'#6D5BA3',
    terminos:[
      {t:'Molaridad (M)',          d:'Número de moles de soluto por litro de solución. Unidad: mol/L. Fórmula: M = n / V(L).'},
      {t:'Molalidad (m)',          d:'Moles de soluto por kilogramo de solvente. No varía con la temperatura, a diferencia de la molaridad.'},
      {t:'Porcentaje m/m',         d:'Relación entre la masa del soluto y la masa total de la solución expresada al 100%. % m/m = (m_soluto / m_solución) × 100.'},
      {t:'ppm',                    d:'Partes por millón: miligramos de soluto por litro de solución (mg/L). Usada para concentraciones traza.'},
      {t:'Dilución',               d:'Proceso de reducir la concentración de una solución añadiendo más solvente. Los moles de soluto se conservan.'},
      {t:'C₁V₁ = C₂V₂',          d:'Ecuación de dilución. El producto concentración × volumen es constante antes y después de la dilución.'},
      {t:'Solución madre',         d:'Solución de concentración conocida y elevada a partir de la cual se preparan soluciones más diluidas.'},
      {t:'Dilución en serie',      d:'Técnica de diluciones sucesivas (generalmente 1:10) usada en microbiología y análisis clínico.'},
    ]
  },
]
</script>

<template>
  <div class="rec-root">

    <!-- TOOLBAR -->
    <div class="rec-toolbar">
      <button class="btn-back" @click="$router.push('/')">
        <NavIcon name="home" :size="14" />
        <span>Inicio</span>
      </button>
      <div class="toolbar-title">
        <NavIcon name="books" :size="14" style="color:#94A3B8;" />
        <span>Biblioteca de Recursos</span>
      </div>
      <div class="toolbar-tabs">
        <button
          v-for="s in secciones" :key="s.id"
          class="toolbar-tab"
          :class="{ 'toolbar-tab--active': seccionActiva === s.id }"
          @click="seccionActiva = s.id"
        >
          <NavIcon :name="s.iconKey" :size="13" />
          <span>{{ s.label }}</span>
        </button>
      </div>
    </div>

    <div class="rec-body">
      <v-fade-transition mode="out-in" :duration="150">

        <!-- GRÁFICAS -->
        <div v-if="seccionActiva==='graficas'" key="graficas">
          <div class="section-header">
            <div class="sec-icon" style="background:#EEF3FA; border-color:#BFDBFE;">
              <NavIcon name="chart" :size="20" style="color:#4A6FA5;" />
            </div>
            <div>
              <div class="sec-kicker">Recurso visual</div>
              <h2 class="sec-title">Gráficas de Solubilidad</h2>
              <p class="sec-desc">Interpreta las curvas de solubilidad para predecir el comportamiento de soluciones bajo diferentes condiciones.</p>
            </div>
          </div>

          <v-card color="surface" rounded="lg" elevation="2" style="border:1px solid #E2E8F0 !important;">
            <!-- Nav carrusel -->
            <div class="carousel-nav">
              <button class="c-btn" :disabled="graficaIdx===0" @click="graficaIdx--">
                <NavIcon name="chevron" :size="16" style="transform:rotate(180deg);" />
              </button>
              <div class="c-dots">
                <button v-for="(g,i) in graficas" :key="g.id"
                  class="c-dot" :class="{'c-dot--active': graficaIdx===i}"
                  :style="graficaIdx===i ? `background:${g.color};` : ''"
                  @click="graficaIdx=i"
                ></button>
              </div>
              <button class="c-btn" :disabled="graficaIdx===graficas.length-1" @click="graficaIdx++">
                <NavIcon name="chevron" :size="16" />
              </button>
            </div>

            <div style="padding:16px 20px 0;">
              <div style="display:flex; align-items:flex-start; gap:10px; margin-bottom:12px;">
                <v-chip :color="graficaActual.color" variant="tonal" size="x-small" style="font-weight:800;">
                  {{ graficaIdx+1 }}/{{ graficas.length }}
                </v-chip>
                <div>
                  <div style="font-family:'Poppins',sans-serif; font-weight:700; font-size:.9rem; color:#1E293B;">{{ graficaActual.titulo }}</div>
                  <div style="font-size:.72rem; color:#64748B;">{{ graficaActual.subtitulo }}</div>
                </div>
              </div>

              <!-- SVG -->
              <div style="background:#F8F9FC; border-radius:10px; border:1px solid #F1F5F9; overflow:hidden;">
                <template v-if="graficaActual.puntos">
                  <svg viewBox="0 0 520 220" style="width:100%; height:auto;">
                    <line x1="50" y1="10" x2="50" y2="185" stroke="#E2E8F0" stroke-width="1.5"/>
                    <line x1="50" y1="185" x2="510" y2="185" stroke="#E2E8F0" stroke-width="1.5"/>
                    <!-- Grid lines -->
                    <line v-for="y in [55,100,145]" :key="y" :x1="50" :y1="y" :x2="510" :y2="y" stroke="#F1F5F9" stroke-width="1"/>
                    <!-- Etiquetas eje X -->
                    <text v-for="(p,i) in graficaActual.puntos" :key="i" :x="70+i*110" y="200" style="font-size:10px; fill:#94A3B8; font-family:Nunito;" text-anchor="middle">{{ p.t }}</text>
                    <!-- Línea A -->
                    <polyline
                      :points="graficaActual.puntos.map((p,i)=>`${70+i*110},${185-(p.a/graficaActual.maxVal)*165}`).join(' ')"
                      :stroke="graficaActual.sustancias[0].c" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    />
                    <circle v-for="(p,i) in graficaActual.puntos" :key="`a${i}`"
                      :cx="70+i*110" :cy="185-(p.a/graficaActual.maxVal)*165"
                      r="4" :fill="graficaActual.sustancias[0].c"/>
                    <!-- Leyenda -->
                    <g v-for="(s,i) in graficaActual.sustancias" :key="s.n">
                      <line :x1="65" :y1="15+i*18" :x2="85" :y2="15+i*18" :stroke="s.c" stroke-width="2.5"/>
                      <circle :cx="75" :cy="15+i*18" r="3" :fill="s.c"/>
                      <text :x="90" :y="19+i*18" style="font-size:10px; font-family:Nunito;" :fill="s.c">{{ s.n }} — {{ s.p }}</text>
                    </g>
                    <text x="20" y="100" style="font-size:10px; fill:#94A3B8; font-family:Nunito;" transform="rotate(-90,20,100)" text-anchor="middle">g / 100 mL</text>
                    <text x="280" y="215" style="font-size:10px; fill:#94A3B8; font-family:Nunito;" text-anchor="middle">Temperatura</text>
                  </svg>
                </template>

                <template v-else>
                  <svg viewBox="0 0 520 220" style="width:100%; height:auto;">
                    <defs>
                      <linearGradient id="z-sob" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#DC2626" stop-opacity="0.15"/>
                        <stop offset="100%" stop-color="#DC2626" stop-opacity="0.03"/>
                      </linearGradient>
                      <linearGradient id="z-ins" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#059669" stop-opacity="0.05"/>
                        <stop offset="100%" stop-color="#059669" stop-opacity="0.15"/>
                      </linearGradient>
                    </defs>
                    <polygon points="50,10 510,10 510,185 50,185" fill="url(#z-sob)"/>
                    <polygon points="50,60 130,80 210,95 290,108 370,118 450,126 510,132 510,185 50,185" fill="url(#z-ins)"/>
                    <polyline points="50,60 130,80 210,95 290,108 370,118 450,126 510,132" stroke="#D97706" stroke-width="3" fill="none" stroke-linecap="round"/>
                    <line x1="50" y1="10" x2="50" y2="185" stroke="#E2E8F0" stroke-width="1.5"/>
                    <line x1="50" y1="185" x2="510" y2="185" stroke="#E2E8F0" stroke-width="1.5"/>
                    <text x="280" y="40" style="font-size:10px; font-family:'Poppins',sans-serif; font-weight:700; fill:#DC2626;" text-anchor="middle">ZONA SOBRESATURADA</text>
                    <text x="280" y="160" style="font-size:10px; font-family:'Poppins',sans-serif; font-weight:700; fill:#059669;" text-anchor="middle">ZONA INSATURADA</text>
                    <text x="390" y="100" style="font-size:9px; font-family:'Poppins',sans-serif; font-weight:700; fill:#D97706;" text-anchor="middle">CURVA DE SATURACIÓN</text>
                    <text x="280" y="215" style="font-size:10px; fill:#94A3B8; font-family:Nunito;" text-anchor="middle">Temperatura →</text>
                    <text x="20" y="100" style="font-size:10px; fill:#94A3B8; font-family:Nunito;" transform="rotate(-90,20,100)" text-anchor="middle">Concentración →</text>
                  </svg>
                  <div class="zones-legend">
                    <div v-for="z in graficaActual.zonas" :key="z.label" class="zone-item">
                      <div class="zone-dot" :style="`background:${z.color};`"></div>
                      <div>
                        <div style="font-size:.72rem; font-weight:800; text-transform:uppercase; letter-spacing:.8px;" :style="`color:${z.color};`">{{ z.label }}</div>
                        <div style="font-size:.7rem; color:#64748B; margin-top:1px;">{{ z.desc }}</div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- Footer gráfica -->
            <div style="padding:12px 20px 14px; border-top:1px solid #F1F5F9; display:flex; flex-direction:column; gap:7px;">
              <div style="display:flex; align-items:flex-start; gap:6px;">
                <NavIcon name="info" :size="13" style="color:#94A3B8; margin-top:1px; flex-shrink:0;" />
                <p style="font-size:.8rem; color:#64748B; line-height:1.6; margin:0;">{{ graficaActual.descripcion }}</p>
              </div>
              <div class="chart-nota" :style="`border-left-color:${graficaActual.color};`">
                <NavIcon name="lightbulb" :size="12" :style="`color:${graficaActual.color};`" />
                <span style="font-size:.76rem; font-weight:600; color:#475569;">{{ graficaActual.nota }}</span>
              </div>
            </div>
          </v-card>
        </div>

        <!-- MENTEFACTOS -->
        <div v-else-if="seccionActiva==='mentefactos'" key="mentefactos">
          <div class="section-header">
            <div class="sec-icon" style="background:#ECFDF5; border-color:#86EFAC;">
              <NavIcon name="list" :size="20" style="color:#059669;" />
            </div>
            <div>
              <div class="sec-kicker">Organizadores gráficos</div>
              <h2 class="sec-title">Mentefactos Conceptuales</h2>
              <p class="sec-desc">Los mentefactos representan la estructura lógica de un concepto: su categoría superior, exclusiones, subdivisiones y propiedades.</p>
            </div>
          </div>

          <div class="mf-tabs">
            <button v-for="(m,i) in mentefactos" :key="m.id"
              class="mf-tab"
              :class="{'mf-tab--active': mentefactoActivo===i}"
              :style="mentefactoActivo===i ? `border-color:${m.color}; background:${m.color}10; color:${m.color};` : ''"
              @click="mentefactoActivo=i">
              {{ m.concepto }}
            </button>
          </div>

          <v-card color="surface" rounded="lg" elevation="2" style="border:1px solid #E2E8F0 !important;">
            <v-card-text style="padding:20px;">

              <!-- Supraordinada -->
              <div class="mf-sec-label">
                <NavIcon name="arrow" :size="13" style="color:#94A3B8; transform:rotate(-90deg);" />
                Supraordinada — categoría superior
              </div>
              <div class="mf-supra" :style="`border-color:${mentefactoActual.color}30;`">
                <div class="mf-supra-concept" :style="`color:${mentefactoActual.color};`">{{ mentefactoActual.supraordinada.concepto }}</div>
                <div class="mf-connector" :style="`background:${mentefactoActual.color}50;`"></div>
                <div class="mf-center" :style="`border-color:${mentefactoActual.color}; box-shadow:0 0 0 1px ${mentefactoActual.color}20;`">
                  {{ mentefactoActual.concepto }}
                </div>
                <p class="mf-supra-desc">{{ mentefactoActual.supraordinada.descripcion }}</p>
              </div>

              <div class="mf-row">
                <!-- Exclusiones -->
                <div>
                  <div class="mf-sec-label"><NavIcon name="close" :size="12" style="color:#DC2626;" /> Exclusiones — NO es</div>
                  <div style="display:flex; flex-direction:column; gap:6px;">
                    <div v-for="ex in mentefactoActual.exclusiones" :key="ex.c" class="mf-ex">
                      <div class="mf-ex-head">
                        <div class="mf-ex-dot"><NavIcon name="close" :size="10" style="color:#DC2626;" /></div>
                        <span class="mf-ex-name">{{ ex.c }}</span>
                      </div>
                      <p class="mf-ex-desc">{{ ex.r }}</p>
                    </div>
                  </div>
                </div>
                <!-- Infraordinadas -->
                <div>
                  <div class="mf-sec-label"><NavIcon name="arrow" :size="13" style="color:#94A3B8;" /> Infraordinadas — tipos</div>
                  <div style="display:flex; flex-direction:column; gap:6px;">
                    <div v-for="inf in mentefactoActual.infraordinadas" :key="inf.c" class="mf-infra" :style="`border-left-color:${mentefactoActual.color};`">
                      <div class="mf-infra-name" :style="`color:${mentefactoActual.color};`">{{ inf.c }}</div>
                      <div class="mf-infra-ex">{{ inf.e }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Propiedades -->
              <div style="margin-top:16px;">
                <div class="mf-sec-label"><NavIcon name="list" :size="12" style="color:#94A3B8;" /> Propiedades características</div>
                <div class="mf-props">
                  <div v-for="(prop,i) in mentefactoActual.propiedades" :key="i" class="mf-prop" :style="`border-color:${mentefactoActual.color}20; background:${mentefactoActual.color}06;`">
                    <div class="mf-prop-num" :style="`color:${mentefactoActual.color}; background:${mentefactoActual.color}15;`">{{ i+1 }}</div>
                    <span style="font-size:.76rem; color:#475569; line-height:1.45;">{{ prop }}</span>
                  </div>
                </div>
              </div>

            </v-card-text>
          </v-card>
        </div>

        <!-- GLOSARIO -->
        <div v-else-if="seccionActiva==='glosario'" key="glosario">
          <div class="section-header">
            <div class="sec-icon" style="background:#F0EDFB; border-color:#C4B5FD;">
              <NavIcon name="books" :size="20" style="color:#6D5BA3;" />
            </div>
            <div>
              <div class="sec-kicker">Terminología técnica</div>
              <h2 class="sec-title">Glosario de Soluciones Químicas</h2>
              <p class="sec-desc">Definiciones precisas organizadas por módulo. Haz clic en el ícono de audio para escuchar la definición.</p>
            </div>
          </div>

          <v-expansion-panels v-model="panelAbierto" multiple class="glos-panels">
            <v-expansion-panel v-for="(cat,ci) in glosario" :key="ci"
              class="glos-panel" rounded="lg" elevation="2">
              <v-expansion-panel-title class="glos-title">
                <div style="display:flex; align-items:center; gap:10px;">
                  <div class="glos-icon" :style="`background:${cat.color}12; border:1px solid ${cat.color}25;`">
                    <NavIcon :name="cat.iconKey" :size="17" :style="`color:${cat.color};`" />
                  </div>
                  <div>
                    <div style="font-size:.6rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:1px;" :style="`color:${cat.color};`">{{ cat.terminos.length }} términos</div>
                    <div style="font-size:.88rem; font-weight:700; color:#1E293B;">{{ cat.modulo }}</div>
                  </div>
                </div>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <div class="terminos-grid">
                  <div v-for="(t,ti) in cat.terminos" :key="t.t" class="termino">
                    <div class="termino-head">
                      <div class="termino-num" :style="`color:${cat.color}; background:${cat.color}15;`">{{ ti+1 }}</div>
                      <div class="termino-name">{{ t.t }}</div>
                      <button class="termino-audio" @click="speak(`${t.t}. ${t.d}`, `${ci}-${ti}`)">
                        <NavIcon name="volume" :size="14" :style="`color:${speakingId===`${ci}-${ti}`?cat.color:'#CBD5E1'};`" />
                      </button>
                    </div>
                    <p class="termino-def">{{ t.d }}</p>
                    <div v-if="speakingId===`${ci}-${ti}`" class="termino-playing" :style="`color:${cat.color};`">
                      <NavIcon name="chart" :size="11" />
                      Reproduciendo...
                    </div>
                  </div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>

      </v-fade-transition>
    </div>

    <!-- FOOTER -->
    <footer class="rec-footer">
      <div style="display:flex; align-items:center; gap:5px; font-size:.66rem; color:#94A3B8; font-weight:600;">
        <NavIcon name="people" :size="12" style="color:#CBD5E1;" />
        Almis Ramírez · Kiara Corena · Fernando Urrutia · Sarela Altamiranda
      </div>
      <div style="font-size:.66rem; color:#94A3B8; font-weight:600;">QUMITIC · Universidad de Córdoba · 2025</div>
    </footer>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
*,*::before,*::after { box-sizing:border-box; font-family:'Nunito',sans-serif; }

.rec-root { min-height:100%; background:var(--bg); display:flex; flex-direction:column; }

/* Toolbar */
.rec-toolbar {
  display:flex; align-items:center; gap:10px; padding:10px 20px;
  background:var(--surface); border-bottom:1px solid var(--border);
  position:sticky; top:0; z-index:10; flex-wrap:wrap;
  box-shadow:var(--shadow-sm);
}
.btn-back {
  display:flex; align-items:center; gap:5px;
  background:var(--primary-soft); border:1px solid var(--primary-bd);
  border-radius:8px; padding:5px 11px; color:var(--primary);
  font-size:.73rem; font-weight:700; cursor:pointer; transition:all .15s; font-family:'Nunito',sans-serif; white-space:nowrap;
}
.btn-back:hover { background:var(--primary); color:white; }
.toolbar-title { display:flex; align-items:center; gap:5px; font-size:.75rem; font-weight:700; color:var(--muted); white-space:nowrap; }
.toolbar-tabs  { display:flex; gap:2px; margin-left:auto; }
.toolbar-tab   { display:flex; align-items:center; gap:5px; background:transparent; border:none; border-bottom:2px solid transparent; padding:6px 14px; color:var(--muted); font-size:.78rem; font-weight:700; cursor:pointer; transition:all .15s; font-family:'Nunito',sans-serif; }
.toolbar-tab:hover { color:var(--primary); }
.toolbar-tab--active { color:var(--primary); border-bottom-color:var(--primary); }

.rec-body { flex:1; padding:clamp(14px,4vw,22px) var(--page-px) 16px; }

.section-header { display:flex; align-items:flex-start; gap:14px; margin-bottom:18px; }
.sec-icon  { width:50px; height:50px; border-radius:13px; border:1px solid; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.sec-kicker { font-size:.6rem; font-weight:800; color:var(--muted); text-transform:uppercase; letter-spacing:1.5px; margin-bottom:2px; }
.sec-title  { font-family:'Poppins',sans-serif; font-weight:800; font-size:clamp(1.1rem,4vw,1.3rem); color:var(--text); margin:0 0 4px; }
.sec-desc   { font-size:.82rem; color:var(--muted); line-height:1.65; margin:0; }

/* Carrusel */
.carousel-nav {
  display:flex; align-items:center; justify-content:center; gap:12px;
  padding:10px 20px; border-bottom:1px solid var(--border);
}
.c-btn {
  width:28px; height:28px; border-radius:7px;
  background:var(--surface-2); border:1px solid var(--border);
  display:flex; align-items:center; justify-content:center;
  color:var(--muted); cursor:pointer; transition:all .15s;
}
.c-btn:hover:not(:disabled) { background:var(--primary-soft); color:var(--primary); border-color:var(--primary-bd); }
.c-btn:disabled { opacity:.35; cursor:not-allowed; }
.c-dots { display:flex; gap:6px; }
.c-dot  { width:7px; height:7px; border-radius:50%; background:var(--border); border:none; cursor:pointer; transition:all .18s; }
.c-dot--active { width:18px; border-radius:4px; }
.chart-nota { display:flex; align-items:center; gap:7px; border-left:3px solid; padding-left:10px; }

.zones-legend { display:flex; gap:12px; flex-wrap:wrap; padding:10px 16px 12px; }
.zone-item { display:flex; align-items:flex-start; gap:7px; flex:1; min-width:130px; }
.zone-dot  { width:9px; height:9px; border-radius:50%; flex-shrink:0; margin-top:4px; }
.chart-info-text { font-size:.8rem; color:var(--muted); line-height:1.6; margin:0; }

/* Mentefactos */
.mf-tabs { display:flex; gap:7px; flex-wrap:wrap; margin-bottom:16px; }
.mf-tab  {
  background:var(--surface-2); border:1.5px solid var(--border);
  border-radius:9px; padding:7px 14px; cursor:pointer;
  font-size:.77rem; font-weight:700; color:var(--muted);
  transition:all .18s; font-family:'Nunito',sans-serif;
}
.mf-tab:hover { border-color:var(--primary-bd); color:var(--primary); }
.mf-sec-label { display:flex; align-items:center; gap:6px; font-size:.6rem; font-weight:800; color:var(--muted); text-transform:uppercase; letter-spacing:1.2px; margin-bottom:8px; }
.mf-supra { display:flex; flex-direction:column; align-items:center; background:var(--surface-2); border:1px solid; border-radius:10px; padding:12px 16px; margin-bottom:14px; }
.mf-supra-concept { font-family:'Poppins',sans-serif; font-weight:900; font-size:.86rem; text-align:center; letter-spacing:.5px; }
.mf-connector { width:2px; height:18px; border-radius:2px; margin:5px 0; }
.mf-center { font-family:'Poppins',sans-serif; font-weight:900; font-size:.95rem; color:var(--text); text-align:center; border:2px solid; border-radius:9px; padding:7px 18px; letter-spacing:1px; }
.mf-supra-desc { font-size:.76rem; color:var(--muted); text-align:center; line-height:1.55; margin:7px 0 0; max-width:460px; }
.mf-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:14px; }
.mf-ex  { background:#FEF2F2; border:1px solid #FECACA; border-radius:8px; padding:8px 10px; }
[data-theme="dark"] .mf-ex { background:rgba(248,113,113,0.08); border-color:rgba(248,113,113,0.25); }
.mf-ex-head { display:flex; align-items:center; gap:6px; margin-bottom:3px; }
.mf-ex-dot  { width:16px; height:16px; border-radius:5px; background:#FEE2E2; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.mf-ex-name { font-size:.76rem; font-weight:800; color:#991B1B; }
[data-theme="dark"] .mf-ex-name { color:#FCA5A5; }
.mf-ex-desc { font-size:.7rem; color:var(--muted); line-height:1.4; margin:0; }
.mf-infra   { background:var(--surface-2); border:1px solid var(--border); border-left:3px solid; border-radius:8px; padding:8px 10px; }
.mf-infra-name { font-size:.76rem; font-weight:800; margin-bottom:2px; }
.mf-infra-ex   { font-size:.7rem; color:var(--muted); }
.mf-props { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.mf-prop  { display:flex; align-items:flex-start; gap:7px; border:1px solid; border-radius:8px; padding:7px 9px; background:var(--surface-2); }
.mf-prop-num { font-family:'Poppins',sans-serif; font-weight:900; font-size:.7rem; width:20px; height:20px; border-radius:5px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.mf-prop span { font-size:.76rem; color:var(--text-2); line-height:1.45; }

/* Glosario */
.glos-panels { display:flex; flex-direction:column; gap:8px; }
.glos-panel  { background:var(--surface) !important; border:1px solid var(--border) !important; border-radius:12px; }
.glos-panel :deep(.v-expansion-panel-title) { padding:12px 16px; min-height:auto; background:var(--surface) !important; }
.glos-panel :deep(.v-expansion-panel-text__wrapper) { padding:0 16px 14px; background:var(--surface) !important; }
.glos-icon { width:38px; height:38px; border-radius:9px; display:flex; align-items:center; justify-content:center; }
.terminos-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:8px; padding-top:4px; }
.termino { background:var(--surface-2); border:1px solid var(--border); border-radius:9px; padding:10px 12px; transition:border-color .18s; }
.termino:hover { border-color:var(--primary-bd); }
.termino-head  { display:flex; align-items:center; gap:7px; margin-bottom:5px; }
.termino-num   { width:19px; height:19px; border-radius:5px; display:flex; align-items:center; justify-content:center; font-family:'Poppins',sans-serif; font-weight:900; font-size:.62rem; flex-shrink:0; }
.termino-name  { font-size:.82rem; font-weight:800; color:var(--text); flex:1; }
.termino-audio { background:transparent; border:none; cursor:pointer; padding:3px; border-radius:5px; transition:background .15s; display:flex; align-items:center; }
.termino-audio:hover { background:var(--primary-soft); }
.termino-def   { font-size:.74rem; color:var(--muted); line-height:1.55; margin:0; }
.termino-playing { display:flex; align-items:center; gap:4px; font-size:.62rem; font-weight:700; margin-top:5px; text-transform:uppercase; letter-spacing:.8px; }

/* Footer */
.rec-footer {
  display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px;
  padding:10px var(--page-px); background:var(--surface); border-top:1px solid var(--border);
  font-size:.66rem; color:var(--muted); font-weight:600;
}

@media (max-width:600px) {
  .rec-body    { padding:14px; }
  .sec-title   { font-size:1.1rem; }
  .rec-toolbar { padding:8px 12px; gap:6px; }
  .toolbar-tabs { order:3; width:100%; border-top:1px solid var(--border); padding-top:4px; justify-content:space-around; }
  .toolbar-tab  { padding:6px 8px; font-size:.72rem; gap:4px; }
  .mf-row   { grid-template-columns:1fr; }
  .mf-props { grid-template-columns:1fr; }
  .terminos-grid { grid-template-columns:1fr; }
  .zones-legend  { flex-direction:column; gap:8px; }
}
</style>