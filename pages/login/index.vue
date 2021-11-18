<template>
  <div class="container">
    <v-container>
      <v-column>
        <v-container>
          <v-row>
            <v-btn to="login/register"
              >Don't have an account? Create one!</v-btn
            >
          </v-row>
        </v-container>

        <v-container>
          <v-form>
            <v-row justify="center">
              <v-text-field
                v-model="logInData.email"
                placeholder="email.."
                label="email"
              />
            </v-row>

            <v-row justify="center">
              <v-text-field
                v-model="logInData.password"
                placeholder="password.."
                label="password"
              />
            </v-row>

            <v-row justify="center">
              <v-btn class="btn" type="submit" @click.prevent="logIn"
                >Log in</v-btn
              >
            </v-row>
          </v-form>
        </v-container>
      </v-column>
    </v-container>
  </div>
</template>

<script>
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  layout: "empty",
})
export default class LoginPage extends Vue {
  logInData = {
    email: "",
    password: "",
  };

  async logIn() {
    await this.$axios.$post("http://localhost:4000/users/login", this.userSettings);

    console.log(this.logInData);
    this.logInData.email = "";
    this.logInData.password = "";
  }
}
</script>