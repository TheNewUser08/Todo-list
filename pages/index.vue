<template>
	<h1 class="font-bold text-4xl text-center">Todo</h1>
	<div class="h-screen flex items-center flex-col">
		<div class="mb-3">
			<input type="text" class="input" v-model="text" />
			<button class="btn btn-primary" @click="addTodo">add</button>
		</div>
		<div
			v-if="todos"
			v-for="todo in todos"
			class="flex items-center justify-start mx-5"
		>
			<input
				type="checkbox"
				class="checkbox mx-2"
				:checked="todo.isFinish"
				@click="check(todo)"
			/>
			<span class="mx-2">{{ todo.text }}</span>
			<button class="btn btn-secondary btn-sm" @click="deleteTodo(todo)">
				X
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		collection,
		addDoc,
		onSnapshot,
		doc,
		deleteDoc,
		updateDoc,
	} from 'firebase/firestore'
	import { db } from '@/firebase'
	import { onMounted, Ref } from 'vue'

	interface todo {
		text: string
		isFinish: boolean
		id: string
	}

	const todos: Ref<todo[]> = ref([])
	const text: Ref<string> = ref('')

	const addTodo = async (): Promise<void> => {
		try {
			const docRef = await addDoc(collection(db, 'todos'), {
				text: text.value,
				isFinish: false,
			})
			console.log(text.value)
			console.log(docRef.id)
		} catch (err) {
			alert(err)
		}
	}

	const deleteTodo = async (todo: todo): Promise<void> => {
		await deleteDoc(doc(db, 'todos', todo.id))
	}

	const check = async (todo: todo) => {
		const docRef = doc(db, 'todos', todo.id)
		await updateDoc(docRef, { isFinish: !todo.isFinish })
	}

	const fetchData = async (): Promise<void> => {
		onSnapshot(collection(db, 'todos'), (querySnapshot) => {
			const temTodos: todo[] = []
			querySnapshot.forEach((doc) => {
				const todo = {
					text: doc.data().text,
					id: doc.id,
					isFinish: doc.data().isFinish,
				}
				temTodos.push(todo)
			})
			todos.value = temTodos
		})
	}

	onMounted(async () => {
		fetchData()
	})
</script>

<style scoped></style>
