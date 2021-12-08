<template>
  <div class="container fluid" >
    <h1 
      class="d-flex 
      justify-center"
    >
      Account settings
    </h1>
    <v-container fluid>
      <v-row 
        class="flex-wrap"
      >
        <v-col 
          class="col-xs-12 
          col-sm-12 
          col-lg-7"
        >
          <v-container class="pt-0">
            <div
              class="d-flex flex-wrap"
            >
              <v-col 
                class="d-flex 
                flex-column
                col-sm-5 
                col-md-5 
                col-lg-6 "
              >
                <Avatar 
                  :size="BIG_SIZE"
                />
                <Dialog
                  textOpenButton="Edit"
                  textCloseButton="Close"
                  width="500"
                >
                  <update-user-form />
                </Dialog>
                <div 
                  v-if="!bonusButton" 
                  class="d-flex
                  align-center
                  justify-space-between
                  flex-wrap
                  width"
                >
                  <p
                    class="accont__info
                    mb-0" 
                  >
                    Top up your balance: 
                  </p>
                  <v-progress-circular
                    :rotate="360"
                    :size="100"
                    :width="15"
                    :value="value"
                    color="green"
                    class="progress_bar"
                  >
                    {{ bonusTime }}
                  </v-progress-circular>
                </div>
                <Button 
                  v-else 
                  text="Take bonus"
                  :onClick="handlerTakeBonus"
                  class="ml-0 
                  mr-auto
                  height"
                  />
              </v-col>
              <v-col 
                class="col-xs-12 
                col-sm-7 
                col-md-7 
                col-lg-6 
                p__relative"
              >
              <div class="box">
                <user-information class="d-flex flex-column"/>

              </div>
              </v-col>
            </div>

          </v-container>
        </v-col>
        <v-col class="col-sm-12 col-lg-5">
          <Tabs />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Copyright />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Inject, Vue } from 'nuxt-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import Dialog from '../components/Dialog.vue'
import Avatar from '../components/Avatar.vue'
import UserInformation from '../components/UserInformation.vue'
import Tabs from '../components/Tabs.vue'
import Copyright from '../components/Copyright.vue'
import NeutralButton from '../components/NeutralButton.vue'
import Slider from '../components/Slider.vue'

import headMixin from '~/helpers/mixins/headMixin'

const {State, Action} = namespace('user')

export default @Component({
  components: {
    Dialog,
    UserInformation,
    Avatar,
    Button: NeutralButton,
    Copyright,
    Tabs,
    Slider
  },
  mixins: [headMixin]
})

class AccountSettings extends Vue{
  @Inject({default: null}) notificationsBar;
  @State details
  @Action getUser 
  @Action takeBonus

  BIG_SIZE = 'big-size'
  SMALL_SIZE = 'small-size'
  bonusTime = null
  bonusButton = false
  idInterval = ''

  value = 30
  title = 'Personal Cabinet';

  async mounted() {
    this.timer()
    // this.storeToken()
    this.refreshUser()
    this.checkBonusTime()
  }

  // storeToken() {
  //     console.log(localStorage.getItem('user'));
  //     this.refreshToken(localStorage.getItem('user'))
  // }

  async refreshUser(){
    try {
      if(process.client) {
        await this.getUser() 
      }
    } catch (error) {
      this.notificationsBar.consoleError(error.message);
    } finally {
    }  
  }

  unmounted() {
    clearInterval(this.idInterval)
  }

    timer(){
    this.idInterval = setInterval(() => {this.checkBonusTime()}, 1000)
  }

  async handlerTakeBonus(){
    try {
      await this.takeBonus(this.details._id)
      this.notificationsBar.consoleSuccess("You take bonus");
    } catch (error) {
      this.notificationsBar.consoleError(error.message);
    } finally {
    } 
  }

  checkBonusTime(){
    const SIX_HOURS = 21600000
    const time = Date.now() - new Date(this.details.lastBonusTime)
    if(time < SIX_HOURS){
      this.bonusButton = false
      this.value = Math.round(time/SIX_HOURS*100)
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
}
</script>

<style scoped>

  .container {
    width: 100%;
    max-width: 100%;
    padding-top: 30px;
    margin: 0;
  }

  .width {
    max-width: 286px;
    min-width: 160px;
  }

    @media (min-width: 700px){
    .box{
      padding-left: 40px;
    }
  }

</style>