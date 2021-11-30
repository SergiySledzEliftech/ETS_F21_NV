<template>
  <div>
    <h2 
      class="account__info" 
    >
      Nick: {{details.nickname}}
    </h2>
    <p 
      class="account__info"
    >
      Email: {{details.email}}  
    </p>
    <p 
      class="account__info" 
    >
      Balance: ${{details.dollarBalance}}
    </p>
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
  </div>
</template>

<script>
import Component, { namespace } from 'nuxt-class-component'
import { Inject, Vue } from 'nuxt-property-decorator'

import NeutralButton from '../components/NeutralButton.vue'


const { State, Action } = namespace('user')

@Component({
  components:{
    Button: NeutralButton
  }
})

export default class UserInformation extends Vue{
  @Inject({default: null}) notificationsBar;
  @State details
  @Action takeBonus

  bonusTime = null
  bonusButton = false
  idInterval = ''

  value = 30

  mounted(){
    this.checkBonusTime()
    this.timer()
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
    } catch (error) {
      this.notificationsBar.consoleSuccess(error.message);
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
  .account__info {
    margin-top: 10px;
  }

  .width {
    max-width: 286px;
    min-width: 160px;
  }

</style>
