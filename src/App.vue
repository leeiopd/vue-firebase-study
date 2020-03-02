<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed>
      <v-toolbar flat>
        <v-toolbar-title>Account</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <!-- <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
          <v-list-tile-avatar>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn color="success">text</v-btn>
          </v-list-tile-action>
        </v-list-tile>-->
        <v-list-group
          v-model="item.active"
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile v-for="subItem in item.subItems" :key="subItem.title" :to="subItem.to">
            <v-list-tile-content>
              <v-list-tile-title>{{subItem.title}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{subItem.icon}}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ $store.state.user ? $store.state.user.displayName: '로그인 안됨' }}</v-toolbar-title>
      <!-- <v-toolbar-title>{{ $store.state.token ? $store.state.token: '토큰없음 안됨' }}</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon @click="signOut">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

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
      // const r = await this.$firebase.auth().signOut();
      // console.log(r);
    }
  }
};
</script>
