<template>
  <v-card color="transparent" height="500">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-card-title primary-title>
        <span class="title">로그인</span>
        <v-spacer></v-spacer>
        <span class="caption" mr-5>또는</span>
        <a @click="$emit('changeType')">계정 만들기</a>
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary" block @click="signInWithGoogle">
          <v-icon>mdi-google</v-icon>
          <v-divider vertical class="mx-3"></v-divider>Google 계정으로 로그인
        </v-btn>
      </v-card-actions>
      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex xs5>
            <v-divider class="mt-2"></v-divider>
          </v-flex>
          <v-flex xs2>또는</v-flex>
          <v-flex xs5>
            <v-divider class="mt-2"></v-divider>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-text>
        <v-text-field
          label="이메일"
          v-model="form.email"
          :rules="[rule.required, rule.minLength(1), rule.maxLength(10)]"
        ></v-text-field>
        <v-text-field
          label="비밀번호"
          v-model="form.password"
          :rules="[rule.required, rule.minLength(1), rule.maxLength(6)]"
        ></v-text-field>
        <div class="recapcha">이 페이지는 reCAPTCHA로 보호되며, Google 개인정보처리방침 및 서비스 약관의 적용을 받습니다.</div>
      </v-card-text>
      <v-card-actions>
        <v-checkbox label="로그인 정보 저장"></v-checkbox>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="!valid" @click="signInWithEmailAndPassword">로그인</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      form: {
        email: "",
        password: ""
      },
      rule: {
        required: v => !!v || "필수 항목 입니다.",
        minLength: length => v =>
          v.length >= length || `${length} 이상으로 입력하세요`,
        maxLength: length => v =>
          v.length <= length || `${length} 이하로 입력하세요.`,
        email: v => /.+@.+/.test(v) || "이메일 형식이 맞지 않습니다.",
        agree: v => !!v || "약관에 동의가 필요합니다."
      }
    };
  },
  methods: {
    async signInWithGoogle() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase.auth().languageCode = "ko";

      const r = await this.$firebase.auth().signInWithPopup(provider);
      // console.log(this);
    },
    async signInWithEmailAndPassword() {
      if (!this.$refs.form.validate())
        return this.$toasted.global.error("입력 폼을 전부 작성해 주세요.");
      await this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password);
    }
  }
};
</script>

<style scoped>
.recapcha {
  font-size: 12px;
  font-weight: 200;
  color: #637282;
}
</style>