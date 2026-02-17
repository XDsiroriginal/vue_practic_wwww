<script>

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const userData = {
        email: this.username,
        password: this.password,
      };

      this.$store.dispatch('AUTH_REQUEST', userData).then(() => this.$router.push("/")).catch((err) => {
        console.error("Ошибка входа:", err);
      });

    },
  },
};
</script>

<template>
  <form class="login" @submit.prevent="login">
    <h1>Sign-in</h1>
    <label>User name</label>
    <input type="email" required v-model="username" />
    <label>Password</label>
    <input type="password" required v-model="password" />
    <hr />
    <button type="submit">Login</button>
  </form>
</template>

<style scoped>
  .login {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
    margin: 0 auto;
  }
  .login input, button {
    border: 1px solid black;
    border-radius: 5px;
  }

  hr {
    margin: 10px 0;
  }
</style>