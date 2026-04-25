<template>
  <div class="min-h-screen flex flex-col md:flex-row overflow-hidden font-body-md bg-background text-on-background">
    <!-- TopNavBar (Mobile Only) -->
    <nav class="md:hidden w-full px-6 h-16 bg-black/80 backdrop-blur-md flex justify-between items-center border-b border-white/10 shadow-[0_0_15px_rgba(0,240,255,0.1)] z-50">
      <div class="text-xl font-bold tracking-tighter text-cyan-500 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] font-headline-md">MOMICHIS VAULT</div>
      <div class="flex gap-4 items-center">
        <span class="material-symbols-outlined text-cyan-400 hover:text-cyan-200 transition-colors">notifications_active</span>
        <span class="material-symbols-outlined text-cyan-400 hover:text-cyan-200 transition-colors">settings_input_component</span>
        <div class="w-8 h-8 rounded-full overflow-hidden border border-cyan-400/30">
          <img
            alt="Lead Architect Avatar"
            class="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH-_Coq7erulA6Lw_p7dw-5KluOcVifP3N056TXd-N6Kx7M3r79vk04LBoREy3MkYX9TZEyKYQuPQWJycC50it2BEAvWcqiYBF2-9o-JvKNjRK-1RW6HXMzTthEDvZT-OymzNsH1GjcJNp5iEGjqEYiGlcXzwWQ3JIydYEUl3oknpn8kaXmKQBiXYWuNGQyjPvUpz9scWo1qNBLR6japdKBx3mT4A5vZlbXW8HkZeNGYRSiRbLjAbZuoQgw4HxlHJT38JFNLFKQ90"
          />
        </div>
      </div>
    </nav>

    <!-- SideNavBar (Desktop) -->
    <aside class="hidden md:flex flex-col h-screen py-4 bg-slate-950/90 backdrop-blur-2xl fixed left-0 top-0 w-64 border-r border-white/10 shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-40">
      <div class="px-4 py-6">
        <div class="text-lg font-black text-cyan-400 font-headline-md neon-text">MOMICHIS VAULT</div>
        <div class="text-[10px] text-slate-500 font-mono-data tracking-widest mt-1">V.2.0.4_ACTIVO</div>
      </div>
      <div class="flex-1 overflow-y-auto mt-6">
        <nav class="flex flex-col gap-2 font-['Space_Grotesk'] font-medium text-[11px] tracking-widest uppercase">
          <a class="flex items-center gap-3 bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400 px-6 py-4 transition-all duration-150 active:scale-95" href="#">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">folder_open</span>
            Sistema_Archivos
          </a>
          <a class="flex items-center gap-3 text-slate-500 px-6 py-4 hover:text-slate-300 hover:bg-white/5 transition-all duration-150 active:scale-95" href="#">
            <span class="material-symbols-outlined">query_stats</span>
            Metricas_Almacenamiento
          </a>
          <a class="flex items-center gap-3 text-slate-500 px-6 py-4 hover:text-slate-300 hover:bg-white/5 transition-all duration-150 active:scale-95" href="#">
            <span class="material-symbols-outlined">shield_lock</span>
            Nodos_Seguridad
          </a>
          <a class="flex items-center gap-3 text-slate-500 px-6 py-4 hover:text-slate-300 hover:bg-white/5 transition-all duration-150 active:scale-95" href="#">
            <span class="material-symbols-outlined">terminal</span>
            Registros_Sistema
          </a>
        </nav>
      </div>
      <div class="mt-auto border-t border-white/5 pt-4">
        <nav class="flex flex-col gap-2 font-['Space_Grotesk'] font-medium text-[11px] tracking-widest uppercase">
          <a class="flex items-center gap-3 text-slate-500 px-6 py-4 hover:text-slate-300 hover:bg-white/5 transition-all duration-150 active:scale-95" href="#">
            <span class="material-symbols-outlined">sync_alt</span>
            Sincronizacion_Red
          </a>
          <a class="flex items-center gap-3 text-slate-500 px-6 py-4 hover:text-slate-300 hover:bg-white/5 transition-all duration-150 active:scale-95" href="#">
            <span class="material-symbols-outlined text-error">power_settings_new</span>
            <span class="text-error">Terminar_Sesion</span>
          </a>
        </nav>
      </div>
    </aside>

    <!-- Main Content Canvas -->
    <main class="flex-1 md:ml-64 p-6 md:p-gutter overflow-y-auto h-screen relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-container-high via-background to-background">
      <header class="hidden md:flex justify-between items-center mb-xl">
        <div>
          <h1 class="font-headline-xl text-primary font-bold tracking-tighter neon-text">NEXUS_GRID</h1>
          <p class="font-mono-data text-on-surface-variant text-sm mt-1">ZONA SEGURA DE ASIGNACION DE ARCHIVOS</p>
        </div>
        <div class="flex items-center gap-lg">
          <div class="relative group">
            <input class="bg-surface-container-low border-b border-outline-variant text-on-surface font-mono-data text-sm py-2 pl-8 pr-4 focus:outline-none focus:border-primary focus:shadow-[0_2px_10px_rgba(0,240,255,0.2)] transition-all placeholder:text-outline w-64 bg-transparent" placeholder="BUSCAR_ARCHIVOS..." type="text" />
            <span class="material-symbols-outlined absolute left-0 top-2.5 text-outline-variant group-focus-within:text-primary transition-colors text-sm">search</span>
          </div>
          <button class="bg-primary text-on-primary px-6 py-2 rounded-DEFAULT font-label-caps tracking-widest hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">upload</span>
            SUBIR
          </button>
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <section class="lg:col-span-4 glass-panel rounded-xl p-lg flex flex-col gap-md relative overflow-hidden">
          <div class="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          <h2 class="font-label-caps text-outline flex items-center gap-2 uppercase">
            <span class="material-symbols-outlined text-sm">hard_drive</span>
            Salud del Almacenamiento
          </h2>
          <div class="flex justify-center items-center py-4">
            <div class="relative w-40 h-40 flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path class="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="2"></path>
                <path class="text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="2"></path>
              </svg>
              <div class="absolute flex flex-col items-center">
                <span class="font-headline-lg text-primary font-bold neon-text">75%</span>
                <span class="font-mono-data text-[10px] text-on-surface-variant">ASIGNADO</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-auto">
            <div class="border border-outline-variant/30 rounded-lg p-3 bg-surface-container-low/50">
              <div class="font-mono-data text-[10px] text-outline mb-1">CAPACIDAD_TOTAL</div>
              <div class="font-headline-md text-on-surface">128.0 <span class="text-sm text-on-surface-variant">TB</span></div>
            </div>
            <div class="border border-outline-variant/30 rounded-lg p-3 bg-surface-container-low/50">
              <div class="font-mono-data text-[10px] text-outline mb-1">DISPONIBLE</div>
              <div class="font-headline-md text-primary neon-text">32.0 <span class="text-sm text-primary/50">TB</span></div>
            </div>
          </div>
        </section>

        <section class="lg:col-span-8 glass-panel rounded-xl p-lg flex flex-col gap-md relative">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-label-caps text-outline flex items-center gap-2 uppercase">
              <span class="material-symbols-outlined text-sm">grid_view</span>
              Directorio Activo
            </h2>
            <div class="flex gap-2">
              <button class="text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined text-sm">filter_list</span></button>
              <button class="text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined text-sm">sort</span></button>
            </div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            <div class="group border border-outline-variant/50 rounded-lg p-4 bg-surface-container-low/30 hover:bg-surface-container-high/50 hover:border-primary/50 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center gap-3 h-32">
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span class="material-symbols-outlined text-4xl text-primary/70 group-hover:text-primary group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-300" style="font-variation-settings: 'FILL' 1;">description</span>
              <div>
                <div class="font-body-sm text-on-surface truncate w-full px-2">quantum_schematics.pdf</div>
                <div class="font-mono-data text-[10px] text-on-surface-variant mt-1">2.4 GB • cifrado</div>
              </div>
            </div>
            <div class="group border border-outline-variant/50 rounded-lg p-4 bg-surface-container-low/30 hover:bg-surface-container-high/50 hover:border-primary/50 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center gap-3 h-32">
              <div class="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span class="material-symbols-outlined text-4xl text-secondary/70 group-hover:text-secondary group-hover:drop-shadow-[0_0_10px_rgba(235,178,255,0.8)] transition-all duration-300" style="font-variation-settings: 'FILL' 1;">image</span>
              <div>
                <div class="font-body-sm text-on-surface truncate w-full px-2">neural_net_vis.png</div>
                <div class="font-mono-data text-[10px] text-on-surface-variant mt-1">840 MB • bruto</div>
              </div>
            </div>
            <div class="group border border-outline-variant/50 rounded-lg p-4 bg-surface-container-low/30 hover:bg-surface-container-high/50 hover:border-primary/50 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center gap-3 h-32">
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span class="material-symbols-outlined text-4xl text-primary/70 group-hover:text-primary group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-300" style="font-variation-settings: 'FILL' 1;">folder</span>
              <div>
                <div class="font-body-sm text-on-surface truncate w-full px-2">core_archives_2042</div>
                <div class="font-mono-data text-[10px] text-on-surface-variant mt-1">12 elementos • boveda</div>
              </div>
            </div>
            <div class="group border border-outline-variant/50 rounded-lg p-4 bg-surface-container-low/30 hover:bg-surface-container-high/50 hover:border-primary/50 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center gap-3 h-32">
              <div class="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span class="material-symbols-outlined text-4xl text-tertiary/70 group-hover:text-tertiary group-hover:drop-shadow-[0_0_10px_rgba(228,226,228,0.8)] transition-all duration-300" style="font-variation-settings: 'FILL' 1;">movie</span>
              <div>
                <div class="font-body-sm text-on-surface truncate w-full px-2">drone_feed_alpha.mp4</div>
                <div class="font-mono-data text-[10px] text-on-surface-variant mt-1">14.2 GB • flujo</div>
              </div>
            </div>
          </div>
          <div class="mt-auto flex justify-center pt-4">
            <div class="flex gap-2 items-center">
              <div class="w-2 h-2 rounded-full bg-primary cyan-glow-hover"></div>
              <div class="w-2 h-2 rounded-full bg-surface-variant"></div>
              <div class="w-2 h-2 rounded-full bg-surface-variant"></div>
            </div>
          </div>
        </section>

        <section class="lg:col-span-12 glass-panel rounded-xl p-lg flex flex-col gap-md">
          <h2 class="font-label-caps text-outline flex items-center gap-2 uppercase border-b border-outline-variant/30 pb-3">
            <span class="material-symbols-outlined text-sm">history</span>
            Eventos_del_Sistema
          </h2>
          <div class="flex flex-col gap-1 mt-2">
            <div class="flex items-center gap-4 py-2 hover:bg-surface-container/50 px-2 rounded transition-colors group">
              <div class="font-mono-data text-xs text-primary w-24">[14:32:05]</div>
              <div class="font-mono-data text-xs text-secondary w-20">SYNC_OK</div>
              <div class="font-mono-data text-xs text-on-surface flex-1 truncate">Cluster alpha sincronizo 4.2TB de datos correctamente.</div>
              <div class="material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors cursor-pointer">more_horiz</div>
            </div>
            <div class="flex items-center gap-4 py-2 hover:bg-surface-container/50 px-2 rounded transition-colors group">
              <div class="font-mono-data text-xs text-primary w-24">[14:28:11]</div>
              <div class="font-mono-data text-xs text-error w-20">AUTH_WARN</div>
              <div class="font-mono-data text-xs text-on-surface flex-1 truncate">Varios intentos fallidos de descifrado en /vault/schematics.</div>
              <div class="material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors cursor-pointer">more_horiz</div>
            </div>
            <div class="flex items-center gap-4 py-2 hover:bg-surface-container/50 px-2 rounded transition-colors group">
              <div class="font-mono-data text-xs text-primary w-24">[14:15:00]</div>
              <div class="font-mono-data text-xs text-outline w-20">UPLOAD</div>
              <div class="font-mono-data text-xs text-on-surface flex-1 truncate">El usuario Administrador subio drone_feed_alpha.mp4.</div>
              <div class="material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors cursor-pointer">more_horiz</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
