<template>
  <div>
      <v-form 
    class="form"
    ref="form"
    v-model="valid"
    lazy-validation
    v-if="!isNote"
    @submit.prevent="submit"
  >
    <v-text-field 
      class="modal__input" 
      type="text"
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
      :rules="[avatarRules]"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick an avatar"
      prepend-icon="mdi-camera"
      label="Avatar"
      v-model="fileAvatar"
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
      @click="noSave">
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
// @dialogState isOpen
@dialogAction toggleIsOpen

  data () {
    return {
      required: rules.required,
      minLength: rules.minLength,
      maxLength: rules.maxLength,
      // password: rules.password,
      // email: rules.email,
      avatarRules: rules.avatar
    }
  }

  valid = true

  fileAvatar = null

  userSettings = {
    nickname: '',
    // email: '',
    // password: '',
    avatar: ''
  }

  snackbar = false
  isNote = false
  formHasErrors = false

  

  submit () {
    // this.formHasErrors = false
    
    this.compress(this.fileAvatar)
    // this.v()
    // Object.keys(this.userSettings).forEach(f => {
    //   if (!this.userSettings[f]) this.formHasErrors = true
    //   this.$refs[f].validate(true)
    // })
        
    if(this.v()){
       this.toggleIsNote()
       }
  }

  v() {
    return this.$refs.form.validate()
  }

    async handlerSubmit(){
    try {
      // this.isLoading = true
      this.toggleIsOpen()
      this.toggleIsNote()
      // this.snackbar = true
      this.checkProp()
      await this.updateUser({id: this.details._id, body: {...this.userSettings}})
      
    } catch (error) {
      console.log(error.message);
    } finally{
      // this.isLoading = false
        this.userSettings.nickname = ''
        // this.userSettings.email = ''
        this.userSettings.avatar = ''
        this.fileAvatar = null
        // this.userSettings.password = ''
    }
  }

  //   checkForm() {
  //   return !Object.keys(this.userSettings).filter(f => !this.$refs[f].validate()).length
  // }

  checkProp(){
        for(const prop in this.userSettings){
      if(!this.userSettings[prop]){
        this.userSettings[prop] = this.details[prop]
      }
    }
  }

  noSave(){
    this.toggleIsNote()
  }

    toggleIsNote(){
    this.isNote = !this.isNote
  }

  // ######### base64
  compress(file) {
    if(!file){
      return
    }

    const fileName = file.name;
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = new Image();

      img.src = event.target.result;

      img.onload = () => {
        const elem = document.createElement('canvas');
        const ctx = elem.getContext('2d');
        // img.width и img.height будет содержать оригинальные размеры
        const width = 180;
        const scaleFactor = width / img.width;

        elem.width = width;
        elem.height = img.height * scaleFactor;

        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
        ctx.canvas.toBlob((blob) => {
          const compressFile = new File([blob], fileName, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
            encodeImageFileAsURL(this.saveFile)

            function encodeImageFileAsURL(saveFile) {
            
            const reader = new FileReader();
            reader.onloadend = function() {
              saveFile(reader.result);
            }
            reader.readAsDataURL(compressFile);
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