<template>
  <div class="container">
    <v-container>
      <v-row 
        class="flex-wrap"
      >
        <v-col 
          class="col-xs-12 
          col-sm-12 
          col-lg-7"
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
                  :size="BIG_SIZE"
                />
              </v-col>
              <v-col 
                class="col-xs-12 
                col-sm-7 
                col-md-7 
                col-lg-7 
                p__relative"
              >
              <div>
                <user-information class="d-flex flex-column"/>
                <Dialog
                    textOpenButton="Edit"
                    textCloseButton="Close"
                    width="500"
                  >
                  <update-user-form />
                </Dialog>
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
import { Vue } from 'nuxt-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import Dialog from '../components/Dialog.vue'
import Avatar from '../components/Avatar.vue'
import UserInformation from '../components/UserInformation.vue'
import Tabs from '../components/Tabs.vue'
import Copyright from '../components/Copyright.vue'


const {State, Action} = namespace('user')

export default @Component({
  components: {
    Dialog,
    UserInformation,
    Avatar,
    Copyright,
    Tabs
  }
})

class AccountSettings extends Vue{
  @State details
  @Action getUser 

  BIG_SIZE = 'big-size'
  SMALL_SIZE = 'small-size'

  mounted() {
    this.refreshUser()
  }

  async refreshUser(){
    try {
      await this.getUser('61925a32af2b0cbcd9330f3f') // details.id
    } catch (error) {
      this.notificationsBar.consoleSuccess(error.message);
    } finally {
    }  
  }
}
</script>

<style scoped>

  .container {
    padding-top: 30px;
  }

</style>