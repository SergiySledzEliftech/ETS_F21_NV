<template>
  <div class="container">
    <div class="btn__group">
      <v-btn class="btn" :to="'/personalCabinet'">account settings</v-btn>
      <v-btn class="btn" :to="'/personalCabinet/History'">history</v-btn>
      <v-btn class="btn" :to="'/personalCabinet/Portfolio'">portfolio</v-btn>
    </div> 
    <h1>{{$route.params.id}}</h1>
  </div>
</template>