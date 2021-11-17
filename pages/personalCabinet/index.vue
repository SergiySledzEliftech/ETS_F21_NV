<template>
  <div class="container">
    <div class="loader__box" v-if="isLoading">
      <v-progress-circular 
        :size="150" 
        :width="10"
        indeterminate 
        color="purple">
      </v-progress-circular>
    </div>
    <v-container>
      <v-row class="flex-wrap">
        <v-col class="col-sm-12 col-lg-6">
          <h1 class="d-flex justify-center">Account settings</h1>
          <v-container>
            <v-row>
              <v-col class="col-xs-12 col-md-5 col-lg-5 d-flex justify-center ">
                <img class="rounded-circle" v-if="user.avatar" 
                :src="user.avatar" 
                alt="avatar">
                <div class="ava d-flex align-center justify-center rounded-circle" v-else> <span class="label">{{ userLabel }}</span></div>
              </v-col>
              <v-col class="col-xs-12 col-md-7 col-lg-7 p__relative">
                <h2 class="account__info" >Nick: {{ user.nickname }}</h2>
                <p class="account__info">Email: {{user.email}} </p>
                <p class="account__info" >Balance: ${{ user.dollarBalance }}</p>
                <p class="accont__info" v-if="!bonusButton">Top up your balance: {{bonusTime}} </p>
                <v-btn 
                  class="accont__info white--text last" 
                  color="blue" 
                  v-else
                  @click="takeBonus">
                    Take bonus
                </v-btn>
                <v-btn 
                  class="btn__update white--text" 
                  color="purple lighten-2"
                  type="button"
                  @click="handlerUpdate"
                >
                  update
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col class="col-sm-12 col-lg-6">
          <v-card>
            <v-toolbar
              color="blue"
              dark
              flat
            >
              <v-tabs
                v-model="tabs.tab"
                align-with-title
              >
                <v-tabs-slider color="purple"></v-tabs-slider>
                <v-tab
                  v-for="{name} in tabs.items"
                  :key="name"
                >
                  {{ name }}
                </v-tab>
              </v-tabs>
            </v-toolbar>
            <v-tabs-items v-model="tabs.tab">
              <v-tab-item
                v-for="item in tabs.items"
                :key="item.name"
              >
                <v-card flat>
                  <v-list>
                    <v-list-item v-for="listItem in item.list" :key="listItem">{{listItem}}</v-list-item>
                  </v-list>
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
      v-if="!isNote "
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
          
          disabled
          
          v-model="userSettings.password"
          label="Password"
        ></v-text-field><!-- :rules="[password]" ref="password" -->
        <v-text-field
          class="modal__input" 
          type="text"
          
          disabled
          
          v-model="userSettings.email"
          label="Email"
        ></v-text-field><!-- :rules="[email]" ref="email" -->
        <v-file-input
          class="modal__input" 
          :rules="[avatar]"
          ref="avatar"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
          v-model="userSettings.avatar"
        ></v-file-input>
        <v-btn 
          class="align-self-end card__btn  white--text" 
          type="submit"
          color="purple lighten-2"
          >
            Submit
        </v-btn>
      </v-form>
      <div class="modal" v-else>
        <p>Do you want save your changes?</p> 
        <div class="d-flex justify-end">
          <v-btn 
          class="btn white--text" 
          color="red"
          type="submit" 
          @click.prevent="handlerSubmit">
            Yes
        </v-btn>
        <v-btn 
          class="btn white--text" 
          color="green"
          @click="toggleIsNote">
            No
        </v-btn>
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
  data () {
    return {
      required: rules.required,
      minLength: rules.minLength,
      maxLength: rules.maxLength,
      // password: rules.password,
      // email: rules.email,
      avatar: rules.avatar
    }
  }

  multiLine = true
  snackbar = false
  text = `Changes saved.`

  // compressFile = null

  isLoading = true

  userLabel = ''
  isShow = false
  user = {}
  isNote = false

  userSettings = {
    nickname: '',
    // email: '',
    // password: '',
    avatar: null
  }

  bonusTime = null
  bonusButton = false
  idInterval = ''

  formHasErrors = false

  tabs = {
    tab: null,
    items: [
      {
        name: "history", 
        list: ["BTC", "EFR", "TCP", "DER"]},
     {
       name: "portfolio", 
      list: ["USD", "EUR", "PLD", "BFS"]}
      ],
    text: "lorem"
  }

  mounted() {
    this.isLoading = true
    this.refreshUser()
    this.timer()
  }

  unmounted() {
    clearInterval(this.idInterval)
  }
  
