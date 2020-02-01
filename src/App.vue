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
    <v-toolbar color="lime">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
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
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>
