<template>
  <v-dialog transition="dialog-bottom-transition"   
    v-model="show" persistent max-width="500px" class="mt-5">
    <v-card v-show="login">
      <v-card-text>
        <v-text-field label="E-mail" v-model="user.email" single-line
          full-width hide-details autofocus>
        </v-text-field>
        <v-divider></v-divider>
        <v-text-field label="Password" v-model="user.password" single-line
          full-width hide-details autofocus>
        </v-text-field>
        <v-btn color="primary" block @click.stop="dologin">Log in</v-btn>
        <v-btn color="primary" block @click.stop="quit">Quit</v-btn>
      </v-card-text>
    </v-card>
    <v-card v-show="signup">
      <v-card-title>
        <v-spacer></v-spacer>
        <croppa v-model="croppa"
          :height="200"
          :width="200"
          placeholder="Photo"
          placeholder-color="#9E9E9E"
          :placeholder-font-size="16"
          canvas-color="#EEEEEE"
          :show-remove-button="true"
          remove-button-color="#9E9E9E"
          initial-size="cover"
          :quality="2"
          :prevent-white-space="true"
          initial-image='/static/img/avatar-1.png'
        ></croppa>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-text-field label="DisplayName     (length<20)" v-model="user.name" single-line
          full-width hide-details autofocus>
        </v-text-field>
        <v-divider></v-divider>
        <v-text-field label="E-mail" v-model="user.email" single-line
          full-width hide-details autofocus>
        </v-text-field>
        <v-divider></v-divider>
        <v-text-field label="Password     (6<length<23)" v-model="user.password" single-line
          full-width hide-details autofocus>
        </v-text-field>
        <v-btn color="primary" block @click.stop="dosignup">Sign up</v-btn>
        <v-btn color="primary" block @click.stop="quit">Quit</v-btn>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-actions>
        <v-btn color="primary" block flat @click.stop="switchshow('login')">Log in</v-btn>
        <v-btn color="primary" block flat @click.stop="switchshow('signup')">Sign up</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Localstore from '../localstore'
export default {
  data () {
    return {
      croppa:{},
      user:{
        name:'',
        email:Localstore.fetch('USER').email||'',
        password:Localstore.fetch('USER').password||'',
        photoURL:'./static/avatar-1.png',
      },
      login:true,
      signup:false,
      resendemail:false
    }
  },
  computed:mapState({
    show(){
      return this.$store.state.loginflag
    }
  }),
  methods:{
    ...mapMutations({
      'changeloginflag': 'changeloginflag',
      'changeloginstate':'changeloginstate',
      'getuser':'getuser',
      'saveuser':'saveuser',
      'changesnackbar':'changesnackbar',
      'getstore':'getstore',
      'savestore':'savestore'
    }),
    quit(){
      this.clear()
      this.switchshow('login')
      this.changeloginflag(false)
    },
    dologin(){
      let that=this
      if(this.user.email!=''&&this.user.password!=''){
        wilddog.auth().signInWithEmailAndPassword(this.user.email,this.user.password)
      .then(function () {
        //console.info("login success, currentUser->",  wilddog.auth().currentUser);
        that.changesnackbar({flag:true,content:'Log in Success, Welcom'})
        that.getuser()
        that.clear()
        that.switchshow('login')
        that.changeloginstate(true)
        that.changeloginflag(false) 
      }).catch(function (err) {
        console.info('login failed ->',err)
        that.changesnackbar({flag:true,content:'Log in Failed, Please Check Again'})
      })
      }else this.changesnackbar({flag:true,content:'Please Fill in Your Login Information'})
    },
    dosignup(){
      let that=this
      let url=this.croppa.generateDataUrl('image/jpeg')
      if(url!=''){
        this.user.photoURL=url
      }
      if(this.user.name!=''&&this.user.email!=''&&this.user.password!=''){
        wilddog.auth().createUserWithEmailAndPassword(this.user.email,this.user.password).then(function(user){
          that.changesnackbar({flag:true,content:'Sign Up Success, Welcom'})
          that.saveuser(that.user)
          that.clear()
          that.switchshow('login')
          that.changeloginstate(true)
          that.changeloginflag(false) 
        //wilddog.auth().currentUser.sendEmailVerification()
        }).catch(function (error) {
          that.changesnackbar({flag:true,content:'Sign Up Failed, Please Check Again'})
          console.log(error)
        })
      }else this.changesnackbar({flag:true,content:'Please Fill in Your Information'})
    },
    clear(){
      this.user={
        name:'',
        email:'',
        password:'',
        photoURL:'/static/avatar-1.png',}
    },
    switchshow(s){
      switch (s) {
        case 'login':
          this.signup=false
          this.login=true
          this.croppa.remove()
          this.clear()
          break;
        case 'signup':
          this.login=false
          this.signup=true
          this.clear()
          break;
        default:
          break;
      }
    }

  }
}
</script>
