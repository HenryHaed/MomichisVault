<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Typewriter from '@/components/Typewriter.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true
  try {
    const response = await fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    if (!response.ok) {
      throw new Error('Credenciales invalidas.')
    }

    await response.json()
    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Error al iniciar sesion.'
  } finally {
    isLoading.value = false
  }
}
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
        <h1 class="font-headline-lg text-3xl font-bold tracking-tight text-on-surface mb-2">Momichis Vault</h1>
        <p class="font-mono-data text-xs text-outline tracking-widest uppercase">
          <Typewriter text="NODO DE ACCESO SEGURO" :speed="70" />
        </p>
      </div>
      
      <!-- Form -->
      <form class="flex flex-col gap-6" @submit.prevent="handleLogin">
        <!-- Core ID Input -->
        <div class="relative">
          <label class="sr-only" for="core-id">Usuario / Correo</label>
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="material-symbols-outlined text-outline text-lg">badge</span>
          </div>
          <input v-model="email" autocomplete="off" class="w-full bg-surface-container-high/50 border-0 border-b border-outline-variant text-on-surface font-mono-data text-sm px-4 py-3 pl-10 focus:ring-0 focus:border-surface-tint focus:bg-surface-container-high transition-colors duration-150 ease-linear placeholder-outline/50 outline-none" id="core-id" placeholder="Usuario / Correo Electronico" type="text"/>
        </div>
        
        <!-- Neural Key Input -->
        <div class="relative">
          <label class="sr-only" for="neural-key">Contraseña</label>
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="material-symbols-outlined text-outline text-lg">vpn_key</span>
          </div>
          <input v-model="password" class="w-full bg-surface-container-high/50 border-0 border-b border-outline-variant text-on-surface font-mono-data text-sm px-4 py-3 pl-10 focus:ring-0 focus:border-surface-tint focus:bg-surface-container-high transition-colors duration-150 ease-linear placeholder-outline/50 outline-none" id="neural-key" placeholder="Contraseña de Acceso" type="password"/>
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
        <div class="pt-4 flex flex-col gap-4">
          <button class="w-full bg-surface-tint text-on-primary font-label-caps text-sm py-4 px-6 rounded hover:shadow-[0_0_15px_rgba(0,219,233,0.3)] transition-all duration-150 ease-linear uppercase tracking-widest font-bold disabled:opacity-60 disabled:cursor-not-allowed" type="submit" :disabled="isLoading">
            {{ isLoading ? 'Validando...' : 'Iniciar Sesion' }}
          </button>
          <div v-if="errorMessage" class="text-error text-xs font-mono-data">
            {{ errorMessage }}
          </div>
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
