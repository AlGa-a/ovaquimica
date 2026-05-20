<script setup>
import NavIcon from '../components/NavIcon.vue'

const equipo = [
  {
    nombre:      'Almis Ramírez',
    rol:         'Desarrollador Frontend',
    descripcion: 'Diseño de interfaz, componentes Vue y arquitectura del OVA.',
    foto:        '/almis.png',
    color:       '#4A6FA5',
    gradiente:   'linear-gradient(135deg, #4A6FA5, #6D5BA3)',
  },
  {
    nombre:      'Kiara Corena',
    rol:         'Diseñadora Instruccional',
    descripcion: 'Estructura pedagógica, secuencia de aprendizaje y actividades evaluativas.',
    foto:        null,
    color:       '#6D5BA3',
    gradiente:   'linear-gradient(135deg, #6D5BA3, #9333EA)',
  },
  {
    nombre:      'Fernando Urrutia',
    rol:         'Desarrollador Frontend',
    descripcion: 'Implementación de simuladores, componentes interactivos y optimización.',
    foto:        '/fernando.jpeg',
    color:       '#0EA5E9',
    gradiente:   'linear-gradient(135deg, #0EA5E9, #4A6FA5)',
  },
  {
    nombre:      'Sarela Altamiranda',
    rol:         'Diseñadora de Contenido',
    descripcion: 'Redacción de contenidos, revisión pedagógica y experiencia del usuario.',
    foto:        '/sarela.jpeg',
    color:       '#059669',
    gradiente:   'linear-gradient(135deg, #059669, #0EA5E9)',
  },
]

const asesor = {
  nombre:      'Luis Alberto Chica Espitia',
  rol:         'Docente Asesor — Química Inorgánica',
  descripcion: 'Validación del contenido disciplinar de Química Inorgánica, definición de los temas de mayor dificultad para los estudiantes y orientación pedagógica en la construcción del OVA.',
  foto:        '/luis alberto.jpeg',
  color:       '#4A6FA5',
  gradiente:   'linear-gradient(135deg, #4A6FA5, #6D5BA3)',
}

const infoProyecto = [
  { label: 'Institución',  valor: 'Universidad de Córdoba' },
  { label: 'Programa',     valor: 'Ingeniería de Sistemas' },
  { label: 'Asignatura',   valor: 'Química Inorgánica' },
  { label: 'Tema central', valor: 'Soluciones Químicas' },
  { label: 'Tecnologías',  valor: 'Vue 3 · Vuetify 3 · VueUse · Vite' },
  { label: 'Licencia',     valor: 'Creative Commons BY-NC 4.0' },
  { label: 'Versión',      valor: 'v1.0 — 2025' },
]

const iniciales = (nombre) => nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
</script>

<template>
  <div class="cred-root">

    <!-- Cabecera -->
    <div class="cred-header">
      <v-chip color="primary" variant="tonal" size="small" class="mb-2">Créditos</v-chip>
      <h1 class="cred-title">Equipo de desarrollo</h1>
      <p class="cred-desc">
        QUMITIC fue construido por estudiantes de la Universidad de Córdoba como proyecto
        académico orientado a mejorar la comprensión de las soluciones químicas en
        educación superior.
      </p>
    </div>

    <!-- Desarrolladores -->
    <div class="section-label">
      <NavIcon name="people" :size="14" style="color:#4A6FA5;" />
      Desarrolladores y autores
    </div>

    <div class="dev-grid">
      <div
        v-for="(d, i) in equipo"
        :key="d.nombre"
        class="dev-card"
        :style="`--card-color: ${d.color}; animation-delay: ${i * 0.1}s;`"
      >
        <!-- Fondo decorativo -->
        <div class="dev-card-bg" :style="`background: ${d.gradiente};`"></div>

        <!-- Foto o avatar -->
        <div class="dev-photo-wrap">
          <img
            v-if="d.foto"
            :src="d.foto"
            :alt="d.nombre"
            class="dev-photo"
          />
          <div
            v-else
            class="dev-avatar-placeholder"
            :style="`background: ${d.gradiente};`"
          >
            <span class="dev-initials">{{ iniciales(d.nombre) }}</span>
            <div class="placeholder-label">Foto próximamente</div>
          </div>
          <div class="dev-photo-ring" :style="`border-color: ${d.color}40;`"></div>
        </div>

        <!-- Contenido -->
        <div class="dev-info">
          <div class="dev-name">{{ d.nombre }}</div>
          <div class="dev-rol" :style="`color: ${d.color};`">{{ d.rol }}</div>
          <div class="dev-desc">{{ d.descripcion }}</div>
          <div class="dev-inst">
            <NavIcon name="info" :size="11" style="color:#94A3B8;" />
            Universidad de Córdoba
          </div>
        </div>

        <!-- Borde animado inferior -->
        <div class="dev-card-border" :style="`background: ${d.gradiente};`"></div>
      </div>
    </div>

    <!-- Docente asesor -->
    <div class="section-label mt-section">
      <NavIcon name="flask" :size="14" style="color:#4A6FA5;" />
      Docente asesor de contenido
    </div>

    <div class="asesor-card">
      <!-- Foto del asesor -->
      <div class="asesor-photo-wrap">
        <img
          v-if="asesor.foto"
          :src="asesor.foto"
          :alt="asesor.nombre"
          class="asesor-photo"
        />
        <div v-else class="asesor-avatar" :style="`background: ${asesor.gradiente};`">
          {{ iniciales(asesor.nombre) }}
        </div>
        <div class="asesor-photo-badge">
          <NavIcon name="flask" :size="13" style="color:white;" />
        </div>
      </div>

      <div class="asesor-info">
        <div class="asesor-name">{{ asesor.nombre }}</div>
        <div class="asesor-rol">{{ asesor.rol }}</div>
        <div class="dev-inst mt-1">
          <NavIcon name="info" :size="11" style="color:#94A3B8;" />
          Universidad de Córdoba
        </div>
        <p class="asesor-desc">{{ asesor.descripcion }}</p>
      </div>
    </div>

    <!-- Info del proyecto -->
    <div class="section-label mt-section">
      <NavIcon name="info" :size="14" style="color:#4A6FA5;" />
      Información del proyecto
    </div>

    <div class="info-grid">
      <div
        v-for="(item, i) in infoProyecto"
        :key="item.label"
        class="info-card"
        :style="`animation-delay: ${i * 0.07}s;`"
      >
        <div class="info-label">{{ item.label }}</div>
        <div class="info-val">{{ item.valor }}</div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
