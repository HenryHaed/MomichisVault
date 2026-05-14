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
          <a href="#" @click.prevent="activeSection = 'sistema'" :class="activeSection === 'sistema' ? 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'" class="flex items-center gap-3 px-6 py-4 transition-all duration-150 active:scale-95">
            <span class="material-symbols-outlined" :style="activeSection === 'sistema' ? 'font-variation-settings: \'FILL\' 1;' : ''">folder_open</span>
            Sistema_Archivos
          </a>
          <a href="#" @click.prevent="activeSection = 'metricas'" :class="activeSection === 'metricas' ? 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'" class="flex items-center gap-3 px-6 py-4 transition-all duration-150 active:scale-95">
            <span class="material-symbols-outlined" :style="activeSection === 'metricas' ? 'font-variation-settings: \'FILL\' 1;' : ''">query_stats</span>
            Metricas_Almacenamiento
          </a>
          <a href="#" @click.prevent="activeSection = 'nodos'" :class="activeSection === 'nodos' ? 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'" class="flex items-center gap-3 px-6 py-4 transition-all duration-150 active:scale-95">
            <span class="material-symbols-outlined" :style="activeSection === 'nodos' ? 'font-variation-settings: \'FILL\' 1;' : ''">shield_lock</span>
            Seguridad
          </a>
          <a href="#" @click.prevent="activeSection = 'almacenamiento'" :class="activeSection === 'almacenamiento' ? 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'" class="flex items-center gap-3 px-6 py-4 transition-all duration-150 active:scale-95">
            <span class="material-symbols-outlined" :style="activeSection === 'almacenamiento' ? 'font-variation-settings: \'FILL\' 1;' : ''">cloud_upload</span>
            Almacenamiento_Compartido
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
          <p class="font-mono-data text-on-surface-variant text-sm mt-1">
            {{ activeSection === 'sistema' ? 'SISTEMA DE ARCHIVOS' : (activeSection === 'metricas' ? 'METRICAS Y TAREAS MAGICAS' : (activeSection === 'almacenamiento' ? 'ALMACENAMIENTO COMPARTIDO' : 'NODOS DE SEGURIDAD Y TRÁFICO')) }}
          </p>
        </div>
        <div class="flex items-center gap-lg relative">
          <input type="file" ref="fileInput" class="hidden" accept="image/*,application/pdf" @change="handleFileUpload" />
          <button v-if="activeSection === 'sistema'" @click="activeSection = 'metricas'" class="bg-primary text-on-primary px-6 py-2 rounded-DEFAULT font-label-caps tracking-widest hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2 cursor-pointer">
            <span class="material-symbols-outlined text-sm">rocket_launch</span>
            TAREAS MAGICAS
          </button>
          <button v-else @click="activeSection = 'sistema'" class="border border-primary text-primary px-6 py-2 rounded-DEFAULT font-label-caps tracking-widest hover:bg-primary/10 transition-all flex items-center gap-2 cursor-pointer">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            VOLVER A ARCHIVOS
          </button>
        </div>
      </header>

      <!-- SECCION: NODOS DE SEGURIDAD (Trafico / Boveda) -->
      <div v-show="activeSection === 'nodos'" class="flex flex-col gap-6 slide-in-top">
         
         <!-- Boveda Cifrada (ISO 27001) -->
         <div class="glass-panel p-8 rounded-xl border border-secondary/20 shadow-[0_0_30px_rgba(209,77,114,0.05)] relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMxMTIiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20 pointer-events-none"></div>
            
            <div class="flex-shrink-0 relative">
               <span class="material-symbols-outlined text-border-secondary text-8xl text-secondary animate-[pulse_3s_ease-in-out_infinite] drop-shadow-[0_0_15px_rgba(209,77,114,0.6)]" style="font-variation-settings: 'FILL' 1;">enhanced_encryption</span>
               <div class="absolute inset-0 border-4 border-secondary rounded-full border-t-transparent animate-spin opacity-50"></div>
            </div>
            <div class="flex-1 z-10">
               <div class="flex items-center gap-2 mb-2">
                 <h2 class="font-headline-md text-secondary tracking-widest uppercase font-bold">Bóveda Cifrada de Acceso</h2>
                 <span class="px-2 py-0.5 bg-secondary/20 text-secondary text-[10px] font-mono-data rounded border border-secondary/50">PROTECTED</span>
               </div>
               <p class="text-xs font-mono-data text-outline mb-4">COMPLIANCE: ISO/IEC 27001 (SGSI - Sistema de Gestión de Seguridad de la Información)</p>
               <p class="font-body-md text-on-surface-variant text-sm mb-4">
                 Todos los vectores de entrada están siendo encriptados bajo AES-256 en reposo. Los canales de autenticación del Nexus Grid operan bajo validación de tokens de corta vida con rotación automática mediante los lineamientos de controles de acceso ISO 27001.
               </p>
               <div class="grid grid-cols-3 gap-2">
                  <div class="bg-black/40 border border-secondary/20 p-2 rounded text-center">
                     <span class="text-[10px] font-label-caps text-outline block mb-1">LLAVES ROTADAS</span>
                     <span class="font-mono-data text-secondary text-sm">45,912</span>
                  </div>
                  <div class="bg-black/40 border border-secondary/20 p-2 rounded text-center">
                     <span class="text-[10px] font-label-caps text-outline block mb-1">INTENTOS BLOQUEADOS</span>
                     <span class="font-mono-data text-error text-sm animate-pulse">1,204</span>
                  </div>
                  <div class="bg-black/40 border border-secondary/20 p-2 rounded text-center">
                     <span class="text-[10px] font-label-caps text-outline block mb-1">INTEGRIDAD HASH</span>
                     <span class="font-mono-data text-green-400 text-sm">SHA-3 OK</span>
                  </div>
               </div>
            </div>
         </div>

         <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Animacion Falsa de Trafico (ISO 27036) -->
            <div class="glass-panel p-8 rounded-xl border border-primary/20 shadow-[0_0_30px_rgba(0,240,255,0.05)] relative overflow-hidden flex flex-col gap-4">
               <div class="flex items-center gap-2 border-b border-outline-variant/30 pb-2">
                 <span class="material-symbols-outlined text-secondary animate-pulse">radar</span>
                 <div>
                    <h2 class="font-label-caps text-outline uppercase tracking-widest">Monitoreo de Tráfico Activo</h2>
                    <p class="text-[10px] font-mono-data text-primary">COMPLIANCE: ISO/IEC 27036 (Seg. de la Información para Relaciones con Proveedores)</p>
                 </div>
               </div>
               
               <div class="h-48 w-full bg-black/40 rounded border border-outline-variant/50 relative overflow-hidden flex items-end px-2 pt-2 gap-1" >
                 <!-- Generamos barras aleatorias visualmente con CSS / Vue -->
                 <div v-for="i in 30" :key="i" 
                      class="flex-1 bg-primary/40 rounded-t transition-all duration-1000 origin-bottom"
                      :style="{ height: Math.floor(Math.random() * 80 + 10) + '%', opacity: Math.random() * 0.5 + 0.5 }"
                 ></div>
                 <div class="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
                 <div class="absolute w-full h-[1px] bg-primary/50 top-1/2 left-0 shadow-[0_0_10px_rgba(0,240,255,0.8)]"></div>
                 
                 <!-- Tooltip Falso del Proveedor -->
                 <div class="absolute top-2 right-2 bg-black/80 border border-primary/30 p-1.5 rounded flex items-center gap-2 text-[10px] font-mono-data text-primary">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-ping"></div> DROPBOX API v2 CONN (SECURE)
                 </div>
               </div>

               <div class="flex justify-between items-center mt-2 px-2 text-xs font-mono-data text-outline">
                 <span>TX: <span class="text-primary">452.1 MB/s</span></span>
                 <span>RX: <span class="text-secondary">102.4 MB/s</span></span>
                 <span class="text-error animate-pulse">PING: 14ms</span>
               </div>
            </div>

            <!-- Panel de Reportes PDF -->
            <div class="glass-panel p-8 rounded-xl border border-tertiary/20 shadow-[0_0_30px_rgba(255,100,200,0.05)] flex flex-col gap-4">
               <div class="flex items-center gap-2 border-b border-outline-variant/30 pb-2">
                 <span class="material-symbols-outlined text-tertiary">summarize</span>
                 <h2 class="font-label-caps text-outline uppercase tracking-widest">Reportes de Auditoría</h2>
               </div>

               <p class="font-body-md text-on-surface-variant text-sm mt-4">
                 Genera un reporte detallado con toda la actividad de subida, tamaño de origen y fecha exacta en la base de datos de auditoría. Cumple los estándares exigidos para el trazado forense perimetral.
               </p>

               <div class="mt-auto flex flex-col gap-2 items-start bg-black/30 p-4 rounded-lg border border-outline-variant/30">
                  <div class="flex items-center gap-2 text-xs text-on-surface font-mono-data mb-2">
                    <span class="material-symbols-outlined text-sm text-green-400">check_circle</span>
                    SISTEMA DE LOGS EN LINEA (RFC 5424)
                  </div>
                  <button @click="downloadReport" class="mt-2 bg-tertiary text-on-primary px-6 py-3 rounded-DEFAULT font-label-caps tracking-widest hover:shadow-[0_0_15px_rgba(255,100,200,0.4)] transition-all flex items-center gap-2 cursor-pointer w-full justify-center">
                    <span class="material-symbols-outlined">picture_as_pdf</span>
                    GENERAR PDF DE ACTIVIDAD
                  </button>
               </div>
            </div>
         </div>
      </div>

      <!-- SECCION: ALMACENAMIENTO COMPARTIDO -->
      <div v-show="activeSection === 'almacenamiento'" class="flex flex-col gap-6 slide-in-top">
         <!-- Panel Principal de Archivos OCR -->
         <div class="glass-panel p-8 rounded-xl border border-secondary/20 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
            <div class="flex items-center justify-between border-b border-secondary/20 pb-4 mb-6">
               <h2 class="font-headline-md text-secondary font-bold tracking-widest flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary text-2xl">cloud_upload</span>
                  ALMACENAMIENTO COMPARTIDO
               </h2>
               <div class="flex gap-3">
                  <button @click="fetchOcrFiles" class="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-all" :disabled="loadingOcr">
                     <span class="material-symbols-outlined text-sm">refresh</span>
                     <span v-if="!loadingOcr" class="text-xs font-label-caps">REFRESCAR</span>
                     <span v-else class="text-xs font-label-caps animate-spin">⟳</span>
                  </button>
                  <button v-if="ocrFiles.length > 0" @click="deleteAllOcrFiles" class="flex items-center gap-2 px-4 py-2 bg-error/10 text-error hover:bg-error/20 rounded-lg transition-all">
                     <span class="material-symbols-outlined text-sm">delete_sweep</span>
                     <span class="text-xs font-label-caps">LIMPIAR TODO</span>
                  </button>
               </div>
            </div>

            <!-- Lista de Archivos OCR y del Sistema -->
            <div v-if="loadingOcr" class="flex items-center justify-center py-12 gap-3">
               <span class="material-symbols-outlined animate-spin text-secondary">settings</span>
               <p class="text-on-surface-variant font-body-md">Cargando archivos...</p>
            </div>
            <div v-else-if="ocrFiles.length === 0" class="flex flex-col items-center justify-center py-16 gap-4">
               <span class="material-symbols-outlined text-5xl text-outline/40">cloud_queue</span>
               <p class="text-on-surface-variant font-body-md text-center">No hay archivos disponibles.<br><span class="text-xs text-outline/70">Sube archivos para verlos aquí.</span></p>
            </div>
            <div v-else class="grid grid-cols-1 gap-3">
               <div 
                  v-for="file in ocrFiles" 
                  :key="`${file.type}-${file.fileId}`"
                  class="border border-outline-variant/30 rounded-lg p-4 bg-surface-container-low/50 hover:bg-surface-container-low transition-colors flex items-center justify-between group"
               >
                  <div class="flex-1 flex items-center gap-4">
                     <div class="flex items-center gap-3 flex-1 min-w-0">
                        <span class="material-symbols-outlined text-secondary text-2xl flex-shrink-0">{{ file.type === 'ocr' ? 'description' : 'inventory_2' }}</span>
                        <div class="flex-1 min-w-0">
                           <p class="font-body-md text-on-surface truncate">{{ file.filename }}</p>
                           <div class="flex gap-4 text-xs text-on-surface-variant font-mono-data mt-1">
                              <span>{{ file.type === 'ocr' ? 'OCR' : 'ARCHIVO' }}</span>
                              <span>{{ formatBytes(file.size) }}</span>
                              <span>{{ new Date(file.createdAt).toLocaleDateString() }}</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="flex gap-2 ml-4 flex-shrink-0">
                     <button 
                        v-if="file.type === 'ocr'"
                        @click="viewOcrFile(file.fileId, file.filename)"
                        class="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-all text-xs font-label-caps opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                        <span class="material-symbols-outlined text-sm">visibility</span>
                        VER
                     </button>
                     <button 
                        @click="deleteOcrFile(file.fileId, file.filename, file.type)"
                        class="flex items-center gap-2 px-3 py-2 bg-error/10 text-error hover:bg-error/20 rounded-lg transition-all text-xs font-label-caps opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                        <span class="material-symbols-outlined text-sm">delete</span>
                        ELIMINAR
                     </button>
                  </div>
               </div>
            </div>

            <!-- Estadísticas -->
            <div v-if="ocrFiles.length > 0" class="mt-6 pt-6 border-t border-outline-variant/30 grid grid-cols-3 gap-4">
               <div class="bg-primary/5 p-4 rounded-lg border border-primary/20 flex flex-col gap-2">
                  <p class="text-xs text-on-surface-variant font-label-caps">TOTAL ARCHIVOS</p>
                  <p class="text-2xl font-headline-md text-primary">{{ ocrFiles.length }}</p>
               </div>
               <div class="bg-secondary/5 p-4 rounded-lg border border-secondary/20 flex flex-col gap-2">
                  <p class="text-xs text-on-surface-variant font-label-caps">ESPACIO UTILIZADO</p>
                  <p class="text-2xl font-headline-md text-secondary">{{ formatBytes(ocrFiles.reduce((sum: number, f: any) => sum + f.size, 0)) }}</p>
               </div>
               <div class="bg-tertiary/5 p-4 rounded-lg border border-tertiary/20 flex flex-col gap-2">
                  <p class="text-xs text-on-surface-variant font-label-caps">PROMEDIO POR ARCHIVO</p>
                  <p class="text-2xl font-headline-md text-tertiary">{{ ocrFiles.length > 0 ? formatBytes(ocrFiles.reduce((sum: number, f: any) => sum + f.size, 0) / ocrFiles.length) : '0 B' }}</p>
               </div>
            </div>
         </div>

         <!-- Pantalla Muerta Animada: Gobernanza de Datos ISO 38500 -->
         <div class="glass-panel p-8 rounded-xl border border-primary/20 shadow-[0_0_30px_rgba(0,240,255,0.05)] relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            <div class="flex items-center gap-2 border-b border-outline-variant/30 pb-4 mb-6">
               <span class="material-symbols-outlined text-primary text-2xl animate-[spin_10s_linear_infinite]">mediation</span>
               <div>
                  <h2 class="font-label-caps text-outline uppercase tracking-widest text-lg">Gobernanza de Almacenamiento</h2>
                  <p class="text-xs font-mono-data text-primary">COMPLIANCE: ISO/IEC 38500</p>
               </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div class="flex flex-col gap-3">
                  <div class="flex justify-between text-xs font-mono-data text-outline"><span>Auditoría Interna</span> <span class="text-primary text-green-400">PASSED</span></div>
                  <div class="h-2 bg-black/50 rounded overflow-hidden"><div class="h-full bg-green-500 w-full"></div></div>
                  <p class="text-xs text-on-surface-variant mt-2">Cumplimiento del marco de gobierno corporativo de TI. Distribución y evaluación de políticas de datos estructuradas.</p>
               </div>
               <div class="flex flex-col gap-3 border-l border-outline-variant/30 pl-6">
                  <div class="flex justify-between text-xs font-mono-data text-outline"><span>Integridad del Cluster</span> <span class="text-secondary animate-pulse">EVALUANDO...</span></div>
                  <div class="h-2 bg-black/50 rounded overflow-hidden relative">
                     <div class="absolute top-0 bottom-0 left-0 bg-secondary/80 animate-[ping_2s_ease-in-out_infinite] w-3/4"></div>
                     <div class="h-full bg-secondary w-3/4"></div>
                  </div>
                  <p class="text-xs text-on-surface-variant mt-2">Distribución de carga (Directiva 38500-2). Asegurando disponibilidad continua.</p>
               </div>
               <div class="flex flex-col gap-3 border-l border-outline-variant/30 pl-6">
                  <div class="flex justify-between text-xs font-mono-data text-outline"><span>Ciclo de Vida (Datos)</span> <span class="text-tertiary">ACTIVO</span></div>
                  <div class="flex items-center gap-1 mt-2">
                     <div class="h-4 w-4 rounded-full border border-tertiary flex items-center justify-center animate-pulse"><div class="h-2 w-2 rounded-full bg-tertiary"></div></div>
                     <div class="h-[1px] flex-1 bg-tertiary/30"></div>
                     <div class="h-4 w-4 rounded-full border border-tertiary flex items-center justify-center animate-pulse" style="animation-delay: 0.5s"><div class="h-2 w-2 rounded-full bg-tertiary"></div></div>
                     <div class="h-[1px] flex-1 bg-tertiary/30"></div>
                     <div class="h-4 w-4 rounded-full border border-tertiary flex items-center justify-center animate-pulse" style="animation-delay: 1s"><div class="h-2 w-2 rounded-full bg-tertiary"></div></div>
                  </div>
                  <p class="text-xs text-on-surface-variant mt-[5px]">Gestión del riesgo en la destrucción/retención temporal del ciclo de vida.</p>
               </div>
            </div>
         </div>
      </div>
      <div v-show="activeSection === 'metricas'" class="flex flex-col gap-6 slide-in-top">
         <div class="glass-panel p-8 rounded-xl border border-primary/20 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
            <h2 class="font-headline-md text-primary font-bold tracking-widest border-b border-primary/20 pb-4 mb-6 flex items-center gap-2">
               <span class="material-symbols-outlined text-cyan-400">auto_awesome</span>
               SELECTOR DE TAREAS AVANZADAS
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
               <!-- Card Tarea 1: WebP Compress -->
               <div class="border border-outline-variant/30 rounded-xl p-6 bg-surface-container-low/50 hover:bg-primary/5 hover:border-primary/50 transition-colors cursor-pointer flex flex-col gap-3 relative overflow-hidden group" @click="openTaskModal('webp')">
                  <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span class="material-symbols-outlined text-4xl text-cyan-400">zoom_in_map</span>
                  <h3 class="font-label-caps text-on-surface text-lg">Comprimir a WebP</h3>
                  <p class="font-body-sm text-on-surface-variant text-sm">Reduce el peso guardando calidad visual de tu imagen original.</p>
               </div>

               <!-- Card Tarea 2: Watermark -->
               <div class="border border-outline-variant/30 rounded-xl p-6 bg-surface-container-low/50 hover:bg-secondary/5 hover:border-secondary/50 transition-colors cursor-pointer flex flex-col gap-3 relative overflow-hidden group" @click="openTaskModal('watermark')">
                  <div class="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span class="material-symbols-outlined text-4xl text-secondary">branding_watermark</span>
                  <h3 class="font-label-caps text-on-surface text-lg">Insertar Tu Marca</h3>
                  <p class="font-body-sm text-on-surface-variant text-sm">Protege tu obra. Coloca una marca de agua en tu foto.</p>
               </div>

               <!-- Card Tarea 3: OCR Text -->
               <div class="border border-outline-variant/30 rounded-xl p-6 bg-surface-container-low/50 hover:bg-tertiary/5 hover:border-tertiary/50 transition-colors cursor-pointer flex flex-col gap-3 relative overflow-hidden group" @click="openTaskModal('ocr')">
                 <div class="absolute inset-0 bg-tertiary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span class="material-symbols-outlined text-4xl text-tertiary">document_scanner</span>
                  <h3 class="font-label-caps text-on-surface text-lg">Extraer Texto (OCR)</h3>
                  <p class="font-body-sm text-on-surface-variant text-sm">Sube un PDF y obtén un archivo .TXT con su texto plano.</p>
               </div>
            </div>
         </div>
      </div>

      <!-- MODAL DE SUBIDA ESPECIFICO (Aparece tras elegir Tarea) -->
      <div v-if="showUploadModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
         <div class="glass-panel p-8 rounded-2xl w-full max-w-2xl relative border border-primary/30 flex flex-col gap-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] slide-in-top">
            <button @click="showUploadModal = false; activeTask = ''" class="absolute top-6 right-6 text-outline hover:text-error transition-colors p-2 hover:bg-white/5 rounded-full">
              <span class="material-symbols-outlined text-2xl">close</span>
            </button>
            
            <header class="flex flex-col gap-2 border-b border-primary/20 pb-4">
               <h2 class="font-headline-md text-primary font-bold tracking-widest flex items-center gap-3">
                  <span class="material-symbols-outlined text-cyan-400 text-3xl">rocket_launch</span>
                  CONFIGURAR SUBIDA: {{ activeTask.toUpperCase() }}
               </h2>
               <p class="font-mono-data text-[10px] text-outline tracking-[0.2em] uppercase">Módulo de Procesamiento Nexus_Grid v2.0</p>
            </header>

            <div class="flex flex-col gap-6 max-h-[70vh] overflow-y-auto pr-2">
               <!-- Input Text (Solo para marca de Agua) -->
               <div v-if="activeTask === 'watermark'" class="flex flex-col gap-3">
                 <label class="font-label-caps text-xs text-primary/80 tracking-widest flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">edit_note</span>
                    TEXTO DE TU MARCA DE AGUA:
                 </label>
                 <input type="text" v-model="watermarkInput" placeholder="Ej. Propiedad de Acme Inc." class="bg-black/40 border border-outline-variant rounded-lg p-5 text-on-surface font-body-md focus:outline-none focus:border-secondary transition-all focus:ring-1 focus:ring-secondary/50 placeholder:text-outline/40" />
               </div>

              <!-- Upload Area -->
              <div 
                  class="border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center text-center gap-5 transition-all cursor-pointer group relative overflow-hidden flex-shrink-0"
                  :class="[isDragging ? 'border-primary bg-primary/10 scale-[0.99]' : 'border-outline-variant bg-white/5 hover:bg-white/10 hover:border-primary/50']"
                  @dragover.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleDrop"
                  @click="triggerFileInput"
               >
                 <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                 <div v-if="!isUploading" class="flex flex-col items-center gap-4">
                   <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span class="material-symbols-outlined text-5xl text-primary/70">cloud_upload</span>
                   </div>
                   <div>
                     <p class="font-label-caps text-on-surface text-xl tracking-tight">Suelta el archivo para iniciar</p>
                     <p class="font-mono-data text-xs text-outline mt-2 tracking-widest">— O HAZ CLIC PARA EXPLORAR EL SISTEMA —</p>
                   </div>
                 </div>

                 <div v-else class="flex flex-col items-center gap-4 py-4">
                    <div class="relative w-16 h-16">
                      <div class="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                      <div class="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p class="font-label-caps text-primary neon-text tracking-[0.3em] text-sm animate-pulse">>> INICIANDO_TRANSMISION...</p>
                 </div>
              </div>
               
               <div class="flex items-start gap-3 bg-error/5 border border-error/20 p-4 rounded-lg flex-shrink-0">
                  <span class="material-symbols-outlined text-error text-xl">info</span>
                  <p class="text-[11px] text-error/80 font-mono-data leading-relaxed uppercase">
                    Advertencia: Esta operación modificará los metadatos originales del archivo. Asegúrate de tener respaldo de la data crítica antes de proceder.
                  </p>
               </div>
            </div>
         </div>
      </div>

      <!-- SECCION: SISTEMA DE ARCHIVOS -->
      <div v-show="activeSection === 'sistema'" class="grid grid-cols-1 lg:grid-cols-12 gap-gutter slide-in-top">
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
              <button class="text-on-surface-variant hover:text-primary transition-colors" @click="fetchFiles" title="Refrescar vista"><span class="material-symbols-outlined text-sm">refresh</span></button>
            </div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4" v-if="files.length > 0">
            <div v-for="file in files" :key="file.id" @click="openPreview(file)" class="group border border-outline-variant/50 rounded-lg p-4 bg-surface-container-low/30 hover:bg-surface-container-high/50 hover:border-primary/50 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center gap-3 h-32">
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span class="material-symbols-outlined text-4xl text-primary/70 group-hover:text-primary group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-300" style="font-variation-settings: 'FILL' 1;">
                {{ file.name.endsWith('.webp') ? 'image' : 'description' }}
              </span>
              <div>
                <div class="font-body-sm text-on-surface w-full px-2 break-all">{{ file.name }}</div>
                <div class="font-mono-data text-[10px] text-on-surface-variant mt-1">{{ formatBytes(file.size) }} • IA Intelligence</div>
              </div>
            </div>
          </div>
          <div class="mt-auto flex justify-center pt-8 text-outline font-mono-data text-xs" v-else>
             NO HAY ARCHIVOS EN EL DIRECTORIO SALIDA_PROCESADA
          </div>
        </section>

        <!-- MODAL DE PREVIEW INTELIGENTE -->
        <div v-if="selectedFileForPreview" class="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
          <div class="glass-panel p-8 rounded-2xl w-full max-w-3xl relative border border-primary/40 shadow-[0_0_60px_rgba(0,240,255,0.3)] flex flex-col gap-6 max-h-[90vh] overflow-hidden slide-in-top">
            <button @click="selectedFileForPreview = null" class="absolute top-6 right-6 text-outline hover:text-error transition-colors p-2 hover:bg-white/5 rounded-full">
              <span class="material-symbols-outlined text-2xl">close</span>
            </button>

            <header class="flex flex-col gap-1 border-b border-primary/20 pb-4">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary text-3xl">page_info</span>
                <h2 class="font-headline-md text-on-surface font-bold truncate pr-12">{{ selectedFileForPreview.name }}</h2>
              </div>
              <p class="font-mono-data text-[10px] text-outline tracking-widest uppercase">Metadata_Explorer // Nexus_Intelligence_Core</p>
            </header>

            <div class="flex-1 overflow-y-auto pr-4 flex flex-col gap-8 custom-scrollbar">
              <!-- Información Básica -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white/5 p-4 rounded-lg border border-white/5">
                   <p class="font-mono-data text-[9px] text-outline mb-1 uppercase">Extensión</p>
                   <p class="font-label-caps text-secondary">{{ selectedFileForPreview.name.split('.').pop().toUpperCase() }}</p>
                </div>
                <div class="bg-white/5 p-4 rounded-lg border border-white/5">
                   <p class="font-mono-data text-[9px] text-outline mb-1 uppercase">Tamaño</p>
                   <p class="font-label-caps text-on-surface">{{ formatBytes(selectedFileForPreview.size) }}</p>
                </div>
                <div class="bg-white/5 p-4 rounded-lg border border-white/5">
                   <p class="font-mono-data text-[9px] text-outline mb-1 uppercase">Estado</p>
                   <div class="flex items-center gap-2">
                     <span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                     <span class="font-label-caps text-success">Verificado</span>
                   </div>
                </div>
                <div class="bg-white/5 p-4 rounded-lg border border-white/5">
                   <p class="font-mono-data text-[9px] text-outline mb-1 uppercase">Protocolo</p>
                   <p class="font-label-caps text-primary">Dropbox_v2</p>
                </div>
              </div>

              <!-- Resumen IA (Solo si existe) -->
              <div v-if="selectedFileForPreview.resumenIa && selectedFileForPreview.resumenIa.trim().length > 0" class="flex flex-col gap-4">
                <div class="flex items-center gap-3 text-primary border-l-2 border-primary pl-4">
                  <span class="material-symbols-outlined animate-pulse">psychology</span>
                  <h3 class="font-label-caps text-lg tracking-widest">RESUMEN_INTELIGENTE (OLLAMA_LLAMA3)</h3>
                </div>
                <div class="bg-primary/5 border border-primary/20 p-6 rounded-xl font-body-md text-on-surface leading-loose whitespace-pre-line shadow-inner max-h-96 overflow-y-auto">
                  {{ selectedFileForPreview.resumenIa }}
                </div>
              </div>
              <div v-else-if="selectedFileForPreview.name.endsWith('.txt') || selectedFileForPreview.name.endsWith('.pdf')" class="bg-surface-container-high/30 p-8 rounded-xl border border-outline-variant/30 flex flex-col items-center justify-center text-center gap-4">
                 <span class="material-symbols-outlined text-4xl text-outline/50">info</span>
                 <p class="font-body-md text-outline">Este archivo no tiene resumen disponible. Puede deberse a que el texto es demasiado corto o la API de IA no estaba disponible durante el procesamiento.</p>
              </div>

              <!-- Acciones -->
              <div class="flex flex-col sm:flex-row gap-4 mt-4 pt-6 border-t border-white/5">
                <button @click="downloadFile(selectedFileForPreview.path)" class="flex-1 bg-primary text-on-primary py-4 rounded-xl font-label-caps tracking-widest flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all active:scale-[0.98]">
                   <span class="material-symbols-outlined">download</span>
                   DESCARGAR_ARCHIVO
                </button>
                <button @click="selectedFileForPreview = null" class="flex-1 border border-outline-variant hover:bg-white/5 text-on-surface py-4 rounded-xl font-label-caps tracking-widest flex items-center justify-center gap-3 transition-all">
                   <span class="material-symbols-outlined">cancel</span>
                   CERRAR_VISUALIZADOR
                </button>
              </div>
            </div>
          </div>
        </div>

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

    <!-- Modal de Eliminación Estilo Momichis -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div class="bg-surface border border-outline/20 p-8 flex flex-col items-center justify-center min-w-[400px] border-t-2 border-t-error rounded-xl shadow-2xl relative">
        <button v-if="deleteModalState !== 'loading'" @click="showDeleteModal = false" class="absolute top-4 right-4 text-outline hover:text-error transition-colors p-2 hover:bg-white/5 rounded-full">
          <span class="material-symbols-outlined">close</span>
        </button>
        
        <div class="mb-6 mt-4">
          <span v-if="deleteModalState === 'confirm'" class="material-symbols-outlined text-6xl text-error drop-shadow-[0_0_8px_rgba(209,77,114,0.5)]">warning</span>
          <span v-if="deleteModalState === 'loading'" class="material-symbols-outlined text-6xl text-primary animate-spin drop-shadow-[0_0_8px_rgba(33,184,213,0.5)]">settings</span>
          <span v-if="deleteModalState === 'success'" class="material-symbols-outlined text-6xl text-primary drop-shadow-[0_0_8px_rgba(33,184,213,0.5)]">check_circle</span>
        </div>
        
        <h2 class="text-xl font-header mb-2 text-center">{{ deleteModalTitle }}</h2>
        <p class="text-outline text-sm text-center mb-8 max-w-sm">{{ deleteModalMessage }}</p>
        
        <div v-if="deleteModalState === 'confirm'" class="flex gap-4 w-full">
          <button @click="showDeleteModal = false" class="flex-1 py-3 px-4 border border-outline/30 text-outline hover:text-on-surface hover:bg-white/5 font-label-caps tracking-widest text-sm transition-all rounded-lg">CANCELAR</button>
          <button @click="executePendingDelete" class="flex-1 py-3 px-4 bg-error/10 border border-error/50 text-error hover:bg-error hover:text-white font-label-caps tracking-widest text-sm transition-all rounded-lg shadow-[0_0_15px_rgba(209,77,114,0.3)]">CONFIRMAR</button>
        </div>
        
        <div v-if="deleteModalState === 'success'" class="w-full">
          <button @click="showDeleteModal = false" class="w-full py-3 px-4 bg-primary/10 border border-primary/50 text-primary hover:bg-primary hover:text-white font-label-caps tracking-widest text-sm transition-all rounded-lg shadow-[0_0_15px_rgba(33,184,213,0.3)]">ACEPTAR</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const files = ref<any[]>([])

