import { createRouter, createWebHistory } from 'vue-router'
import Splash      from '../pages/splash.vue'
import Contenido   from '../pages/contenido.vue'
import Actividades from '../pages/actividades.vue'
import Simuladores from '../pages/simuladores.vue'
import Evaluacion  from '../pages/evaluacion.vue'
import Recursos    from '../pages/recursos.vue'
import Creditos    from '../pages/creditos.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',             component: Splash },
    { path: '/contenido',    component: Contenido },
    { path: '/actividades',  component: Actividades },
    { path: '/simuladores',  component: Simuladores },
    { path: '/evaluacion',   component: Evaluacion },
    { path: '/recursos',     component: Recursos },
    { path: '/creditos',     component: Creditos },
  ]
})