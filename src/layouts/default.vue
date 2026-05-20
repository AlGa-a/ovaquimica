<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { useDisplay } from 'vuetify'
import { useAccessibility } from '../composables/useAccessibility'
import NavIcon from '../components/NavIcon.vue'
import OvaFooter from '../components/OvaFooter.vue'

const router     = useRouter()
const route      = useRoute()
const { mobile } = useDisplay()
const drawer     = ref(!mobile.value)
const nameInput  = ref('')

const userName = useLocalStorage('ova-userName', '')
const progress = useLocalStorage('ova-progress', 0)
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
  if (mobile.value) drawer.value = false
}
</script>

<template>
  <v-app :theme="isDark ? 'qumitic_dark' : 'qumitic'">

    <!-- ══ DRAWER ══ -->
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="960"
      :width="268"
      class="ova-drawer"
    >
      <!-- Header del drawer -->
      <div class="dw-header">
        <div class="dw-logo-wrap">
          <img src="/logo-qumitic.png" alt="QUIMITIC" class="dw-logo" />
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
            rounded="lg" color="white" class="dw-name-field"
            @keyup.enter="setName"
          >
            <template #append-inner>
              <v-btn icon size="x-small" variant="flat"
                style="background:rgba(255,255,255,0.25);"
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
              <NavIcon name="logout" :size="14" />
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

      <!-- Nav label -->
      <div class="dw-nav-label">
        <NavIcon name="list" :size="11" />
        Módulos del curso
      </div>

      <!-- Nav items -->
      <div class="dw-nav">
        <div v-for="item in navItems" :key="item.path"
          class="dw-nav-item"
          :class="{'dw-nav-item--active': isActive(item.path)}"
          @click="navigate(item.path)">
          <div class="dw-nav-icon" :class="{'dw-nav-icon--active': isActive(item.path)}">
            <NavIcon :name="item.iconKey" :size="16" />
          </div>
          <span class="dw-nav-text">{{ item.title }}</span>
          <span v-if="item.badge" class="dw-nav-badge">{{ item.badge }}</span>
          <NavIcon v-if="isActive(item.path)" name="chevron" :size="14"
            style="color:rgba(255,255,255,0.6);margin-left:auto;" />
        </div>
      </div>

      <!-- Footer del drawer -->
      <template #append>
        <div class="dw-footer">
          <button class="dw-theme-btn" @click="toggleDark()">
            <NavIcon :name="isDark ? 'sun' : 'moon'" :size="14" />
            <span>{{ isDark ? 'Modo claro' : 'Modo oscuro' }}</span>
          </button>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- ══ APP BAR ══ -->
    <v-app-bar elevation="0" class="ova-appbar" height="56">
      <template #prepend>
        <v-app-bar-nav-icon density="compact"
          @click="drawer = !drawer"
          style="color:white;" />
      </template>

      <div class="ab-breadcrumb">
        <button class="ab-home-link" @click="goHome">
          <NavIcon name="home" :size="14" />
          <span class="ab-home-text">Inicio</span>
        </button>
        <NavIcon v-if="currentNav" name="chevron" :size="14"
          style="color:rgba(255,255,255,0.4);" />
        <span v-if="currentNav" class="ab-current">{{ currentNav.title }}</span>
      </div>

      <v-spacer />

      <div v-if="userName" class="ab-user">
        <div class="ab-avatar">{{ userName.charAt(0).toUpperCase() }}</div>
        <span class="ab-username d-none d-sm-block">{{ userName }}</span>
      </div>

      <button class="ab-icon-btn ms-1" @click="toggleDark()" title="Cambiar tema">
        <NavIcon :name="isDark ? 'sun' : 'moon'" :size="18" style="color:rgba(255,255,255,0.8);" />
      </button>

      <button class="ab-icon-btn me-1 me-sm-2" @click="goHome" title="Inicio">
        <NavIcon name="home" :size="20" style="color:rgba(255,255,255,0.8);" />
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

    <OvaFooter class="d-none d-md-block" />

    <!-- ══ BOTTOM NAV (solo móvil) ══ -->
    <div class="bottom-nav d-flex d-md-none">
      <button v-for="item in navItems.slice(0,5)" :key="item.path"
        class="bnav-item"
        :class="{'bnav-item--active': isActive(item.path)}"
        @click="navigate(item.path)">
        <div class="bnav-icon">
          <NavIcon :name="item.iconKey" :size="20" />
          <span v-if="item.badge" class="bnav-badge">{{ item.badge }}</span>
        </div>
        <span class="bnav-label">{{ item.title }}</span>
      </button>
    </div>

  </v-app>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
*,*::before,*::after { box-sizing:border-box; font-family:'Nunito',sans-serif; }

