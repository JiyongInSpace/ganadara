/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router/types'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/class/': RouteRecordInfo<'/class/', '/class', Record<never, never>, Record<never, never>>,
    '/class/question/[id]/': RouteRecordInfo<'/class/question/[id]/', '/class/question/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/class/regular/[id]/': RouteRecordInfo<'/class/regular/[id]/', '/class/regular/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/onboard/find_email/': RouteRecordInfo<'/onboard/find_email/', '/onboard/find_email', Record<never, never>, Record<never, never>>,
    '/onboard/landing/': RouteRecordInfo<'/onboard/landing/', '/onboard/landing', Record<never, never>, Record<never, never>>,
    '/onboard/log_in/': RouteRecordInfo<'/onboard/log_in/', '/onboard/log_in', Record<never, never>, Record<never, never>>,
    '/onboard/log_in/email/': RouteRecordInfo<'/onboard/log_in/email/', '/onboard/log_in/email', Record<never, never>, Record<never, never>>,
    '/onboard/sign_up/': RouteRecordInfo<'/onboard/sign_up/', '/onboard/sign_up', Record<never, never>, Record<never, never>>,
    '/onboard/sign_up/email/': RouteRecordInfo<'/onboard/sign_up/email/', '/onboard/sign_up/email', Record<never, never>, Record<never, never>>,
    '/onboard/sign_up/social/': RouteRecordInfo<'/onboard/sign_up/social/', '/onboard/sign_up/social', Record<never, never>, Record<never, never>>,
    '/onboard/sign_up/survey/': RouteRecordInfo<'/onboard/sign_up/survey/', '/onboard/sign_up/survey', Record<never, never>, Record<never, never>>,
    '/onboard/sign_up/test/': RouteRecordInfo<'/onboard/sign_up/test/', '/onboard/sign_up/test', Record<never, never>, Record<never, never>>,
  }
}
