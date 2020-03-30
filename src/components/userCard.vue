<template>
  <v-card :loading="loading">
    <v-list-item three-line>
      <v-avatar class="ma-2" size="125" tile>
        <!-- filter 사용으로 photoURL null 처리 -->
        <v-img :src="item.photoURL|imgCheck"></v-img>
      </v-avatar>
      <v-list-item-content class="aling-self-start">
        <v-list-item-title class="headline mb-2" v-text="item.email"></v-list-item-title>
        <!-- filter 사용으로 displayName null 처리 -->
        <v-list-item-subtitle>{{item.displayName | nameCheck}}</v-list-item-subtitle>
        <v-list-item-subtitle>
          <v-select
            class="ma-2"
            v-model="item.claims.level"
            :items="levels"
            dense
            solo
            hide-details
            @change="levelChange(item)"
          ></v-select>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      loading: false,
      levels: [
        { value: 0, text: "관리자" },
        { value: 1, text: "사용자" },
        { value: 2, text: "손님" }
      ]
    };
  },
  //   텍스트 형식화 가능
  filters: {
    nameCheck(displayName) {
      if (displayName) return displayName;
      return "이름 없음";
    },
    imgCheck(photoURL) {
      if (photoURL) return photoURL;
      return "https://cdn.vuetifyjs.com/images/cards/foster.jpg";
    }
  },
  methods: {
    levelChange(v) {
      this.loading = true;
      this.$axios
        .patch(`/admin/user/${v.uid}/level`, {
          level: v.claims.level
        })
        .catch(e => {
          this.$toasted.global.error(e.message);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
</style>