<template>
  <div>
    <slot></slot>

    <v-snackbar
    v-model="snackbarError"
    :timeout="10000"
    right
    color="error"
    elevation="1"
    dark>
      <span>{{ errorText }}</span>

      <template v-slot:action="{ attrs }">
        <v-btn
        text
        v-bind="attrs"
        @click="snackbarError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
    v-model="snackbarSuccess"
    :timeout="4000"
    right
    color="success"
    dark>
      <span>{{ successText }}</span>

      <template v-slot:action="{ attrs }">
        <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="snackbarSuccess = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { Vue, Provide } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'

export default @Component({})

class NotificationsBar extends Vue {
  @Provide() notificationsBar = this;
  errorText = 'Error';
  successText = 'Success';
  snackbarError = false;
  snackbarSuccess = false;

  consoleError(errorMessage) {
    this.errorText = errorMessage;
    this.snackbarError = true;
  }

  consoleSuccess(successMessage) {
    this.successText = successMessage;
    this.snackbarSuccess = true;
  }

}
</script>
