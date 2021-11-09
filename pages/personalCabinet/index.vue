<template>
  <div class="container">
    <div class="btn__group">
      <v-btn class="btn" :to="'/personalCabinet'">account settings</v-btn>
      <v-btn class="btn" :to="'/personalCabinet/History'">history</v-btn>
      <v-btn class="btn" :to="'/personalCabinet/Portfolio'">portfolio</v-btn>
    </div> 
    <v-container>
      <v-row>
        <v-col>
        <h1 class="d-flex justify-center">Account settings</h1>
        <v-container>
          <v-row>
            <v-col>
              <img v-if="user.avatar" :src="user.avatar" alt="avatar">
              <div class="ava" v-else> <span class="label">{{ userLabel }}</span></div>
            </v-col>
            <v-col>
              <h2 class="account__info" >Nick: {{ user.nickname }}</h2>
              <p class="account__info">Email: {{user.email}} </p>
              <p class="account__info" >Balance: ${{ user.dollarBalance }}</p>
              <v-btn class="card__btn float-end">update</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col>History</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})

export default class AccountSettings extends Vue{
  userLabel = ''
  user = {}
  async mounted() {
    this.user = await this.$axios.$get('http://localhost:4000/users/618a71de0348ae7fd4d0d6ea')
    this.userLabel = this.user.nickname[0] 
  }
}
</script>

<style>
  .container{
    padding: 15px;
    margin-right: 0;
    margin-left: 0;
  }
  .content{
    display: flex;}
  .ava{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 90px;
    font-weight: bold;
  }
  .btn__group{
    display: flex;
    justify-content: center;
    margin: 15px auto;
  }
  .btn{
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .ava,
  .account__info{
    margin-top: 10px;
  }
  .title__page{
    margin-left: 50px;
  }
  .card__btn{
    margin-right: 5px;
    margin-left: auto;
  }
</style>