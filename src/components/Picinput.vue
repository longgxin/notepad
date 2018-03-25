<template>
  <v-dialog transition="dialog-bottom-transition" 
    v-model="show" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <croppa v-model="croppa"
          :height="height"
          :width="width"
          placeholder="Add A Picture"
          placeholder-color="#9E9E9E"
          :placeholder-font-size="16"
          canvas-color="#EEEEEE"
          :show-remove-button="true"
          remove-button-color="#9E9E9E"
          initial-size="cover"
          :quality="2"
          :prevent-white-space="false"
        ></croppa>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-slider label="height" :max="400" v-model="height"></v-slider>
        <v-slider label="width" :max="300" v-model="width"></v-slider>
        <v-text-field label="Title" v-model="title" single-line
          full-width hide-details>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.stop="close"><v-icon>close</v-icon></v-btn>
        <v-btn color="primary" flat @click.stop="additem"><v-icon>check</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      croppa:{},
      height: 200,
      width: 300,
      title:''
    }
  },
  computed:mapState({
    show(){
      return this.$store.state.addflag===true&&this.$store.state.pagenum==='1'
    }
  }),
  methods:{
    ...mapMutations({
      'pressadd': 'pressadd',
      'addpic': 'addpic'
    }),
    close(){
      this.title=''
      this.croppa.remove()
      this.pressadd()
    },
    additem(){
      let pic={}
      pic.title=this.title
      pic.time=new Date().getTime()
      pic.imgurl= this.croppa.generateDataUrl('image/jpeg')
      if(pic.imgurl!='')
        this.addpic(pic)
      this.title=''
      this.croppa.remove()
      this.pressadd()
    }
  }
}
</script>