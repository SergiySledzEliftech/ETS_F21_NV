<template>
<div
  class="d-flex
    justify-center
    align-end
    padding">
  <span
    class="d-block 
    font-size">
    © Copyright 2021 ElifTech School.
    All rights reserved.</span>
  
</div>
  
</template>

<script>
import { Vue} from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'

export default @Component({})

class Copyright extends Vue {

}
</script>

<style scoped>
  @media (min-width: 1200px ) {
    .padding {
    padding-top: 50px;
  }
  }
  .font-size {
    font-size: 12px;
  }
  
</style>