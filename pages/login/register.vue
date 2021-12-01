<template>
  <v-container fill-height fluid fill-width>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="mx-auto" max-width="520" color="rgb(255,242,245)">
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-card-title class="text-h2 justify-center"
                >Welcome</v-card-title
              >
              <v-card-actions>
                <!-- <v-col cols="12" md="5"> -->
                <v-row align="center" justify="center">
                  <v-btn color="rgb(255,242,245)" to="/login"
                    >Do you have an account? Log in!</v-btn
                  >
                </v-row>
              </v-card-actions>

              <v-card-actions>
                <v-row align="center" justify="center">
                  <v-text-field
                    v-model="userRegData.nickname"
                    :rules="[maxLength, minLength]"
                    :counter="20"
                    label="Nickname"
                    required
                  ></v-text-field>
                </v-row>
              </v-card-actions>

              <v-card-actions>
                <v-row align="center" justify="center">
                  <v-text-field
                    v-model="userRegData.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-row>
              </v-card-actions>

              <v-card-actions>
                <v-row align="center" justify="center">
                  <v-text-field
                    v-model="userRegData.password"
                    type="password"
                    label="Password"
                    required
                  ></v-text-field>
                </v-row>
              </v-card-actions>

              <v-card-actions />
              <v-card-actions>
                <v-row cols="10" md="4" justify="center">
                  <gradient-rounded-button
                    text="Create an account"
                    :onClick="sendUserRegData"
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
</template>
<!-- 
      <v-col cols="12" md="5">

        <v-row align="center" justify="center">
          <v-btn color="rgb(255,242,245)" to="/login"
            >Do you have an account? Log in!</v-btn
          >
        </v-row>

        <v-row align="center" justify="center">
          <v-text-field
            v-model="userRegData.nickname"
            :rules="[maxLength, minLength]"
            :counter="20"
            label="Nickname"
            required
          ></v-text-field>
        </v-row>

        <v-row align="center" justify="center">
          <v-text-field
            v-model="userRegData.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-row>

        <v-row align="center" justify="center">
          <v-text-field
            v-model="userRegData.password"
            type="password"
            label="Password"
            required
          ></v-text-field>
        </v-row> -->

        <!-- <v-row cols="10" md="4" justify="center">
          <v-btn class="btn" type="submit" @click.prevent="sendUserRegData"
            >Create an account</v-btn
          >
        </v-row> -->

        <!-- <v-row cols="10" md="4" justify="center">
          <gradient-rounded-button
            text="Create an account"
            :onClick="sendUserRegData"
            :loading="loading"
          />
        </v-row>
      </v-col>
    </v-container>
  </v-form>
</template> -->

<style>
/* .container.fill-height {
  justify-content: center;
  margin-top: 100px;
} */
</style>

<script>
//import rules from '../utils/form-validation-rules.js'
import { Component, namespace, Vue } from "nuxt-property-decorator";
import GradientRoundedButton from "../../components/GradientRoundedButton.vue";
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