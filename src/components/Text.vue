<template>
<v-flex>
  <Onetext v-for="text in textlist" v-bind="text" :key="text.time">
  </Onetext>
</v-flex>  
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Onetext from './Onetext'
export default {
  data () {
    return {
      
    }
  },
  components:{
    Onetext
  },
  computed:mapState({
    'textlist': 'textlist'
  })
}
</script>