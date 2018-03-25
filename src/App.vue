<template>
  <v-app>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>NotePad</v-toolbar-title>
      <v-btn color="accent" dark class="mr-3" absolute bottom right fab @click.stop="pressadd">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer fixed v-model="drawer" app temporary clipped>
      <v-layout row>
    <v-flex xs12>
      <v-card flat tile v-show="loginstate">
        <v-card-media :src="user.photoURL" height="300px">
        </v-card-media>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{user.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">email</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{user.email}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-card-actions>
          <v-btn color="primary"  block @click="logout">Log out</v-btn>
        </v-card-actions>
      </v-card>
      <v-card flat tile v-show="!loginstate">
        <v-btn color="primary"  block @click="changeloginflag(true)">Log in</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3 mt-3>
            <v-card-actions>
              <v-spacer v-show="!loginstate"></v-spacer>
              <v-btn flat  color="primary" v-show="!loginstate" @click="changeloginflag(true)"><v-icon >cloud</v-icon>Log in</v-btn>
              <v-btn flat  block color="primary" v-show="loginstate" @click="download"><v-icon >cloud_download</v-icon>Download</v-btn>
              <v-btn flat  block color="primary" v-show="loginstate" @click="upload"><v-icon >cloud_upload</v-icon>Upload</v-btn>
            </v-card-actions>
            <v-tabs icons-and-text grow fixed-tabs slider-color="primary" v-model="pagenum">
               <v-tab ><v-icon>description</v-icon></v-tab>
               <v-tab ><v-icon>image</v-icon></v-tab>
            </v-tabs>
          <router-view/> 
          </v-flex>  
        </v-layout>
      </v-container>
      <Textinput></Textinput>
      <Picinput></Picinput>
      <User></User>
      <Picpreview></Picpreview>
      <v-snackbar :timeout="timeout" bottom vertical multi-line v-model="snackbar.flag">
      {{snackbar.content}}
      <v-btn flat color="accent" @click.stop="changesnackbar({flag:false,content:''})">Close</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import Textinput from './components/Textinput'
import Picinput from './components/Picinput'
import User from './components/User'
import Picpreview from './components/Picpreview'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      drawer: false,
      pagenum: '0',
      timeout:3000
    }
  },
  name: 'App',
  components:{
    Textinput,Picinput,Picpreview,User
  },
  mounted(){
    //this.$router.push('text')
  },
  computed:mapState({
    'count': 'count',
    'addflag': "addflag",
    'snackbar': 'snackbar',
    'loginstate':'loginstate',
    'user':'user'
  }),
  watch:{
    pagenum(){
      this.changepage(this.pagenum)
      switch (this.pagenum) {
        case '0':
          this.$router.push('text')
          break
        case '1':
          this.$router.push('pic')
          break
        default:
          break
      }
    }
  },
  methods:{
    ...mapMutations({
      'pressadd': 'pressadd',
      'changepage': 'changepage',
      'changesnackbar':'changesnackbar',
      'changeloginflag':'changeloginflag',
      'download':'download',
      'upload':'upload',
      'saveuser':'saveuser',
      'changeloginstate':'changeloginstate'
    }),
    logout(){
      let that=this
      wilddog.auth().signOut().then(function () {
        that.changesnackbar({flag:true,content:'Log Out Success'})
        that.changeloginstate(false)
        that.saveuser({})
      });
    }
  }
  
}
</script>
