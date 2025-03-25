<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
  })

  async function logout() {
    await $fetch('/api/logout')
    return navigateTo('/login')
  }
</script>

<template>
  <div>
    <h1>Добро пожаловать!</h1>
    <v-btn @click="logout">Выход</v-btn>
  </div>
</template>
