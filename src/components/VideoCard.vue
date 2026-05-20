<script setup>
import { ref } from 'vue'
import NavIcon from './NavIcon.vue'

const props = defineProps({
  video: Object,
  isFav: Boolean,
})
const emit = defineEmits(['speak', 'toggleFav'])

const videoActivo = ref(false)
const ytThumb = (src) => {
  const id = src?.split('/embed/')[1]?.split('?')[0]
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ''
}
</script>

<template>
  <v-card
    class="video-card"
    color="surface"
    :elevation="videoActivo ? 4 : 2"
    rounded="lg"
  >
    <!-- Miniatura / reproductor -->
    <div class="video-thumb" @click="videoActivo = true">
      <template v-if="!videoActivo">
        <img
          :src="ytThumb(video.src)"
          :alt="video.titulo"
          class="thumb-img"
        />
        <!-- Overlay de reproducción -->
        <div class="play-overlay">
          <div class="play-btn">
            <NavIcon name="play" :size="28" style="color:white;" />
          </div>
        </div>
        <!-- Badges -->
        <div class="thumb-top">
          <v-chip
            size="x-small"
            color="primary"
            variant="tonal"
            class="cap-chip"
          >
            Cap. {{ video.capitulo }}
          </v-chip>
          <v-chip
            size="x-small"
            variant="tonal"
            color="secondary"
            class="dur-chip"
          >
            <NavIcon name="clock" :size="10" style="margin-right:3px;" />
            {{ video.duracion }}
          </v-chip>
        </div>
        <!-- Indicador visto -->
        <v-chip
          v-if="video.visto"
          size="x-small"
          color="success"
          variant="flat"
          class="seen-chip"
          prepend-icon="mdi-check-circle-outline"
        >
          Visto
        </v-chip>
      </template>
      <iframe
        v-else
        :src="video.src + '?autoplay=1'"
        :title="video.titulo"
        class="video-iframe"
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    </div>

    <v-card-text class="card-body">
      <!-- Capítulo label -->
      <div class="cap-label text-primary">CAPÍTULO {{ video.capitulo }}</div>

      <!-- Título -->
      <div class="card-title">{{ video.titulo }}</div>

      <!-- Descripción -->
      <div class="card-desc">{{ video.desc }}</div>
    </v-card-text>

    <v-divider color="border-soft" />

    <v-card-actions class="card-actions">
      <!-- Leer en voz alta -->
      <v-btn
        variant="tonal"
        color="primary"
        size="small"
        rounded="lg"
        @click="emit('speak', video)"
        class="tts-btn"
      >
        <template #prepend>
          <NavIcon name="volume" :size="14" />
        </template>
        Leer en voz alta
      </v-btn>

      <v-spacer />

      <!-- Favorito -->
      <v-btn
        :color="isFav ? 'warning' : 'default'"
        variant="text"
        icon
        size="small"
        @click="emit('toggleFav', video.id)"
      >
        <NavIcon :name="isFav ? 'star' : 'star-outline'" :size="18" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.video-card {
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  border: 1px solid rgb(var(--v-theme-border-soft)) !important;
  overflow: hidden;
}
.video-card:hover {
  transform: translateY(-3px);
}

/* Thumb */
.video-thumb {
  position: relative;
  height: 168px;
  background: #0F1B2D;
  cursor: pointer;
  overflow: hidden;
}
.thumb-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 0.3s ease;
}
.video-thumb:hover .thumb-img {
  transform: scale(1.04);
}

.play-overlay {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.25);
  transition: background 0.2s;
}
.video-thumb:hover .play-overlay {
  background: rgba(0,0,0,0.15);
}
.play-btn {
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(74,111,165,0.9);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s, background 0.2s;
  backdrop-filter: blur(4px);
  border: 2px solid rgba(255,255,255,0.4);
}
.video-thumb:hover .play-btn {
  transform: scale(1.1);
  background: rgb(74,111,165);
}

.thumb-top {
  position: absolute; top: 8px; left: 8px; right: 8px;
  display: flex; justify-content: space-between; align-items: flex-start;
}
.cap-chip, .dur-chip { font-weight: 700 !important; letter-spacing: 0.3px; }
.seen-chip {
  position: absolute; bottom: 8px; right: 8px;
  font-weight: 700 !important;
}
.video-iframe {
  width: 100%; height: 100%; border: none; display: block;
}

/* Body */
.card-body { padding: 14px 16px 8px; }
.cap-label {
  font-size: 0.6rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 1.2px;
  margin-bottom: 4px; opacity: 0.8;
}
.card-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 700; font-size: 0.9rem;
  color: #1E293B; line-height: 1.35; margin-bottom: 6px;
}
.card-desc {
  font-size: 0.78rem; color: #64748B;
  line-height: 1.55;
}

/* Actions */
.card-actions { padding: 8px 12px; }
.tts-btn { font-size: 0.75rem !important; text-transform: none !important; font-weight: 600 !important; }
</style>