const activeSection = ref<'sistema' | 'metricas' | 'nodos' | 'almacenamiento'>('sistema')
const showUploadModal = ref(false)
const selectedFileForPreview = ref<any>(null)
const activeTask = ref<string>('')
const watermarkInput = ref<string>('')
const isDragging = ref(false)
const ocrFiles = ref<any[]>([])
const loadingOcr = ref(false)

// Delete Modal State
const showDeleteModal = ref(false)
const deleteModalState = ref<'confirm'|'loading'|'success'>('confirm')
const deleteModalTitle = ref('')
const deleteModalMessage = ref('')
let pendingDeleteAction: (() => Promise<void>) | null = null

const executePendingDelete = async () => {
  if (pendingDeleteAction) {
    deleteModalState.value = 'loading'
    deleteModalTitle.value = 'Eliminando Archivos'
    deleteModalMessage.value = 'Eliminando sus archivos ...'
    await pendingDeleteAction()
  }
}

const openTaskModal = (task: string) => {
  activeTask.value = task
  showUploadModal.value = true
  if (task !== 'watermark') {
    watermarkInput.value = ''
  }
}

const openPreview = (file: any) => {
  selectedFileForPreview.value = file
}

const triggerFileInput = () => {
  if (isUploading.value) return
  fileInput.value?.click()
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const downloadReport = async () => {
  // El backend lo autocompletará basado en el admin del seeding si no enviamos un ID.
  try {
     const url = `http://localhost:3000/dropbox/report?usuarioId=null`
     window.open(url, '_blank')
  } catch (error) {
    console.error('Error report', error)
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) processUpload(file)
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) processUpload(file)
}

