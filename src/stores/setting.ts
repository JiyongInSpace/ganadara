// stores/setting.js
import { defineStore } from 'pinia'

export const useSettingStore = defineStore(
  'setting',
  {
    state: () => ({
        notification: {
            notification1: false,
            notification2: false,
            notification3: false,
        },

        sound: false,

        marketing: false,
    }),
    actions: {}
  }
)
