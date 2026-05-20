<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import NavIcon from '../components/NavIcon.vue'

const router    = useRouter()
const userName  = useLocalStorage('ova-userName', '')
const nameInput = ref('')
const loaded    = ref(false)
const entering  = ref(false)
const error     = ref(false)

onMounted(() => setTimeout(() => { loaded.value = true }, 100))

const entrar = () => {
  if (!nameInput.value.trim()) { error.value = true; return }
  userName.value = nameInput.value.trim()
  entering.value = true
  setTimeout(() => router.push('/contenido'), 500)
}
const continuar = () => {
  entering.value = true
  setTimeout(() => router.push('/contenido'), 500)
}

const stats = [
  { val:'5',  label:'Módulos',     iconKey:'grid'      },
  { val:'11', label:'Videos',      iconKey:'play'      },
  { val:'3',  label:'Simuladores', iconKey:'flask'     },
  { val:'75', label:'Preguntas',   iconKey:'clipboard' },
]
</script>

<template>
  <div class="splash" :class="{'splash--in':loaded,'splash--out':entering}">

    <div class="splash-bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="grid-lines"></div>
    </div>

    <div class="content">

      <div class="brand">
        <div class="logo-wrap">
          <img src="/logo-quimitic.png" alt="QUIMITIC" class="logo-img" />
          <div class="logo-ring"></div>
        </div>
        <h1 class="brand-name">QUIMITIC</h1>
        <p class="brand-sub">Química · Soluciones · OVA</p>
      </div>

      <p class="tagline">
        Aprende soluciones químicas con videos, simuladores y evaluaciones diseñadas para ti.
      </p>

      <div class="stats-row">
        <div class="stat" v-for="s in stats" :key="s.label">
          <div class="stat-icon">
            <NavIcon :name="s.iconKey" :size="16" style="color:#7C3AED;" />
          </div>
          <span class="stat-val">{{ s.val }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>

      <div class="entry-card">
        <template v-if="!userName">
          <p class="entry-label">¿Cómo te llamas?</p>
          <div class="entry-row">
            <div class="field" :class="{'field--error':error}">
              <NavIcon name="account" :size="16" style="color:#8B7BAF;flex-shrink:0;" />
              <input v-model="nameInput" class="field-input"
                placeholder="Escribe tu nombre..."
                @keyup.enter="entrar" @input="error=false" />
            </div>
            <button class="btn-enter" @click="entrar">
              Entrar
              <NavIcon name="arrow" :size="14" style="color:white;" />
            </button>
          </div>
          <p v-if="error" class="entry-error">
            <NavIcon name="alert" :size="13" style="color:#F87171;" />
            Escribe tu nombre para continuar.
          </p>
        </template>
        <template v-else>
          <div class="welcome-row">
            <div class="welcome-avatar">{{ userName.charAt(0).toUpperCase() }}</div>
            <div class="welcome-text">
              <p class="welcome-label">Continuando como</p>
              <p class="welcome-name">{{ userName }}</p>
            </div>
            <button class="btn-change" @click="userName=''">
              <NavIcon name="pencil" :size="12" />
              <span class="d-none d-sm-inline">Cambiar</span>
            </button>
          </div>
          <button class="btn-continue" @click="continuar">
            <NavIcon name="arrow" :size="16" style="color:white;" />
            Continuar aprendiendo
          </button>
        </template>
      </div>

    </div>

    <footer class="foot">
      <span>Universidad de Córdoba · 2025</span>
      <span class="sep">|</span>
      <span class="d-none d-sm-inline">Creative Commons BY-NC 4.0</span>
    </footer>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; font-family:'Nunito',sans-serif; }

