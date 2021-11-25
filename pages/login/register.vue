<template>
  <div class="container">
    <v-column>
      <v-container>
        <v-row>
          <div>
            <v-btn to="/login">Do you have an account? Log in!</v-btn>
          </div>
        </v-row>
      </v-container>

      <v-container>
        <v-form>
          <v-row justify="center">
            <v-text-field
              v-model="userRegData.nickname"
              placeholder="nickname.."
              label="nickname"
            />
          </v-row>

          <v-row justify="center">
            <v-text-field
              v-model="userRegData.email"
              placeholder="email.."
              label="email"
            />
          </v-row>

          <v-row justify="center">
            <v-text-field
              v-model="userRegData.password"
              placeholder="password.."
              label="password"
            />
          </v-row>

          <v-row justify="center">
            <v-btn class="btn" type="submit" @click.prevent="sendUserRegData"
              >Create an account</v-btn
            >
          </v-row>
        </v-form>
      </v-container>
    </v-column>
  </div>
</template>

<style>
.container {
  padding: 15px;
  margin-right: 0;
  margin-left: 0;
}

.content {
  display: flex;
}

.v-application .mt-n5 {
  margin-bottom: 16px;
}
</style>

<script>
import { Component, namespace, Vue } from "nuxt-property-decorator";
const { State, Action } = namespace("user");

@Component({
  layout: "empty",
  components: {},
})
export default class RegisterPage extends Vue {
  @State details;
  @Action saveUser;

  userRegData = {
    nickname: "",
    password: "",
    email: "",
  };

  async sendUserRegData() {
    console.log(this.userRegData);
    await this.saveUser(this.userRegData)
    //await this.$axios.$post("http://localhost:4000/users", this.userRegData);

    this.userRegData.nickname = "";
    this.userRegData.email = "";
    this.userRegData.password = "";
  }
}
</script>