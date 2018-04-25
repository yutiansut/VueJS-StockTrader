<template>
  <div class="container zeroLeftPadding">
    <div class="row">
    <template v-for="(aStock, theIndex) in getAvailableStocks">
        <buying-stock :theStock='aStock' :availableFunds='getAvailableFunds'></buying-stock>
    </template>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import theBuyingStock from './BuyingStock.vue';

export default{
  components: {
    'buying-stock': theBuyingStock,
  },
  computed: {
    ...mapGetters([
      'getAvailableStocks',
      'getAvailableFunds'
    ])
  },
  methods:{
  }
}
</script>
