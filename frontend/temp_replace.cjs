const fs = require('fs');

let homeContent = fs.readFileSync('e:/Cloud/frontend/src/views/HomeView.vue', 'utf8');
const scriptStr = `<script setup>
import Typewriter from '@/components/Typewriter.vue'
</script>

<template>`;

if (!homeContent.includes('Typewriter')) {
  homeContent = homeContent.replace('<template>', scriptStr);
}

homeContent = homeContent
  .replace('CLOUD VAULT', 'CARPETA MÁGICA')
  .replace('VAULT_SECURE', 'SISTEMA_SEGURO')
  .replace('V.2.0.4 ACTIVE', 'V.2.0.4 ACTIVO')
  .replace('Dashboard', 'Panel de Control')
  .replace('Storage', 'Almacenamiento')
  .replace('Encrypted Vault', 'Bóveda Cifrada')
  .replace('Network Traffic', 'Tráfico de Red')
  .replace('System Logs', 'Registros del Sistema')
  .replace('Upgrade Storage', 'Mejorar Almacenamiento')
  .replace('Security Settings', 'Configuración de Seguridad')
  .replace('Logout', 'Cerrar Sesión');

homeContent = homeContent
  .replace('SYSTEM.ONLINE // PROTOCOL_4.4', '<Typewriter text="SISTEMA.EN_LÍNEA // PROTOCOLO_4.4" :speed="60" />')
  .replace('Absolute Security.<br/>', 'Seguridad Absoluta.<br/>')
  .replace('Quantum Performance.', 'Rendimiento Cuántico.')
  .replace('Deploy your critical infrastructure on a zero-knowledge, decentralized cloud environment designed for high-performance throughput and unbreachable data integrity.', '<Typewriter text="Despliega tu infraestructura crítica en un entorno en la nube descentralizado y de conocimiento cero, diseñado para un rendimiento de alta velocidad y una integridad de datos inquebrantable." :speed="15" :delay="600" />')
  .replace('API DOCS', 'DOCUMENTACIÓN API')
  .replace('Zero-Knowledge', 'Conocimiento Cero')
  .replace('End-to-end cryptographic protocols ensure your data remains impenetrable. Keys are generated client-side, making server-side breaches mathematically impossible.', 'Los protocolos criptográficos de extremo a extremo aseguran que tus datos permanezcan impenetrables. Las claves se generan en el lado del cliente, haciendo que las brechas del lado del servidor sean matemáticamente imposibles.')
  .replace('Quantum Speed Routing', 'Enrutamiento Ultrarrápido')
  .replace('Proprietary neural-net routing algorithms optimize data paths globally, reducing latency to near-zero for uninterrupted high-frequency data streaming.', 'Los algoritmos de enrutamiento patentados optimizan las rutas de datos globalmente, reduciendo la latencia a casi cero para flujos ininterrumpidos y de alta velocidad.')
  .replace('Global Node Access', 'Acceso Global a Nodos')
  .replace('Distributed across 400+ Edge locations. Your vault replicates seamlessly to ensure 99.999% uptime regardless of localized outages or targeted attacks.', 'Distribuido a lo largo de más de 400 ubicaciones perimetrales. Tu bóveda se replica de manera perfecta para garantizar un 99.999% de tiempo de actividad ante cualquier eventualidad.')
  .replace('NETWORK STATUS', 'ESTADO DE LA RED')
  .replace('OPTIMAL', '<Typewriter text="ÓPTIMO" :delay="2000" :speed="80" />')
  .replace('THROUGHPUT', 'RENDIMIENTO')
  .replace('ENCRYPTION', 'CIFRADO')
  .replace('CLOUD VAULT SYSTEM • PROTOCOL_4.4', 'SISTEMA CARPETA MÁGICA • PROTOCOLO_4.4')
  .replace('Security Manifesto', 'Manifiesto de Seguridad')
  .replace('API Docs', 'Documentación API')
  .replace('Data Integrity', 'Integridad de Datos')
  .replace('Status', 'Estado');

fs.writeFileSync('e:/Cloud/frontend/src/views/HomeView.vue', homeContent, 'utf8');

