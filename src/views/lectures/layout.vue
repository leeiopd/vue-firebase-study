<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="i in 9" :key="i">
        <v-card color="red">
          <v-card-title primary-title>title</v-card-title>
          <v-card-text>fjsdklfjsdklajlk</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card color="red">
          <v-card-title primary-title>title</v-card-title>
          <v-card-text>fjsdklfjsdklajlk</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>
