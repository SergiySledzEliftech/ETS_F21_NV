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
        type="text" 
        v-model="userSettings.firstName"
        label="First name"
      />
      <v-text-field
        class="modal__input" 
        type="text"
        v-model="userSettings.lastName"
        label="Last name"
      />
      <v-text-field
        class="modal__input" 
        type="text"
        v-model="userSettings.number"
        :rules="[lengthNumber]"
        label="Number: +381112223344"
      />
      <v-text-field
        class="modal__input" 
        type="text"
        v-model="userSettings.facebook"
        :rules="[url]"
        label="Is your Facebook"
      />
      <v-text-field
        class="modal__input" 
        type="text"
        v-model="userSettings.twitter"
        :rules="[url]"
        label="Is your Twitter"
      />
      <v-text-field
        class="modal__input" 
        type="text"
        v-model="userSettings.instagram"
        :rules="[url]"
        label="Is your Instagram"
      />
      <v-text-field
        class="modal__input" 
        type="text"
        v-model="userSettings.linkedin"
        :rules="[url]"
        label="Is your LinkedIn"
      />
      <v-file-input
        class="modal__input" 
        :rules="[avatarRules]"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        label="Avatar"
        v-model="fileAvatar"
      />
      <div
        class="d-flex
        justify-space-between
        flex-wrap"
      >
        <Button
          class="align-self-end card__btn" 
          text="Submit"
          :onClick="submit"
          /><!--type="submit"-->
        <Button
          :onClick="toggleIsOpen"
          color="red"
          text="Close"
        />
      </div>
    </v-form>
    <div 
      v-else 
      class="d-flex 
      flex-column
      align-center
      content"
    >
      <p 
        class="mb-0"
      >
        Do you want save your changes?
      </p> 
      <div class="d-flex
       justify-end">
        <Button
        class="btn" 
        text="Yes"
        color="green"
        :onClick="handlerSubmit"
        />
        <Button 
          class="btn"
          text="No"
          :onClick="noSave"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Inject, Prop, Vue} from 'nuxt-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import NeutralButton from '../components/NeutralButton.vue'

import rules from '../utils/form-validation-rules.js'

const {State, Action} = namespace('user')
const {State: S, Action: A} = namespace('dialog')

export default @Component({
  components:{
    Button: NeutralButton
  }

})

class UpdateUserForm extends Vue {
  @Inject({default: null}) notificationsBar;
  @State details
  @Action updateUser
  @A toggleIsOpen

  data () {
    return {
      required: rules.required,
      minLength: rules.minLength,
      maxLength: rules.maxLength,
      lengthNumber: rules.lengthNumber,
      url: rules.url,
      // number: rules.number,
      avatarRules: rules.avatar
    }
  }

  valid = true

  fileAvatar = null

  userSettings = {
    nickname: '',
    lastName: '',
    number: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    firstName: '',
    avatar: ''
  }

  snackbar = false
  isNote = false

  submit () {
    this.compress(this.fileAvatar)
        
    if(this.isValid()){
       this.toggleIsNote()
       }
  }

  isValid() {
    return this.$refs.form.validate()
  }

    async handlerSubmit(){
    try {
      this.toggleIsOpen()
      this.toggleIsNote()
      this.checkProp()
      await this.updateUser({id: this.details._id, body: {...this.userSettings}})
      this.notificationsBar.consoleSuccess('user update');
    } catch (error) {
      this.notificationsBar.consoleError(error.message);
    } finally{
        this.userSettings.nickname = ''
        this.userSettings.avatar = ''
        this.userSettings.number = ''
        this.userSettings.facebook = ''
        this.userSettings.instagram = ''
        this.userSettings.linkedin = ''
        this.userSettings.twitter = ''
        this.userSettings.firstName = ''
        this.userSettings.lastName = ''
        this.fileAvatar = null
    }
  }

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
        const width = 300;
        const scaleFactor = width / img.width;

        elem.width = width;
        elem.height = img.height * scaleFactor;

        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
        ctx.canvas.toBlob((blob) => {
          const compressFile = new File([blob], fileName, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          this.encodeImageFileAsURL(this.saveFile, compressFile)
        }, 'image/jpeg', 1);
      };
      reader.onerror = error => console.log(error, 'error');
    };
  }

  encodeImageFileAsURL(saveFile, file) {
    const reader = new FileReader();
    reader.onloadend = function() {
      saveFile(reader.result);
    }
    reader.readAsDataURL(file);
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

  @media (max-width: 560px) {
    .content {
      flex-direction: column;
    }
  }

  .btn{
    margin-left: 8px;
  }

</style>