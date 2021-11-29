<template>
  <v-form v-model="valid">
    <v-container fill-height fluid fill-width>
      <v-col cols="5" md="5">
        <v-btn to="/login">Do you have an account? Log in!</v-btn>
      </v-col>

      <v-col cols="12" md="5">
        <v-row align="center" justify="center">
          <v-text-field
            v-model="userRegData.nickname"
            :rules="[maxLength, minLength]"
            :counter="20"
            label="Nickname"
            required
          ></v-text-field>
        </v-row>

        <v-row cols="12" md="4">
          <v-text-field
            v-model="userRegData.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-row>

        <v-row cols="12" md="4">
          <v-text-field
            v-model="userRegData.password"
            type="password"
            label="Password"
            required
          ></v-text-field>
        </v-row>

        <v-row cols="10" md="4" justify="center">
          <v-btn class="btn" type="submit" @click.prevent="sendUserRegData"
            >Create an account</v-btn
          >
        </v-row>
      </v-col>
    </v-container>
  </v-form>
</template>

<style>
.container.fill-height {
  justify-content: center;
  margin-top: 100px;
}
</style>

<script>
//import rules from '../utils/form-validation-rules.js'
import { Component, namespace, Vue } from "nuxt-property-decorator";
const { State, Action } = namespace("user");

@Component({
  layout: "empty",
  components: {},
})
export default class RegisterPage extends Vue {
  @State details;
  @Action saveUser;

  // data() {
  //   return {
  //     required: rules.required,
  //     minLength: rules.minLength,
  //     maxLength: rules.maxLength,
  //     // password: rules.password,
  //     // email: rules.email,
  //     avatarRules: rules.avatar,
  //   };
  // }

  userRegData = {
    nickname: "",
    password: "",
    email: "",
  };

  async sendUserRegData() {
    console.log(this.userRegData);
    await this.saveUser(this.userRegData);
    //await this.$axios.$post("http://localhost:4000/users", this.userRegData);

    this.userRegData.nickname = "";
    this.userRegData.email = "";
    this.userRegData.password = "";
  }
}
</script>