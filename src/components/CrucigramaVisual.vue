<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  palabras: Array,        // definición de palabras con posición
  modelValue: Object,     // { 'r_c': letra }
  checked: Boolean,
  modColor: { default: '#7C3AED' },
})
const emit = defineEmits(['update:modelValue', 'complete'])

// ── Construir la cuadrícula ──────────────────────────────────────────────────
const gridData = computed(() => {
  let maxRow = 0, maxCol = 0
  for (const p of props.palabras) {
    if (p.dir === 'H') {
      maxRow = Math.max(maxRow, p.row)
      maxCol = Math.max(maxCol, p.col + p.respuesta.length - 1)
    } else {
      maxRow = Math.max(maxRow, p.row + p.respuesta.length - 1)
      maxCol = Math.max(maxCol, p.col)
    }
  }

  const grid = Array.from({ length: maxRow + 1 }, () =>
    Array.from({ length: maxCol + 1 }, () => ({
      active: false, letter: '', num: null,
    }))
  )

  for (const p of props.palabras) {
    for (let i = 0; i < p.respuesta.length; i++) {
      const r = p.dir === 'H' ? p.row : p.row + i
      const c = p.dir === 'H' ? p.col + i : p.col
      const cell = grid[r][c]
      cell.active = true
      cell.letter  = p.respuesta[i]
      if (i === 0 && cell.num === null) cell.num = p.num
    }
  }
  return { grid, rows: maxRow + 1, cols: maxCol + 1 }
})

const grid = computed(() => gridData.value.grid)
const cols  = computed(() => gridData.value.cols)

// ── Celdas planas (para verificación y autoavance) ───────────────────────────
const activeCells = computed(() => {
  const list = []
  for (let r = 0; r < grid.value.length; r++)
    for (let c = 0; c < grid.value[r].length; c++)
      if (grid.value[r][c].active) list.push({ r, c })
  return list
})

// ── Estado de las letras ──────────────────────────────────────────────────────
const cells = computed({
  get: () => props.modelValue || {},
  set: (v) => emit('update:modelValue', v),
})

const getCell  = (r, c) => (cells.value[`${r}_${c}`] || '')
const setCell  = (r, c, v) => {
  emit('update:modelValue', { ...cells.value, [`${r}_${c}`]: v })
}

// ── Colores de celda ─────────────────────────────────────────────────────────
const cellBg = (r, c, cell) => {
  if (!cell.active) return 'transparent'
  if (!props.checked) return '#FFFFFF'
  const input = (getCell(r, c) || '').toUpperCase()
  return input === cell.letter ? '#D1FAE5' : '#FEE2E2'
}
const cellBorder = (r, c, cell) => {
  if (!cell.active) return 'transparent'
  if (!props.checked) return '#333333'
  const input = (getCell(r, c) || '').toUpperCase()
  return input === cell.letter ? '#059669' : '#DC2626'
}

// ── Refs para autoavance ─────────────────────────────────────────────────────
const inputRefs = ref({})
const setRef = (r, c, el) => { if (el) inputRefs.value[`${r}_${c}`] = el }

const focusCell = (r, c) => {
  nextTick(() => {
    const el = inputRefs.value[`${r}_${c}`]
    if (el) el.focus()
  })
}

const onInput = (r, c, e) => {
  const raw = (e.target.value || '').replace(/[^A-Za-zÁÉÍÓÚáéíóú]/g,'')
  const letra = raw.slice(-1).toUpperCase()
  setCell(r, c, letra)
  e.target.value = letra

  if (letra) {
    // Avanzar a la siguiente celda activa
    const idx = activeCells.value.findIndex(x => x.r===r && x.c===c)
    const next = activeCells.value[idx + 1]
    if (next) focusCell(next.r, next.c)
  }

  // Emitir si todas llenas
  const allFilled = activeCells.value.every(({r,c}) => (cells.value[`${r}_${c}`]||'').trim())
  if (allFilled) emit('complete')
}

const onKeydown = (r, c, e) => {
  const key = e.key
  if (key === 'Backspace' && !getCell(r, c)) {
    const idx = activeCells.value.findIndex(x => x.r===r && x.c===c)
    const prev = activeCells.value[idx - 1]
    if (prev) { setCell(prev.r, prev.c, ''); focusCell(prev.r, prev.c) }
    return
  }
  if (key === 'ArrowRight') {
    const el = inputRefs.value[`${r}_${c+1}`]
    if (el) { e.preventDefault(); el.focus() }
  }
  if (key === 'ArrowLeft') {
    const el = inputRefs.value[`${r}_${c-1}`]
    if (el) { e.preventDefault(); el.focus() }
  }
  if (key === 'ArrowDown') {
    const el = inputRefs.value[`${r+1}_${c}`]
    if (el) { e.preventDefault(); el.focus() }
  }
  if (key === 'ArrowUp') {
    const el = inputRefs.value[`${r-1}_${c}`]
    if (el) { e.preventDefault(); el.focus() }
  }
}

// ── Pistas separadas ─────────────────────────────────────────────────────────
const pistasH = computed(() => props.palabras.filter(p => p.dir==='H').sort((a,b)=>a.num-b.num))
const pistasV = computed(() => props.palabras.filter(p => p.dir==='V').sort((a,b)=>a.num-b.num))
</script>

