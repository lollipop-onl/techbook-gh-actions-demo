/**
 * @file 定数をVueインスタンスから参照できるようにするプラグイン
 */
import { Plugin } from '@nuxt/types'
import * as C from '@/constants'

const plugin: Plugin = (_, inject): void => {
  inject('C', C)
}

export default plugin
