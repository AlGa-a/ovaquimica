<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavIcon from './NavIcon.vue'

const visible    = ref(false)
const footerRef  = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) visible.value = true },
    { threshold: 0.1 }
  )
  if (footerRef.value) observer.observe(footerRef.value)
  onUnmounted(() => observer.disconnect())
})

const year = new Date().getFullYear()

const integrantes = [
  { nombre:'Almis Ramírez',      rol:'Desarrolladora Frontend',    correo:'adavidramirez@correo.unicordoba.edu.co', ini:'A' },
  { nombre:'Kiara Corena',       rol:'Diseñadora Instruccional',   correo:'kcorena@correo.unicordoba.edu.co', ini:'K' },
  { nombre:'Fernando Urrutia',   rol:'Desarrollador Frontend',     correo:'furrutia@correo.unicordoba.edu.co', ini:'F' },
  { nombre:'Sarela Altamiranda', rol:'Diseñadora de Contenido',    correo:'saltamirandas@correo.unicordoba.edu.co', ini:'S' },
]

const asesor = {
  nombre: 'Luis Alberto Chica Espitia',
  rol:    'Docente Asesor — Química Inorgánica',
  correo: 'Luischica47@hotmail.com',
}

const datosAcademicos = [
  { icon:'books',     label:'Carrera',     valor:'Licenciatura en Informática' },
  { icon:'clipboard', label:'Materia',     valor:'Fundamentos de Programación' },
  { icon:'layers',    label:'Semestre',    valor:`IV Semestre · ${year}` },
  { icon:'grid',      label:'Modalidad',   valor:'Objeto Virtual de Aprendizaje' },
]

const tecnologias = ['Vue 3', 'Vuetify 3', 'VueUse', 'Vite', 'Vue Router']
</script>

