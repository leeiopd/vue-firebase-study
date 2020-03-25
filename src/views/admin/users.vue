<template>
  <v-card>
    <!-- <v-card-title primary-title>
      <v-combobox
        v-model="search"
        :items="emails"
        label="이메일로 검색"
        :loading="loadingSearch"
        @update:search-input="searchEmails"
      ></v-combobox>
    </v-card-title>-->
    <v-toolbar dark color="teal">
      <v-toolbar-title>회원관리</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-autocomplete
        v-model="email"
        :loading="loadingSearch"
        :items="emails"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="검색하실 이메일을 입력하세요."
        solo-inverted
        clearable
      ></v-autocomplete>
    </v-toolbar>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :options.sync="options"
        :server-items-length="totalCount"
        :loading="loading"
        must-sort
        class="elevation-1"
      ></v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="list">get list</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      totalCount: 0,
      items: [],
      loading: false,
      options: { sortBy: ["email"], sortDesc: [false] },
      headers: [
        {
          text: "유저키",
          value: "uid"
        },
        { text: "email", value: "email" },
        { text: "이름", value: "displayName" },
        { text: "photoURL", value: "photoURL" }
      ],
      search: "",
      emails: [],
      email: null,
      loadingSearch: false
    };
  },
  watch: {
    // options의 변경을 감지
    options: {
      handler() {
        this.list();
      },
      deep: true
    },
    // search의 변경을 감지
    search(val) {
      val && val !== this.searchEmails(val);
    }
  },
  methods: {
    // 사용자 data load & listup
    async list() {
      // loading 시작
      this.loading = true;

      // firebase_function에 요청
      const r = await this.$axios.get("/admin/users", {
        // 첨부 파라미터
        params: {
          offset:
            this.options.page > 0
              ? (this.options.page - 1) * this.options.itemsPerPage
              : 0,
          // 가져올 아이템 갯수
          limit: this.options.itemsPerPage,
          order: this.options.sortBy[0],
          sort: this.options.sortDesc[0] ? "desc" : "asc",
          search: this.search
        }
      });

      this.totalCount = r.data.totalCount;
      this.items = r.data.items;
      this.loading = false;
    },

    // email 검색창
    searchEmails: _.debounce(
      function(val) {
        // 함수 발동시, loading 활성화
        this.loadingSearch = true;

        // 검색어 filter 요청
        this.$axios
          .get("/admin/search", {
            params: {
              search: this.search
            }
          })
          .then(({ data }) => {
            this.emails = data;
            // this.list();
          })
          // async 가 아닌 promise 이므로 error catch 처리
          .catch(e => {
            // error 처리
            this.$toasted.global.error(e.message);
          })
          // 동작 완료 후
          .finally(() => {
            // loading 비활성화
            this.loadingSearch = false;

            // 검색결과 listup 함수 발동
            this.list();
          });
      },
      // 사용자가 입력을 기다리는 시간(밀리세컨드) 입니다.
      500
    )
  }
};
</script>