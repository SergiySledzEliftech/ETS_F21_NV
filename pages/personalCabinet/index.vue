<template>
  <div class="container">
    <!-- <div class="btn__group">
      <v-btn class="btn" :to="'/personalCabinet'">account settings</v-btn>
      <v-btn class="btn" :to="'/personalCabinet/History'">history</v-btn>
      <v-btn class="btn" :to="'/personalCabinet/Portfolio'">portfolio</v-btn>
    </div>  -->
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
      <v-col>
        
  <v-card>
    <v-toolbar
      color="grey"
      dark
      flat
    >
    
      <!-- <template v-slot:extension> -->
        <v-tabs
          v-model="tabs.tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="{name} in tabs.items"
            :key="name"
          >
            {{ name }}
          </v-tab>
        </v-tabs>
      <!-- </template> -->
    </v-toolbar>

    <v-tabs-items v-model="tabs.tab">
      <v-tab-item
        v-for="item in tabs.items"
        :key="item.name"
      >
        <v-card flat>
          <!-- <v-card-text v-text="tabs.text"></v-card-text> -->
          <ul>
            <li v-for="listItem in item.list" :key="listItem">{{listItem}}</li>
          </ul>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>

        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="isShow" class="backdrop" @click="closeModal">
      <v-form 
      class="modal d-flex flex-column" 
      v-if="!isNote"
      @submit.prevent="submit"  
      @keydown.esc="closeModal" 
      tabindex="0">
        <v-text-field 
          class="modal__input" 
          type="text"
          ref="nickname"
          v-model="userSettings.nickname"
          :rules="[maxLength, minLength]"
          label="Nickname"
        ></v-text-field>
        <v-text-field 
          class="modal__input" 
          type="password" 
          ref="password"
          :rules="[password]"
          v-model="userSettings.password"
          label="Password"
        ></v-text-field>
        <v-text-field
          class="modal__input" 
          type="text"
          ref="email"
          :rules="[email]" 
          v-model="userSettings.email"
          label="Email"
        ></v-text-field>
        <v-text-field
          class="modal__input" 
          type="text" 
          ref="avatar"
          v-model="userSettings.avatar"
          label="Avatar"
        ></v-text-field>
        <v-btn class="align-self-end card__btn" type="submit">Submit</v-btn>
      </v-form>
      <div class="modal" v-else>
        <p>Do you want save your changes?</p> 
        <div class="d-flex justify-end">
          <v-btn class="btn" type="submit" @click.prevent="handlerSubmit">Yes</v-btn>
          <v-btn class="btn" @click="toggleIsNote">No</v-btn>
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
import rules from '../../utils/form-validation-rules.js'

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

  formHasErrors = false

  tabs = {
    tab: null,
    items: [
      {
        name: "history", 
        list: ["BTC", "EFR"]},
     {
       name: "portfolio", 
      list: ["USD", "EUR"]}
      ],
    text: "lorem"
  }

  data () {
    return {
      required: rules.required,
      minLength: rules.minLength,
      maxLength: rules.maxLength,
      password: rules.password,
      email: rules.email
    }
  }

  mounted() {
    this.refreshUser()
  }

  submit () {
    this.formHasErrors = false
    Object.keys(this.userSettings).forEach(f => {
      if (!this.userSettings[f]) this.formHasErrors = true
      this.$refs[f].validate(true)
    })

    if(this.checkForm()){
       this.toggleIsNote()
       }
  }

  checkForm() {
    return !Object.keys(this.userSettings).filter(f => !this.$refs[f].validate()).length
  }

  toggleIsNote(){
    this.isNote = !this.isNote
  }

  handlerUpdate(){
    this.isShow = true
  }

  closeModal(e){
    if(e.target === e.currentTarget){
      this.isShow = false
    }
  }

  async refreshUser(){
    this.user = await this.$axios.$get('http://localhost:4000/users/618a71de0348ae7fd4d0d6ea')
    this.userLabel = this.user.nickname[0] 
  }

  async handlerSubmit(){
    this.isShow = false
    this.isNote = false
    this.snackbar = true
    await this.$axios.$put('http://localhost:4000/users/618a71de0348ae7fd4d0d6ea', this.userSettings)
    this.refreshUser()
    this.userSettings.nickname = ''
    this.userSettings.email = ''
    this.userSettings.avatar = ''
    this.userSettings.password = ''
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
    padding-right: 40px;
    padding-left: 40px;
    padding-bottom: 15px;
    padding-top: 30px;
    background-color: #fff;
    border-radius: 8px;
  }

  .account__input{
    /* display: flex; */
    /* margin-top: 15px; */
  }

  /* .modal__input{
    margin-right: 40px;
    margin-left: auto;
  } */

  .invalid{
    border-color: red;
  }
</style>