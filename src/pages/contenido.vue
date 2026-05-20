<script setup>
import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useTextToSpeech } from '../composables/useTextToSpeech'
import { modulos } from '../data/soluciones'
import NavIcon from '../components/NavIcon.vue'

const { speak, speakingId } = useTextToSpeech()
const favs        = useLocalStorage('ova-favs', [])
const vistos      = useLocalStorage('ova-vistos', [])
const moduloIdx   = ref(0)
const videoActivo = ref(null)
const modulo      = computed(() => modulos[moduloIdx.value])

const toggleFav = (id) => {
  const i = favs.value.indexOf(id)
  if (i > -1) favs.value.splice(i,1); else favs.value.push(id)
}
const activarVideo = (id) => {
  videoActivo.value = id
  if (!vistos.value.includes(id)) vistos.value.push(id)
}
const ytThumb = (src) => {
  const id = src?.split('/embed/')[1]?.split('?')[0]
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ''
}

const modColors = { 0:'#7C3AED', 1:'#0EA5E9', 2:'#10B981', 3:'#FBBF24', 4:'#F87171' }
const modGrads  = {
  0:'linear-gradient(135deg,#7C3AED,#9D5FF0)',
  1:'linear-gradient(135deg,#0EA5E9,#7C3AED)',
  2:'linear-gradient(135deg,#10B981,#0EA5E9)',
  3:'linear-gradient(135deg,#FBBF24,#F97316)',
  4:'linear-gradient(135deg,#F87171,#FBBF24)',
}
const col  = computed(() => modColors[moduloIdx.value] || '#7C3AED')
const grad = computed(() => modGrads[moduloIdx.value]  || modGrads[0])
</script>

<template>
  <div class="cont-root">

    <!-- Hero -->
    <div class="hero">
      <div class="hero-bg" :style="`background:radial-gradient(circle at 80% 50%,${col}22,transparent 65%);`"></div>

      <div class="module-tabs">
        <button v-for="(m,i) in modulos" :key="m.id"
          class="module-tab"
          :class="{'module-tab--active': moduloIdx===i}"
          :style="moduloIdx===i ? `background:${modGrads[i]};border-color:transparent;color:white;` : ''"
          @click="moduloIdx=i; videoActivo=null">
          {{ m.badge }}
        </button>
      </div>

      <div class="hero-content">
        <div class="hero-badge" :style="`background:${grad};`">{{ modulo.badge }}</div>
        <h1 class="hero-title">{{ modulo.titulo }}</h1>
        <p class="hero-desc">{{ modulo.descripcion }}</p>
        <div class="hero-meta">
          <span class="meta-item">
            <NavIcon name="play" :size="13" :style="`color:${col};`" />
            {{ modulo.videos.length }} videos
          </span>
          <span class="meta-item">
            <NavIcon name="check" :size="13" style="color:#10B981;" />
            {{ modulo.videos.filter(v=>vistos.includes(v.id)).length }} completados
          </span>
        </div>
      </div>

      <div class="hero-prog-track">
        <div class="hero-prog-fill"
          :style="`width:${modulo.videos.length?(modulo.videos.filter(v=>vistos.includes(v.id)).length/modulo.videos.length)*100:0}%;background:${grad};`">
        </div>
      </div>
    </div>

    <!-- Videos -->
    <div class="videos-section">
      <div class="videos-header">
        <span class="videos-title">Contenido del módulo</span>
        <span class="videos-count">{{ modulo.videos.length }} lecciones</span>
      </div>

      <v-row>
        <v-col v-for="(video,index) in modulo.videos" :key="video.id"
          cols="12" sm="6" lg="4"
          class="stagger-item" :style="`animation-delay:${index*60}ms`">
          <div class="video-card">
            <!-- Thumb -->
            <div class="card-thumb" @click="activarVideo(video.id)">
              <template v-if="videoActivo!==video.id">
                <img :src="ytThumb(video.src)" :alt="video.titulo" class="thumb-img" />
                <div class="play-overlay">
                  <div class="play-circle" :style="`background:${col};`">
                    <NavIcon name="play" :size="24" style="color:white;" />
                  </div>
                </div>
                <div class="thumb-badges">
                  <span class="cap-badge" :style="`background:${col}DD;`">Cap. {{ video.capitulo }}</span>
                  <span class="dur-badge">
                    <NavIcon name="clock" :size="10" style="color:rgba(255,255,255,0.8);" />
                    {{ video.duracion }}
                  </span>
                </div>
                <div v-if="vistos.includes(video.id)" class="seen-badge">
                  <NavIcon name="check" :size="11" style="color:white;" />
                  Visto
                </div>
              </template>
              <iframe v-else :src="video.src+'?autoplay=1'" :title="video.titulo"
                class="video-iframe" allow="autoplay; encrypted-media" allowfullscreen />
            </div>

            <!-- Body -->
            <div class="card-body">
              <div class="cap-label" :style="`color:${col};`">CAPÍTULO {{ video.capitulo }}</div>
              <div class="card-title">{{ video.titulo }}</div>
              <div class="card-desc">{{ video.desc }}</div>
            </div>

            <div class="card-divider"></div>

            <!-- Actions -->
            <div class="card-actions">
              <button class="tts-btn"
                :style="speakingId===video.id?`background:${col}30;border-color:${col};color:${col};`:'' "
                @click="speak(video.titulo+'. '+video.desc, video.id)">
                <NavIcon name="volume" :size="14" />
                {{ speakingId===video.id ? 'Leyendo...' : 'Leer en voz alta' }}
              </button>
              <button class="icon-btn" @click="toggleFav(video.id)">
                <NavIcon :name="favs.includes(video.id)?'star':'star-outline'" :size="17"
                  :style="`color:${favs.includes(video.id)?'#FBBF24':'#8B7BAF'};`" />
              </button>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@700;800;900&display=swap');
