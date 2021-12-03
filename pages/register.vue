<template>
  <!-- <div
    :style="{ 'background-image': 'url(https://vuejs.org/images/logo.png)' }"
  > -->
  <v-container fill-height fluid fill-width>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="mx-auto" max-width="520" color="rgb(255,242,245)">
          <v-row align="center" justify="center">
            <v-col cols="10">
              <!-- <img src="@/assets/img/clear.gif" /> -->

              <v-card-title class="text-h2 justify-center"
                >Trainder</v-card-title
              >
              <v-card-subtitle align="center" class="ma-1">
                Welcome! Let`s create an account!
              </v-card-subtitle>

              <v-card-actions class="pt-1 mb-2">
                <v-row align="center" justify="center">
                  <v-text-field
                    v-model="userRegData.nickname"
                    :rules="[rule.required, rule.minName]"
                    label="Nickname"
                    counter
                    required
                  />
                </v-row>
              </v-card-actions>

              <v-card-actions class="mb-2">
                <v-row align="center" justify="center">
                  <v-text-field
                    v-model="userRegData.email"
                    :rules="[rule.required, rule.email]"
                    label="E-mail"
                    required
                  />
                </v-row>
              </v-card-actions>

              <v-card-actions class="mb-2">
                <v-row align="center" justify="center">
                  <v-text-field
                    v-model="userRegData.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rule.required, rule.min]"
                    :type="show1 ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  />
                </v-row>
              </v-card-actions>

              <v-card-actions class="mt-3 mb-3">
                <v-row
                  cols="10"
                  md="4"
                  justify="space-between"
                  align-content="center"
                  align-items="center"
                >
                  <v-card-subtitle class="pa-0" align="center">
                    <router-link to="/login" exact
                      >Already registrated? Sign in</router-link
                    >
                  </v-card-subtitle>

                  <gradient-rounded-button
                    class="ma-2"
                    text="Sign up"
                    :onClick="sendUserRegData"
                    :loading="loading"
                  />
                </v-row>
              </v-card-actions>

              <!-- <v-row justify="center">
                <v-card-subtitle align="center" class="mb-3">
                  <router-link to="/login" exact>sign in</router-link>
                </v-card-subtitle>
              </v-row> -->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>

<script>
import rules from "../utils/form-validation-rules.js";
import LogoTitle from "../components/LogoTitle.vue";
import { Component, namespace, Vue } from "nuxt-property-decorator";
import GradientRoundedButton from "../components/GradientRoundedButton.vue";
//import GradientRoundedButton from "./GradientRoundedButton.vue";

const { State, Action } = namespace("user");

@Component({
  layout: "empty",
  components: { GradientRoundedButton },
  GradientRoundedButton,
})
export default class RegisterPage extends Vue {
  @State details;
  @Action saveUser;

  data() {
    return {
      show1: false,
      password: "Password",
      rule: {
        required: rules.required,
        min: (v) => v.length >= 8 || "Min 8 characters",
        minName: rules.minLength,
        email: rules.email,
      },
    };
  }

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
