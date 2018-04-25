<template>
  <!-- Index component -->
  <div class="panel panel-default row">
    <div class="panel-heading"><h4>Trade or view your portfolio</h4></div>
    <div class="panel-body">
      <p>You may Save & Load your Data</p>
      <p>Click on 'End Day' to begin a new Day!</p>
      <hr/>
      <h3>Your funds: {{ getAvailableFundsFormatted }}</h3>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default{
  computed: {
    ...mapGetters([
      'getAvailableFundsFormatted'
    ]),
  }
}
</script>
