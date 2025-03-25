<script setup>
  const username = ref('')
  const password = ref('')
  const error = ref('')
  const route = useRoute()

  const login = async () => {
    error.value = ''
    const data = await $fetch('/api/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    })

    if (!data?.success) {
      error.value = data?.message || incorrectLoginPasswordMessage
    } else {
      return navigateTo(route.query.redirect?.toString() || '/catalog')
    }
  }

  const invalidForm = computed(
    () => username.value.length < 2 || password.value.length < 6,
  )

  const showPassword = ref(false)

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }
</script>

<template>
  <v-card max-width="344" class="mx-auto mt-5" title="Вход">
    <v-col cols="auto">
      <v-card-item>
        <v-text-field v-model="username" label="Логин" />
      </v-card-item>
      <v-card-item>
        <v-text-field
          v-model="password"
          label="Пароль"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="togglePasswordVisibility"
        />
      </v-card-item>
      <v-card-item>
        <v-btn
          :disabled="invalidForm"
          color="deep-orange-darken-4"
          @click="login"
        >
          Войти
        </v-btn>
        <p v-if="error">{{ error }}</p>
      </v-card-item>
    </v-col>
  </v-card>
</template>

<style scoped>
  .error {
    color: red;
  }
</style>
