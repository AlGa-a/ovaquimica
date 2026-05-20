<script setup>
import { ref } from 'vue'
import NavIcon from '../components/NavIcon.vue'

const simActivo = ref(null)

const simuladores = [
  {
    id: 'concentracion',
    titulo: 'Laboratorio de Concentración',
    subtitulo: 'PhET Colorado · University of Colorado Boulder',
    desc: 'Mezcla diferentes solutos en agua y observa en tiempo real cómo cambia la concentración. Ajusta el volumen y la cantidad de soluto. Experimenta la saturación visualmente.',
    iconKey: 'beaker',
    color: '#4A6FA5',
    tags: ['Concentración', 'Saturación', 'Molaridad'],
    src: 'https://phet.colorado.edu/sims/html/concentration/latest/concentration_en.html?locale=es',
    nivel: 'Básico', tiempo: '15 min', modulo: 'Módulos 1 y 2',
  },
  {
    id: 'molaridad',
    titulo: 'Simulador de Molaridad',
    subtitulo: 'PhET Colorado · University of Colorado Boulder',
    desc: 'Comprende la relación entre moles, litros y molaridad ajustando cantidad de soluto y volumen de solución. Compara diferentes compuestos en agua.',
    iconKey: 'flask',
    color: '#6D5BA3',
    tags: ['Molaridad', 'Moles', 'Volumen'],
    src: 'https://phet.colorado.edu/sims/html/molarity/latest/molarity_en.html?locale=es',
    nivel: 'Intermedio', tiempo: '20 min', modulo: 'Módulo 4',
  },
  {
    id: 'azucar-sal',
    titulo: 'Azúcar y Sal en Solución',
    subtitulo: 'PhET Colorado · University of Colorado Boulder',
    desc: 'Observa a nivel molecular cómo se disuelven el azúcar y la sal. Compara la disociación iónica vs molecular y su efecto en la conductividad.',
    iconKey: 'drop',
    color: '#059669',
    tags: ['Disolución', 'Nivel molecular', 'Iones'],
    src: 'https://phet.colorado.edu/sims/html/sugar-and-salt-solutions/latest/sugar-and-salt-solutions_en.html?locale=es',
    nivel: 'Avanzado', tiempo: '25 min', modulo: 'Módulo 1',
  },
]

const nivelColor = { 'Básico': '#059669', 'Intermedio': '#D97706', 'Avanzado': '#DC2626' }
const nivelBg    = { 'Básico': '#ECFDF5', 'Intermedio': '#FFFBEB', 'Avanzado': '#FEF2F2' }
</script>

<template>
  <div class="sim-root">

    <div class="sim-header">
      <v-chip color="primary" variant="tonal" size="small" class="mb-2">Simuladores</v-chip>
      <h1 class="sim-title">Laboratorio Virtual PhET</h1>
      <p class="sim-desc">Simulaciones científicas reales de la Universidad de Colorado Boulder. Diseñadas para explorar conceptos de soluciones de forma visual e interactiva.</p>
    </div>

    <template v-if="!simActivo">
      <div class="sim-grid">
        <v-card v-for="sim in simuladores" :key="sim.id"
          color="surface" rounded="lg" elevation="2"
          class="sim-card"
          :style="`border-top: 3px solid ${sim.color} !important;`"
          @click="simActivo = sim"
        >
          <v-card-text style="padding:16px;">
            <div class="sim-head">
              <div class="sim-icon" :style="`background:${sim.color}15; border:1px solid ${sim.color}30;`">
                <NavIcon :name="sim.iconKey" :size="22" :style="`color:${sim.color};`" />
              </div>
              <div>
                <span class="sim-nivel" :style="`color:${nivelColor[sim.nivel]}; background:${nivelBg[sim.nivel]};`">{{ sim.nivel }}</span>
                <span class="sim-time"><NavIcon name="clock" :size="10" style="color:#94A3B8;" /> {{ sim.tiempo }}</span>
              </div>
            </div>
            <div class="sim-source">{{ sim.subtitulo }}</div>
            <div class="sim-name">{{ sim.titulo }}</div>
            <div class="sim-module"><NavIcon name="list" :size="11" style="color:#94A3B8;" /> {{ sim.modulo }}</div>
            <div class="sim-desc-text">{{ sim.desc }}</div>
            <div class="sim-tags">
              <v-chip v-for="tag in sim.tags" :key="tag" size="x-small" variant="tonal" :color="sim.color" style="font-weight:700;">{{ tag }}</v-chip>
            </div>
          </v-card-text>
          <v-divider />
          <v-card-actions style="padding:10px 14px;">
            <v-btn variant="elevated" :color="sim.color" size="small" rounded="lg" block style="text-transform:none; font-weight:700;">
              <template #prepend><NavIcon name="arrow" :size="14" style="color:white;" /></template>
              Abrir simulador
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <v-card color="surface" rounded="lg" elevation="1" class="inst-card mt-4" style="border:1px solid #E2E8F0 !important;">
        <v-card-text>
          <div class="inst-title">
            <NavIcon name="info" :size="16" style="color:#4A6FA5;" />
            ¿Cómo usar los simuladores?
          </div>
          <div class="inst-grid">
            <div v-for="(inst,i) in ['Haz clic para abrir el simulador en una nueva pestaña.','Lee la descripción antes de interactuar.','Mueve todos los controles y observa los cambios.','Relaciona lo observado con los videos del módulo correspondiente.']" :key="i" class="inst-item">
              <div class="inst-num">{{ i+1 }}</div>
              <span>{{ inst }}</span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </template>

    <template v-else>
      <div class="active-bar">
        <v-btn variant="text" color="primary" size="small" @click="simActivo=null" style="text-transform:none; font-weight:700;">
          <template #prepend><NavIcon name="chevron" :size="14" style="transform:rotate(180deg);" /></template>
          Volver
        </v-btn>
        <div class="active-info">
          <div class="ai-icon" :style="`background:${simActivo.color}15;`">
            <NavIcon :name="simActivo.iconKey" :size="16" :style="`color:${simActivo.color};`" />
          </div>
          <div class="ai-name">{{ simActivo.titulo }}</div>
        </div>
      </div>

      <v-card color="surface" rounded="lg" elevation="2" style="border:1px solid #E2E8F0 !important;">
        <v-card-text style="text-align:center; padding:40px 28px;">
          <div class="launch-icon" :style="`background:linear-gradient(135deg,${simActivo.color},${simActivo.color}88);`">
            <NavIcon :name="simActivo.iconKey" :size="44" style="color:white;" />
          </div>
          <div class="launch-title">{{ simActivo.titulo }}</div>
          <p class="launch-desc">Este simulador requiere abrirse en una ventana independiente para funcionar correctamente. Haz clic en el botón para lanzarlo.</p>
          <a :href="simActivo.src" target="_blank" class="launch-btn" :style="`background:linear-gradient(135deg,${simActivo.color},${simActivo.color}88);`">
            <NavIcon name="arrow" :size="17" style="color:white;" />
            Abrir simulador PhET
          </a>
          <p class="launch-note"><NavIcon name="info" :size="13" style="color:#94A3B8;" /> Se abrirá en una nueva pestaña del navegador</p>
        </v-card-text>
      </v-card>
    </template>

  </div>
