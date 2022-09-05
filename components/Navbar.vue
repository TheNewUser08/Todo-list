<template>
	<nav class="navbar flex-1 justify-end px-20 bg-base-200 bg-opacity-70">
		<div>
			<div v-if="auth.currentUser">{{ auth.currentUser.email }}</div>
			<div>
				<NuxtLink to="/signup" class="btn mx-5">Sign up</NuxtLink>
				<NuxtLink to="/login" class="btn btn-primary">Login</NuxtLink>
			</div>
			<!-- <button v-if="auth.">Sign out</button> -->
		</div>
	</nav>
</template>

<script setup lang="ts">
	import { getAuth, signOut } from 'firebase/auth'
	import { useRouter } from 'vue-router'

	const router = useRouter()

	const auth = getAuth()
	const logout = () => {
		signOut(auth)
			.then(() => {
				router.push('/')
			})
			.catch((err) => {
				alert(err)
			})
	}
</script>

<style scoped></style>
