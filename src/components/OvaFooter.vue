<script setup>
import NavIcon from './NavIcon.vue'

const integrantes = [
  { nombre:'Almis Ramírez',      correo:'correo@correo.unicordoba.edu.co' },
  { nombre:'Kiara Corena',       correo:'correo@correo.unicordoba.edu.co' },
  { nombre:'Fernando Urrutia',   correo:'correo@correo.unicordoba.edu.co' },
  { nombre:'Sarela Altamiranda', correo:'correo@correo.unicordoba.edu.co' },
]

const asesor = {
  nombre: 'Luis Alberto Chica Espitia',
  correo: 'correo@correo.unicordoba.edu.co',
}

const year = new Date().getFullYear()
</script>

<template>
  <footer class="ova-footer">

    <!-- ══ BANDA SUPERIOR ══ -->
    <div class="footer-top">

      <!-- Columna 1: Universidad -->
      <div class="footer-col footer-col--uni">
        <div class="uni-logo-wrap">
          <img src="/logounicor.png" alt="Universidad de Córdoba"
            class="uni-logo" onerror="this.style.display='none'" />
        </div>
        <div class="uni-info">
          <div class="uni-name">Universidad de Córdoba</div>
          <div class="uni-sub">Montería — Colombia</div>
          <a href="https://www.unicordoba.edu.co/" target="_blank"
            rel="noopener" class="uni-link">
            <NavIcon name="arrow" :size="12" />
            www.unicordoba.edu.co
          </a>
        </div>
      </div>

      <!-- Columna 2: Datos académicos -->
      <div class="footer-col">
        <div class="fc-title">
          <NavIcon name="books" :size="15" style="color:#A855F7;" />
          Datos académicos
        </div>
        <div class="fc-item">
          <span class="fc-label">Carrera</span>
          <span class="fc-val">Licenciatura en Informática</span>
        </div>
        <div class="fc-item">
          <span class="fc-label">Materia</span>
          <span class="fc-val">Fundamentos de Programación</span>
        </div>
        <div class="fc-item">
          <span class="fc-label">Semestre</span>
          <span class="fc-val">IV Semestre · {{ year }}</span>
        </div>
        <div class="fc-item">
          <span class="fc-label">Asesor</span>
          <span class="fc-val">{{ asesor.nombre }}</span>
        </div>
        <div class="fc-item">
          <span class="fc-label">Correo asesor</span>
          <a :href="`mailto:${asesor.correo}`" class="fc-mail">
            {{ asesor.correo }}
          </a>
        </div>
      </div>

      <!-- Columna 3: Integrantes -->
      <div class="footer-col">
        <div class="fc-title">
          <NavIcon name="people" :size="15" style="color:#A855F7;" />
          Integrantes
        </div>
        <div v-for="p in integrantes" :key="p.nombre" class="member-row">
          <div class="member-avatar">{{ p.nombre.charAt(0) }}</div>
          <div>
            <div class="member-name">{{ p.nombre }}</div>
            <a :href="`mailto:${p.correo}`" class="fc-mail">{{ p.correo }}</a>
          </div>
        </div>
      </div>

      <!-- Columna 4: Sobre el OVA -->
      <div class="footer-col">
        <div class="fc-title">
          <NavIcon name="info" :size="15" style="color:#A855F7;" />
          Sobre QUMITIC
        </div>
        <div class="fc-item">
          <span class="fc-label">Tipo</span>
          <span class="fc-val">Objeto Virtual de Aprendizaje</span>
        </div>
        <div class="fc-item">
          <span class="fc-label">Temática</span>
          <span class="fc-val">Soluciones Químicas</span>
        </div>
        <div class="fc-item">
          <span class="fc-label">Tecnología</span>
          <span class="fc-val">Vue 3 · Vuetify 3 · Vite</span>
        </div>
        <div class="fc-item">
          <span class="fc-label">Versión</span>
          <span class="fc-val">v1.0 · {{ year }}</span>
        </div>
        <div class="fc-item">
          <span class="fc-label">Licencia</span>
          <span class="fc-val">CC BY-NC 4.0</span>
        </div>
      </div>

    </div>

    <!-- ══ BANDA INFERIOR ══ -->
    <div class="footer-bottom">
      <div class="fb-left">
        <img src="/logo-qumitic.png" alt="QUMITIC" class="fb-logo" />
        <span class="fb-copy">
          © {{ year }} QUMITIC — Universidad de Córdoba.
          Todos los derechos reservados.
        </span>
      </div>
      <div class="fb-right">
        <span class="fb-license">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" style="vertical-align:middle;">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
          Creative Commons BY-NC 4.0
        </span>
        <a href="https://www.unicordoba.edu.co/" target="_blank"
          rel="noopener" class="fb-uni-link">
          Unicórdoba
        </a>
      </div>
    </div>

  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
