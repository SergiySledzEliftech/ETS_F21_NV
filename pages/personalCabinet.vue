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
      <v-row 
        class="flex-wrap"
      >
        <v-col 
          class="col-xs-12 
          col-sm-12 
          col-lg-6"
        >
          <h1 
            class="d-flex 
            justify-center"
          >
            Account settings
          </h1>
          <v-container>
            <div
              class="d-flex flex-wrap"
            >
              <v-col 
                class="d-flex 
                justify-center
                align-center
                col-sm-5 
                col-md-5 
                col-lg-5 "
              >
                <Avatar 
                  :size="big_size"
                />
              </v-col>
              <v-col 
                class="col-xs-12 
                col-sm-7 
                col-md-7 
                col-lg-7 
                p__relative"
              >
                <user-information />
                <Dialog
                  textOpenButton="Update"
                  textCloseButton="Close"
                  width="500"
                  class="btn__update white--text" 
                >
                  <update-user-form />
                </Dialog>
              </v-col>
            </div>
          </v-container>
        </v-col>
        <v-col class="col-sm-12 col-lg-6">
          <Tabs />
        </v-col>
      </v-row>
    </v-container>

    <!-- <v-snackbar
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
    </v-snackbar> -->
  </div>
</template>

<script>
import { Vue } from 'nuxt-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import Dialog from '../components/Dialog.vue'
// import UpdateUserForm from '../components/UpdateUserForm.vue'
import Avatar from '../components/Avatar.vue'
import UserInformation from '../components/UserInformation.vue'
import Tabs from '../components/Tabs.vue'

const {State, Action} = namespace('user')

export default @Component({
  components: {
    Dialog,
    UserInformation,
    Avatar
  }
})

class AccountSettings extends Vue{
  @State details
  @Action getUser 
  
  
  multiLine = true
  snackbar = false
  text = `Changes saved.`

  // isLoading = true

  big_size = 'big-size'

  mounted() {
    // this.isLoading = true
    this.refreshUser()
    
  }

  async refreshUser(){
    try {
      this.isLoading = true
      await this.getUser('61925a32af2b0cbcd9330f3f') // details.id


    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false
    }  
  }
}
</script>

<style scoped>
  
  /* .loader__box {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50% -50%);
    z-index: 2;
  }

  .container {
    padding: 15px;
    margin-right: 0;
    margin-left: 0;
  }

  

  .btn {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
  }

  .title__page {
    margin-left: 50px;
  }

  .card__btn {
    margin-right: 5px;
    margin-left: auto;
    margin-top: 15px;
  }*/

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

</style>