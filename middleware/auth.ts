import type { IUser } from '~/types/IUser'

export default defineNuxtRouteMiddleware(async (to) => {
  const headers = useRequestHeaders(['cookie'])

  const data = (await $fetch('/api/user', {
    credentials: 'include',
    headers,
  })) as { authorized: boolean; user?: IUser }

  if (!data?.authorized && to.path !== '/login') {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
