<template>
  <div>
    <p 
      class="account__info" 
    >
      Nick: 
      <span 
        class="font-weight-black">
        {{details.nickname}}
      </span> 
    </p>
        <p 
      class="account__info"
    >
      First name:  
      <span 
        class="font-weight-black">
        {{details.firstName}}
      </span>  
    </p>
        <p 
      class="account__info"
    >
      Last name:  
      <span 
        class="font-weight-black">
        {{details.lastName}} 
      </span> 
    </p>
        <p 
      class="account__info"
    >
      Number:   
      <span 
        class="font-weight-black">
        <nobr> {{details.number}} </nobr>
      </span> 
    </p>
    <p 
      class="account__info"
    >
      Email:   
      <span 
        class="font-weight-black">
        {{details.email}}
      </span> 
    </p>
    <p 
      class="account__info" 
    >
      Balance: 
      <span 
        class="font-weight-black">
        ${{details.dollarBalance}}
      </span> 
    </p>
    <h2>Social links</h2>
    <div
      class="d-flex
      justify-space-between
      align-center
      box">
      <a 
        :href="details.twitter"
        target="_blank"
        class="d-flex
        align-center
        justify-center
        text-decoration-none
        hover"
      >
        <v-icon
        large
        
        color="blue"
        >
          mdi-twitter
        </v-icon>
      </a>
      <a 
        :href="details.facebook"
        target="_blank"
        class="d-flex
        align-center
        justify-center
        text-decoration-none
        hover"
        >
        <v-icon
        large
        color="blue"
        >
          mdi-facebook
        </v-icon>
      </a>
      <a 
        :href="details.instagram"
        target="_blank"
        class="d-flex
        align-center
        justify-center
        text-decoration-none 
        hover"
      >
        <v-icon
        large
        color="blue"
        >
          mdi-instagram
        </v-icon>
      </a>
      <a 
        :href="details.linkedin"
        target="_blank"
        class="d-flex
        align-center
        justify-center
        text-decoration-none
        hover"
      >
        <v-icon
        large
        color="blue"
        >
          mdi-linkedin
        </v-icon>
      </a>
    </div>
    
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

}
</script>

<style scoped>
  .account__info {
    margin-top: 10px;
  }

  .box {
    max-width: 265px;
    height: 80px;
  }

  .hover {
    width: 45px;
    height: 45px;
    border-radius: 4px;
  }

  .hover:hover,
  .hover:focus {
    background-color: rgba(187, 17, 221, 0.3);
  }




</style>
