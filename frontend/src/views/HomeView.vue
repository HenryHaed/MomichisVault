<script setup>
import Typewriter from '@/components/Typewriter.vue'
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
        <a class="flex items-center gap-3 text-cyan-400 border-r-2 border-cyan-400 px-6 py-4 font-['Space_Grotesk'] uppercase text-[12px] font-bold hover:bg-white/5 transition-colors ease-linear duration-150" href="#">
          <span class="material-symbols-outlined">grid_view</span>
          Panel de Control
        </a>
        <a class="flex items-center gap-3 text-slate-500 hover:text-slate-200 px-6 py-4 font-['Space_Grotesk'] uppercase text-[12px] font-bold hover:bg-white/5 transition-colors ease-linear duration-150" href="#">
          <span class="material-symbols-outlined">cloud_queue</span>
          Almacenamiento
        </a>
        <a class="flex items-center gap-3 text-slate-500 hover:text-slate-200 px-6 py-4 font-['Space_Grotesk'] uppercase text-[12px] font-bold hover:bg-white/5 transition-colors ease-linear duration-150" href="#">
          <span class="material-symbols-outlined">enhanced_encryption</span>
          Bóveda Cifrada
        </a>
        <a class="flex items-center gap-3 text-slate-500 hover:text-slate-200 px-6 py-4 font-['Space_Grotesk'] uppercase text-[12px] font-bold hover:bg-white/5 transition-colors ease-linear duration-150" href="#">
          <span class="material-symbols-outlined">analytics</span>
          Tráfico de Red
        </a>
        <a class="flex items-center gap-3 text-slate-500 hover:text-slate-200 px-6 py-4 font-['Space_Grotesk'] uppercase text-[12px] font-bold hover:bg-white/5 transition-colors ease-linear duration-150" href="#">
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
    <main class="flex-1 md:ml-64 pt-20 md:pt-0 min-h-screen flex flex-col relative">
      <!-- Background Decorative Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-primary-container/5 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-secondary-container/5 blur-[120px] rounded-full"></div>
        <div class="absolute top-1/4 right-1/4 w-32 h-32 border border-primary-container/10 rounded-full animate-[spin_10s_linear_infinite] border-dashed"></div>
      </div>
      <div class="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-margin max-w-[1440px] mx-auto w-full py-xxl gap-xxl">
        <!-- Hero Section -->
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-xxl mt-10 md:mt-20 items-center">
          <div class="flex flex-col gap-margin text-left items-start">
          <div class="inline-flex items-center gap-sm px-4 py-1.5 rounded-full border border-primary-container/30 bg-primary-container/5 mb-4">
            <span class="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
            <span class="font-mono-data text-mono-data text-primary-container"><Typewriter text="SISTEMA.EN_LÍNEA // PROTOCOLO_4.4" :speed="60" /></span>
          </div>
          <h1 class="font-headline-xl text-headline-xl text-on-background max-w-none tracking-tight leading-tight">
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
          <div class="glass-panel p-lg rounded-xl flex flex-col gap-md relative overflow-hidden">
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
