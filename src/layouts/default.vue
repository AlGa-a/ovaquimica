<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { useDisplay } from 'vuetify'
import { useAccessibility } from '../composables/useAccessibility'
import NavIcon from '../components/NavIcon.vue'

const router    = useRouter()
const route     = useRoute()
const { mobile } = useDisplay()

// En móvil el drawer empieza cerrado
const drawer = ref(!mobile.value)

const nameInput = ref('')
const userName  = useLocalStorage('ova-userName', '')
const progress  = useLocalStorage('ova-progress', 0)
const { isDark, toggleDark } = useAccessibility()

const setName = () => {
  if (nameInput.value.trim()) {
    userName.value = nameInput.value.trim()
    nameInput.value = ''
  }
}

const navItems = [
  { title:'Contenido',   iconKey:'play',      path:'/contenido',   badge:'11' },
  { title:'Actividades', iconKey:'flask',      path:'/actividades', badge:'50' },
  { title:'Simuladores', iconKey:'beaker',     path:'/simuladores', badge:'3'  },
  { title:'Evaluación',  iconKey:'clipboard',  path:'/evaluacion',  badge:null },
  { title:'Recursos',    iconKey:'books',      path:'/recursos',    badge:null },
  { title:'Créditos',    iconKey:'people',     path:'/creditos',    badge:null },
]

const isActive   = (path) => route.path === path
const goHome     = ()     => router.push('/')
const currentNav = computed(() => navItems.find(n => isActive(n.path)))

const navigate = (path) => {
  router.push(path)
  // En móvil cierra el drawer al navegar
  if (mobile.value) drawer.value = false
}
</script>

