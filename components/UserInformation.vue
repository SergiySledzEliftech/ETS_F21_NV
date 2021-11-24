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
  </div>
</template>

<script>
import Component, { namespace } from 'nuxt-class-component'
import { Inject, Vue } from 'nuxt-property-decorator'

const { State, Action } = namespace('user')

@Component({})

export default class UserInformation extends Vue{
  @Inject({default: null}) notificationsBar;
  @State details
  @Action takeBonus

  bonusTime = null
  bonusButton = false
  idInterval = ''

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
      // this.isLoading = true
      await this.takeBonus(this.details._id)
    } catch (error) {
      this.notificationsBar.consoleSuccess(error.message);
    } finally {
        // this.isLoading = false
    } 
  }

  checkBonusTime(){
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

}
</script>

<style scoped>
  .account__info {
    margin-top: 10px;
  }

  .account__info .last {
    display: inline-block;
    margin-bottom: 60px;
  }

</style>
