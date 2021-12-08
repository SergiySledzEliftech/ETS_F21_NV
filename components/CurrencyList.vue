<template>

<div  :class="{isLoaded: 'd-flex justify-center align-center currency-wrapper'}">
  <div v-if="isLoaded">
      <v-progress-circular  color="primary" indeterminate></v-progress-circular>
  </div>
  <div v-else>
    <v-list class="currency-list grey lighten-4 d-flex flex-column" 
    height="100%"
    subheader 
    >
      <v-row class="pa-1">
        <v-subheader class="mt-2 ml-2 font-weight-bold">Currency info</v-subheader>
            <v-slide-group
              class="mt-2 ml-2"
              multiple
            >
              <v-slide-item
                v-for="value in currencies"
                :key="`${Math.random() * value.price}`"
                v-slot="{ active, toggle }"
              >
                <v-btn
                  class="mx-2 grey darken-1 white--text"
                  :input-value="active"
                  active-class="grey lighten-2 white--text"
                  depressed
                  rounded
                  small
                  @click="toggle(), toggleCurrency(value.title)"
                >
                  {{value.title}}
                </v-btn>
              </v-slide-item>
            </v-slide-group>
      </v-row>  
      <div class="list-box mt-5">
        
        <v-list-item
          v-for="coin in toggledCurrencies"
          :key="coin.title"
          class="d-block list-item list-item-container"
        >

        <div class="list-wrapper d-flex" >
          <v-list-item-avatar class="currency-img">
            <v-img
            
              max-height="24"
              max-width="24"
              :lazy-src="coin.img"
              :src="coin.img"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content >
            <v-list-item-title class="black--text currency-text" v-text="coin.name"></v-list-item-title>
            <v-list-item-title class=" darken-1 blue-grey--text currency-text" v-text="coin.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content  >
            <v-list-item-title class="price-box currency-text" >{{`$${coin.price}`}}</v-list-item-title>
            <v-list-item-title class="price-box currency-text" :class="`${Math.sign(coin.change) ? 'green--text darken-1' : 'red--text darken-2'}`" >{{`${Math.sign(coin.change) ? '+' : '-'}${coin.change}%`}}</v-list-item-title>
          </v-list-item-content>
        </div>

          
        </v-list-item>
       </div>
    </v-list>
  </div>
</div>
  
</template>

<script>


import { Component, namespace, Vue } from 'nuxt-property-decorator'
const { State, Action } = namespace('news');

@Component({components: {
}})


export default  class NewsPage extends Vue{

  @State currencies
  @State toggledCurrencies
  @Action toggleCurrency
  @Action fetchCurrencies

  data() {
    return {
      isLoaded: true
    }
  }

  async created () {
       await this.fetchCurrencies()
      this.isLoaded = false
  }

 

} 
</script>

<style>

 .price-box {
    text-align: right !important;
  }
.currency-list {
  border-radius: 6px !important;
  overflow: hidden;
}

.list-item-container {
    border: 1px solid #e7e7e7 !important;
  /* margin: 0 2.5px; */
}

.currency-wrapper {
  height: 100%;
}

@media only screen 
and (max-width : 960px) {
  .currency-list {
    display: grid;
    margin-top: 10px !important;
    grid-template-rows: 20% 80%;
  }

  .list-item {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .list-box {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: 50%;
  }

  .currency-text {
    font-size: 14px !important ;
  }


 
}

 

@media only screen 
and (max-width : 530px) {
  .list-box {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
  }

  .currency-img {
    margin-right: 0;
  }
}

</style>