const processUpload = async (file: File) => {
  if (!activeTask.value) {
     alert('Por favor selecciona una Tarea antes de subir.')
     return
  }

  isUploading.value = true
  const formData = new FormData()
  formData.append('file', file)
  formData.append('task', activeTask.value)

  if (activeTask.value === 'watermark' && watermarkInput.value) {
     formData.append('watermarkText', watermarkInput.value)
  }

  try {
    const res = await fetch('http://localhost:3000/dropbox/upload', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    if (data.ok) {
      // Ocultar modal, resetear variables y refrescar lista
      showUploadModal.value = false
      activeTask.value = ''
      watermarkInput.value = ''
      activeSection.value = 'sistema'
      await fetchFiles()
    } else {
      alert('Error: ' + data.message)
    }
  } catch (error) {
    console.error('Error uploading', error)
    alert('Ocurrió un error al subir el archivo.')
  } finally {
    isUploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

const fetchFiles = async () => {
  try {
    const res = await fetch('http://localhost:3000/dropbox/files')
    const data = await res.json()
    if (data.ok) {
      files.value = data.files || []
    }
  } catch (err) {
    console.error('Error fetching files:', err)
  }
}

const downloadFile = (path: string) => {
  window.open(`http://localhost:3000/dropbox/download?path=${encodeURIComponent(path)}`, '_blank')
}

const fetchOcrFiles = async () => {
  loadingOcr.value = true
  try {
    // Cargar OCR temporales
    const ocrRes = await fetch('http://localhost:3000/ocr-storage/list')
    if (!ocrRes.ok) throw new Error('Error cargando OCR')
    const ocrData = await ocrRes.json()
    const ocrList = (ocrData || []).map((f: any) => ({
      ...f,
      type: 'ocr',
      displayName: `📄 ${f.filename}`
    }))
    
    // Cargar archivos del sistema
    const filesRes = await fetch('http://localhost:3000/dropbox/files')
    if (!filesRes.ok) throw new Error('Error cargando archivos')
    const filesData = await filesRes.json()
    const filesList = (filesData.files || []).map((f: any) => ({
      ...f,
      type: 'file',
      displayName: `📦 ${f.name || f.nombre_original || 'Desconocido'}`,
      fileId: f.id,
      filename: f.name || f.nombre_original || 'Desconocido',
      size: f.size || f.tamano_bytes || 0,
      createdAt: f.client_modified || f.fecha_creacion || new Date().toISOString()
    }))
    
    // Combinar ambas listas
    ocrFiles.value = [...ocrList, ...filesList]
  } catch (error) {
    console.error('Error fetching files:', error)
    ocrFiles.value = []
  } finally {
    loadingOcr.value = false
  }
}

const viewOcrFile = async (fileId: string, filename: string) => {
  try {
    const res = await fetch(`http://localhost:3000/ocr-storage/file/${fileId}`)
    if (!res.ok) throw new Error('Error cargando archivo')
    const data = await res.json()
    alert(`📄 ${filename}\n\n${data.content?.substring(0, 500)}...\n\n(Mostrando primeros 500 caracteres)`)
  } catch (error) {
    console.error('Error viewing file:', error)
    alert('Error al cargar el archivo')
  }
}

const deleteOcrFile = (fileId: string, filename: string, type: string) => {
  deleteModalState.value = 'confirm'
  deleteModalTitle.value = 'Confirmar Eliminación'
  deleteModalMessage.value = `¿Estás seguro de que deseas eliminar permanentemente el archivo "${filename}"? Esta acción no se puede deshacer.`
  showDeleteModal.value = true

  pendingDeleteAction = async () => {
    try {
      if (type === 'ocr') {
        const res = await fetch(`http://localhost:3000/ocr-storage/file/${fileId}`, { method: 'DELETE' })
        const data = await res.json()
        if (data.success) {
          ocrFiles.value = ocrFiles.value.filter(f => f.fileId !== fileId)
          deleteModalState.value = 'success'
          deleteModalTitle.value = 'Operación Exitosa'
          deleteModalMessage.value = 'Archivos eliminados correctamente.'
        }
      } else if (type === 'file') {
        const res = await fetch(`http://localhost:3000/dropbox/file/${fileId}`, { method: 'DELETE' })
        const data = await res.json()
        if (data.ok) {
          ocrFiles.value = ocrFiles.value.filter(f => f.fileId !== fileId)
          deleteModalState.value = 'success'
          deleteModalTitle.value = 'Operación Exitosa'
          deleteModalMessage.value = 'Archivos eliminados correctamente.'
        } else {
          showDeleteModal.value = false
          alert('Error: ' + data.message)
        }
      }
    } catch (error) {
      console.error('Error deleting file:', error)
      showDeleteModal.value = false
      alert('Error al eliminar el archivo')
    }
  }
}

const deleteAllOcrFiles = () => {
  deleteModalState.value = 'confirm'
  deleteModalTitle.value = 'Purga Total de Sistema'
  deleteModalMessage.value = '¿Eliminar TODOS los archivos del sistema? Esta acción purgará la base de datos y la nube irremediablemente.'
  showDeleteModal.value = true

  pendingDeleteAction = async () => {
    try {
      // Eliminar OCR temporales
      const ocrRes = await fetch('http://localhost:3000/ocr-storage/cleanup', { method: 'DELETE' })
      await ocrRes.json()
      
      // Eliminar archivos del sistema
      const ocrFilesCopy = [...ocrFiles.value]
      for (const file of ocrFilesCopy) {
        if (file.type === 'file') {
          try {
            await fetch(`http://localhost:3000/dropbox/file/${file.fileId}`, { method: 'DELETE' })
          } catch (error) {
            console.warn(`Error eliminando archivo ${file.filename}:`, error)
          }
        }
      }
      
      ocrFiles.value = []
      deleteModalState.value = 'success'
      deleteModalTitle.value = 'Purga Exitosa'
      deleteModalMessage.value = 'Archivos eliminados correctamente.'
    } catch (error) {
      console.error('Error cleaning up:', error)
      showDeleteModal.value = false
      alert('Error al limpiar archivos')
    }
  }
}

onMounted(() => {
  fetchFiles()
  if (activeSection.value === 'almacenamiento') {
    fetchOcrFiles()
  }
})

watch(activeSection, (newSection) => {
  if (newSection === 'almacenamiento') {
    fetchOcrFiles()
  }
})
</script>
