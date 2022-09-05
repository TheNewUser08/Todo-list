<template>
	<div class="flex justify-center items-center w-full h-screen">
		<div class="w-300 bg-base-200 h-200 p-20 rounded-xl">
			<div class="form-control w-100 h-100">
				<label class="label">Email</label>
				<input
					class="input input-bordered"
					type="email"
					v-model="email"
				/>
				<label class="label">Password</label>
				<input
					class="input input-bordered"
					type="password"
					min="6"
					max="13"
					pattern="/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/"
					v-model="password"
				/>
				<span v-if="error">{{ error }}</span>
				<button
					class="btn btn-primary mt-10"
					@click="signIn"
				>
					Login
				</button>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
	import { useRouter } from 'vue-router'

	const router = useRouter()

	const auth = getAuth()

	const email = ref('')
	const password = ref('')
	const error = ref('')

	const signIn = () => {
		signInWithEmailAndPassword(auth, email.value, password.value)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user
				router.push('/')
				// ...
			})
			.catch((error) => {
				console.log(error.code)
				alert(error.message)
			})
	}
</script>
