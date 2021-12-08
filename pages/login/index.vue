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
      <v-row align="center" justify-content="center" align-items="center">
        <v-col cols="12">
          <v-card class="mx-auto" max-width="520" color="rgb(255,242,245)">
            <v-row align="center" justify="center">
              <v-col cols="10">
                <v-card-title class="text-h2 justify-center"
                  >Trainder</v-card-title
                >
                <v-card-subtitle align="center" class="ma-1">
                  Welcome! Sign in to continue!
                </v-card-subtitle>

                <v-card-actions class="pt-1 mb-2">
                  <v-row align="center" justify="center">
                    <v-text-field
                      v-model="logInData.email"
                      :rules="[rule.required, rule.email]"
                      label="E-mail"
                      required
                    />
                  </v-row>
                </v-card-actions>

                <v-card-actions class="mb-2">
                  <v-row align="center" justify="center">
                    <v-text-field
                      v-model="logInData.password"
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
                      <router-link to="/register" exact
                        >Don`t have an account? Sign up!</router-link
                      >
                    </v-card-subtitle>

                    <gradient-rounded-button
                      class="ma-2"
                      text="Sign in"
                      :onClick="logIn"
                      :loading="loading"
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
import rules from "/utils/form-validation-rules.js";
import { Component, Vue, namespace, Watch, Inject } from "nuxt-property-decorator";
const { State, Action } = namespace("user");
import headMixin from '~/helpers/mixins/headMixin';

@Component({
  layout: 'empty',
  components: {},
  mixins: [headMixin]
})

export default class LoginPage extends Vue {
  @State userJWT;
  @Action login;
  @Inject({ default: null }) notificationsBar;

  loading = true;
  title = 'Login';

  mounted() {
    this.loading = false;
  }

  data() {
    return {
      show1: false,
      password: 'Password',
      rule: {
        required: rules.required,
        min: (v) => v.length >= 8 || "Min 8 characters",
        email: rules.email,
      },
    };
  }

  logInData = {
    email: "",
    password: "",
  };

  async logIn() {
    try {
      await this.login(this.logInData);
    } catch (error) {
      this.notificationsBar.consoleError(error.message);
    }

    this.logInData.email = "";
    this.logInData.password = "";
  }

  @Watch('userJWT') 
  onJWTUpdate() {
    this.$router.push('/');
  }
}
</script>
