<template>
  <div 
    :style="`height: ${height}px`"
    class="scroll"
    ref="scroll"
  >
    <slot></slot>
  </div>
  
</template>

<script>
import Component from 'nuxt-class-component'
import { Vue, Prop } from 'vue-property-decorator'

@Component({})

export default class Scroll extends Vue{
  @Prop({ type: String, required: true}) height
}
</script>

<style scoped>

  .scroll {
    overflow-y: auto;
    min-height: 200px;
  }

  .scroll::-webkit-scrollbar{
	width: 6px;
	background-color: #F5F5F5;
}


.scroll::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: rgb(190, 43, 141);
}

.scroll::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

</style>