<template>
  <header class="the-header">
  <img src="../assets/logo.png" class="the-header__logo" alt="To-Do icon">
  <h4 class="text-center pt-3">My To-Do List</h4>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'  
}
</script>

<style>
.the-header__logo {
  display: block;
  margin: 0 auto;
  width: 50px;
  height: 50px;
}
</style>