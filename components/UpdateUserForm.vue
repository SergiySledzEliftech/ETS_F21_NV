<template>
  <div>
      <v-form 
    class="form"
    v-if="!isNote"
    @submit.prevent="submit"
  >
    <v-text-field 
      class="modal__input" 
      type="text"
      ref="nickname"
      v-model="userSettings.nickname"
      :rules="[maxLength, minLength]"
      label="Nickname"
    />
    <v-text-field 
      class="modal__input" 
      type="password" 
      disabled
      v-model="userSettings.password"
      label="Password"
    /><!-- :rules="[password]" ref="password" -->
    <v-text-field
      class="modal__input" 
      type="text"
      disabled
      v-model="userSettings.email"
      label="Email"
    /><!-- :rules="[email]" ref="email" -->
    <v-file-input
      class="modal__input" 
      :rules="[avatar]"
      ref="avatar"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick an avatar"
      prepend-icon="mdi-camera"
      label="Avatar"
      v-model="userSettings.avatar"
    />
    <v-btn 
      class="align-self-end card__btn  white--text" 
      type="submit"
      color="purple lighten-2"
      >
        Submit
    </v-btn>
  </v-form>
  <div 
    v-else 
    class="d-flex 
    justify-space-around 
    content"
  >
    <p>Do you want save your changes?</p> 
    <div class="d-flex justify-end">
      <v-btn 
      class="btn white--text" 
      color="green"
      type="submit" 
      @click.prevent="handlerSubmit">
        Yes
    </v-btn>
    <v-btn 
      class="btn grey--darken-3--text"
      @click="toggleIsNote">
        No
    </v-btn>
    </div>
  </div>
  </div>
</template>

<script>
import { Prop, Vue} from 'nuxt-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import rules from '../utils/form-validation-rules.js'

const {State, Action} = namespace('user')
const {State: dialogState, Action: dialogAction} = namespace('dialog')

export default @Component({

})

class UpdateUserForm extends Vue {
@State details
@Action updateUser
@dialogState isOpen
@dialogAction toggleIsOpen

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

  userSettings = {
    nickname: '',
    // email: '',
    // password: '',
    avatar: null
  }

  snackbar = false
  isNote = false
  formHasErrors = false

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

    async handlerSubmit(){
    try {
      // this.isLoading = true
      this.toggleIsOpen()
      this.toggleIsNote()
      this.snackbar = true
      this.checkProp()
      await this.updateUser({id: this.details._id, body: {...this.userSettings}})
      
    } catch (error) {
      console.log(error.message);
    } finally{
      // this.isLoading = false
        this.userSettings.nickname = ''
        // this.userSettings.email = ''
        this.userSettings.avatar = ''
        // this.userSettings.password = ''
    }
  }

    checkForm() {
    return !Object.keys(this.userSettings).filter(f => !this.$refs[f].validate()).length
  }

  checkProp(){
        for(const prop in this.userSettings){
      if(!this.userSettings[prop]){
        this.userSettings[prop] = this.details[prop]
      }
    }
  }

    toggleIsNote(){
    this.isNote = !this.isNote
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
}
</script>

<style scoped>
  .form {
    padding-right: 40px;
    padding-left: 40px;
    padding-bottom: 15px;
    padding-top: 30px;
  }

  .content{
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .btn{
    margin-left: 8px;
  }
</style>