.splash { position:fixed; inset:0; background:#0B0620; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow-y:auto; overflow-x:hidden; padding:clamp(16px,5vw,28px); opacity:0; transform:translateY(8px); transition:opacity .5s ease,transform .5s ease; z-index:9999; }
.splash--in  { opacity:1; transform:translateY(0); }
.splash--out { opacity:0; transform:scale(1.02); }

.splash-bg { position:fixed; inset:0; pointer-events:none; overflow:hidden; }
.grid-lines { position:absolute; inset:0; background-image:linear-gradient(rgba(124,58,237,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.07) 1px,transparent 1px); background-size:44px 44px; }
.orb { position:absolute; border-radius:50%; filter:blur(80px); }
.orb-1 { width:min(500px,80vw); height:min(500px,80vw); top:-20%; right:-10%; background:rgba(124,58,237,0.22); animation:fl 9s ease-in-out infinite; }
.orb-2 { width:min(400px,70vw); height:min(400px,70vw); bottom:-15%; left:-10%; background:rgba(0,200,180,0.1); animation:fl 12s ease-in-out infinite reverse; }
@keyframes fl { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }

.content { position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:clamp(16px,4vw,24px); max-width:520px; width:100%; text-align:center; padding-bottom:clamp(40px,8vw,60px); }

.brand { display:flex; flex-direction:column; align-items:center; gap:6px; }
.logo-wrap { position:relative; width:clamp(70px,18vw,96px); height:clamp(70px,18vw,96px); }
.logo-img { width:100%; height:100%; object-fit:contain; border-radius:clamp(16px,4vw,22px); position:relative; z-index:2; filter:drop-shadow(0 0 20px rgba(124,58,237,0.65)); }
.logo-ring { position:absolute; inset:-8px; border-radius:30px; background:radial-gradient(circle,rgba(124,58,237,0.4),transparent 70%); animation:gp 2.8s ease-in-out infinite; }
@keyframes gp { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.07)} }
.brand-name { font-family:'Poppins',sans-serif; font-weight:900; font-size:clamp(2rem,10vw,3rem); letter-spacing:clamp(3px,2vw,8px); line-height:1; background:linear-gradient(135deg,#fff 0%,#C4B5FD 55%,#00C8B4 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.brand-sub { font-size:clamp(.6rem,2vw,.7rem); font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#8B7BAF; }

.tagline { font-size:clamp(.82rem,2.5vw,.92rem); color:#8B7BAF; line-height:1.7; max-width:400px; }

.stats-row { display:grid; grid-template-columns:repeat(4,1fr); width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(124,58,237,0.25); border-radius:14px; overflow:hidden; }
.stat { display:flex; flex-direction:column; align-items:center; gap:3px; padding:clamp(10px,3vw,14px) 4px; border-right:1px solid rgba(124,58,237,0.15); }
.stat:last-child { border-right:none; }
.stat-icon { width:28px; height:28px; border-radius:7px; background:rgba(124,58,237,0.15); display:flex; align-items:center; justify-content:center; }
.stat-val   { font-family:'Poppins',sans-serif; font-weight:900; font-size:clamp(1.1rem,5vw,1.4rem); color:#F1F5F9; line-height:1; }
.stat-label { font-size:clamp(.5rem,1.8vw,.6rem); color:#8B7BAF; font-weight:700; text-transform:uppercase; letter-spacing:.6px; text-align:center; }

.entry-card { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(124,58,237,0.25); border-radius:16px; padding:clamp(14px,4vw,20px); display:flex; flex-direction:column; gap:10px; }
.entry-label { font-size:.78rem; font-weight:600; color:#8B7BAF; text-align:left; margin:0; }
.entry-row { display:flex; gap:8px; }
.field { flex:1; display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.05); border:1.5px solid rgba(124,58,237,0.25); border-radius:10px; padding:0 10px; transition:border-color .18s; min-width:0; }
.field:focus-within { border-color:#7C3AED; background:rgba(124,58,237,0.1); }
.field--error { border-color:rgba(248,113,113,0.6) !important; }
.field-input { flex:1; background:transparent; border:none; outline:none; color:#F1F5F9; font-size:clamp(.82rem,3vw,.9rem); font-weight:600; font-family:'Nunito',sans-serif; padding:11px 0; min-width:0; }
.field-input::placeholder { color:#8B7BAF; }
.btn-enter { display:flex; align-items:center; gap:5px; white-space:nowrap; background:linear-gradient(135deg,#7C3AED,#00C8B4); color:white; border:none; border-radius:10px; padding:0 clamp(12px,3vw,18px); font-size:clamp(.8rem,2.5vw,.85rem); font-weight:800; cursor:pointer; transition:all .18s; font-family:'Nunito',sans-serif; min-height:44px; flex-shrink:0; }
.entry-error { display:flex; align-items:center; gap:5px; font-size:.72rem; color:#F87171; font-weight:600; text-align:left; margin:0; }

.welcome-row  { display:flex; align-items:center; gap:10px; background:rgba(124,58,237,0.15); border:1px solid rgba(124,58,237,0.3); border-radius:12px; padding:10px 12px; }
.welcome-avatar { width:40px; height:40px; border-radius:10px; flex-shrink:0; background:linear-gradient(135deg,#7C3AED,#00C8B4); display:flex; align-items:center; justify-content:center; font-family:'Poppins',sans-serif; font-weight:900; font-size:1rem; color:white; }
.welcome-text { flex:1; min-width:0; text-align:left; }
.welcome-label { font-size:.62rem; color:#8B7BAF; margin:0; }
.welcome-name  { font-size:clamp(.85rem,3vw,.95rem); font-weight:800; color:#F1F5F9; margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.btn-change { display:flex; align-items:center; gap:4px; background:transparent; border:1px solid rgba(124,58,237,0.3); color:#8B7BAF; border-radius:8px; padding:6px 10px; font-size:.7rem; font-weight:700; cursor:pointer; font-family:'Nunito',sans-serif; transition:all .15s; flex-shrink:0; min-height:unset; }
.btn-change:hover { border-color:#7C3AED; color:#C4B5FD; }
.btn-continue { display:flex; align-items:center; justify-content:center; gap:8px; width:100%; background:linear-gradient(135deg,#7C3AED,#00C8B4); color:white; border:none; border-radius:11px; padding:13px; font-size:clamp(.85rem,3vw,.9rem); font-weight:800; cursor:pointer; transition:all .18s; font-family:'Nunito',sans-serif; min-height:48px; }

.foot { position:fixed; bottom:0; left:0; right:0; z-index:3; padding:8px 16px; display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; background:rgba(11,6,32,0.9); border-top:1px solid rgba(124,58,237,0.2); font-size:clamp(.6rem,2vw,.66rem); color:#8B7BAF; font-weight:600; backdrop-filter:blur(8px); }
.sep { color:rgba(124,58,237,0.5); }
</style>
