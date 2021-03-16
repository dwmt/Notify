
import { InjectionKey } from 'vue'
import { NotifyInterface } from './Notify'

export const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'

export const PolySymbol = (name: string) => hasSymbol ? Symbol(name) : ('_N_') + name

export const notifyStoreKey = /*#__PURE__*/ PolySymbol('NS') as InjectionKey<NotifyInterface>