const newLogin = `<script setup>
import Typewriter from '@/components/Typewriter.vue'
</script>

<template>
  <div class="bg-background text-on-background min-h-screen flex items-center justify-center relative overflow-hidden font-body-md w-full">
    <!-- Background Layer: Digital Grid / Deep Space -->
    <div class="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div class="absolute inset-0 z-0 bg-gradient-to-tr from-surface-container-lowest via-surface-dim to-surface-container-highest opacity-90"></div>
    <div class="absolute inset-0 z-0 radial-gradient-blob">
      <!-- Abstract light trails simulated with CSS gradients -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[120px]"></div>
    </div>
    
    <!-- Login Card (Fixing width constraints to avoid collapse) -->
    <div class="relative z-10 w-[440px] max-w-[90vw] p-8 md:p-10 bg-surface-container/40 backdrop-blur-[20px] rounded-xl border border-white/10 shadow-[0_0_30px_rgba(0,240,255,0.05)] border-t-[rgba(255,255,255,0.2)] border-l-[rgba(255,255,255,0.1)]">
      <!-- Header -->
      <div class="text-center mb-8">
        <span class="material-symbols-outlined text-[48px] text-surface-tint drop-shadow-[0_0_8px_rgba(0,219,233,0.5)] mb-4 block animate-pulse">
          enhanced_encryption
        </span>
        <h1 class="font-headline-lg text-3xl font-bold tracking-tight text-on-surface mb-2">Carpeta Mágica</h1>
        <p class="font-mono-data text-xs text-outline tracking-widest uppercase">
          <Typewriter text="NODO DE ACCESO SEGURO" :speed="70" />
        </p>
      </div>
      
      <!-- Form -->
      <form class="flex flex-col gap-6">
        <!-- Core ID Input -->
        <div class="relative">
          <label class="sr-only" for="core-id">Usuario / Correo</label>
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="material-symbols-outlined text-outline text-lg">badge</span>
          </div>
          <input autocomplete="off" class="w-full bg-surface-container-high/50 border-0 border-b border-outline-variant text-on-surface font-mono-data text-sm px-4 py-3 pl-10 focus:ring-0 focus:border-surface-tint focus:bg-surface-container-high transition-colors duration-150 ease-linear placeholder-outline/50 outline-none" id="core-id" placeholder="Usuario / Correo Electrónico" type="text"/>
        </div>
        
        <!-- Neural Key Input -->
        <div class="relative">
          <label class="sr-only" for="neural-key">Contraseña</label>
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="material-symbols-outlined text-outline text-lg">vpn_key</span>
          </div>
          <input class="w-full bg-surface-container-high/50 border-0 border-b border-outline-variant text-on-surface font-mono-data text-sm px-4 py-3 pl-10 focus:ring-0 focus:border-surface-tint focus:bg-surface-container-high transition-colors duration-150 ease-linear placeholder-outline/50 outline-none" id="neural-key" placeholder="Contraseña de Acceso" type="password"/>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            <span class="material-symbols-outlined text-outline hover:text-surface-tint transition-colors text-lg">visibility_off</span>
          </div>
        </div>
        
        <!-- Biometric Verification Placeholder -->
        <div class="mt-2 p-4 border border-outline-variant/30 rounded-lg bg-surface-container-low/50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-surface-tint/50 transition-colors duration-150 group">
          <span class="material-symbols-outlined text-[32px] text-outline group-hover:text-surface-tint transition-colors">
            fingerprint
          </span>
          <span class="font-label-caps text-xs text-outline group-hover:text-surface-tint transition-colors uppercase tracking-widest">Verificación Biométrica</span>
        </div>
        
        <!-- Action Area -->
        <div class="pt-4 flex flex-col gap-6">
          <button class="w-full bg-surface-tint text-on-primary font-label-caps text-sm py-4 px-6 rounded hover:shadow-[0_0_15px_rgba(0,219,233,0.3)] transition-all duration-150 ease-linear uppercase tracking-widest font-bold" type="button">
            Iniciar Sesión
          </button>
          <div class="flex justify-between items-center text-xs font-mono-data text-outline">
            <a class="hover:text-surface-tint transition-colors" href="#" @click.prevent="$router.push('/')">← Volver al Inicio</a>
            <a class="hover:text-surface-tint transition-colors" href="#">Estado del Sistema</a>
          </div>
        </div>
      </form>
      
      <!-- Decorative Micro-elements -->
      <div class="absolute top-2 left-2 w-1 h-1 bg-surface-tint rounded-full shadow-[0_0_5px_rgba(0,219,233,0.8)]"></div>
      <div class="absolute top-2 right-2 w-1 h-1 bg-surface-tint rounded-full opacity-50"></div>
      <div class="absolute bottom-2 left-2 w-1 h-1 bg-surface-tint rounded-full opacity-50"></div>
      <div class="absolute bottom-2 right-2 w-1 h-1 bg-surface-tint rounded-full opacity-50"></div>
    </div>
  </div>
</template>
`;
fs.writeFileSync('e:/Cloud/frontend/src/views/LoginView.vue', newLogin, 'utf8');

console.log('Done!');
