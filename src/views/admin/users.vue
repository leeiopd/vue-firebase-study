<template>
  <v-container grid-list-md fluid>
    <v-card>
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
        <v-btn icon @click="list" :disabled="loading">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-data-iterator
          :items="items"
          :server-items-length="totalCount"
          :options.sync="options"
          :items-per-page="4"
        >
          <!-- vu-slot은 자식컴포넌트의 엘리먼트를 부모에서 지정할 때 사용합니다. -->
          <!--  v-slot은 반드시 <template>로 감싸서 사용해야합니다.-->
          <template v-slot:default="props">
            <v-layout row wrap>
              <v-flex xs12 v-if="loading" class="text-center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                <p>로딩중 입니다.</p>
              </v-flex>
              <v-flex v-else v-for="item in props.items" :key="item.email" xs12 sm6 md4 lg3>
                <user-card :item="item"></user-card>
              </v-flex>
            </v-layout>
          </template>
        </v-data-iterator>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import _ from "lodash";
import userCard from "../../components/userCard";
export default {
  components: {
    userCard
  },
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
    },

    email(n, o) {
      if (n !== o) this.list();
    }
  },
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
          search: this.email
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
          });
      },
      // 사용자가 입력을 기다리는 시간(밀리세컨드) 입니다.
      500
    )
  }
};
</script>