<template>
  <v-card color="transparent" height="500">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-card-title primary-title>
        <span class="title">회원가입</span>
        <v-spacer></v-spacer>
        <span class="caption" mr-5>또는</span>
        <a @click="$emit('changeType')">로그인</a>
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary" block @click="signInWithGoogle">
          <v-icon>mdi-google</v-icon>
          <v-divider vertical class="mx-3"></v-divider>Google 계정으로 가입
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
          label="성"
          v-model="form.lastName"
          :rules="[rule.required, rule.minLength(1), rule.maxLength(2)]"
        ></v-text-field>
        <v-text-field
          label="이름"
          v-model="form.firstName"
          :rules="[rule.required, rule.minLength(1), rule.maxLength(10)]"
        ></v-text-field>
        <v-text-field
          label="이메일"
          v-model="form.email"
          :rules="[rule.required, rule.minLength(7), rule.maxLength(50), rule.email]"
        ></v-text-field>
        <v-text-field
          label="비밀번호"
          type="password"
          v-model="form.password"
          :rules="[rule.required, rule.minLength(6), rule.maxLength(50)]"
        ></v-text-field>
        <div class="recapcha">이 페이지는 reCAPTCHA로 보호되며, Google 개인정보처리방침 및 서비스 약관의 적용을 받습니다.</div>
      </v-card-text>
      <v-card-actions>
        <v-checkbox label="약관에 동의함" v-model="agree" :rules="[rule.agree]" required></v-checkbox>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="!valid" @click="createInWithEmailAndPassword">회원가입</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      agree: false,
      form: {
        firstName: "",
        lastName: "",
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

      await this.$firebase.auth().signInWithPopup(provider);
      await this.$firebase.auth().signOut();
      this.$emit("changeType");

      // 커스텀 클래임 및 보안규칙으로 엑세스 제어
      // 클라이언트 맞춤 클레임 전파
      // 맞춤 클레임이 수정 된 후 사용자가 로그인하거나 다시 인증하여 -> ID 토큰의 강제 새로고침 됨
      // await this.$firebase.auth().currentUser.getIdToken(true);
    },
    async createInWithEmailAndPassword() {
      if (!this.$refs.form.validate())
        return this.$toasted.global.error("입력 폼을 전부 작성해 주세요.");

      await this.$firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password);
      const user = this.$firebase.auth().currentUser;
      await user.updateProfile({
        displayName: `${this.form.lastName} ${this.form.firstName}`
      });

      await this.$firebase.auth().signOut();
      this.$emit("changeType");
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