<template>
  <v-app theme="qumitic">

    <!-- ══ DRAWER ══ -->
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="960"
      :width="265"
      class="ova-drawer"
    >
      <!-- Header -->
      <div class="dw-header">
        <div class="dw-logo-wrap">
          <img src="/logo-qumitic.png" alt="QUMITIC" class="dw-logo" />
          <div class="dw-logo-glow"></div>
        </div>
        <div class="dw-brand">QUMITIC</div>
        <div class="dw-course">Soluciones Químicas</div>
      </div>

      <!-- Botón inicio -->
      <div class="dw-home-btn-wrap">
        <button class="dw-home-btn" @click="goHome">
          <NavIcon name="home" :size="14" />
          <span>Volver al inicio</span>
        </button>
      </div>

      <!-- Usuario -->
      <div class="dw-user-section">
        <template v-if="!userName">
          <div class="dw-user-label">
            <NavIcon name="account" :size="12" />
            Identificación del estudiante
          </div>
          <v-text-field
            v-model="nameInput" placeholder="Escribe tu nombre..."
            variant="outlined" density="compact" hide-details
            rounded="lg" color="#7C3AED" class="dw-name-field"
            @keyup.enter="setName"
          >
            <template #append-inner>
              <v-btn icon size="x-small" variant="flat" color="#7C3AED"
                @click="setName" rounded="lg">
                <NavIcon name="check" :size="12" style="color:white;" />
              </v-btn>
            </template>
          </v-text-field>
        </template>
        <template v-else>
          <div class="dw-user-row">
            <div class="dw-avatar">{{ userName.charAt(0).toUpperCase() }}</div>
            <div class="dw-user-info">
              <div class="dw-user-greeting">Estudiante</div>
              <div class="dw-user-name">{{ userName }}</div>
            </div>
            <button class="dw-logout-btn" @click="userName=''" title="Cerrar sesión">
              <NavIcon name="logout" :size="14" style="color:#8B7BAF;" />
            </button>
          </div>
        </template>
      </div>

      <!-- Progreso -->
      <div class="dw-progress">
        <div class="dw-progress-header">
          <NavIcon name="chart" :size="12" style="color:#00C8B4;" />
          <span class="dw-progress-label">Progreso general</span>
          <span class="dw-progress-val">{{ progress }}%</span>
        </div>
        <div class="dw-progress-track">
          <div class="dw-progress-fill" :style="`width:${progress}%`"></div>
          <div class="progress-shine"></div>
        </div>
      </div>

      <!-- Nav -->
      <div class="dw-nav-label">
        <NavIcon name="list" :size="11" />
        Módulos del curso
      </div>

      <div class="dw-nav">
        <div v-for="item in navItems" :key="item.path"
          class="dw-nav-item"
          :class="{'dw-nav-item--active': isActive(item.path)}"
          @click="navigate(item.path)"
        >
          <div class="dw-nav-icon" :class="{'dw-nav-icon--active': isActive(item.path)}">
            <NavIcon :name="item.iconKey" :size="16" />
          </div>
          <span class="dw-nav-text">{{ item.title }}</span>
          <span v-if="item.badge" class="dw-nav-badge">{{ item.badge }}</span>
          <NavIcon v-if="isActive(item.path)" name="chevron" :size="14"
            style="color:#7C3AED;margin-left:auto;" />
        </div>
      </div>

      <template #append>
        <div class="dw-footer">
          <button class="dw-theme-btn" @click="toggleDark()">
            <NavIcon :name="isDark?'sun':'moon'" :size="14" />
            <span>{{ isDark?'Modo claro':'Modo oscuro' }}</span>
          </button>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- ══ APP BAR ══ -->
    <v-app-bar elevation="0" class="ova-appbar" height="56">
      <template #prepend>
        <v-app-bar-nav-icon density="compact"
          @click="drawer = !drawer"
          style="color:#C4B5FD;" />
      </template>

      <div class="ab-breadcrumb">
        <button class="ab-home-link" @click="goHome">
          <NavIcon name="home" :size="14" />
          <span class="ab-home-text">Inicio</span>
        </button>
        <NavIcon v-if="currentNav" name="chevron" :size="14"
          style="color:rgba(196,181,253,0.3);" />
        <span v-if="currentNav" class="ab-current">{{ currentNav.title }}</span>
      </div>

      <v-spacer />

      <div v-if="userName" class="ab-user">
        <div class="ab-avatar">{{ userName.charAt(0).toUpperCase() }}</div>
        <span class="ab-username d-none d-sm-block">{{ userName }}</span>
      </div>

      <button class="ab-icon-btn ms-1" @click="toggleDark()">
        <NavIcon :name="isDark?'sun':'moon'" :size="18" style="color:#8B7BAF;" />
      </button>

      <button class="ab-icon-btn me-1 me-sm-2" @click="goHome">
        <NavIcon name="home" :size="20" style="color:#8B7BAF;" />
      </button>
    </v-app-bar>

    <!-- ══ MAIN ══ -->
    <v-main class="ova-main">
      <router-view v-slot="{ Component, route: r }">
        <v-fade-transition mode="out-in" :duration="180">
          <component :is="Component" :key="r.path" />
        </v-fade-transition>
      </router-view>
    </v-main>

    <!-- ══ BOTTOM NAV (solo móvil) ══ -->
    <div class="bottom-nav d-flex d-md-none">
      <button v-for="item in navItems.slice(0,5)" :key="item.path"
        class="bnav-item"
        :class="{'bnav-item--active': isActive(item.path)}"
        @click="navigate(item.path)"
      >
        <div class="bnav-icon">
          <NavIcon :name="item.iconKey" :size="20" />
          <span v-if="item.badge" class="bnav-badge">{{ item.badge }}</span>
        </div>
        <span class="bnav-label">{{ item.title }}</span>
      </button>
    </div>

    <!-- ══ FOOTER (solo desktop) ══ -->
    <v-footer class="ova-footer d-none d-md-flex">
      <span class="of-copy">© 2025 QUMITIC — Universidad de Córdoba</span>
      <v-spacer />
      <button class="of-home-btn" @click="goHome">
        <NavIcon name="home" :size="13" />
        <span>Inicio</span>
      </button>
    </v-footer>

  </v-app>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
*,*::before,*::after { box-sizing:border-box; font-family:'Nunito',sans-serif; }

