<template>
  <v-dialog transition="dialog-bottom-transition" 
    v-model="show" persistent max-width="500px">
    <v-card>
      <v-card-text>
        <v-text-field label="Subject" v-model="text.subject" single-line
          full-width hide-details autofocus>
        </v-text-field>
        <v-divider></v-divider>
        <v-text-field label="Content" v-model="text.content" counter="200"
          full-width multi-line single-line :rows="$vuetify.breakpoint.name==='xs'?6:3">
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
const re = /^\s+$/
export default {
  data () {
    return {
     
    }
  },
  computed:mapState({
    'text': 'textcache',
    show(){
      return this.$store.state.addflag===true&&this.$store.state.pagenum==='0'
    }
  }),
  methods:{
    ...mapMutations({
      'pressadd': 'pressadd',
      'addtext': 'addtext'
    }),
    close(){
      this.text.subject=''
      this.text.content=''
      this.pressadd()
    },
    additem(){
      let text={}
      let s1=this.text.content.replace(/\n/g,' ')
      let s2=this.text.subject
      if((!re.test(s1)&&this.text.content!='')||(!re.test(s2)&&this.text.subject!='')){
        text.time=new Date().getTime()
        text.subject=this.text.subject
        text.content=this.text.content.replace(/\n/g,'<br/>')
        text.showcontent=true
        this.addtext(text)
      }
      this.text.subject=''
      this.text.content=''
      this.pressadd()
    }
  }
}
</script>