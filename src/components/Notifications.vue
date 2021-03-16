<template>
	<div class="notifications vue-notifyjs">
		<transition-group :name="transitionName" :mode="transitionMode">
			<Notification
				v-for="notification of notifications"
				:horizontalAlign="notification.horizontalAlign"
				:verticalAlign="notification.verticalAlign"
				:icon="notification.icon"
				:message="notification.message"
				:title="notification.title"
				:timeout="notification.timeout"
				:type="notification.type"
				:component="notification.component"
				:timestamp="notification.timestamp"
				:closeOnClick="notification.closeOnClick"
				:clickHandler="notification.onClick"
				:showClose="notification.showClose"
				:key="notification.timestamp.getTime()"
				@close="removeNotification"
			/>
		</transition-group>
	</div>
</template>
<script lang="ts">
import Notification from './Notification.vue'
import {defineComponent, ref, watch} from 'vue'
import { useNotification } from '../composition'

export default defineComponent({
	components: {Notification},
	props: {
		transitionName: {
			type: String,
			default: 'list'
		},
		transitionMode: {
			type: String,
			default: 'in-out'
		},
		overlap: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		const $notification = useNotification()
		$notification.overlap = props.overlap
		const removeNotification = function (timestamp: Date) {
			$notification.removeNotification(timestamp)
		}
		const overlap = ref(props.overlap)
		watch(overlap, (newVal, prevVal) => {
			$notification.overlap = newVal
		})
		return {
			notifications: $notification.state,
			removeNotification
		}
	}
})
</script>