/* ── DRAWER ── */
.ova-drawer { background:#0D0825 !important; border-right:1px solid rgba(124,58,237,0.2) !important; }

.dw-header { padding:20px 16px 14px; background:linear-gradient(160deg,#1C1040,#0D0825); border-bottom:1px solid rgba(124,58,237,0.2); display:flex; flex-direction:column; align-items:center; gap:5px; }
.dw-logo-wrap { position:relative; width:54px; height:54px; }
.dw-logo { width:54px; height:54px; object-fit:contain; border-radius:14px; position:relative; z-index:2; filter:drop-shadow(0 0 12px rgba(124,58,237,0.6)); }
.dw-logo-glow { position:absolute; inset:-5px; border-radius:18px; background:radial-gradient(circle,rgba(124,58,237,0.4),transparent 70%); animation:gp 2.5s ease-in-out infinite; }
@keyframes gp { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.07)} }
.dw-brand  { font-family:'Poppins',sans-serif; font-weight:900; font-size:.9rem; color:#F1F5F9; letter-spacing:4px; }
.dw-course { font-size:.55rem; color:#8B7BAF; letter-spacing:1.2px; text-transform:uppercase; font-weight:700; }

.dw-home-btn-wrap { padding:8px 10px 4px; }
.dw-home-btn { width:100%; display:flex; align-items:center; justify-content:center; gap:6px; background:rgba(124,58,237,0.15); border:1px solid rgba(124,58,237,0.35); border-radius:10px; padding:8px 12px; color:#C4B5FD; font-size:.73rem; font-weight:700; cursor:pointer; transition:all .18s; font-family:'Nunito',sans-serif; }
.dw-home-btn:hover { background:rgba(124,58,237,0.28); color:#fff; }

.dw-user-section { padding:8px 10px; }
.dw-user-label { font-size:.6rem; color:#8B7BAF; font-weight:700; text-transform:uppercase; letter-spacing:.8px; margin-bottom:6px; display:flex; align-items:center; gap:4px; }
.dw-name-field :deep(.v-field) { background:rgba(255,255,255,0.06) !important; }
.dw-name-field :deep(input) { color:#F1F5F9 !important; font-size:.84rem; font-family:'Nunito',sans-serif; font-weight:600; }
.dw-user-row { display:flex; align-items:center; gap:9px; background:rgba(124,58,237,0.12); border:1px solid rgba(124,58,237,0.25); border-radius:11px; padding:8px 10px; }
.dw-avatar { width:34px; height:34px; border-radius:9px; background:linear-gradient(135deg,#7C3AED,#00C8B4); display:flex; align-items:center; justify-content:center; font-family:'Poppins',sans-serif; font-weight:900; font-size:.9rem; color:white; flex-shrink:0; }
.dw-user-info { flex:1; min-width:0; }
.dw-user-greeting { font-size:.55rem; color:#8B7BAF; }
.dw-user-name { font-size:.84rem; font-weight:800; color:#F1F5F9; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.dw-logout-btn { background:transparent; border:none; cursor:pointer; padding:6px; border-radius:6px; display:flex; align-items:center; justify-content:center; transition:background .15s; }
.dw-logout-btn:hover { background:rgba(255,255,255,0.07); }

.dw-progress { margin:6px 10px; background:rgba(255,255,255,0.04); border:1px solid rgba(124,58,237,0.15); border-radius:10px; padding:9px 11px; }
.dw-progress-header { display:flex; align-items:center; gap:5px; margin-bottom:6px; }
.dw-progress-label { font-size:.6rem; color:#8B7BAF; font-weight:700; text-transform:uppercase; letter-spacing:.8px; flex:1; }
.dw-progress-val { font-size:.72rem; font-weight:800; color:#00C8B4; }
.dw-progress-track { height:5px; background:rgba(124,58,237,0.2); border-radius:10px; overflow:hidden; position:relative; }
.dw-progress-fill { height:100%; background:linear-gradient(90deg,#7C3AED,#00C8B4); border-radius:10px; transition:width .8s ease; min-width:3px; }

.dw-nav-label { font-size:.55rem; font-weight:800; color:#8B7BAF; letter-spacing:1.4px; text-transform:uppercase; padding:10px 16px 4px; display:flex; align-items:center; gap:5px; }
.dw-nav { padding:0 8px; }
.dw-nav-item { display:flex; align-items:center; gap:9px; padding:9px 10px; border-radius:10px; cursor:pointer; margin-bottom:2px; transition:all .16s; position:relative; }
.dw-nav-item:hover { background:rgba(124,58,237,0.12); }
.dw-nav-item--active { background:rgba(124,58,237,0.2); }
.dw-nav-item--active::before { content:''; position:absolute; left:0; top:20%; bottom:20%; width:3px; background:linear-gradient(180deg,#7C3AED,#00C8B4); border-radius:0 3px 3px 0; }
.dw-nav-icon { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.06); flex-shrink:0; color:#8B7BAF; transition:all .16s; }
.dw-nav-icon--active { background:linear-gradient(135deg,#7C3AED,#5B21B6); color:white; }
.dw-nav-icon--active svg { color:white !important; fill:white; }
.dw-nav-text { font-size:.86rem; font-weight:600; color:#8B7BAF; flex:1; }
.dw-nav-item--active .dw-nav-text { color:#F1F5F9; font-weight:700; }
.dw-nav-badge { background:linear-gradient(135deg,#FBBF24,#F97316); color:white; font-size:.55rem; font-weight:800; padding:2px 7px; border-radius:20px; }
.dw-footer { border-top:1px solid rgba(124,58,237,0.15); padding:8px 12px; }
.dw-theme-btn { width:100%; display:flex; align-items:center; gap:6px; background:transparent; border:none; color:#8B7BAF; font-size:.73rem; font-weight:700; cursor:pointer; padding:8px; border-radius:8px; font-family:'Nunito',sans-serif; transition:all .15s; }
.dw-theme-btn:hover { color:#C4B5FD; background:rgba(124,58,237,0.1); }

/* ── APP BAR ── */
.ova-appbar { background:#0D0825 !important; border-bottom:1px solid rgba(124,58,237,0.25) !important; }
.ab-breadcrumb { display:flex; align-items:center; gap:5px; margin-left:2px; overflow:hidden; }
.ab-home-link { display:flex; align-items:center; gap:4px; background:none; border:none; color:#8B7BAF; font-size:.78rem; font-weight:700; cursor:pointer; font-family:'Nunito',sans-serif; transition:color .15s; padding:0; white-space:nowrap; min-height:unset; }
.ab-home-link:hover { color:#C4B5FD; }
.ab-home-text { display:none; }
@media (min-width:480px) { .ab-home-text { display:inline; } }
.ab-current { font-size:.78rem; font-weight:700; color:#C4B5FD; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:120px; }
@media (min-width:480px) { .ab-current { max-width:200px; } }
.ab-user { display:flex; align-items:center; gap:6px; background:rgba(124,58,237,0.15); border:1px solid rgba(124,58,237,0.3); border-radius:20px; padding:3px 10px 3px 4px; margin-right:4px; }
.ab-avatar { width:26px; height:26px; border-radius:7px; background:linear-gradient(135deg,#7C3AED,#00C8B4); display:flex; align-items:center; justify-content:center; font-weight:900; font-size:.78rem; color:white; font-family:'Poppins',sans-serif; }
.ab-username { font-size:.78rem; font-weight:700; color:#C4B5FD; }
.ab-icon-btn { width:36px; height:36px; border-radius:8px; background:transparent; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#8B7BAF; transition:background .15s; min-height:unset; }
.ab-icon-btn:hover { background:rgba(124,58,237,0.15); color:#C4B5FD; }

/* ── MAIN ── */
.ova-main { background:#0B0620 !important; }

/* ── BOTTOM NAV (móvil) ── */
.bottom-nav {
  position: fixed; bottom:0; left:0; right:0; z-index:100;
  background:#0D0825; border-top:1px solid rgba(124,58,237,0.25);
  padding: 4px 0 max(4px, env(safe-area-inset-bottom));
  gap:0;
}
.bnav-item {
  flex:1; display:flex; flex-direction:column; align-items:center;
  justify-content:center; gap:2px; background:transparent; border:none;
  cursor:pointer; padding:6px 4px; transition:all .18s;
  font-family:'Nunito',sans-serif; min-height:52px; position:relative;
}
.bnav-icon { position:relative; }
.bnav-icon svg { color:#8B7BAF; transition:color .18s; }
.bnav-item--active .bnav-icon svg { color:#7C3AED; }
.bnav-badge { position:absolute; top:-4px; right:-8px; background:#FBBF24; color:#000; font-size:.45rem; font-weight:800; padding:1px 4px; border-radius:10px; line-height:1.2; }
.bnav-label { font-size:.55rem; font-weight:700; color:#8B7BAF; transition:color .18s; white-space:nowrap; }
.bnav-item--active .bnav-label { color:#C4B5FD; }
.bnav-item--active::before { content:''; position:absolute; top:0; left:25%; right:25%; height:2px; background:linear-gradient(90deg,#7C3AED,#00C8B4); border-radius:0 0 3px 3px; }

/* ── FOOTER ── */
.ova-footer { background:#0D0825 !important; border-top:1px solid rgba(124,58,237,0.2) !important; padding:8px 20px !important; min-height:36px !important; }
.of-copy { font-size:.68rem; color:#8B7BAF; font-weight:600; }
.of-home-btn { display:flex; align-items:center; gap:5px; background:rgba(124,58,237,0.15); border:1px solid rgba(124,58,237,0.3); border-radius:8px; padding:4px 11px; color:#C4B5FD; font-size:.7rem; font-weight:700; cursor:pointer; font-family:'Nunito',sans-serif; transition:all .15s; min-height:unset; }
.of-home-btn:hover { background:rgba(124,58,237,0.28); color:white; }

/* ── Padding del contenido en móvil (espacio para bottom nav) ── */
:deep(.v-main__wrap) { padding-bottom: 0 !important; }
@media (max-width:959px) {
  :deep(.v-main) { padding-bottom: 64px !important; }
}
</style>