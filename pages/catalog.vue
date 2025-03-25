<script setup>
  definePageMeta({
    middleware: 'auth',
  })

  const user = (await useFetch('/api/user', { credentials: 'include' }))?.data
    ?.value?.user
  console.log('user: ', user)

  async function logout() {
    await $fetch('/api/logout')
    return navigateTo('/login')
  }
</script>

<template>
  <v-app>
    <v-app-bar app class="position-fixed">
      <v-toolbar-title class="flex-1-0">
        <span class="text-blue-grey-darken-2">
          Добро пожаловать,
          {{ `${user?.name} ${user?.surname}` }}!
        </span>
      </v-toolbar-title>
      <div class="w-100 h-100 d-flex justify-center align-center ga-1">
        <v-icon color="deep-orange-darken-4" icon="mdi-coffee-outline" />
      </div>
      <div class="d-flex ga-4 align-center mr-5">
        <v-btn @click="logout">Выход</v-btn>
      </div>
    </v-app-bar>

    <!-- <v-card
      title="Каталог"
      :subtitle="`Добро пожаловать, ${user?.name} ${user?.surname}!`"
    >
      <template v-slot:actions>
        <v-btn @click="logout">Выход</v-btn>
      </template>
    </v-card> -->
  </v-app>
</template>