*,*::before,*::after { box-sizing:border-box; font-family:'Nunito',sans-serif; }

/* ── FOOTER ── */
.ova-footer {
  background: linear-gradient(180deg, #3B0764 0%, #4C1D95 50%, #3B0764 100%);
  color: white;
  margin-top: auto;
}

/* Banda superior */
.footer-top {
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr;
  gap: 32px;
  padding: clamp(24px,5vw,40px) clamp(16px,5vw,48px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

/* Columna universidad */
.footer-col--uni {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 200px;
}
.uni-logo-wrap {
  flex-shrink: 0;
  width: 72px; height: 72px;
  background: white;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  padding: 6px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
}
.uni-logo {
  width: 100%; height: 100%;
  object-fit: contain;
}
.uni-info { display:flex; flex-direction:column; gap:3px; }
.uni-name { font-family:'Poppins',sans-serif; font-weight:800; font-size:.88rem; color:white; line-height:1.2; }
.uni-sub  { font-size:.7rem; color:rgba(255,255,255,0.6); font-weight:600; }
.uni-link {
  display:inline-flex; align-items:center; gap:4px;
  font-size:.7rem; color:#C4B5FD; font-weight:700;
  text-decoration:none; transition:color .15s; margin-top:4px;
}
.uni-link:hover { color:white; }

/* Columnas genéricas */
.footer-col { display:flex; flex-direction:column; gap:8px; }

.fc-title {
  display:flex; align-items:center; gap:6px;
  font-family:'Poppins',sans-serif; font-weight:800; font-size:.78rem;
  color:white; margin-bottom:4px; letter-spacing:.3px;
}

.fc-item { display:flex; flex-direction:column; gap:1px; }
.fc-label { font-size:.58rem; font-weight:800; color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:.8px; }
.fc-val   { font-size:.78rem; font-weight:600; color:rgba(255,255,255,0.85); }
.fc-mail  {
  font-size:.72rem; color:#C4B5FD; font-weight:600;
  text-decoration:none; transition:color .15s; word-break:break-all;
}
.fc-mail:hover { color:white; text-decoration:underline; }

/* Integrantes */
.member-row {
  display:flex; align-items:center; gap:9px;
}
.member-avatar {
  width:30px; height:30px; border-radius:8px; flex-shrink:0;
  background:rgba(255,255,255,0.2);
  display:flex; align-items:center; justify-content:center;
  font-family:'Poppins',sans-serif; font-weight:900; font-size:.82rem; color:white;
}
.member-name { font-size:.76rem; font-weight:700; color:rgba(255,255,255,0.9); }

/* Banda inferior */
.footer-bottom {
  display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;
  padding: 14px clamp(16px,5vw,48px);
  background: rgba(0,0,0,0.2);
}
.fb-left  { display:flex; align-items:center; gap:10px; }
.fb-logo  { width:28px; height:28px; object-fit:contain; border-radius:7px; }
.fb-copy  { font-size:.7rem; color:rgba(255,255,255,0.5); font-weight:600; }
.fb-right { display:flex; align-items:center; gap:14px; }
.fb-license {
  display:flex; align-items:center; gap:5px;
  font-size:.68rem; color:rgba(255,255,255,0.45); font-weight:600;
}
.fb-uni-link {
  font-size:.7rem; color:#C4B5FD; font-weight:700;
  text-decoration:none; transition:color .15s;
}
.fb-uni-link:hover { color:white; }

/* ── Responsive ── */
@media (max-width:960px) {
  .footer-top { grid-template-columns:1fr 1fr; }
  .footer-col--uni { grid-column:1/-1; }
}
@media (max-width:600px) {
  .footer-top { grid-template-columns:1fr; gap:20px; }
  .footer-col--uni { flex-direction:column; align-items:center; text-align:center; }
  .uni-link { justify-content:center; }
  .member-row { flex-direction:column; align-items:flex-start; }
}

/* ── Modo oscuro ── */
:root[data-theme="dark"] .ova-footer {
  background: linear-gradient(180deg, #0D0825 0%, #160B3A 50%, #0D0825 100%);
  border-top: 1px solid rgba(124,58,237,0.25);
}
</style>