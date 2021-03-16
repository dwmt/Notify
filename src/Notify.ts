import { App, ref, Ref, unref } from 'vue'
import { notifyStoreKey } from './symbols'
import Notifications from './components/Notifications.vue'
export {useNotification} from './composition'
import './styles.css'

type NotifyOptions = {
	overlap?: boolean
	verticalAlign?: string
	horizontalAlign?: string
	type?: string
	timeout?: number
	closeOnClick?: boolean
	showClose?: boolean
}

export type Notification = NotifyOptions & {
	timestamp?: Date,
	message: string,
	title?: string,
	icon?: string,
	onClick?: (event: any) => void,
	component?: any
}

export interface NotifyInterface {
	state: Ref<Array<Notification>>
	overlap: boolean
	verticalAlign: string
	horizontalAlign: string
	type: string
	timeout: number
	closeOnClick: boolean
	showClose: boolean
	currentState: Array<Notification>
	clear(): void
	removeNotification(timestamp: Date): void
	$notify(notification: Notification | Array<Notification>): void
}

export class Notify implements NotifyInterface{
	state: Ref<Array<Notification>>
	overlap: boolean
	verticalAlign: string
	horizontalAlign: string
	type: string
	timeout: number
	closeOnClick: boolean
	showClose: boolean

	constructor (options: NotifyOptions = {}) {
		this.state = ref(new Array<Notification>())
		this.overlap = options.overlap ?? false
		this.verticalAlign = options.verticalAlign ?? 'top'
		this.horizontalAlign = options.horizontalAlign ?? 'right'
		this.type = options.type ?? 'info'
		this.timeout = options.timeout ?? 5000
		this.closeOnClick = options.closeOnClick ?? true
		this.showClose = options.showClose ?? true
	}

	get currentState (): Array<Notification> {
		return unref(this.state)
	}

	get settings (): NotifyOptions {
		return {
			overlap: this.overlap,
			verticalAlign: this.verticalAlign ,
			horizontalAlign: this.horizontalAlign ,
			type: this.type ,
			timeout: this.timeout ,
			closeOnClick: this.closeOnClick ,
			showClose: this.showClose
		}
	}

	removeNotification(timestamp: Date): void {
		const indexToDelete = this.state.value.findIndex((notification: Notification) => notification.timestamp === timestamp)
		if (indexToDelete !== -1) {
			this.state.value.splice(indexToDelete, 1)
		}
	}
	addNotification(notification: Notification) {
		let baseNotificationObject: Notification = {...this.settings, message: '', timestamp: new Date()}
		baseNotificationObject.timestamp!.setMilliseconds(baseNotificationObject.timestamp!.getMilliseconds() + this.state.value.length)
		baseNotificationObject.message = notification.message
		baseNotificationObject.title = notification.title
		baseNotificationObject.icon = notification.icon
		baseNotificationObject.onClick = notification.onClick ?? function (event) {}
		baseNotificationObject.component = notification.component

		baseNotificationObject.overlap = notification.overlap ?? this.overlap
		baseNotificationObject.verticalAlign = notification.verticalAlign ?? this.verticalAlign
		baseNotificationObject.horizontalAlign = notification.horizontalAlign ?? this.horizontalAlign
		baseNotificationObject.type = notification.type ?? this.type
		baseNotificationObject.timeout = notification.timeout ?? this.timeout
		baseNotificationObject.closeOnClick = notification.closeOnClick ?? this.closeOnClick
		baseNotificationObject.showClose = notification.showClose ?? this.showClose
		this.state.value.push(baseNotificationObject)
	}
	$notify(notification: Notification | Array<Notification>) {
		if (Array.isArray(notification)) {
			notification.forEach((notificationInstance: Notification) => {
				this.addNotification(notificationInstance)
			})
		} else {
			this.addNotification(notification)
		}

	}
	clear() {
		this.state.value = []
	}

	install (app: App) {
		const store: NotifyInterface = this
		app.component('Notifications', Notifications)
		app.provide(notifyStoreKey, store)
		app.config.globalProperties.$notification = store
		// NOTE: Legacy support (this.$notify function calls...)
		app.config.globalProperties.$notify = store.$notify.bind(store)
	}
}

export function createNotify() {
	return new Notify()
}