*,*::before,*::after { box-sizing:border-box; font-family:'Nunito',sans-serif; }

.cont-root { min-height:100%; background:var(--bg); }

/* Hero */
.hero {
  position:relative; padding:clamp(14px,4vw,20px) var(--page-px) 0;
  overflow:hidden; background:var(--surface); border-bottom:2px solid var(--border);
  box-shadow: var(--shadow-sm);
}
.hero-bg { position:absolute; inset:0; pointer-events:none; }

/* Tabs */
.module-tabs {
  display:flex; gap:6px; margin-bottom:14px; position:relative; z-index:1;
  overflow-x:auto; padding-bottom:4px; scrollbar-width:none; flex-wrap:nowrap;
}
.module-tabs::-webkit-scrollbar { display:none; }
.module-tab {
  flex-shrink:0; display:flex; align-items:center; gap:5px;
  padding:5px 14px; border-radius:20px;
  border:1.5px solid var(--border); background:var(--surface-2);
  color:var(--muted); font-size:clamp(.68rem,2vw,.73rem); font-weight:700;
  cursor:pointer; transition:all .2s; white-space:nowrap;
  font-family:'Nunito',sans-serif; min-height:32px;
}
.module-tab:hover { border-color:var(--primary-bd); color:var(--primary); background:var(--primary-soft); }

.hero-content { position:relative; z-index:1; padding-bottom:14px; }
.hero-badge { display:inline-flex; align-items:center; padding:3px 12px; border-radius:20px; font-size:.65rem; font-weight:800; color:white; letter-spacing:.8px; text-transform:uppercase; margin-bottom:8px; }
.hero-title { font-family:'Poppins',sans-serif; font-weight:900; font-size:clamp(1.3rem,5vw,1.7rem); color:var(--text); margin:4px 0 6px; line-height:1.2; }
.hero-desc  { font-size:clamp(.8rem,2.5vw,.86rem); color:var(--muted); line-height:1.65; margin-bottom:10px; max-width:560px; }
.hero-meta  { display:flex; gap:12px; flex-wrap:wrap; }
.meta-item  { display:flex; align-items:center; gap:5px; font-size:.74rem; color:var(--muted); font-weight:600; }
.hero-prog-track { height:3px; background:var(--border); margin:0 calc(-1*var(--page-px)); }
.hero-prog-fill  { height:100%; transition:width .8s ease; min-width:3px; }

