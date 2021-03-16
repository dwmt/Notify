import { inject, onErrorCaptured } from 'vue'
import { notifyStoreKey } from './symbols'
import { NotifyInterface } from './Notify'


export function useNotification(): NotifyInterface {
    return inject(notifyStoreKey)!
}
