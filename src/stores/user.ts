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
      phone_number: '010-1234-5678',
      profile_image:
        '/images/class/dummy_profile_image.png',
      // is_creator: true,
      is_creator: false,
      wallet: {
        won: 8123,
        point: 10123
      },
      learning: {
        language: 'en',
        country: 'US',
        level: 3
      },
      password: 'asdfASDF1!',
      // subscription: null as null | {
      //   planName: string
      //   billingType: string
      //   startDate: string
      //   endDate: string
      // },
      subscription: {
        planName: '스탠다드 1개월', // 이용권 이름
        billingType: 'recurring', // 결제 방식
        startDate: '2022-01-01', // 이용권 시작일
        endDate: '2022-02-01' // 이용권 종료일
      } as null | {
        planName: string
        billingType: string
        startDate: string
        endDate: string
      }
    }),
    actions: {}
  }
)