<template>
  <div class="cv-root">

    <!-- ── CUADRÍCULA ── -->
    <div class="cv-grid-wrap">
      <div class="cv-grid"
        :style="`grid-template-columns: repeat(${cols}, var(--cell));`">

        <template v-for="(row, ri) in grid" :key="ri">
          <div v-for="(cell, ci) in row" :key="ci"
            class="cv-cell"
            :style="`
              background: ${cellBg(ri,ci,cell)};
              border-color: ${cell.active ? cellBorder(ri,ci,cell) : 'transparent'};
            `"
            :class="{
              'cv-cell--active': cell.active,
              'cv-cell--void':  !cell.active,
            }"
          >
            <!-- Número -->
            <span v-if="cell.active && cell.num !== null" class="cv-num"
              :style="`color:${modColor};`">
              {{ cell.num }}
            </span>

            <!-- Input -->
            <input v-if="cell.active && !checked"
              :ref="(el) => setRef(ri, ci, el)"
              :value="getCell(ri, ci)"
              class="cv-input"
              maxlength="2"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              @input="onInput(ri, ci, $event)"
              @keydown="onKeydown(ri, ci, $event)"
              @focus="$event.target.select()"
            />

            <!-- Respuesta revelada -->
            <span v-else-if="cell.active && checked" class="cv-letter"
              :style="`color:${(getCell(ri,ci)||'').toUpperCase()===cell.letter?'#065F46':'#7F1D1D'};`">
              {{ cell.letter }}
            </span>
          </div>
        </template>

      </div>
    </div>

    <!-- ── PISTAS ── -->
    <div class="cv-clues">
      <div v-if="pistasH.length" class="cv-clues-col">
        <div class="cv-clues-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
            :style="`color:${modColor};`">
            <path d="M4 11h12.17l-5.58-5.59L12 4l8 8-8 8-1.41-1.42L16.17 13H4v-2z"/>
          </svg>
          Horizontal
        </div>
        <div v-for="p in pistasH" :key="p.num+'H'" class="cv-clue">
          <span class="cv-clue-n" :style="`background:${modColor}20;color:${modColor};`">
            {{ p.num }}
          </span>
          <span class="cv-clue-t">{{ p.pista }}</span>
          <span class="cv-clue-len">({{ p.respuesta.length }})</span>
        </div>
      </div>

      <div v-if="pistasV.length" class="cv-clues-col">
        <div class="cv-clues-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
            :style="`color:${modColor};`">
            <path d="M13 4v12.17l5.59-5.58L20 12l-8 8-8-8 1.41-1.41L11 16.17V4h2z"/>
          </svg>
          Vertical
        </div>
        <div v-for="p in pistasV" :key="p.num+'V'" class="cv-clue">
          <span class="cv-clue-n" :style="`background:${modColor}20;color:${modColor};`">
            {{ p.num }}
          </span>
          <span class="cv-clue-t">{{ p.pista }}</span>
          <span class="cv-clue-len">({{ p.respuesta.length }})</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Nunito:wght@600;700;800&display=swap');

.cv-root {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── GRID ── */
.cv-grid-wrap {
  overflow-x: auto;
  padding-bottom: 4px;
}

.cv-grid {
  --cell: 38px;
  display: inline-grid;
  gap: 3px;
  background: rgba(124,58,237,0.15);
  padding: 5px;
  border-radius: 10px;
  border: 1px solid rgba(124,58,237,0.3);
}

.cv-cell {
  width:  var(--cell);
  height: var(--cell);
  position: relative;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .2s, border-color .2s;
}

.cv-cell--active {
  border: 2px solid #333;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
}

.cv-cell--void {
  border: 2px solid transparent;
  pointer-events: none;
}

/* Número en esquina */
.cv-num {
  position: absolute;
  top:  2px;
  left: 3px;
  font-family: 'Poppins', sans-serif;
  font-size:  9px;
  font-weight: 800;
  line-height: 1;
  pointer-events: none;
  z-index: 2;
}

/* Input de letra */
.cv-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  font-size:  17px;
  font-weight: 800;
  color: #1A1040;
  padding: 0;
  padding-top: 6px; /* compensar número */
  cursor: text;
  -webkit-text-fill-color: #1A1040;
}

/* Letra revelada */
.cv-letter {
  font-family: 'Poppins', sans-serif;
  font-size:  17px;
  font-weight: 800;
  padding-top: 4px;
}

/* ── PISTAS ── */
.cv-clues {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.cv-clues-header {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: .65rem;
  font-weight: 800;
  color: #C4B5FD;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 8px;
}

.cv-clue {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  margin-bottom: 6px;
}

.cv-clue-n {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-size: .65rem;
  font-weight: 800;
  margin-top: 1px;
}

.cv-clue-t {
  font-size: .78rem;
  color: #C4B5FD;
  line-height: 1.45;
  flex: 1;
}

.cv-clue-len {
  flex-shrink: 0;
  font-size: .68rem;
  color: #8B7BAF;
  font-weight: 700;
  margin-top: 1px;
}

/* ── RESPONSIVE ── */
@media (max-width: 600px) {
  .cv-grid { --cell: 30px; gap: 2px; padding: 3px; }
  .cv-input  { font-size: 13px; }
  .cv-letter { font-size: 13px; }
  .cv-num    { font-size: 7px; }
  .cv-clues  { grid-template-columns: 1fr; }
  .cv-clue-t { font-size: .74rem; }
}

@media (max-width: 380px) {
  .cv-grid { --cell: 26px; }
  .cv-input { font-size: 12px; padding-top: 5px; }
}
</style>