/* Videos */
.videos-section { padding:clamp(14px,3vw,20px) var(--page-px) clamp(20px,5vw,28px); }
.videos-header  { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
.videos-title   { font-family:'Poppins',sans-serif; font-weight:800; font-size:clamp(.88rem,2.5vw,.95rem); color:var(--text); }
.videos-count   { font-size:.72rem; color:var(--primary); font-weight:700; background:var(--primary-soft); padding:3px 10px; border-radius:20px; border:1px solid var(--primary-bd); }

/* Cards */
.video-card {
  background:var(--surface); border-radius:14px;
  border:1px solid var(--border) !important;
  overflow:hidden; box-shadow:var(--shadow-sm);
  transition:transform .22s ease, box-shadow .22s ease;
}
@media (hover:hover) {
  .video-card:hover { transform:translateY(-3px); box-shadow:var(--shadow-lg) !important; border-color:var(--primary-bd) !important; }
}
.card-thumb { position:relative; height:clamp(140px,40vw,170px); background:#0F1B2D; cursor:pointer; overflow:hidden; }
.thumb-img  { width:100%; height:100%; object-fit:cover; display:block; transition:transform .3s ease; }
@media (hover:hover) { .card-thumb:hover .thumb-img { transform:scale(1.04); } }
.play-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.25); transition:background .2s; }
@media (hover:hover) { .card-thumb:hover .play-overlay { background:rgba(0,0,0,0.1); } }
.play-circle  { width:clamp(42px,12vw,52px); height:clamp(42px,12vw,52px); border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid rgba(255,255,255,0.5); transition:transform .2s; }
@media (hover:hover) { .card-thumb:hover .play-circle { transform:scale(1.1); } }
.thumb-badges { position:absolute; top:7px; left:7px; right:7px; display:flex; justify-content:space-between; align-items:flex-start; }
.cap-badge  { font-size:.58rem; font-weight:800; padding:3px 7px; border-radius:6px; color:white; }
.dur-badge  { display:flex; align-items:center; gap:3px; background:rgba(0,0,0,0.55); border-radius:6px; padding:3px 7px; font-size:.58rem; color:rgba(255,255,255,.9); font-weight:700; }
.seen-badge { position:absolute; bottom:7px; right:7px; display:flex; align-items:center; gap:3px; background:#059669; border-radius:6px; padding:2px 7px; font-size:.58rem; font-weight:800; color:white; }
.video-iframe { width:100%; height:100%; border:none; display:block; }

.card-body  { padding:clamp(10px,3vw,12px) clamp(10px,3vw,14px) 6px; }
.cap-label  { font-size:.58rem; font-weight:800; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:3px; }
.card-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(.82rem,2.5vw,.88rem); color:var(--text); line-height:1.3; margin-bottom:4px; }
.card-desc  { font-size:clamp(.7rem,2vw,.76rem); color:var(--muted); line-height:1.55; }
.card-divider { height:1px; background:var(--border); margin:0 12px; }
.card-actions { padding:8px 10px; display:flex; align-items:center; justify-content:space-between; }

.tts-btn {
  display:flex; align-items:center; gap:5px;
  background:var(--primary-soft); border:1px solid var(--primary-bd);
  border-radius:8px; padding:6px 11px;
  color:var(--primary); font-size:.74rem; font-weight:700;
  cursor:pointer; transition:all .18s; font-family:'Nunito',sans-serif;
}
.tts-btn:hover { background:var(--primary); color:white; }
.icon-btn {
  width:32px; height:32px; border-radius:8px; border:1px solid var(--border);
  background:var(--surface-2); cursor:pointer;
  display:flex; align-items:center; justify-content:center; transition:all .15s;
}
.icon-btn:hover { background:var(--primary-soft); border-color:var(--primary-bd); }
</style>