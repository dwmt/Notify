<template>
	<div
		:onClick="tryClose"
		data-notify="container"
		:class="['alert open ', {'alert-with-icon': this.icon}, this.verticalAlign, this.horizontalAlign, this.alertType]"
		role="alert"
		:style="customPosition"
		data-notify-position="top-center">
		<button
			v-if="showClose"
			type="button"
			aria-hidden="true"
			class="close col-xs-1"
			data-notify="dismiss"
			@click="close">×</button>
		<span v-if="icon" data-notify="icon" :class="['alert-icon', this.icon]"></span>
		<span data-notify="message">
			<span v-if="title" class="title"><b>{{ title }}<br/></b></span>
			<span v-if="message">{{ message }}</span>
		</span>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Notification } from '../Notify'
export default defineComponent({
	name: 'notification',
	emits: ['close'],
	props: {
		message: String,
		title: String,
		icon: String,
		verticalAlign: {
			type: String,
			default: 'top',
			validator: (value: string) => {
				let acceptedValues = ['top', 'bottom']
				return acceptedValues.indexOf(value) !== -1
			}
		},
		horizontalAlign: {
			type: String,
			default: 'right',
			validator: (value: string) => {
				let acceptedValues = ['left', 'center', 'right']
				return acceptedValues.indexOf(value) !== -1
			}
		},
		type: {
			type: String,
			default: 'info',
			validator: (value: string) => {
				let acceptedValues = ['info', 'primary', 'danger', 'warning', 'success']
				return acceptedValues.indexOf(value) !== -1
			}
		},
		timeout: {
			type: Number,
			default: 5000,
			validator: (value: number) => {
				return value >= 0
			}
		},
		timestamp: {
			type: Date,
			default: () => new Date()
		},
		component: {
			type: [Object, Function]
		},
		showClose: {
			type: Boolean,
			default: true
		},
		closeOnClick: {
			type: Boolean,
			default: true
		},
		clickHandler: Function,
	},
	data () {
		return {
			elmHeight: 0
		}
	},
	computed: {
		hasIcon (): boolean {
			return !!this.icon && this.icon.length > 0
		},
		alertType (): string {
			return `alert-${this.type}`
		},
		customPosition () {
			let initialMargin = 20
			let alertHeight = this.elmHeight + 10;
			let sameAlertsCount = this.$notification.currentState.filter((alert: Notification) => {
				return alert.horizontalAlign === this.horizontalAlign && alert.verticalAlign === this.verticalAlign && alert.timestamp <= this.timestamp
			}).length
			if (this.$notification.overlap) {
				sameAlertsCount = 1
			}
			let pixels = (sameAlertsCount - 1) * alertHeight + initialMargin
			let styles: any = {}
			if (this.verticalAlign === 'top') {
				styles.top = `${pixels}px`
			} else {
				styles.bottom = `${pixels}px`
			}
			return styles
		}
	},
	methods: {
		close () {
			this.$emit('close', this.timestamp)
		},
		tryClose (evt: any) {
			if(this.clickHandler){
				this.clickHandler(evt, this)
			}
			if (this.closeOnClick) {
				this.close()
			}
		}
	},
	mounted () {
		this.elmHeight = this.$el.clientHeight
		if (this.timeout) {
			setTimeout(this.close, this.timeout)
		}
	}
})
</script>
