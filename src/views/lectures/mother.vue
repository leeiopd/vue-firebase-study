<template>
  <v-card>
    <!-- name - 아들에게 전달할 인자 (엄마 -> 아들)
           help - 아들에게 전달받은 인자( 아들 -> 엄마)
    -->
    <my-son name="aaa" @help="listen"></my-son>
    <my-son name="bbb"></my-son>
    <my-son name="ccc"></my-son>
    <my-son name="ddd"></my-son>
    <my-son name="eee"></my-son>
    <my-dougther></my-dougther>
    <v-card-text>
      <v-alert v-model="call" type="success">call 성공</v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import MySon from "@/components/mySon";
import MyDougther from "@/components/myDougther";
export default {
  components: {
    MySon,
    MyDougther
  },
  data() {
    return {
      call: false
    };
  },
  methods: {
    //   엄마에게 보고 받은것을 띄움
    listen() {
      this.call = true;

      // 변화를 확인하지 못함 -> title 변화 X
      this.$global = "변했다.";
    }
  }
};
</script>