<template>
<div>
	<h1>Hi!</h1>
	<button @click="notifyUser">Noti</button>
	<notifications></notifications>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {useNotification} from '../src/Notify'
export default defineComponent({
	name: 'App',
	setup (props) {
		const $notification = useNotification()
		const notifyUser = function () {
			$notification.$notify({
				title: 'Hello',
				message: 'asdka'
			})
		}
		return {
			notifyUser
		}
	}
})
</script>