<template>
  <footer ref="footerRef" class="ova-footer" :class="{'footer--visible': visible}">

    <!-- ══ ONDA DECORATIVA SUPERIOR ══ -->
    <div class="footer-wave">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill="url(#waveGrad)" />
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stop-color="#3B0764" />
            <stop offset="50%"  stop-color="#4C1D95" />
            <stop offset="100%" stop-color="#3B0764" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- ══ CUERPO PRINCIPAL ══ -->
    <div class="footer-body">

      <!-- ─ CABECERA DEL FOOTER ─ -->
      <div class="footer-brand-row">

        <!-- Logos -->
        <div class="footer-logos">
          <a href="https://www.unicordoba.edu.co/" target="_blank" rel="noopener"
            class="logo-unicor-wrap" title="Universidad de Córdoba">
            <img src="/logounicor.png" alt="Unicórdoba" class="logo-unicor"
              onerror="this.parentElement.style.display='none'" />
          </a>
          <div class="logos-divider"></div>
          <div class="logo-qumitic-wrap">
            <img src="/logo-qumitic.png" alt="QUIMITIC" class="logo-qumitic" />
            <div class="logo-qumitic-glow"></div>
          </div>
        </div>

        <!-- Títulos -->
        <div class="footer-brand-info">
          <h2 class="footer-ova-name">QUIMITIC</h2>
          <p class="footer-ova-sub">Objeto Virtual de Aprendizaje · Soluciones Químicas</p>
          <div class="footer-uni-name">
            <NavIcon name="info" :size="12" style="color:#C4B5FD;flex-shrink:0;" />
            Universidad de Córdoba · Montería, Colombia
          </div>
          <a href="https://www.unicordoba.edu.co/" target="_blank" rel="noopener"
            class="footer-uni-link">
            <NavIcon name="arrow" :size="11" />
            www.unicordoba.edu.co
          </a>
        </div>

        <!-- Datos académicos rápidos -->
        <div class="footer-quick-data">
          <div v-for="(d,i) in datosAcademicos" :key="d.label"
            class="fqd-item"
            :style="`animation-delay:${i*0.08}s`">
            <div class="fqd-icon">
              <NavIcon :name="d.icon" :size="14" style="color:#C4B5FD;" />
            </div>
            <div>
              <div class="fqd-label">{{ d.label }}</div>
              <div class="fqd-val">{{ d.valor }}</div>
            </div>
          </div>
        </div>

      </div>

      <!-- ─ DIVISOR ─ -->
      <div class="footer-divider">
        <div class="fd-line"></div>
        <div class="fd-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="color:#A855F7;">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>
        </div>
        <div class="fd-line"></div>
      </div>

      <!-- ─ GRID INFERIOR ─ -->
      <div class="footer-grid">

        <!-- Columna: Asesor -->
        <div class="fg-col fg-col--asesor">
          <div class="fg-title">
            <div class="fg-title-icon">
              <NavIcon name="flask" :size="14" style="color:#6B21A8;" />
            </div>
            Docente Asesor
          </div>

          <div class="asesor-card">
            <div class="asesor-badge">
              <NavIcon name="flask" :size="13" style="color:white;" />
            </div>
            <div class="asesor-info">
              <div class="asesor-name">{{ asesor.nombre }}</div>
              <div class="asesor-rol">{{ asesor.rol }}</div>
              <a :href="`mailto:${asesor.correo}`" class="asesor-mail">
                <NavIcon name="send" :size="11" />
                {{ asesor.correo }}
              </a>
            </div>
          </div>
        </div>

        <!-- Columna: Integrantes -->
        <div class="fg-col fg-col--integrantes">
          <div class="fg-title">
            <div class="fg-title-icon">
              <NavIcon name="people" :size="14" style="color:#6B21A8;" />
            </div>
            Equipo de Desarrollo
          </div>

          <div class="integrantes-grid">
            <div v-for="(p,i) in integrantes" :key="p.nombre"
              class="integrante-card"
              :style="`animation-delay:${i*0.07+0.2}s`">
              <div class="int-avatar">{{ p.ini }}</div>
              <div class="int-info">
                <div class="int-nombre">{{ p.nombre }}</div>
                <div class="int-rol">{{ p.rol }}</div>
                <a :href="`mailto:${p.correo}`" class="int-mail">
                  {{ p.correo }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna: Tecnología -->
        <div class="fg-col fg-col--tech">
          <div class="fg-title">
            <div class="fg-title-icon">
              <NavIcon name="grid" :size="14" style="color:#6B21A8;" />
            </div>
            Stack Tecnológico
          </div>

          <div class="tech-chips">
            <div v-for="(t,i) in tecnologias" :key="t"
              class="tech-chip"
              :style="`animation-delay:${i*0.06+0.3}s`">
              <div class="tc-dot"></div>
              {{ t }}
            </div>
          </div>

          <div class="fg-title mt-16">
            <div class="fg-title-icon">
              <NavIcon name="check" :size="14" style="color:#6B21A8;" />
            </div>
            Contenido
          </div>
          <div class="content-stats">
            <div class="cs-item"><span class="cs-n">5</span><span class="cs-l">Módulos</span></div>
            <div class="cs-item"><span class="cs-n">11</span><span class="cs-l">Videos</span></div>
            <div class="cs-item"><span class="cs-n">50</span><span class="cs-l">Actividades</span></div>
            <div class="cs-item"><span class="cs-n">75</span><span class="cs-l">Preguntas</span></div>
            <div class="cs-item"><span class="cs-n">3</span><span class="cs-l">Simuladores</span></div>
          </div>
        </div>

      </div>
    </div>

    <!-- ══ BANDA INFERIOR ══ -->
    <div class="footer-bottom">
      <div class="fb-inner">

        <div class="fb-left">
          <img src="/logounicor.png" alt="Unicórdoba" class="fb-uni-logo"
            onerror="this.style.display='none'" />
          <div class="fb-copy">
            <span>© {{ year }} QUIMITIC</span>
            <span class="fb-sep">·</span>
            <span>Universidad de Córdoba</span>
            <span class="fb-sep">·</span>
            <span>Todos los derechos reservados</span>
          </div>
        </div>

        <div class="fb-right">
          <div class="fb-license">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            CC BY-NC 4.0
          </div>
          <a href="https://www.unicordoba.edu.co/" target="_blank"
            rel="noopener" class="fb-uni-link">
            <NavIcon name="arrow" :size="11" />
            Unicórdoba
          </a>
        </div>

      </div>

      <!-- Barra de color decorativa inferior -->
      <div class="fb-rainbow">
        <div style="background:#6B21A8;"></div>
        <div style="background:#9333EA;"></div>
        <div style="background:#A855F7;"></div>
        <div style="background:#00C8B4;"></div>
        <div style="background:#10B981;"></div>
      </div>
    </div>

  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
*,*::before,*::after { box-sizing:border-box; font-family:'Nunito',sans-serif; }

/* ════════════════════════════════════
   ANIMACIÓN DE ENTRADA
════════════════════════════════════ */
@keyframes fadeUp {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes scaleIn {
  from { opacity:0; transform:scale(0.9); }
  to   { opacity:1; transform:scale(1); }
}
@keyframes slideRight {
  from { opacity:0; transform:translateX(-16px); }
  to   { opacity:1; transform:translateX(0); }
}
@keyframes shimmer {
  0%   { background-position:-400px 0; }
  100% { background-position:400px 0; }
}
@keyframes pulse {
  0%,100% { opacity:.6; transform:scale(1); }
  50%     { opacity:1; transform:scale(1.08); }
}

/* ════════════════════════════════════
   ESTRUCTURA
════════════════════════════════════ */
.ova-footer {
  background: linear-gradient(180deg, #3B0764 0%, #4C1D95 40%, #3B0764 100%);
  color: white;
  margin-top: auto;
  position: relative;
}

/* Onda */
.footer-wave {
  width:100%; height:60px; margin-bottom:-2px;
  background: var(--bg-alt, #F8F7FF);
  position: relative;
}
.footer-wave svg { width:100%; height:100%; display:block; }

/* ─ CUERPO ─ */
.footer-body { padding: clamp(28px,5vw,48px) clamp(16px,5vw,56px) clamp(20px,4vw,32px); }

/* ─ FILA DE MARCA ─ */
.footer-brand-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: clamp(20px,4vw,40px);
  align-items: start;
  margin-bottom: 32px;
}

/* Logos */
.footer-logos {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.logo-unicor-wrap {
  width: 80px; height: 80px;
  background: white;
  border-radius: 16px;
  display: flex; align-items:center; justify-content:center;
  padding: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1);
  transition: transform .3s ease, box-shadow .3s ease;
  cursor: pointer;
  text-decoration: none;
}
.logo-unicor-wrap:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 12px 32px rgba(0,0,0,0.35), 0 0 0 2px rgba(255,255,255,0.2);
}
.logo-unicor { width:100%; height:100%; object-fit:contain; }

.logos-divider {
  width: 1px; height: 50px;
  background: linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent);
}

.logo-qumitic-wrap { position:relative; }
.logo-qumitic {
  width: 64px; height: 64px; object-fit:contain; border-radius:14px;
  position:relative; z-index:2;
  filter: drop-shadow(0 0 14px rgba(255,255,255,0.25));
  transition: transform .3s ease;
}
.logo-qumitic-wrap:hover .logo-qumitic { transform: scale(1.08); }
.logo-qumitic-glow {
  position:absolute; inset:-8px; border-radius:22px;
  background: radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%);
  animation: pulse 2.5s ease-in-out infinite;
}

