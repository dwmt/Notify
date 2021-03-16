import {Notification, NotifyInterface} from "./Notify";

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $notification: NotifyInterface
        $notify: (notification: Notification | Array<Notification>) => void
    }
}
