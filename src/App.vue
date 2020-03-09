<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-toolbar flat>
        <v-toolbar-title>Account</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.subItems" :key="subItem.title" :to="subItem.to">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="indigo" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="$store.state.user"></v-app-bar-nav-icon>
      <v-toolbar-title>test 0.0.1</v-toolbar-title>
      <!-- <v-toolbar-title>{{ $store.state.token ? $store.state.token: '토큰없음 안됨' }}</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.user">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon dark v-on="on">
              <v-avatar :size="32" color="grey lighten-4">
                <img :src="$store.state.user.photoURL" alt="avatar" />
              </v-avatar>
            </v-btn>
          </template>
          <v-card width="320">
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-avatar :size="96" color="grey lighten-4">
                    <img :src="$store.state.user.photoURL" alt="avatar" />
                  </v-avatar>
                </v-flex>
                <v-flex xs8>
                  <v-card-text>
                    <span class="font-weight-bold">{{ $store.state.user.displayName}}</span>
                    <br />
                    <span class="font-weight-thin">{{ $store.state.user.email}}</span>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signOut">로그아웃</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <vue-progress-bar></vue-progress-bar>
      <v-container grid-list-md v-if="!$isFirebaseAuth">
        <v-layout row wrap align-center justify-center>
          <v-card color="transparent" flat>
            <v-card-text class="text-xs-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-card-text>
            <v-card-text class="text-xs-center">인증 상태를 기다리는 중입니다.</v-card-text>
          </v-card>
        </v-layout>
      </v-container>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "mdi-alert",
          title: "home",
          to: "/",
          active: true,
          subItems: [
            {
              title: "dashboard",
              to: "/"
            },
            {
              title: "About2",
              to: "/about2"
            }
          ]
        },
        {
          icon: "mdi-alert-circle",
          title: "Lectures",
          active: false,
          subItems: [
            {
              title: "card",
              to: "/lectures/card"
            },
            {
              title: "layout",
              to: "/lectures/layout"
            },

            {
              title: "notes",
              to: "/lectures/notes"
            }
          ]
        }
      ]
    };
  },
  methods: {
    async signOut() {
      const r = await this.$firebase.auth().signOut();
      // console.log(r);
    }
  }
};
</script>
