<script setup>
import { ref } from 'vue'
import Typewriter from '@/components/Typewriter.vue'

const activeSection = ref('home')
</script>

<template>
  <div class="antialiased min-h-screen flex bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden w-full">
    <!-- TopNavBar (Mobile Only) -->
    <nav class="md:hidden bg-slate-950/40 backdrop-blur-xl docked full-width top-0 z-50 shadow-[0_0_20px_rgba(0,240,255,0.05)] border-b border-white/10 flex justify-between items-center w-full px-8 py-4 fixed">
      <div class="text-2xl font-black text-cyan-400 tracking-widest uppercase font-['Space_Grotesk'] tracking-tight">MOMICHIS VAULT</div>
      <div class="flex items-center gap-md">
        <span class="material-symbols-outlined text-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all scale-98 active:opacity-80 duration-150 cursor-pointer">notifications</span>
        <span class="material-symbols-outlined text-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all scale-98 active:opacity-80 duration-150 cursor-pointer">settings</span>
      </div>
    </nav>
    <!-- SideNavBar (Web Only) -->
    <nav class="hidden md:flex flex-col h-screen bg-slate-950/80 backdrop-blur-2xl fixed left-0 top-0 w-64 border-r border-white/10 shadow-[5px_0_30px_rgba(0,0,0,0.5)] z-40 overflow-hidden">
      <div class="px-6 py-8 border-b border-white/10">
        <div class="flex items-center gap-sm mb-2">
          <div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center border border-primary-container/50">
            <span class="material-symbols-outlined text-cyan-400 text-sm">shield</span>
          </div>
          <div class="flex flex-col leading-tight">
            <div class="text-cyan-400 font-black tracking-tighter font-['Space_Grotesk'] uppercase text-[12px] font-bold">MOMICHIS VAULT</div>
            <div class="text-slate-400 font-['Space_Grotesk'] uppercase text-[10px] font-semibold">SISTEMA_SEGURO</div>
          </div>
        </div>
        <div class="text-slate-500 font-label-caps text-label-caps ml-10">V.2.0.4 ACTIVO</div>
      </div>
      <div class="flex-1 overflow-hidden py-6 flex flex-col gap-sm">
        <a @click.prevent="activeSection = 'home'" :class="activeSection === 'home' ? 'text-cyan-400 border-r-2 border-cyan-400 bg-white/5' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'" class="flex items-center gap-3 px-6 py-4 font-['Space_Grotesk'] uppercase text-[12px] font-bold transition-colors ease-linear duration-150 cursor-pointer">
          <span class="material-symbols-outlined">grid_view</span>
          Panel de Control
        </a>
        <a @click.prevent="activeSection = 'almacenamiento'" :class="activeSection === 'almacenamiento' ? 'text-cyan-400 border-r-2 border-cyan-400 bg-white/5' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'" class="flex items-center gap-3 px-6 py-4 font-['Space_Grotesk'] uppercase text-[12px] font-bold transition-colors ease-linear duration-150 cursor-pointer">
          <span class="material-symbols-outlined">cloud_queue</span>
          Almacenamiento
        </a>
        <a @click.prevent="activeSection = 'boveda'" :class="activeSection === 'boveda' ? 'text-cyan-400 border-r-2 border-cyan-400 bg-white/5' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'" class="flex items-center gap-3 px-6 py-4 font-['Space_Grotesk'] uppercase text-[12px] font-bold transition-colors ease-linear duration-150 cursor-pointer">
          <span class="material-symbols-outlined">enhanced_encryption</span>
          Bóveda Cifrada
        </a>
        <a @click.prevent="activeSection = 'trafico'" :class="activeSection === 'trafico' ? 'text-cyan-400 border-r-2 border-cyan-400 bg-white/5' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'" class="flex items-center gap-3 px-6 py-4 font-['Space_Grotesk'] uppercase text-[12px] font-bold transition-colors ease-linear duration-150 cursor-pointer">
          <span class="material-symbols-outlined">analytics</span>
          Tráfico de Red
        </a>
        <a @click.prevent="activeSection = 'registros'" :class="activeSection === 'registros' ? 'text-cyan-400 border-r-2 border-cyan-400 bg-white/5' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'" class="flex items-center gap-3 px-6 py-4 font-['Space_Grotesk'] uppercase text-[12px] font-bold transition-colors ease-linear duration-150 cursor-pointer">
          <span class="material-symbols-outlined">terminal</span>
          Registros del Sistema
        </a>
      </div>
      <div class="mt-auto border-t border-white/10 p-6">
        <button class="w-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/50 py-2 rounded-DEFAULT font-label-caps text-label-caps hover:bg-cyan-400/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all ease-linear duration-150 mb-6">Mejorar Almacenamiento</button>
        <div class="flex flex-col gap-xs">
          <a class="flex items-center gap-3 text-slate-500 hover:text-slate-200 px-2 py-2 font-['Space_Grotesk'] uppercase text-[12px] font-bold hover:bg-white/5 transition-colors ease-linear duration-150 rounded-DEFAULT" href="#">
            <span class="material-symbols-outlined text-sm">shield</span>
            Configuración de Seguridad
          </a>
          <a class="flex items-center gap-3 text-slate-500 hover:text-slate-200 px-2 py-2 font-['Space_Grotesk'] uppercase text-[12px] font-bold hover:bg-white/5 transition-colors ease-linear duration-150 rounded-DEFAULT" href="#">
            <span class="material-symbols-outlined text-sm">logout</span>
            Cerrar Sesión
          </a>
        </div>
      </div>
    </nav>
    <!-- Main Content Canvas -->
    <main class="flex-1 md:ml-64 pt-20 md:pt-0 min-h-screen flex flex-col relative w-full">
      <!-- Background Decorative Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-primary-container/5 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-secondary-container/5 blur-[120px] rounded-full"></div>
        <div class="absolute top-1/4 right-1/4 w-32 h-32 border border-primary-container/10 rounded-full animate-[spin_10s_linear_infinite] border-dashed"></div>
      </div>
      <!-- Main Context -->
      <div class="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-margin max-w-[1440px] mx-auto w-full py-xxl gap-xxl w-full">
        <!-- Panel de Control (Inicio) -->
        <div v-show="activeSection === 'home'" class="w-full flex flex-col gap-xxl slide-in-top">
          <!-- Hero Section -->
          <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-xxl mt-10 md:mt-20 items-center">
            <div class="flex flex-col gap-margin text-left items-start">
            <div class="inline-flex items-center gap-sm px-4 py-1.5 rounded-full border border-primary-container/30 bg-primary-container/5 mb-4">
              <span class="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
              <span class="font-mono-data text-mono-data text-primary-container"><Typewriter text="SISTEMA.EN_LÍNEA // PROTOCOLO_4.4" :speed="60" /></span>
            </div>
            <h1 class="font-headline-xl text-4xl md:text-5xl lg:text-6xl text-on-background max-w-none tracking-tight leading-tight">
              Seguridad Absoluta.<br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container neon-text">Rendimiento Cuántico.</span>
            </h1>
            <p class="font-body-lg text-body-lg text-on-surface-variant max-w-none">
              <Typewriter text="Despliega tu infraestructura crítica en un entorno en la nube descentralizado y de conocimiento cero, diseñado para un rendimiento de alta velocidad y una integridad de datos inquebrantable." :speed="15" :delay="600" />
            </p>
            <div class="flex flex-col sm:flex-row items-start gap-md mt-6">
              <button @click="$router.push('/login')" class="bg-primary-container text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-DEFAULT flex items-center gap-sm cyan-glow-hover transition-all duration-150">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">login</span>
                Iniciar Sesión
              </button>
              <button class="bg-transparent text-primary-container border border-primary-container px-8 py-4 rounded-DEFAULT font-label-caps text-label-caps flex items-center gap-sm hover:bg-primary-container/10 transition-all duration-150">
                <span class="material-symbols-outlined">terminal</span>
                DOCUMENTACIÓN API
              </button>
            </div>
            </div>
            <div class="glass-panel p-lg rounded-xl flex flex-col gap-md relative overflow-hidden self-start w-full">
              <div class="flex justify-between items-center mb-4 z-10">
                <span class="font-label-caps text-label-caps text-on-surface-variant">ESTADO DEL SISTEMA</span>
                <span class="flex items-center gap-1 font-mono-data text-mono-data text-primary-container"><span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span> <Typewriter text="ÓPTIMO" :delay="1200" :speed="80" /></span>
              </div>
              <div class="flex flex-col gap-4 z-10">
                <div>
                  <div class="flex justify-between font-mono-data text-mono-data text-on-background mb-1"><span>RENDIMIENTO</span> <span>1.2 TB/s</span></div>
                  <div class="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div class="h-full bg-primary-container w-[85%] shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between font-mono-data text-mono-data text-on-background mb-1"><span>CIFRADO</span> <span>AES-256</span></div>
                  <div class="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div class="h-full bg-secondary-container w-[100%] shadow-[0_0_10px_rgba(182,0,248,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Bento Grid Features -->
          <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-lg mt-xxl">
            <div class="glass-panel p-lg rounded-xl flex flex-col gap-md relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 blur-[40px] group-hover:bg-primary-container/20 transition-all duration-500 rounded-full"></div>
              <div class="w-12 h-12 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-center z-10">
                <span class="material-symbols-outlined text-primary-container">enhanced_encryption</span>
              </div>
              <div class="z-10">
                <h3 class="font-headline-md text-headline-md text-on-background mb-2">Conocimiento Cero</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Los protocolos criptográficos de extremo a extremo aseguran que tus datos permanezcan impenetrables. Las claves se generan en el lado del cliente, haciendo que las brechas del lado del servidor sean matemáticamente imposibles.</p>
              </div>
            </div>
            <div class="glass-panel p-lg rounded-xl flex flex-col gap-md relative overflow-hidden group md:col-span-2">
              <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" data-alt="close up of fiber optic cables glowing bright cyan in a dark server room setting"></div>
              <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-surface to-transparent z-0"></div>
              <div class="w-12 h-12 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-center z-10">
                <span class="material-symbols-outlined text-secondary">bolt</span>
              </div>
              <div class="z-10 mt-auto pt-10 w-full">
                <h3 class="font-headline-md text-headline-md text-on-background mb-2">Enrutamiento Ultrarrápido</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Los algoritmos de enrutamiento patentados optimizan las rutas de datos globalmente, reduciendo la latencia a casi cero para flujos ininterrumpidos y de alta velocidad.</p>
              </div>
            </div>
            <div class="glass-panel p-lg rounded-xl flex flex-col gap-md relative overflow-hidden group md:col-span-2">
              <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20" data-alt="satellite view of earth at night showing glowing city lights over north america in cool blue tones"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent z-0"></div>
              <div class="w-12 h-12 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-center z-10">
                <span class="material-symbols-outlined text-primary-container">language</span>
              </div>
              <div class="z-10 w-full">
                <h3 class="font-headline-md text-headline-md text-on-background mb-2">Acceso Global a Nodos</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Distribuido a lo largo de más de 400 ubicaciones perimetrales. Tu bóveda se replica de manera perfecta para garantizar un 99.999% de tiempo de actividad ante cualquier eventualidad.</p>
              </div>
            </div>
            <div class="glass-panel p-lg rounded-xl flex flex-col gap-md relative overflow-hidden">
              <div class="flex justify-between items-center mb-4 z-10">
                <span class="font-label-caps text-label-caps text-on-surface-variant">ESTADO DE LA RED</span>
                <span class="flex items-center gap-1 font-mono-data text-mono-data text-primary-container"><span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span> <Typewriter text="ÓPTIMO" :delay="2000" :speed="80" /></span>
              </div>
              <div class="flex flex-col gap-4 z-10">
                <div>
                  <div class="flex justify-between font-mono-data text-mono-data text-on-background mb-1"><span>RENDIMIENTO</span> <span>1.2 TB/s</span></div>
                  <div class="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div class="h-full bg-primary-container w-[85%] shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between font-mono-data text-mono-data text-on-background mb-1"><span>CIFRADO</span> <span>AES-256</span></div>
                  <div class="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div class="h-full bg-secondary-container w-[100%] shadow-[0_0_10px_rgba(182,0,248,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pantallas Falsas (Inyectadas) -->
        <div v-show="activeSection === 'almacenamiento'" class="w-full slide-in-top flex items-center justify-center mt-20">
          <div class="glass-panel p-8 rounded-xl border border-primary/20 shadow-[0_0_30px_rgba(0,240,255,0.05)] relative overflow-hidden w-full max-w-4xl">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            <div class="flex items-center gap-2 border-b border-outline-variant/30 pb-4 mb-6">
               <span class="material-symbols-outlined text-primary text-2xl animate-[spin_10s_linear_infinite]">mediation</span>
               <div>
                  <h2 class="font-label-caps text-outline uppercase tracking-widest text-lg">Gobernanza de Almacenamiento</h2>
                  <p class="text-xs font-mono-data text-primary uppercase">COMPLIANCE: ISO/IEC 38500</p>
               </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div class="flex flex-col gap-3">
                  <div class="flex justify-between text-xs font-mono-data text-outline"><span>Auditoría Interna</span> <span class="text-primary text-green-400">PASSED</span></div>
                  <div class="h-2 bg-black/50 rounded overflow-hidden"><div class="h-full bg-green-500 w-full shadow-[0_0_10px_rgba(0,255,0,0.5)]"></div></div>
                  <p class="text-xs text-slate-400 mt-2">Cumplimiento del marco de gobierno corporativo de TI. Distribución y evaluación de políticas de datos.</p>
               </div>
               <div class="flex flex-col gap-3 border-l border-white/10 pl-6">
                  <div class="flex justify-between text-xs font-mono-data text-outline"><span>Integridad del Cluster</span> <span class="text-secondary animate-pulse text-[#b600f8]">EVALUANDO...</span></div>
                  <div class="h-2 bg-black/50 rounded overflow-hidden relative">
                     <div class="absolute top-0 bottom-0 left-0 bg-[#b600f8]/80 animate-[ping_2s_ease-in-out_infinite] w-3/4"></div>
                     <div class="h-full bg-[#b600f8] w-3/4 shadow-[0_0_10px_rgba(182,0,248,0.5)]"></div>
                  </div>
                  <p class="text-xs text-slate-400 mt-2">Distribución de carga (Directiva 38500-2). Asegurando disponibilidad continua.</p>
               </div>
               <div class="flex flex-col gap-3 border-l border-white/10 pl-6">
                  <div class="flex justify-between text-xs font-mono-data text-outline"><span>Ciclo de Vida (Datos)</span> <span class="text-cyan-400">ACTIVO</span></div>
                  <div class="flex items-center gap-1 mt-2">
                     <div class="h-4 w-4 rounded-full border border-cyan-400 flex items-center justify-center animate-pulse"><div class="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(0,240,255,0.8)]"></div></div>
                     <div class="h-[1px] flex-1 bg-cyan-400/30"></div>
                     <div class="h-4 w-4 rounded-full border border-cyan-400 flex items-center justify-center animate-pulse" style="animation-delay: 0.5s"><div class="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(0,240,255,0.8)]"></div></div>
                     <div class="h-[1px] flex-1 bg-cyan-400/30"></div>
                     <div class="h-4 w-4 rounded-full border border-cyan-400 flex items-center justify-center animate-pulse" style="animation-delay: 1s"><div class="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(0,240,255,0.8)]"></div></div>
                  </div>
                  <p class="text-xs text-slate-400 mt-[5px]">Gestión del riesgo en destrucción/retención.</p>
               </div>
            </div>
          </div>
        </div>

        <div v-show="activeSection === 'boveda'" class="w-full slide-in-top flex items-center justify-center mt-20">
         <div class="glass-panel p-8 rounded-xl border border-[#d14d72]/20 shadow-[0_0_30px_rgba(209,77,114,0.05)] relative overflow-hidden flex flex-col md:flex-row gap-8 items-center w-full max-w-4xl">
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMxMTIiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20 pointer-events-none"></div>
            <div class="flex-shrink-0 relative">
               <span class="material-symbols-outlined text-[#d14d72] text-8xl animate-[pulse_3s_ease-in-out_infinite] drop-shadow-[0_0_15px_rgba(209,77,114,0.6)]" style="font-variation-settings: 'FILL' 1;">enhanced_encryption</span>
               <div class="absolute inset-0 border-4 border-[#d14d72] rounded-full border-t-transparent animate-spin opacity-50"></div>
            </div>
            <div class="flex-1 z-10 w-full">
               <div class="flex items-center gap-2 mb-2">
                 <h2 class="font-headline-md text-[#d14d72] tracking-widest uppercase font-bold text-2xl">Bóveda Cifrada de Acceso</h2>
                 <span class="px-2 py-0.5 bg-[#d14d72]/20 text-[#d14d72] text-[10px] font-mono-data rounded border border-[#d14d72]/50">PROTECTED</span>
               </div>
               <p class="text-xs font-mono-data text-outline mb-4 text-[#d14d72]/70 uppercase">COMPLIANCE: ISO/IEC 27001 (SGSI)</p>
               <p class="font-body-md text-slate-300 text-sm mb-6 leading-relaxed">
                 Todos los vectores de entrada están siendo encriptados bajo AES-256 en reposo. Los canales de autenticación del Nexus Grid operan bajo validación de tokens de corta vida con rotación automática mediante los lineamientos de controles de acceso.
               </p>
               <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="bg-black/40 border border-[#d14d72]/20 p-3 rounded text-center">
                     <span class="text-[10px] font-label-caps text-slate-500 block mb-1">LLAVES ROTADAS</span>
                     <span class="font-mono-data text-[#d14d72] text-lg font-bold">45,912</span>
                  </div>
                  <div class="bg-black/40 border border-[#d14d72]/20 p-3 rounded text-center">
                     <span class="text-[10px] font-label-caps text-slate-500 block mb-1">INTENTOS BLOQUEADOS</span>
                     <span class="font-mono-data text-red-500 text-lg font-bold animate-pulse">1,204</span>
                  </div>
                  <div class="bg-black/40 border border-[#d14d72]/20 p-3 rounded text-center">
                     <span class="text-[10px] font-label-caps text-slate-500 block mb-1">INTEGRIDAD HASH</span>
                     <span class="font-mono-data text-green-400 text-lg font-bold">SHA-3 OK</span>
                  </div>
               </div>
            </div>
         </div>
        </div>

        <div v-show="activeSection === 'trafico'" class="w-full slide-in-top flex items-center justify-center mt-20">
            <div class="glass-panel p-8 rounded-xl border border-cyan-400/20 shadow-[0_0_30px_rgba(0,240,255,0.05)] relative overflow-hidden flex flex-col gap-6 w-full max-w-4xl">
               <div class="flex items-center gap-2 border-b border-white/10 pb-4">
                 <span class="material-symbols-outlined text-[#b600f8] animate-pulse text-3xl">radar</span>
                 <div>
                    <h2 class="font-label-caps text-outline uppercase tracking-widest text-[#b600f8] text-xl font-bold">Monitoreo de Tráfico Activo</h2>
                    <p class="text-[10px] font-mono-data text-cyan-400 uppercase mt-1">COMPLIANCE: ISO/IEC 27036 (Seg. en Relaciones con Proveedores)</p>
                 </div>
               </div>
               
               <div class="h-64 w-full bg-black/40 rounded-lg border border-white/5 relative overflow-hidden flex items-end px-2 pt-2 gap-1" >
                 <div v-for="i in 40" :key="i" 
                      class="flex-1 bg-cyan-400/40 rounded-t transition-all duration-1000 origin-bottom"
                      :style="{ height: Math.floor(Math.random() * 80 + 10) + '%', opacity: Math.random() * 0.5 + 0.5, boxShadow: '0 0 10px rgba(0,240,255,0.2)' }"
                 ></div>
                 <div class="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent pointer-events-none"></div>
                 <div class="absolute w-full h-[1px] bg-cyan-400/50 top-1/2 left-0 shadow-[0_0_10px_rgba(0,240,255,0.8)]"></div>
                 
                 <div class="absolute top-4 right-4 bg-black/80 border border-cyan-400/30 p-2 rounded flex items-center gap-2 text-xs font-mono-data text-cyan-400">
                    <div class="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div> DROPBOX API v2 CONN (SECURE)
                 </div>
               </div>

               <div class="flex justify-between items-center mt-2 px-4 py-3 bg-black/30 rounded-lg border border-white/5 text-sm font-mono-data text-outline">
                 <span>TX: <span class="text-cyan-400 font-bold">452.1 MB/s</span></span>
                 <span>RX: <span class="text-[#b600f8] font-bold">102.4 MB/s</span></span>
                 <span class="text-red-500 animate-pulse font-bold flex items-center gap-2"><span class="material-symbols-outlined text-sm">wifi_tethering</span> PING: 14ms</span>
               </div>
            </div>
        </div>

        <div v-show="activeSection === 'registros'" class="w-full slide-in-top flex items-center justify-center mt-20">
            <div class="glass-panel p-8 rounded-xl border border-[#ffa07a]/20 shadow-[0_0_30px_rgba(255,160,122,0.05)] w-full max-w-4xl flex flex-col gap-6">
               <div class="flex items-center gap-3 border-b border-white/10 pb-4">
                 <span class="material-symbols-outlined text-[#ffa07a] text-3xl">summarize</span>
                 <div>
                  <h2 class="font-label-caps text-[#ffa07a] uppercase tracking-widest font-bold text-xl">Reportes de Auditoría Forense</h2>
                  <p class="text-[10px] font-mono-data text-slate-400 mt-1 uppercase">SISTEMA DE LOGS EN LÍNEA (RFC 5424)</p>
                 </div>
               </div>

               <p class="font-body-md text-slate-300 text-sm leading-relaxed max-w-2xl">
                 Genera un reporte detallado con toda la actividad de subida, tamaño de origen y fecha exacta en la base de datos de auditoría. Cumple los estándares exigidos para el trazado forense perimetral y cadena de custodia.
               </p>

               <div class="mt-4 flex flex-col gap-4 items-start bg-black/30 p-6 rounded-lg border border-white/5">
                  <div class="flex items-center gap-2 text-sm text-green-400 font-mono-data mb-2">
                    <span class="material-symbols-outlined text-lg">check_circle</span>
                    INTEGRIDAD DE BASE DE DATOS VERIFICADA
                  </div>
                  <button class="bg-[#ffa07a] text-black px-6 py-4 rounded-DEFAULT font-label-caps tracking-widest font-bold hover:shadow-[0_0_20px_rgba(255,160,122,0.6)] transition-all flex items-center gap-3 hover:-translate-y-1">
                    <span class="material-symbols-outlined">picture_as_pdf</span>
                    DESCARGAR PDF FORENSE
                  </button>
               </div>
            </div>
        </div>
      </div>
      <!-- Footer -->
      <footer class="w-full bg-slate-950 py-6 mt-auto border-t border-white/5 flex flex-col md:flex-row justify-between items-center px-12 opacity-60 z-10 relative">
        <div class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-cyan-400 mb-4 md:mb-0">
          © 2024 SISTEMA MOMICHIS VAULT • PROTOCOLO_4.4
        </div>
        <div class="flex gap-6">
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-slate-600 hover:text-cyan-300 duration-200" href="#">Manifiesto de Seguridad</a>
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-slate-600 hover:text-cyan-300 duration-200" href="#">Documentación API</a>
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-slate-600 hover:text-cyan-300 duration-200" href="#">Integridad de Datos</a>
          <a class="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-slate-600 hover:text-cyan-300 duration-200" href="#">Estado</a>
        </div>
      </footer>
    </main>
  </div>
</template>
