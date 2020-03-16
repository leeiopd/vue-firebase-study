<template>
  <div>
    <p>user profile</p>
    <!-- {{$store.state.claims.level}} -->
    {{ JSON.stringify($store.state.claims, null, 2) }}
    <v-btn color="success" @click="tokenUpdate">tokenUpdate</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    async tokenUpdate() {
      const user = this.$firebase.auth().currentUser;
      await user.getIdToken(true);
      await this.$store.dispatch("getUserToken", user);
    }
  }
};
</script>