/* Información de marca */
.footer-brand-info { display:flex; flex-direction:column; gap:6px; padding-top:4px; }
.footer-ova-name {
  font-family:'Poppins',sans-serif; font-weight:900; font-size:clamp(1.4rem,4vw,2rem);
  letter-spacing:6px; margin:0; line-height:1;
  background: linear-gradient(135deg, #FFFFFF 0%, #E9D5FF 60%, #00C8B4 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.footer-ova-sub {
  font-size:clamp(.72rem,2vw,.82rem); color:rgba(255,255,255,0.6);
  font-weight:600; margin:0; letter-spacing:.3px;
}
.footer-uni-name {
  display:flex; align-items:center; gap:5px;
  font-size:.75rem; color:rgba(255,255,255,0.55); font-weight:600; margin-top:4px;
}
.footer-uni-link {
  display:inline-flex; align-items:center; gap:4px;
  font-size:.72rem; color:#C4B5FD; font-weight:700;
  text-decoration:none; transition:all .18s;
  padding:3px 0;
}
.footer-uni-link:hover { color:white; gap:7px; }

/* Datos académicos rápidos */
.footer-quick-data {
  display:flex; flex-direction:column; gap:10px;
  background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1);
  border-radius:16px; padding:16px 18px;
  backdrop-filter: blur(8px);
}
.fqd-item {
  display:flex; align-items:center; gap:10px;
  animation: slideRight .5s cubic-bezier(0.34,1.2,0.64,1) both;
}
.fqd-icon {
  width:30px; height:30px; border-radius:8px;
  background:rgba(168,85,247,0.2); border:1px solid rgba(168,85,247,0.3);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.fqd-label { font-size:.58rem; color:rgba(255,255,255,0.45); font-weight:700; text-transform:uppercase; letter-spacing:.8px; }
.fqd-val   { font-size:.8rem; color:rgba(255,255,255,0.9); font-weight:700; }

/* ─ DIVISOR ─ */
.footer-divider {
  display:flex; align-items:center; gap:12px; margin-bottom:28px;
}
.fd-line { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); }
.fd-icon { width:32px; height:32px; border-radius:50%; background:rgba(168,85,247,0.2); border:1px solid rgba(168,85,247,0.3); display:flex; align-items:center; justify-content:center; flex-shrink:0; }

