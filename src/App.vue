<template>
  <!-- Navbar -->
  <div class="container" style="padding-top:20px; padding-bottom:2px">

    <the-header></the-header>

    <transition name="theSlide" type="animation" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>

</template>

<script>
//Import mapping functions
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

//Import the components
import theHeader from './components/Header.vue';

export default {
  name: 'app',
  components: {
    'the-header': theHeader
  },
  computed:{
    ...mapGetters([
      'getAvailableFundsFormatted',
      'getOwnerStocks',
    ]),
    theStatus: function(){
      return JSON.stringify(this.getOwnerStocks, null, 4);
    }
  },
  methods:{
    ...mapActions([
      'buyStock',
      'sellStock'
    ]),
  },
}
</script>

<style>
.stockHeading
{
  font-weight:bold;
  font-size:1.5em;
  padding-right:0.5em;
}
.zeroLeftPadding
{
  padding-left:0;
}

@media only screen and (max-width: 750px)
{
  .zeroLeftPadding
  {
    padding-left:15px;
  }
}

/*---- Our css animation for when switching components */
@keyframes theSlideIn
{
  from
  {
    transform:translateX(-20%);
  }
  to
  {
    transform:translateX(0px);
  }
}
@keyframes theSlideOut
{
  from
  {
    transform:translateX(0px);
  }
  to
  {
    transform:translateX(20%);
  }
}

.theSlide-enter
{
  opacity:0;
}

.theSlide-enter-active
{
  animation: theSlideIn 0.25s ease-out forwards;
  transition: opacity 0.25s;
  opacity:1;
}

.theSlide-leave-active
{
  opacity:1;
}

.theSlide-leave-active
{
  animation: theSlideOut 0.25s ease-out forwards;
  transition: opacity 0.25s;
  opacity:0;
}
</style>
