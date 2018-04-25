<template>
  <div class="container zeroLeftPadding">
    <div class="row">
    <template v-for="aStock in getOwnerStocksInfo">
        <selling-stock :theStock='aStock'></selling-stock>
    </template>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import theSellingStock from './SellingStock.vue';

export default{
  components: {
    'selling-stock': theSellingStock,
  },
  computed: {
    ...mapGetters([
      'getOwnerStocksInfo'
    ])
  },
  methods:{
  }
}
</script>
