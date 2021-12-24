<template>
   <div class="nav">
      <router-link to="/">ログイン</router-link> |
      <router-link to="/signup">新規登録</router-link>
   </div>
</template>

<script>
export default {
   name:"HeaderLink"
}
</script>

<style scoped>
.nav {
   text-align: center;
   padding: 30px;
}
.nav a {
   font-weight: bold;
   color: #2c3e50;
}
.nav a.router-link-exact-active {
   color: #2b81d6;
}
</style>
