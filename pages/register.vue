<template>
  <div
    :style="{
      'background-image': 'url(https://i.ibb.co/6FyC0pp/background.jpg)',
      'background-size': 'cover',
      'cover display': 'block',
      height: '100%',
    }"
  >
    <v-container fill-height fluid fill-width>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-card class="mx-auto" max-width="520" color="rgb(255,242,245)">
            <v-row align="center" justify="center">
              <v-col cols="10">
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
                    :style="{ 'align-items': 'center' }"
                    justify="space-between"
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
                    />
                  </v-row>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>

<script>
import rules from "../utils/form-validation-rules.js";
import { Component, Inject, namespace, Vue, Watch } from "nuxt-property-decorator";
import GradientRoundedButton from "../components/GradientRoundedButton.vue";

const { State, Action } = namespace("user");

@Component({
  layout: "empty",
  components: { GradientRoundedButton },
  GradientRoundedButton,
})
export default class RegisterPage extends Vue {
  @State details;
  @State userJWT;
  @Action saveUser;
  @Inject({ default: null }) notificationsBar;

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
    try {
      await this.saveUser(this.userRegData);
    } catch (error) {
      this.notificationsBar.consoleError(error.message);
    }
    
    this.userRegData.nickname = "";
    this.userRegData.email = "";
    this.userRegData.password = "";
  }

  @Watch('userJWT') 
  onJWTUpdate() {
    this.$router.push('/');
  }
}
</script>