/* ─ GRID INFERIOR ─ */
.footer-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: clamp(20px,4vw,36px);
}

/* Columna genérica */
.fg-col { display:flex; flex-direction:column; gap:12px; }

.fg-title {
  display:flex; align-items:center; gap:8px;
  font-family:'Poppins',sans-serif; font-weight:800;
  font-size:clamp(.78rem,2vw,.86rem); color:white;
  letter-spacing:.3px;
}
.fg-title-icon {
  width:26px; height:26px; border-radius:7px;
  background:rgba(255,255,255,0.15);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.mt-16 { margin-top:16px; }

/* ─ ASESOR ─ */
.asesor-card {
  background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.12);
  border-radius:14px; padding:14px 16px; position:relative; overflow:hidden;
  transition:all .25s ease;
}
.asesor-card::before {
  content:''; position:absolute; left:0; top:0; bottom:0; width:3px;
  background:linear-gradient(180deg,#A855F7,#00C8B4);
}
.asesor-card:hover {
  background:rgba(168,85,247,0.15); border-color:rgba(168,85,247,0.3);
  transform:translateX(4px);
}
.asesor-badge {
  position:absolute; top:12px; right:12px; width:28px; height:28px;
  background:linear-gradient(135deg,#6B21A8,#00C8B4);
  border-radius:8px; display:flex; align-items:center; justify-content:center;
}
.asesor-info { padding-left:6px; }
.asesor-name { font-family:'Poppins',sans-serif; font-weight:800; font-size:.88rem; color:white; margin-bottom:2px; padding-right:32px; }
.asesor-rol  { font-size:.68rem; color:rgba(255,255,255,0.55); font-weight:600; text-transform:uppercase; letter-spacing:.7px; margin-bottom:8px; }
.asesor-mail {
  display:inline-flex; align-items:center; gap:5px;
  font-size:.7rem; color:#C4B5FD; font-weight:600; text-decoration:none;
  transition:color .15s; word-break:break-all;
}
.asesor-mail:hover { color:white; }

/* ─ INTEGRANTES ─ */
.integrantes-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.integrante-card {
  display:flex; align-items:center; gap:9px;
  background:rgba(0,0,0,0.18); border:1px solid rgba(255,255,255,0.1);
  border-radius:12px; padding:10px 12px;
  animation: scaleIn .4s cubic-bezier(0.34,1.2,0.64,1) both;
  transition:all .22s ease; cursor:default;
}
.integrante-card:hover {
  background:rgba(168,85,247,0.18);
  border-color:rgba(168,85,247,0.35);
  transform:translateY(-2px);
  box-shadow:0 6px 20px rgba(0,0,0,0.25);
}
.int-avatar {
  width:38px; height:38px; border-radius:10px; flex-shrink:0;
  background:linear-gradient(135deg,rgba(107,33,168,0.8),rgba(0,200,180,0.8));
  display:flex; align-items:center; justify-content:center;
  font-family:'Poppins',sans-serif; font-weight:900; font-size:.95rem; color:white;
  border:1px solid rgba(255,255,255,0.2);
}
.int-info { min-width:0; }
.int-nombre { font-size:.78rem; font-weight:800; color:white; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.int-rol    { font-size:.6rem; color:rgba(255,255,255,0.5); font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.int-mail   {
  font-size:.62rem; color:#C4B5FD; font-weight:600; text-decoration:none;
  display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  transition:color .15s;
}
.int-mail:hover { color:white; }

/* ─ TECNOLOGÍAS ─ */
.tech-chips { display:flex; flex-wrap:wrap; gap:6px; }
.tech-chip {
  display:flex; align-items:center; gap:5px;
  background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12);
  border-radius:20px; padding:4px 11px; font-size:.72rem; font-weight:700;
  color:rgba(255,255,255,0.8); transition:all .18s;
  animation: scaleIn .35s cubic-bezier(0.34,1.2,0.64,1) both;
  cursor:default;
}
.tech-chip:hover {
  background:rgba(168,85,247,0.25); border-color:rgba(168,85,247,0.5);
  color:white; transform:translateY(-1px);
}
.tc-dot {
  width:6px; height:6px; border-radius:50%;
  background:linear-gradient(135deg,#A855F7,#00C8B4); flex-shrink:0;
}

/* Stats de contenido */
.content-stats { display:flex; flex-wrap:wrap; gap:8px; }
.cs-item {
  display:flex; flex-direction:column; align-items:center;
  background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1);
  border-radius:10px; padding:8px 12px; min-width:52px;
  transition:all .2s ease;
}
.cs-item:hover {
  background:rgba(168,85,247,0.2); border-color:rgba(168,85,247,0.4);
  transform:translateY(-2px);
}
.cs-n { font-family:'Poppins',sans-serif; font-weight:900; font-size:1.1rem; color:white; line-height:1; }
.cs-l { font-size:.58rem; color:rgba(255,255,255,0.5); font-weight:700; text-transform:uppercase; letter-spacing:.6px; margin-top:2px; }

/* ══ BANDA INFERIOR ══ */
.footer-bottom {
  background:rgba(0,0,0,0.25);
  border-top:1px solid rgba(255,255,255,0.08);
}
.fb-inner {
  display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;
  padding: 14px clamp(16px,5vw,56px);
}
.fb-left  { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.fb-uni-logo {
  width:28px; height:28px; object-fit:contain; background:white;
  border-radius:7px; padding:2px;
}
.fb-copy {
  display:flex; align-items:center; gap:6px; flex-wrap:wrap;
  font-size:clamp(.62rem,2vw,.7rem); color:rgba(255,255,255,0.45); font-weight:600;
}
.fb-sep { color:rgba(255,255,255,0.2); }
.fb-right { display:flex; align-items:center; gap:14px; }
.fb-license {
  display:flex; align-items:center; gap:5px;
  font-size:.68rem; color:rgba(255,255,255,0.4); font-weight:600;
}
.fb-uni-link {
  display:inline-flex; align-items:center; gap:4px;
  font-size:.72rem; color:#C4B5FD; font-weight:700;
  text-decoration:none; transition:all .18s;
}
.fb-uni-link:hover { color:white; gap:7px; }

/* Barra rainbow */
.fb-rainbow { display:flex; height:4px; }
.fb-rainbow div { flex:1; transition:flex .3s ease; }
.fb-rainbow:hover div { flex:1.5; }
.fb-rainbow div:hover { flex:3; }

/* ════════════════════════════════════
   ANIMACIÓN DE ENTRADA (Intersection)
════════════════════════════════════ */
.footer--visible .fqd-item { animation-play-state: running; }
.footer--visible .integrante-card { animation-play-state: running; }
.footer--visible .tech-chip { animation-play-state: running; }
.fqd-item, .integrante-card, .tech-chip { animation-play-state: paused; }

/* ════════════════════════════════════
   MODO OSCURO
════════════════════════════════════ */
:root[data-theme="dark"] .ova-footer {
  background: linear-gradient(180deg, #0A0118 0%, #160636 40%, #0A0118 100%);
  border-top: 1px solid rgba(124,58,237,0.2);
}
:root[data-theme="dark"] .footer-wave {
  background: #0B0620;
}
:root[data-theme="dark"] .footer-wave path {
  fill: #0B0620;
}

/* ════════════════════════════════════
   RESPONSIVE
════════════════════════════════════ */
@media (max-width:1100px) {
  .footer-grid { grid-template-columns:1fr 1fr; }
  .fg-col--tech { grid-column:1/-1; }
  .content-stats { justify-content:flex-start; }
  .integrantes-grid { grid-template-columns:1fr 1fr; }
}

@media (max-width:760px) {
  .footer-brand-row { grid-template-columns:1fr; gap:16px; }
  .footer-quick-data { display:grid; grid-template-columns:1fr 1fr; }
  .footer-grid { grid-template-columns:1fr; }
  .integrantes-grid { grid-template-columns:1fr; }
  .fg-col--tech { grid-column:auto; }
}

@media (max-width:480px) {
  .footer-body { padding:20px 14px; }
  .footer-logos { gap:10px; }
  .logo-unicor-wrap { width:64px; height:64px; }
  .logo-qumitic { width:52px; height:52px; }
  .footer-ova-name { font-size:1.4rem; }
  .footer-quick-data { grid-template-columns:1fr; }
  .integrante-card { flex-direction:column; align-items:flex-start; }
  .fb-inner { flex-direction:column; align-items:flex-start; gap:8px; }
  .fb-copy  { flex-direction:column; gap:2px; }
}
</style>