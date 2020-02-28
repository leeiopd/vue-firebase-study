<template>
  <div>
    <v-btn color="success" @click="set">set</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    set() {
      // vuex 함수인 setTitle 실행
      this.$store.commit("setTitle", "변했니?");
    }
  }
};
</script>