*,*::before,*::after { box-sizing:border-box; font-family:'Nunito',sans-serif; }

.cred-root  { min-height:100%; background:#0B0620; padding:28px; }
.cred-header { margin-bottom:22px; }
.cred-title  { font-family:'Poppins',sans-serif; font-weight:900; font-size:1.6rem; color:#F1F5F9; margin:4px 0 8px; }
.cred-desc   { font-size:.86rem; color:#8B7BAF; line-height:1.65; max-width:560px; margin:0; }

.section-label { display:flex; align-items:center; gap:7px; font-size:.63rem; font-weight:800; color:#8B7BAF; letter-spacing:1.2px; text-transform:uppercase; margin-bottom:16px; }
.mt-section    { margin-top:32px; }

/* CARDS */
.dev-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:16px; }

@keyframes cardEntrance {
  from { opacity:0; transform:translateY(24px); }
  to   { opacity:1; transform:translateY(0); }
}

.dev-card { position:relative; background:#140B33; border-radius:18px; border:1px solid rgba(124,58,237,0.25); overflow:hidden; display:flex; flex-direction:column; align-items:center; padding:0 0 20px; animation:cardEntrance .5s cubic-bezier(0.34,1.2,0.64,1) both; transition:transform .25s cubic-bezier(0.34,1.2,0.64,1),box-shadow .25s ease; cursor:default; }
.dev-card:hover { transform:translateY(-6px) scale(1.02); box-shadow:0 16px 40px rgba(0,0,0,0.4); border-color:var(--card-color,#7C3AED); }

.dev-card-bg  { width:100%; height:90px; flex-shrink:0; opacity:.9; }
.dev-photo-wrap { position:relative; margin-top:-46px; margin-bottom:12px; z-index:2; }
.dev-photo { width:90px; height:90px; border-radius:50%; object-fit:cover; object-position:center top; border:3px solid #140B33; box-shadow:0 4px 14px rgba(0,0,0,0.4); display:block; transition:transform .3s cubic-bezier(0.34,1.3,0.64,1); }
.dev-card:hover .dev-photo { transform:scale(1.06); }
.dev-photo-ring { position:absolute; inset:-5px; border-radius:50%; border:2px solid; pointer-events:none; animation:ringPulse 2.8s ease-in-out infinite; }
@keyframes ringPulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.9;transform:scale(1.05)} }

.dev-avatar-placeholder { width:90px; height:90px; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; border:3px solid #140B33; box-shadow:0 4px 14px rgba(0,0,0,0.4); gap:3px; }
.dev-initials    { font-family:'Poppins',sans-serif; font-weight:900; font-size:1.4rem; color:white; }
.placeholder-label { font-size:.45rem; color:rgba(255,255,255,.75); text-transform:uppercase; letter-spacing:.6px; font-weight:700; }

.dev-info { padding:0 18px; text-align:center; flex:1; }
.dev-name { font-family:'Poppins',sans-serif; font-weight:800; font-size:.95rem; color:#F1F5F9; margin-bottom:3px; }
.dev-rol  { font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.8px; margin-bottom:7px; }
.dev-desc { font-size:.76rem; color:#8B7BAF; line-height:1.5; margin-bottom:8px; }
.dev-inst { display:flex; align-items:center; justify-content:center; gap:4px; font-size:.62rem; color:#8B7BAF; font-weight:600; }

.dev-card-border { position:absolute; bottom:0; left:0; right:0; height:3px; transform:scaleX(0); transform-origin:left; transition:transform .35s cubic-bezier(0.34,1.2,0.64,1); }
.dev-card:hover .dev-card-border { transform:scaleX(1); }

/* ASESOR */
@keyframes asesorEntrance {
  from { opacity:0; transform:translateX(-20px); }
  to   { opacity:1; transform:translateX(0); }
}

.asesor-card { background:#140B33; border:1px solid rgba(124,58,237,0.25); border-radius:18px; padding:24px; display:flex; align-items:flex-start; gap:24px; animation:asesorEntrance .6s cubic-bezier(0.34,1.2,0.64,1) .3s both; transition:transform .25s ease,box-shadow .25s ease; position:relative; overflow:hidden; }
.asesor-card::before { content:''; position:absolute; top:0; left:0; width:4px; height:100%; background:linear-gradient(180deg,#7C3AED,#00C8B4); border-radius:18px 0 0 18px; }
.asesor-card:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,0.4); }

.asesor-photo-wrap { position:relative; flex-shrink:0; }
.asesor-photo { width:100px; height:100px; border-radius:16px; object-fit:cover; object-position:center top; border:2px solid rgba(124,58,237,0.3); box-shadow:0 4px 14px rgba(0,0,0,0.3); display:block; transition:transform .3s cubic-bezier(0.34,1.3,0.64,1); }
.asesor-card:hover .asesor-photo { transform:scale(1.04); }
.asesor-avatar { width:100px; height:100px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-family:'Poppins',sans-serif; font-weight:900; font-size:1.6rem; color:white; border:2px solid rgba(124,58,237,0.3); }
.asesor-photo-badge { position:absolute; bottom:-5px; right:-5px; width:28px; height:28px; border-radius:8px; background:linear-gradient(135deg,#7C3AED,#00C8B4); display:flex; align-items:center; justify-content:center; border:2px solid #140B33; box-shadow:0 2px 6px rgba(0,0,0,0.3); }

.asesor-info { flex:1; }
.asesor-name { font-family:'Poppins',sans-serif; font-weight:900; font-size:1.05rem; color:#F1F5F9; margin-bottom:2px; }
.asesor-rol  { font-size:.72rem; font-weight:700; color:#7C3AED; letter-spacing:.8px; text-transform:uppercase; margin-bottom:4px; }
.asesor-desc { font-size:.82rem; color:#8B7BAF; line-height:1.65; margin:10px 0 0; }

/* INFO PROYECTO */
@keyframes infoEntrance {
  from { opacity:0; transform:scale(.94); }
  to   { opacity:1; transform:scale(1); }
}
.info-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:10px; }
.info-card { background:#140B33; border:1px solid rgba(124,58,237,0.2); border-radius:12px; padding:12px 14px; animation:infoEntrance .4s cubic-bezier(0.34,1.2,0.64,1) both; transition:transform .2s ease,border-color .2s,box-shadow .2s; }
.info-card:hover { transform:translateY(-2px); border-color:rgba(124,58,237,0.4); box-shadow:0 4px 14px rgba(0,0,0,0.3); }
.info-label { font-size:.6rem; font-weight:800; color:#8B7BAF; letter-spacing:1px; text-transform:uppercase; margin-bottom:3px; }
.info-val   { font-size:.84rem; font-weight:700; color:#F1F5F9; }

/* ── RESPONSIVE CRÉDITOS ── */
@media (max-width: 600px) {
  .cred-root  { padding: 14px; }
  .cred-title { font-size: 1.3rem; }
  .cred-desc  { font-size: .82rem; }

  .dev-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .dev-card { border-radius: 14px; }
  .dev-photo { width: 72px; height: 72px; }
  .dev-avatar-placeholder { width: 72px; height: 72px; }
  .dev-photo-wrap { margin-top: -36px; }
  .dev-card-bg { height: 70px; }
  .dev-name { font-size: .82rem; }
  .dev-rol  { font-size: .62rem; }
  .dev-desc { font-size: .7rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .dev-info { padding: 0 10px; }

  .asesor-card { flex-direction: column; align-items: center; text-align: center; padding: 18px 16px; }
  .asesor-card::before { width: 100%; height: 4px; border-radius: 18px 18px 0 0; }
  .asesor-photo { width: 80px; height: 80px; }
  .asesor-name { font-size: .9rem; }
  .asesor-desc { text-align: left; font-size: .78rem; }

  .info-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
  .info-val  { font-size: .78rem; }
}

@media (max-width: 380px) {
  .dev-grid  { grid-template-columns: 1fr; }
  .info-grid { grid-template-columns: 1fr; }
}
</style>