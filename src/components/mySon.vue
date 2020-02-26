<template>
  <v-card>
    <v-card-title primary-title>아들 이름: {{name}}</v-card-title>
    <v-card-actions>
      <v-sapcer></v-sapcer>
      <v-btn @click="call">call</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  // 엄마에게 전달 받음
  props: ["name"],
  methods: {
    call() {
      // 엄마에게 보고
      this.$emit("help");
    }
  }
};
</script>