<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-toolbar color="primary">
        <v-flex xs1>
          <v-toolbar color="primary">axios eg</v-toolbar>
        </v-flex>
      </v-toolbar>
      <v-flex xs3>
        <v-card>
          <v-card-title primary-title>create</v-card-title>
          <v-card-text>
            <v-textarea v-model="textCreate" rows="10"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="create">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-title primary-title>read</v-card-title>
          <v-card-text>
            <v-textarea v-model="textRead" rows="10"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="read">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-title primary-title>update</v-card-title>
          <v-card-text>
            <v-textarea v-model="textUpdate" rows="10"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="update">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-title primary-title>delete</v-card-title>
          <v-card-text>
            <v-textarea v-model="textDelete" rows="10"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="del">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      textCreate: "",
      textRead: "",
      textUpdate: "",
      textDelete: ""
    };
  },
  methods: {
    async create() {
      //   this.$axios
      //     .post("http://localhost:5000/vue-firebase-toy/us-central1/test")
      //     .then(r => (this.textCreate = r.data))
      //     .catch(e => console.error(e.message));

      const r = await this.$axios.post("test");
      this.textCreate = r.data;
    },
    read() {
      this.$axios
        .get("test/1234123")
        .then(r => (this.textRead = r.data))
        .catch(e => console.error(e.message));
    },
    update() {
      this.$axios
        .put("http://localhost:5000/vue-firebase-toy/us-central1/test/12345")
        .then(r => (this.textUpdate = r.data))
        .catch(e => console.error(e.message));
    },
    del() {
      this.$axios
        .delete(
          "http://localhost:5000/vue-firebase-toy/us-central1/test/124412"
        )
        .then(r => (this.textDelete = r.data))
        .catch(e => console.error(e.message));
    }
  }
};
</script>