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
              <v-btn 
                class="card__btn float-end" 
                type="button"
                @click="handlerUpdate"
              >
                update
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col>History</v-col>
      </v-row>
    </v-container>
    <v-container v-if="isShow" class="backdrop">
      <div class="modal d-flex flex-column" v-if="!isNote">
        <label class="account__input">
          Nickname
          <input 
            class="modal__input" 
            type="text"
            name="nickname"
            :value="userSettings.nickname"
            @input="handlerInput"
          >
        </label>
        <label class="account__input">
          Password
          <input 
            class="modal__input" 
            type="text" 
            name="password"
            :value="userSettings.password"
            @input="handlerInput"
          >
        </label>
        <label class="account__input">
          Email
          <input 
            class="modal__input" 
            type="text" 
            name="email"
            :value="userSettings.email"
            @input="handlerInput"
          >
        </label>
        <label class="account__input">
          Avatar
          <input 
            class="modal__input" 
            type="text" 
            name="avatar"
            :value="userSettings.avatar"
            @input="handlerInput"
            >
        </label>
        <v-btn class="align-self-end card__btn" type="submit" @click="isNote = true">Submit</v-btn>
      </div>
      <div class="modal" v-else>
        <p>Do you want save your changes?</p> 
        <div class="d-flex justify-end">
          <v-btn class="btn" type="submit" @click.prevent="handlerSubmit">Yes</v-btn>
          <v-btn class="btn" @click="isNote = false">No</v-btn>
        </div>
      </div>
    </v-container>

    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>


  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})

export default class AccountSettings extends Vue{
  multiLine = true
  snackbar = false
  text = `Changes saved.`

  userLabel = ''
  isShow = false
  user = {}
  isNote = false

  userSettings = {
    nickname: '',
    email: '',
    password: '',
    avatar: ''
  }
  

  async mounted() {
    this.refreshUser()
  }

  handlerUpdate(){
    this.isShow = true
  }

  handlerInput(event){
    this.userSettings[event.target.name] = event.target.value;
  }

  async refreshUser(){
    this.user = await this.$axios.$get('http://localhost:4000/users/618a71de0348ae7fd4d0d6ea')
    this.userLabel = this.user.nickname[0] 
  }

  async handlerSubmit(){
    this.isShow = false
    this.isNote = false
    this.snackbar = true
    // await this.$axios.$put('http://localhost:4000/users/618a71de0348ae7fd4d0d6ea', this.userSettings)
    this.refreshUser()
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
    margin-top: 15px;
  }
  .backdrop{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 360px; 
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
  }
  .account__input{
    display: flex;
    margin-top: 15px;
  }
  .modal__input{
    margin-right: 40px;
    margin-left: auto;
    border-bottom: 2px solid #000;
  }
</style>