// ######### base64
  compress(e) {
    if(!e){
      return
    }
    const width = 180;
    const height = 180;
    const fileName = e.name;
    const reader = new FileReader();

    reader.readAsDataURL(e);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        // img.width и img.height будет содержать оригинальные размеры
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob((blob) => {
          const file = new File([blob], fileName, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
            encodeImageFileAsURL(this.saveFile)
            function encodeImageFileAsURL(saveFile) {
            
            const reader = new FileReader();
            reader.onloadend = function() {
              saveFile(reader.result, 'result');
            }
            reader.readAsDataURL(file);
          }
        }, 'image/jpeg', 1);
      };
      
      reader.onerror = error => console.log(error, 'error');
    };
  }

  saveFile(el){
    this.userSettings.avatar = el
  }
// ############

  submit () {
    this.formHasErrors = false
    
    this.compress(this.userSettings.avatar)
    
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

  timer(){
    this.idInterval = setInterval(() => {this.chekBonusTime()}, 1000)
  }

// ! TODO плюсовать баланс на сервере. убрать возможность пользователю подставлять свою цифру на клиенте.

  async takeBonus(){
    try {
      this.isLoading = true
      this.user = await this.$axios.$put('http://localhost:4000/users/balance/61925a32af2b0cbcd9330f3f',{lastBonusTime: Date.now(), dollarBalance: 50})
    } catch (error) {
      console.log(error);
    }
      this.isLoading = false
  }

  chekBonusTime(){
    const time = Date.now() - new Date(this.user.lastBonusTime)
    if(time < 21600000){
      this.bonusButton = false
      this.msToTime(21600000 - time)
    } else {
    this.bonusButton = true
    }
  }

  msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  this.bonusTime = hours + ":" + minutes + ":" + seconds;
}


  async refreshUser(){
    try {
      this.isLoading = true
      this.user = await this.$axios.$get('http://localhost:4000/users/61925a32af2b0cbcd9330f3f')     
      this.userLabel = this.user.nickname[0] 
      this.chekBonusTime()
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false
    }
    
    
  }

  async handlerSubmit(){
    try {
      this.isLoading = true
      this.isShow = false
      this.isNote = false
      this.snackbar = true

      this.checkProp()

      await this.$axios.$put('http://localhost:4000/users/61925a32af2b0cbcd9330f3f', this.userSettings)
      this.refreshUser()
    } catch (error) {
      console.log(error);
    } finally{
      this.isLoading = false
        this.userSettings.nickname = ''
        // this.userSettings.email = ''
        this.userSettings.avatar = ''
        // this.userSettings.password = ''
    }
    

  }

  checkProp(){
          for(const prop in this.userSettings){
        if(!this.userSettings[prop]){
          this.userSettings[prop] = this.user[prop]
        }
      }
  }

}


</script>

<style scoped>
  img{
    overflow: hidden;
  }

  .loader__box {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50% -50%);
    z-index: 2;
  }

  .container {
    position: relative;
    padding: 15px;
    margin-right: 0;
    margin-left: 0;
  }

  .ava {
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 90px;
    font-weight: bold;
  }

  .btn {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
  }

  .ava,
  .account__info {
    margin-top: 10px;
  }

  .account__info .last {
    display: inline-block;
    margin-bottom: 60px;
  }

  .title__page {
    margin-left: 50px;
  }

  .card__btn {
    margin-right: 5px;
    margin-left: auto;
    margin-top: 15px;
  }

  .p__relative {
    position: relative;
    max-width: 300px;
    padding-bottom: 70px;
    margin-right: auto;
    margin-left: auto;
  }

  .btn__update {
    display: inline-block;
    position: absolute;
    right: 25px;
    bottom: 12px;
    margin-top: 15px;
  }

  .backdrop {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal {
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

</style>