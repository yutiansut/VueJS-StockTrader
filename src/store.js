/*
  Self notes:
  1. Mutations don't have access to other mutations (so far) but since we
  pass everything through ACTIONS, which have access to mutations, we just
  stick to very simple operations for mutations (no repetitions) and we do
  the whole "combining" in the actions instead.

  2. Mutations don't return info - they're there to mutate the state, getters
  do the job of returning stuff.

  3. To gain access to getters in actions (actions receive CONTEXT) but we can
    extract what with need (before: only commit) thus actionName:({commit}) => { ...}
    instead of actionName:context => { ...} but now we need GETTERS as well, so:
    actionName:({commit, getters}) => { commit('nameOfAction', payload);
    console.log(getters.theDoubleCounter)}      //Note that getter is called withotu ()

  4. Import {mapActions} from 'vuex'; before using it, else it won't be defined

  5. When refering (in a component, in the methods section) to another method,
    call it with this.methodName -> otherwise, it won't work.

  6. So far, getters DON'T accept payloads -> so have to work around

  7. Recall that for a for loop, we can have TEMPLATE Around so we don't print empty divs

  8. VueJS will absolutely NOT accept broken html tags -> so watch out with Bootstrap

  9. Having a problem with "generated" input (v-model) and some prop (disabledbutton)?
      -> break it down into a single component so it has its own data prop that
      we can follow and track (like BuyingStocks -> each rectangle is now a component)
      but before a for loop generated them straight in Stocks.vue)
*/
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//Setting up our store
export const theStore = new Vuex.Store({
  /*
    AvailableFunds: the user's funds.
    availableStocks: the Stock: id_stock, name, price {theID: "1", theName: "Some stock", thePrice: 120}
    ownerStocks: the stocks that the user owns. the id of the stock + the quantity {theID: "1", theQuantity: 20}
  */
  state:{
    availableFunds: 10000,
    ownerStocks: [],
    availableStocks: []
  },
  getters:{
    //1. Return the available funds
    getAvailableFunds: state => {
      return state.availableFunds;
    },
    //1.a -> same but formatted
    getAvailableFundsFormatted: state => {
      return '$' + state.availableFunds.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    },
    //2. Get the stocks of the owner
    getOwnerStocks: state => {
      return state.ownerStocks;
    },
    //2.a Get the stocks of the owner with info, ready to be printed
    getOwnerStocksInfo: state => {

      let theOwnerArray = [];

      //For each owner stock, get the price + quantity
      for(let i=0; i<state.ownerStocks.length; i++){
        let theIndex =  state.availableStocks.findIndex(val => val.theID == state.ownerStocks[i].theID);
        theOwnerArray.push({
          theID: state.availableStocks[theIndex].theID,
          thePrice: state.availableStocks[theIndex].thePrice,
          theName: state.availableStocks[theIndex].theName,
          theQuantity: state.ownerStocks[i].theQuantity,
        });
      }

      return theOwnerArray;
    },
    //3. Get the available stocks (all)
    getAvailableStocks: state => {
      return state.availableStocks;
    },
  },
  mutations:{
    //1. Subtracting $
    subtractFunds: (state, payload) => {
      state.availableFunds -= payload;
    },
    //2. Adding $
    addFunds: (state, payload) => {
      state.availableFunds += payload;
    },
    //3. Adding a stock for the first time
    addStockBase: (state,payload)=>{
      state.ownerStocks.push({theID: payload.theID, theQuantity: parseInt(payload.theQuantity)});
    },
    //4. Adding a stock(quantity into an index)
    addMoreStocks: (state,payload)=>{
      state.ownerStocks[payload.theIndex].theQuantity += parseInt(payload.theQuantity);
    },
    //5. Removing a stock(quantity into an index)
    removeMoreStocks: (state,payload)=>{
      state.ownerStocks[payload.theIndex].theQuantity -= parseInt(payload.theQuantity);
      //If quantity is now 0, remove it altogether.
      if(state.ownerStocks[payload.theIndex].theQuantity == 0){
        state.ownerStocks.splice(payload.theIndex,1);
      }
    },
    //6. Initializing stocks
    initializeStocks: (state,payload)=>{
      state.availableStocks = payload;
    },
    //7. Change stock price
    changeStockPrice: (state, payload) => {
      state.availableStocks[payload.theIndex].thePrice = payload.thePrice;
    },
    //8. Loading saved data
    loadSavedData: (state, payload) => {
      state.ownerStocks = payload.theOwnerStocks;
      state.availableFunds = payload.theFunds;
      state.availableStocks = payload.theStocks;
    }
  },
  actions:{
    //1. Buy a stock
    //Money validation already done in component itself.
    //Get a quantity, and an id. Check if there, if so -> add to the existing index.
    //If not, create it. Then subtract the money.
    //Format: {theID, theQuantity}
      buyStock: ({commit, getters}, payload) => {
        //Get the index in the user's array

        let theIndex = getters.getOwnerStocks.findIndex(val => val.theID == payload.theID);
        //Found it, so add to existing
        if(theIndex > -1)
        {
          commit('addMoreStocks', {theIndex: theIndex, theQuantity: payload.theQuantity});
        }
        //Not found, so insert it
        else
        {
          commit('addStockBase', {theID: payload.theID, theQuantity: payload.theQuantity});
        }

        //Now subtract the money
        let amount = payload.theQuantity*getters.getAvailableStocks[getters.getAvailableStocks.findIndex(val => val.theID == payload.theID)].thePrice;

        commit('subtractFunds', amount);


      },
    //2. Sell a stock
    //Availability validation already done
    //Get quantity and an id. Subtract quantity, add that amount to funds
    //Format: {theID, theQuantity}
    sellStock:({commit, getters}, payload) => {
      let theIndex = getters.getOwnerStocks.findIndex(val => val.theID == payload.theID);

      commit('removeMoreStocks', {theID: payload.theID, theIndex: theIndex, theQuantity: payload.theQuantity});

      let amount = payload.theQuantity*getters.getAvailableStocks[getters.getAvailableStocks.findIndex(val => val.theID == payload.theID)].thePrice;

      commit('addFunds', amount);
    },
    //3. Initialzie stocks -> given some args, initialize them
    initializeStocks:({commit}, payload)=>{
      commit('initializeStocks', payload);
    },
    //4. Change a stock's price
    changeStockPrice:({commit, getters}, payload) => {
      //Get the corresponding index in availableStocks
      let theIndex = getters.getAvailableStocks.findIndex(val => val.theID == payload.theID);
      //Now, change the price
      commit('changeStockPrice', {theIndex: theIndex, thePrice: payload.thePrice});
    },
    //5. Load the saved data
    loadSavedData: ({commit}, payload) => {
      commit('loadSavedData', {theOwnerStocks: payload.ownerStocks, theFunds: payload.availableFunds, theStocks: payload.availableStocks});
    }
  }
});
