<template>
  <v-card class="mt-1" >
    <v-card-title>
      <h3 class="title" fullwidth>{{subject}}</h3>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="textshowcontent(time)">
      <v-icon>{{ showcontent ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-slide-y-transition>
      <v-card-text v-show="showcontent&&content!=''">
        <div>
          <div class="subheading" v-html="content"></div>
        </div>
      </v-card-text>
    </v-slide-y-transition>
    <v-card-actions>
      <div class="ml-1">{{localetime}}</div>
      <v-spacer></v-spacer>
      <v-btn class="mr-1" color="primary"  small fab flat @click.stop="deletetext(time)">
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn class="mr-1" color="primary"  small fab flat @click.stop="edittext(time)">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>              
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  props:[
    'time','subject','content','showcontent'
  ],
  computed:{
    localetime(){
      return new Date(this.time).toLocaleString()
    }
  },
  methods:{
    ...mapMutations({
      'deletetext': 'deletetext',
      'textshowcontent': 'textshowcontent',
      'edittext':'edittext'
    })
  }
}
</script>