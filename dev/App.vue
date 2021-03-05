<template>
<div>
	<h1>Hi!</h1>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'App',
	mounted () {
		console.log(this.$hello)
	}
})
</script>
