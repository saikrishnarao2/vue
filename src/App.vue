<template>
  <div class="todoapp">
    <TheHeader />
    <router-view />
  </div>
</template>

<script>
import TheHeader from '@/components/the-header.vue'

export default {
  name: 'App',
  components: { TheHeader }
}
</script>

<style>
.todoapp {
  max-width: var(--max-width-sm);
  margin: 40px auto 40px;
  padding: var(--size-base-x-3);
	background: #fff;
	box-shadow: var(--box-shadow);
}
</style>
