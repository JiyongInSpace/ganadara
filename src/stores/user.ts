// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      id: 5,
      // id: 5,
      name: 'ganadara man',
      email: 'ganadara@ganadara.net',
      profile_image:
        '/images/class/dummy_profile_image.png',
      is_creator: true,
      // is_creator: false,
      wallet: {
        won: 8123,
        point: 10123
      }
    }),
    actions: {}
  }
)
