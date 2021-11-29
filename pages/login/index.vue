<template>
  <v-form v-model="valid">
    <v-container fill-height fluid fill-width>
      <v-col cols="5" md="5">
        <v-btn to="login/register">Don't have an account? Create one!</v-btn>
      </v-col>

      <v-col cols="12" md="5">
        <v-row align="center" justify="center">
          <v-text-field
            v-model="logInData.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-row>

        <v-row cols="12" md="4">
          <v-text-field
            v-model="logInData.password"
            type="password"
            label="Password"
            required
          ></v-text-field>
        </v-row>

        <v-row cols="10" md="4" justify="center">
          <v-btn class="btn" type="submit" @click.prevent="sendLogInData"
            >Log in</v-btn
          >
        </v-row>
      </v-col>
    </v-container>
  </v-form>
</template>

<style scoped>
.container.fill-height {
  justify-content: center;
  margin-top: 166px;
}
</style>

<script>
import { Component, Vue, namespace } from "nuxt-property-decorator";
const { State, Action } = namespace("user");

@Component({
  layout: "empty",
  components: {},
})
export default class LoginPage extends Vue {
  @State userJWT;
  @Action getUserJwt;

  logInData = {
    email: "",
    password: "",
  };

  async sendLogInData() {
    await this.getUserJwt(this.logInData);

    this.logInData.email = "";
    this.logInData.password = "";
  }
}
</script>