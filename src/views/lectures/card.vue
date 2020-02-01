<template>
  <v-layout class="ma-4">
    <v-flex xs123 sm6 offset-sm3>
      <!-- vcard는 레이아웃을 잡는 용도로 많이 쓴다 -->
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>here</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" icon>
            <v-icon>mdi-arrange-bring-forward</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>{{card_text}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat>click</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      card_text: "texfdsfsdt"
    };
  }
};
</script>
