<template>
  <!-- <v-form v-model="valid"> -->
  <v-container fill-height fluid fill-width>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="mx-auto" max-width="520" color="rgb(255,242,245)">
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-card-title class="text-h2 justify-center"
                >Welcome</v-card-title
              >
              <!-- <v-card-subtitle
              >Listen to your favorite artists and albums whenever and wherever,
              online and offline.</v-card-subtitle
            > -->

              <v-card-actions>
                <!-- <v-col cols="12" md="5"> -->
                <v-row align="center" justify="center">
                  <v-btn color="rgb(255,242,245)" to="login/register"
                    >Don't have an account? Create one!</v-btn
                  >
                </v-row>
              </v-card-actions>
              <v-card-actions>
                <v-row align="center" justify="center">
                  <v-text-field
                    v-model="logInData.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-row>
              </v-card-actions>
              <v-card-actions>
                <v-row align="center" justify="center">
                  <v-text-field
                    v-model="logInData.password"
                    type="password"
                    label="Password"
                    required
                  ></v-text-field>
                </v-row>
              </v-card-actions>
              <!-- <v-row cols="10" md="4" justify="center">
          <v-btn
            class="btn"
            type="submit"
            @click.prevent="sendLogInData"
            color="purple lighten-2"
            >Log in</v-btn
          >
        </v-row> -->
              <v-card-actions />
              <v-card-actions>
                <v-row align="center" justify="center">
                  <gradient-rounded-button
                    text="Log in"
                    :onClick="sendLogInData"
                    :loading="loading"
                  />
                </v-row>
              </v-card-actions>
               <v-card-actions />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- </v-form> -->
</template>

<style scoped>
/* .container.fill-height {
  justify-content: center;
  margin-top: 30px;
} */
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