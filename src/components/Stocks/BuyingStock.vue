<template>
  <div class="col-md-6 zeroLeftPadding">
    <div class="panel panel-success">
      <div class="panel-heading"><span class="stockHeading">{{ theStock.theName }}</span><span class="stockPrice">(Price: {{ theStock.thePrice }})</span></div>
      <div class="panel-body row">
          <div class="col-xs-7">
            <input type="text" class="form-control" placeholder="Quantity"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'
            v-model="enteredQuantity">
          </div>
          <div class="col-xs-3 col-xs-offset-2 col-xs-offset-2 col-md-2 col-md-offset-3">
            <button type="button" class="btn btn-success" :class="{'disabled': buttonDisabling}" @click='buyingStock'>Buy</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';


export default{
  data: function(){
    return{
      enteredQuantity: ""
    }},
  props:{
    theStock:{
      type: Object,
      required: true,
    },
    availableFunds:
    {
      type: Number,
      required:true
    }
  },
  computed: {
    buttonDisabling(){
      if(this.enteredQuantity == "" || this.enteredQuantity == 0 || (this.enteredQuantity*this.theStock.thePrice > this.availableFunds) ||
        (this.theStock.thePrice > this.availableFunds)){
        return true;
      }
      else{
        return false;
      }
    }
  },
  methods:{
    buyingStock(){
      if(!this.buttonDisabling){
        this.buyStock({theID: this.theStock.theID,  theQuantity: this.enteredQuantity, thePrice: this.theStock.thePrice, theName: this.theStock.theName});
        this.enteredQuantity = "";
      }
    },
    ...mapActions([
      'buyStock'
    ]),
  }
}
</script>
