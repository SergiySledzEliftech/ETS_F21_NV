<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-body-1 main-text">
		  Are you sure you want to delete all these articles?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="toggleCloseDialog('success')"
          >
            Yes
          </v-btn>
          <v-btn
            color="grey darken-1"
            text
            @click="toggleCloseDialog"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { Component, namespace, Vue} from 'nuxt-property-decorator'


const { State, Action, Mutation, Getter } = namespace('news');

@Component({})

export default  class NewsPage extends Vue {

	@Action toggleCloseDialog
	@State showDialog

}
</script>

<style scoped>
.main-text {
  text-align: center;
}
</style>