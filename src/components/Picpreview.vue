<template>
  <transition name="fade">
    <div class="lg-preview-wrapper" v-show="show" @click.stop="showpic" @touchmove.prevent>
      <img  class="lg-preview-img"
            :src="currentpic.imgurl"
            :alt="currentpic.title">
      <div class="lg-preview-title" >
        {{currentpic.title}}
      </div>
      <div class="lg-preview-nav-left" >
        <span   class="lg-preview-nav-arrow" @click.stop="pre" >
          <v-btn flat icon large color="white"><v-icon>keyboard_arrow_left</v-icon></v-btn> 
        </span>
      </div>
      <div class="lg-preview-nav-right" >
        <span class="lg-preview-nav-arrow" @click.stop="next">
          <v-btn flat icon large color="white" ><v-icon>keyboard_arrow_right</v-icon></v-btn>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'Preview',
    computed:
    mapState({
      'currentpic':'currentpic',
      'piclist':'piclist',
      show(){
      return this.$store.state.picpreview===true
      }
    }),
    methods: {
      ...mapMutations({
       'showpic': 'showpic',
       'updatecurrentpic':'updatecurrentpic'
      }),
      pre(){
        let index=this.piclist.findIndex(pic => pic.time===this.currentpic.time)
        if(index>0)
        { index=index-1
          this.updatecurrentpic(index)
        }
      },
      next(){
        console.log('next')
        let index=this.piclist.findIndex(pic => pic.time===this.currentpic.time)
        if(index<this.piclist.length-1)
        { index=index+1
          this.updatecurrentpic(index)
        }
      }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-active {
    opacity: 0
}
.lg-preview-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10000;
}

@keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg) scale(1);
        transform: rotate(0deg) scale(1);
    }
    50% {
        -webkit-transform: rotate(180deg) scale(0.6);
        transform: rotate(180deg) scale(0.6);
    }
    100% {
        -webkit-transform: rotate(360deg) scale(1);
        transform: rotate(360deg) scale(1);
    }
}
.lg-preview-img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
.lg-preview-nav-arrow {
    position: absolute;
    top: 50%;
    margin-top: -15px;
    background: rgba(0, 0, 0, 0);
    line-height: 40px;
    width: 20px;
    height: 20px;
    
}
.lg-preview-nav-left,
.lg-preview-nav-right {
    position: absolute;
    height: 100%;
    margin: 0 5px;
    width: 100px;
    top: 0;
    color: #fff;
    transition: opacity .2s;
    text-align: center
}
.lg-preview-nav-left {
    left: 0;
}
.lg-preview-nav-left .lg-preview-nav-arrow {
    left: 0;
    margin-left: 40px;

}
.lg-preview-nav-right {
    right: 0;
}
.lg-preview-nav-right .lg-preview-nav-arrow {
    right: 0;
    margin-right: 80px;
}
.lg-preview-title {
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    width: 100%;
    color: #fff;
    background: rgba(0, 0, 0, .5);
    box-sizing: border-box;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
}
@media all and (max-width: 768px) {
    .lg-preview-nav-left,
    .lg-preview-nav-right {
        width: 100px;
    }
    .lg-preview-nav-left .lg-preview-nav-arrow {
        margin-left: 0px;
    }
    .lg-preview-nav-right .lg-preview-nav-arrow {
        margin-right: 35px;
    }
}
</style>