/* ════════════════════════════════════
   DRAWER — fondo púrpura
════════════════════════════════════ */
.ova-drawer {
  background: linear-gradient(180deg, #5B0E91 0%, #6B21A8 40%, #581C87 100%) !important;
  border-right: none !important;
  box-shadow: 4px 0 20px rgba(107,33,168,0.3) !important;
}

/* Header */
.dw-header {
  padding: 22px 16px 16px;
  background: rgba(0,0,0,0.15);
  border-bottom: 1px solid rgba(255,255,255,0.12);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.dw-logo-wrap { position:relative; width:60px; height:60px; }
.dw-logo {
  width:60px; height:60px; object-fit:contain; border-radius:14px;
  position:relative; z-index:2;
  filter: drop-shadow(0 0 12px rgba(255,255,255,0.3));
}
.dw-logo-glow {
  position:absolute; inset:-6px; border-radius:20px;
  background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%);
  animation: gp 2.5s ease-in-out infinite;
}
@keyframes gp { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
.dw-brand  { font-family:'Poppins',sans-serif; font-weight:900; font-size:.95rem; color:#FFFFFF; letter-spacing:4px; }
.dw-course { font-size:.58rem; color:rgba(255,255,255,0.6); letter-spacing:1.2px; text-transform:uppercase; font-weight:700; }

/* Botón inicio */
.dw-home-btn-wrap { padding:8px 10px 4px; }
.dw-home-btn {
  width:100%; display:flex; align-items:center; justify-content:center; gap:6px;
  background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2);
  border-radius:10px; padding:8px 12px;
  color:rgba(255,255,255,0.85); font-size:.73rem; font-weight:700;
  cursor:pointer; transition:all .18s; font-family:'Nunito',sans-serif;
}
.dw-home-btn:hover { background:rgba(255,255,255,0.22); color:white; }

/* Usuario */
.dw-user-section { padding:8px 10px; }
.dw-user-label {
  font-size:.6rem; color:rgba(255,255,255,0.55); font-weight:700;
  text-transform:uppercase; letter-spacing:.8px; margin-bottom:6px;
  display:flex; align-items:center; gap:4px;
}
.dw-name-field :deep(.v-field) {
  background:rgba(255,255,255,0.12) !important;
  border-color:rgba(255,255,255,0.2) !important;
}
.dw-name-field :deep(input) {
  color:#FFFFFF !important; font-size:.84rem;
  font-family:'Nunito',sans-serif; font-weight:600;
}
.dw-name-field :deep(input::placeholder) { color:rgba(255,255,255,0.45); }
.dw-user-row {
  display:flex; align-items:center; gap:9px;
  background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.18);
  border-radius:11px; padding:8px 10px;
}
.dw-avatar {
  width:34px; height:34px; border-radius:9px;
  background:rgba(255,255,255,0.25);
  display:flex; align-items:center; justify-content:center;
  font-family:'Poppins',sans-serif; font-weight:900; font-size:.9rem; color:white; flex-shrink:0;
}
.dw-user-info { flex:1; min-width:0; }
.dw-user-greeting { font-size:.58rem; color:rgba(255,255,255,0.55); }
.dw-user-name { font-size:.84rem; font-weight:800; color:white; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.dw-logout-btn {
  background:transparent; border:none; cursor:pointer; padding:5px;
  border-radius:6px; display:flex; align-items:center; justify-content:center;
  color:rgba(255,255,255,0.6); transition:all .15s;
}
.dw-logout-btn:hover { background:rgba(255,255,255,0.12); color:white; }

/* Progreso */
.dw-progress {
  margin:6px 10px;
  background:rgba(0,0,0,0.15); border:1px solid rgba(255,255,255,0.12);
  border-radius:10px; padding:9px 11px;
}
.dw-progress-header { display:flex; align-items:center; gap:5px; margin-bottom:6px; }
.dw-progress-label { font-size:.6rem; color:rgba(255,255,255,0.6); font-weight:700; text-transform:uppercase; letter-spacing:.8px; flex:1; }
.dw-progress-val { font-size:.72rem; font-weight:800; color:#00C8B4; }
.dw-progress-track {
  height:5px; background:rgba(255,255,255,0.15);
  border-radius:10px; overflow:hidden; position:relative;
}
.dw-progress-fill {
  height:100%; background:linear-gradient(90deg, #A855F7, #00C8B4);
  border-radius:10px; transition:width .8s ease; min-width:3px;
}

/* Nav */
.dw-nav-label {
  font-size:.58rem; font-weight:800; color:rgba(255,255,255,0.45);
  letter-spacing:1.4px; text-transform:uppercase;
  padding:10px 16px 4px; display:flex; align-items:center; gap:5px;
}
.dw-nav { padding:0 8px; }
.dw-nav-item {
  display:flex; align-items:center; gap:9px; padding:9px 10px;
  border-radius:10px; cursor:pointer; margin-bottom:2px;
  transition:all .16s; position:relative;
}
.dw-nav-item:hover { background:rgba(255,255,255,0.1); }
.dw-nav-item--active { background:rgba(255,255,255,0.18); }
.dw-nav-item--active::before {
  content:''; position:absolute; left:0; top:20%; bottom:20%;
  width:3px; background:linear-gradient(180deg,#E9D5FF,#00C8B4);
  border-radius:0 3px 3px 0;
}
.dw-nav-icon {
  width:30px; height:30px; border-radius:8px;
  display:flex; align-items:center; justify-content:center;
  background:rgba(255,255,255,0.1); flex-shrink:0;
  color:rgba(255,255,255,0.65); transition:all .16s;
}
.dw-nav-icon--active { background:rgba(255,255,255,0.22); color:white; }
.dw-nav-text { font-size:.86rem; font-weight:600; color:rgba(255,255,255,0.7); flex:1; }
.dw-nav-item--active .dw-nav-text { color:white; font-weight:700; }
.dw-nav-badge {
  background:linear-gradient(135deg,#FBBF24,#F97316);
  color:white; font-size:.55rem; font-weight:800;
  padding:2px 7px; border-radius:20px;
}
.dw-footer { border-top:1px solid rgba(255,255,255,0.12); padding:8px 12px; }
.dw-theme-btn {
  width:100%; display:flex; align-items:center; gap:6px;
  background:transparent; border:none;
  color:rgba(255,255,255,0.6); font-size:.73rem; font-weight:700;
  cursor:pointer; padding:7px 8px; border-radius:8px;
  font-family:'Nunito',sans-serif; transition:all .15s;
}
.dw-theme-btn:hover { color:white; background:rgba(255,255,255,0.1); }

/* ════════════════════════════════════
   APP BAR — fondo púrpura
════════════════════════════════════ */
.ova-appbar {
  background: linear-gradient(90deg, #5B0E91, #6B21A8, #5B0E91) !important;
  border-bottom: none !important;
  box-shadow: 0 2px 12px rgba(107,33,168,0.35) !important;
}
.ab-breadcrumb { display:flex; align-items:center; gap:5px; margin-left:4px; overflow:hidden; }
.ab-home-link {
  display:flex; align-items:center; gap:4px;
  background:none; border:none; color:rgba(255,255,255,0.75);
  font-size:.78rem; font-weight:700; cursor:pointer;
  font-family:'Nunito',sans-serif; transition:color .15s; padding:0; min-height:unset;
}
.ab-home-link:hover { color:white; }
.ab-home-text { display:none; }
@media (min-width:480px) { .ab-home-text { display:inline; } }
.ab-current {
  font-size:.78rem; font-weight:700; color:white;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:160px;
}
.ab-user {
  display:flex; align-items:center; gap:6px;
  background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25);
  border-radius:20px; padding:3px 10px 3px 4px; margin-right:4px;
}
.ab-avatar {
  width:26px; height:26px; border-radius:7px;
  background:rgba(255,255,255,0.25);
  display:flex; align-items:center; justify-content:center;
  font-weight:900; font-size:.78rem; color:white;
  font-family:'Poppins',sans-serif;
}
.ab-username { font-size:.78rem; font-weight:700; color:white; }
.ab-icon-btn {
  width:36px; height:36px; border-radius:8px; background:transparent; border:none;
  cursor:pointer; display:flex; align-items:center; justify-content:center;
  transition:background .15s; min-height:unset;
}
.ab-icon-btn:hover { background:rgba(255,255,255,0.15); }

/* ════════════════════════════════════
   MAIN — fondo blanco
════════════════════════════════════ */
.ova-main { background:#F8F7FF !important; }

/* ── Modo oscuro ── */
:root[data-theme="dark"] .ova-main { background:#0B0620 !important; }
:root[data-theme="dark"] .ova-drawer {
  background: linear-gradient(180deg,#1C0950,#250D5C,#1C0950) !important;
}
:root[data-theme="dark"] .ova-appbar {
  background: linear-gradient(90deg,#1C0950,#2D1082,#1C0950) !important;
}

/* ════════════════════════════════════
   BOTTOM NAV (móvil)
════════════════════════════════════ */
.bottom-nav {
  position:fixed; bottom:0; left:0; right:0; z-index:100;
  background: linear-gradient(90deg,#5B0E91,#6B21A8);
  border-top: 1px solid rgba(255,255,255,0.15);
  padding: 4px 0 max(4px, env(safe-area-inset-bottom));
  box-shadow: 0 -4px 20px rgba(107,33,168,0.35);
}
.bnav-item {
  flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:2px; background:transparent; border:none; cursor:pointer;
  padding:6px 4px; transition:all .18s; font-family:'Nunito',sans-serif;
  min-height:52px; position:relative;
}
.bnav-icon { position:relative; }
.bnav-icon svg { color:rgba(255,255,255,0.55); transition:color .18s; }
.bnav-item--active .bnav-icon svg { color:white; }
.bnav-badge {
  position:absolute; top:-4px; right:-8px;
  background:#FBBF24; color:#000; font-size:.45rem; font-weight:800;
  padding:1px 4px; border-radius:10px; line-height:1.2;
}
.bnav-label { font-size:.55rem; font-weight:700; color:rgba(255,255,255,0.55); transition:color .18s; white-space:nowrap; }
.bnav-item--active .bnav-label { color:white; }
.bnav-item--active::before {
  content:''; position:absolute; top:0; left:25%; right:25%;
  height:2px; background:linear-gradient(90deg,#E9D5FF,#00C8B4);
  border-radius:0 0 3px 3px;
}

@media (max-width:959px) {
  :deep(.v-main) { padding-bottom: 64px !important; }
}
</style>