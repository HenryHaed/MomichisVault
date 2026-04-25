<template>
  <span>{{ displayText }}<span v-show="showCursor" class="animate-pulse opacity-70">_</span></span>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  speed: {
    type: Number,
    default: 50
  },
  delay: {
    type: Number,
    default: 0
  }
})

const displayText = ref('')
const showCursor = ref(true)

onMounted(() => {
  setTimeout(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < props.text.length) {
        displayText.value += props.text.charAt(i)
        i++
      } else {
        clearInterval(timer)
      }
    }, props.speed)
  }, props.delay)
})
</script>