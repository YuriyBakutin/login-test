<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
  })

  const payload = (await useFetch('/api/user', { credentials: 'include' }))
    ?.data?.value

  const user = payload?.user
  const cMOptions = payload?.coffeeMachinesOptions

  if (cMOptions) {
    await saveCMOptions(cMOptions)
  }

  async function logout() {
    await $fetch('/api/logout')
    return navigateTo('/login')
  }
</script>

<template>
  <v-app>
    <v-app-bar density="compact" class="position-fixed">
      <template v-slot:prepend>
        <v-icon color="deep-orange-darken-4" icon="mdi-coffee-outline" />
      </template>
      <v-app-bar-title class="flex-1-0">
        <span class="text-blue-grey-darken-2">
          Добро пожаловать,
          {{ `${user?.name} ${user?.surname}` }}!
        </span>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn @click="logout">Выход</v-btn>
      </template>
    </v-app-bar>
  </v-app>
</template>
