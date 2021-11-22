<template>
  <div>
    <img
      v-if="details.avatar"
      :src="details.avatar"
      :class="size" 
      class="rounded-circle"
      alt="avatar"
    >
    <div 
      v-else
      :class="size"
      class="ava 
      d-flex 
      justify-center 
      align-center 
      rounded-circle" 
      > 
        <span>
          {{ details.nickname && details.nickname[0] }}
        </span>
    </div>
  </div>
  
</template>

<script>
import Component, { namespace } from 'nuxt-class-component'
import { Vue, Prop } from 'vue-property-decorator'

const {State, Action} = namespace('user')

@Component({})

export default class Avatar extends Vue{
  @State details
  @Prop({ type: String, required: true}) size
}
</script>

<style scoped>

  .ava {
    display: block;
    background-color: rgba(0, 0, 0, 0.3);
    
    font-weight: bold;
  }

  .big-size{
    width: 200px; 
    height: 200px;
    font-size: 90px;
  }

  .small-size{
    width: 35px; 
    height: 35px;
    font-size: 24px;
  }
</style>
