<template>
  <div>
    <v-btn to="login/register">Don't have an account? Create one!</v-btn>
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