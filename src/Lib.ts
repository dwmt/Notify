import { App } from 'vue'
export class Lib {
	name: string
	constructor (name: string) {
		this.name = name
	}
	install (app: App) {
		app.config.globalProperties.$hello = this.name
	}
}

export function createLib(name: string) {
	return new Lib(name)
}
