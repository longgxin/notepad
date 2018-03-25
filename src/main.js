// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuex from 'vuex'
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';
import Localstore from './localstore'
var wilddog = require('wilddog')
var config = {
  authDomain: "wd8583937433xbbdeb.wilddog.com",
  syncURL: "https://wd8583937433xbbdeb.wilddogio.com"
}
wilddog.initializeApp(config)
var ref = wilddog.sync().ref()

const STORE_KEY1= 'USER'
const STORE_KEY2= 'TEXTLIST'
const STORE_KEY3= 'PICLIST'
Vue.use(Croppa);
Vue.use(Vuex)
Vue.use(Vuetify, { theme: {
  primary: "#3F51B5",
  secondary: "#3F51B5",
  accent: "#FF1744",
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})
Vue.config.productionTip = false
const store = new Vuex.Store({
  state: {
    textlist:[],
    textcache:{},
    piclist:[],
    pagenum: '0',
    addflag: false,
    loginflag: false,
    picpreview: false,
    currentpic:{},
    loginstate:false,
    user:{
      name:'',
      email:'',
      password:'',
      photoURL:''
    }, 
    snackbar:{
      flag:false,
      content:''
    }
  },
  mutations: {
    changesnackbar(state,snackbar){
      state.snackbar=snackbar
    },
    getuser(state){
      if(wilddog.auth().currentUser!=null){
        ref.child(wilddog.auth().currentUser.uid+'/user').once('value', function(snapshot) {
          var newPost = snapshot.val();
          if(newPost!=null){
          Localstore.save(STORE_KEY1,newPost)
          state.user=newPost}
        //  console.log(state.user)
        }, function (error) {
          console.log(error);
        })
      }else
      state.user= Localstore.fetch(STORE_KEY1)||{}
    },
    saveuser(state,user){
      if(wilddog.auth().currentUser!=null){
        ref.child(wilddog.auth().currentUser.uid+'/user').set(user)
      }
      state.user=user
      Localstore.save('USER',user)
    },
    download(state){
      if(wilddog.auth().currentUser!=null){
        ref.child(wilddog.auth().currentUser.uid+'/user').once('value', function(snapshot) {
          var newPost = snapshot.val();
          if(newPost!=null){
          Localstore.save(STORE_KEY1,newPost)
          state.user=newPost}
        //  console.log(state.user)
        }, function (error) {
          console.log(error);
        })
        ref.child(wilddog.auth().currentUser.uid+'/textlist').once('value', function(snapshot) {
          var newPost = snapshot.val();
          if(newPost!=null){
          Localstore.save(STORE_KEY2,newPost)
          state.textlist=newPost
          }else
            state.textlist=Localstore.fetch(STORE_KEY2)||[]
        }, function (error) {
          console.log(error);
        })
        ref.child(wilddog.auth().currentUser.uid+'/piclist').once('value', function(snapshot) {
          var newPost = snapshot.val();
          if(newPost!=null){
          Localstore.save(STORE_KEY3,newPost)
          state.piclist=newPost
          }else
            state.piclist=Localstore.fetch(STORE_KEY3)||[]
        }, function (error) {
          console.log(error);
        })
        state.snackbar={flag:true,content:'Download Success'}
      }else
        state.snackbar={flag:true,content:'Connecting Error'}
    },
    upload(state){
      if(wilddog.auth().currentUser!=null){
        ref.child(wilddog.auth().currentUser.uid+'/textlist').set(state.textlist)
        ref.child(wilddog.auth().currentUser.uid+'/piclist').set(state.piclist)
        state.snackbar={flag:true,content:'Upload Success'}
      }else
        state.snackbar={flag:true,content:'Connecting Error'}
    },
    changeloginstate(state,s){
      state.loginstate=s
    },
    changeloginflag(state,s){
      state.loginflag=s
    },
    showpic(state,pic){
      state.picpreview=!state.picpreview
      state.currentpic=pic
      //console.log(state.currentpic)
    },
    updatecurrentpic(state,index){
      state.currentpic=state.piclist[index]
    },
    pressadd(state){
      state.addflag=!state.addflag
      //console.log(state.addflag)
    },
    changepage(state,num){
      state.pagenum=num
      //console.log(state.pagenum)
    },
    addtext(state,text){
      state.textlist.unshift(text)
      Localstore.save(STORE_KEY2,state.textlist)
     // console.log(state.textlist)
    },
    deletetext(state,time){
      state.textlist.splice(state.textlist.findIndex(text => text.time===time),1)
      Localstore.save(STORE_KEY2,state.textlist)
     // console.log(state.textlist)
    },
    textshowcontent(state,time){
      let i =state.textlist.findIndex(text => text.time===time)
      state.textlist[i].showcontent=!state.textlist[i].showcontent
      Localstore.save(STORE_KEY2,state.textlist)
    },
    edittext(state,time){
      let i=state.textlist.findIndex(text => text.time===time)
      state.textcache=state.textlist[i]
      state.textlist.splice(i,1)
      Localstore.save(STORE_KEY2,state.textlist)
      state.addflag=!state.addflag
    },
    addpic(state,pic){
      state.piclist.unshift(pic)
      Localstore.save(STORE_KEY3,state.piclist)
     // console.log(state.piclist)
    },
    deletepic(state,time){
      state.piclist.splice(state.piclist.findIndex(pic => pic.time===time),1)
      Localstore.save(STORE_KEY3,state.piclist)
      //console.log(state.piclist)
    },
    initapp(state){
      state.user=Localstore.fetch(STORE_KEY1)||{}
      state.textlist=Localstore.fetch(STORE_KEY2)||[]
      state.piclist=Localstore.fetch(STORE_KEY3)||[]
      if(state.user.length!=0&&state.user.email!=''&&state.user.password!=''){
        wilddog.auth().signInWithEmailAndPassword(state.user.email,state.user.password)
      .then(function () {
        ref.child(wilddog.auth().currentUser.uid+'/user').once('value', function(snapshot) {
          var newPost = snapshot.val();
          if(newPost!=null){
          Localstore.save(STORE_KEY1,newPost)
          state.user=newPost}
        //  console.log(state.user)
        }, function (error) {
          console.log('error');
        })
        state.loginstate=true
      }).catch(function (err) {
        console.log('e1')
      })
      }
    }
  }

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted(){
    this.$store.commit('initapp')
  }
})
