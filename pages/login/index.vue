<template>
  <div>
    <v-btn to="login/register">Don't have an account? Create one!</v-btn>
    <!--Example of login-->
    <!--<v-btn @click="$auth.loginWith('local', { data: 'my-login' })" to="/">Login</v-btn>-->
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'empty',
})

export default class LoginPage extends Vue{

}
</script>