</template>

<style scoped>
* { font-family:'Nunito',sans-serif; box-sizing:border-box; }
.sim-root { min-height:100%; background:#0B0620; padding:24px; }
.sim-header { margin-bottom:20px; }
.sim-title { font-family:'Poppins',sans-serif; font-weight:900; font-size:1.6rem; color:#F1F5F9; margin:4px 0 8px; }
.sim-desc  { font-size:.86rem; color:#8B7BAF; line-height:1.65; max-width:580px; margin:0; }
.sim-grid  { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:14px; }
.sim-card  { cursor:pointer; transition:transform .2s,box-shadow .2s; border:1px solid rgba(124,58,237,0.2) !important; background:#140B33 !important; }
.sim-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.4) !important; border-color:rgba(124,58,237,0.4) !important; }
.sim-head  { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:8px; }
.sim-icon  { width:50px; height:50px; border-radius:12px; display:flex; align-items:center; justify-content:center; }
.sim-nivel { font-size:.62rem; font-weight:800; padding:2px 8px; border-radius:20px; display:block; margin-bottom:4px; }
.sim-time  { display:flex; align-items:center; gap:3px; font-size:.62rem; color:#8B7BAF; font-weight:600; }
.sim-source { font-size:.6rem; color:#8B7BAF; font-weight:700; text-transform:uppercase; letter-spacing:.8px; margin-bottom:2px; }
.sim-name   { font-family:'Poppins',sans-serif; font-weight:800; font-size:.92rem; color:#F1F5F9; margin-bottom:4px; }
.sim-module { display:flex; align-items:center; gap:4px; font-size:.7rem; color:#8B7BAF; font-weight:600; margin-bottom:6px; }
.sim-desc-text { font-size:.77rem; color:#8B7BAF; line-height:1.55; margin-bottom:8px; }
.sim-tags  { display:flex; gap:5px; flex-wrap:wrap; }
.inst-title { display:flex; align-items:center; gap:7px; font-family:'Poppins',sans-serif; font-weight:800; color:#F1F5F9; font-size:.9rem; margin-bottom:12px; }
.inst-grid  { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:10px; }
.inst-item  { display:flex; align-items:flex-start; gap:8px; font-size:.78rem; color:#8B7BAF; line-height:1.5; }
.inst-num   { width:22px; height:22px; border-radius:6px; background:rgba(124,58,237,0.2); color:#C4B5FD; font-size:.68rem; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.active-bar  { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
.active-info { display:flex; align-items:center; gap:8px; }
.ai-icon     { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; }
.ai-name     { font-family:'Poppins',sans-serif; font-weight:800; color:#F1F5F9; font-size:.92rem; }
.launch-icon  { width:88px; height:88px; border-radius:22px; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; }
.launch-title { font-family:'Poppins',sans-serif; font-weight:900; font-size:1.1rem; color:#F1F5F9; margin-bottom:8px; }
.launch-desc  { font-size:.84rem; color:#8B7BAF; line-height:1.65; max-width:440px; margin:0 auto 18px; }
.launch-btn   { display:inline-flex; align-items:center; gap:8px; color:white; text-decoration:none; border-radius:12px; padding:12px 28px; font-size:.9rem; font-weight:800; font-family:'Nunito',sans-serif; transition:all .18s; }
.launch-btn:hover { filter:brightness(1.1); transform:translateY(-1px); }
.launch-note  { display:flex; align-items:center; justify-content:center; gap:5px; font-size:.7rem; color:#8B7BAF; font-weight:600; margin-top:12px; }

/* ── RESPONSIVE SIMULADORES ── */
@media (max-width: 600px) {
  .sim-root  { padding: 14px; }
  .sim-title { font-size: 1.3rem; }
  .sim-grid  { grid-template-columns: 1fr; gap: 12px; }
  .inst-grid { grid-template-columns: 1fr; }
  .launch-icon { width: 72px; height: 72px; border-radius: 18px; }
  .launch-btn  { padding: 12px 20px; font-size: .84rem; }
}
</style>