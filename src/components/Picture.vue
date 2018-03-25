<template>
    <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex xs6 v-for="pic in piclist" :key="pic.time">
              <v-card>
                <v-card-media  height="200px" :src=pic.imgurl @click.stop="showpic(pic)">
                <v-spacer></v-spacer>
                <v-btn flat icon small @click.stop="deletepic(pic.time)">
                <v-icon samll>clear</v-icon>
                </v-btn>      
                </v-card-media>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  computed:mapState({
    'piclist': 'piclist'
  }),
  methods:{
    ...mapMutations({
      'deletepic': 'deletepic',
      'showpic': 'showpic'
    }),
  }
}
</script>
<style>

</style>
