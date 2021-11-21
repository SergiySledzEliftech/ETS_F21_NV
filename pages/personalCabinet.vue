<template>
  <div class="container">
    <!-- <div class="loader__box" v-if="isLoading">
      <v-progress-circular 
        :size="150" 
        :width="10"
        indeterminate 
        color="purple">
      </v-progress-circular>
    </div> -->
    <v-container>
      <v-row class="flex-wrap">
        <v-col class="col-xs-12 col-sm-12 col-lg-6">
          <h1 class="d-flex justify-center">Account settings</h1>
          <v-container>
            <v-row>
              <v-col 
              class="col-xs-12 
              col-sm-7 
              col-md-5 
              col-lg-6 
              d-flex 
              justify-center "
              >
                <img 
                v-if="details.avatar" 
                class="rounded-circle" 
                :src="details.avatar"  
                alt="avatar"
                >
                <div 
                v-else 
                class="ava 
                d-flex 
                align-center 
                justify-center
                rounded-circle" 
                > 
                  <span 
                    class="label"
                  >
                    {{ userLabel }}
                  </span>
                </div>
              </v-col>
              <v-col 
                class="col-xs-12 
                col-sm-5 
                col-md-7 
                col-lg-6 
                p__relative"
              >
                <h2 class="account__info" >Nick: {{details.nickname}}</h2>
                <p class="account__info">Email: {{details.email}} </p>
                <p class="account__info" >Balance: ${{details.dollarBalance}}</p>
                <p
                  v-if="!bonusButton" 
                  class="accont__info" 
                >
                  Top up your balance: {{bonusTime}} 
                </p>
                <v-btn 
                  v-else
                  class="accont__info white--text last" 
                  color="blue" 
                  @click="handlerTakeBonus">
                    Take bonus
                </v-btn>
                <!-- <v-btn 
                  class="btn__update white--text" 
                  color="purple lighten-2"
                  type="button"
                  @click="handlerUpdate"
                >
                  update
                </v-btn> -->
                <Dialog
                  textOpenButton="Update"
                  textCloseButton="Close"
                  width="500"
                  class="btn__update white--text" 
                >
                  <update-user-form />
                </Dialog>
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
import { Vue } from 'nuxt-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import Dialog from '../components/Dialog.vue'
import UpdateUserForm from '../components/UpdateUserForm.vue'

const {State, Action} = namespace('user')

export default @Component({
  components: {
    Dialog,
    UpdateUserForm
  }
})

class AccountSettings extends Vue{
  @State details
  @Action getUser 
  @Action takeBonus
  


  multiLine = true
  snackbar = false
  text = `Changes saved.`

  // isLoading = true

  userLabel = ''

  bonusTime = null
  bonusButton = false
  idInterval = ''

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
    // this.isLoading = true
    this.refreshUser()
    this.timer()
  }

  unmounted() {
    clearInterval(this.idInterval)
  }

  timer(){
    this.idInterval = setInterval(() => {this.chekBonusTime()}, 1000)
  }

  async handlerTakeBonus(){
    try {
      this.isLoading = true
      await this.takeBonus(this.details._id)
    } catch (error) {
      console.log(error);
    } finally {
        this.isLoading = false
    } 
  }

  chekBonusTime(){
    const time = Date.now() - new Date(this.details.lastBonusTime)
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
      await this.getUser('61925a32af2b0cbcd9330f3f') // details.id

      this.chekBonusTime()
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false
    }
    
    
  }




}


</script>

<style scoped>

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