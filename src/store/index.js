import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'


Vue.use(Vuex)

import srvApi from '../services/api'


const vuexLocalStorage = new VuexPersist({
  // key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    cart: [],
    bestFoods: [],
    foods: [],
    foodSearch: [],
    orders: [],
    user: {
      nama: "",
      email: ""
    },
    snackbar:{
      message:"",
      isButton: false
    }
  },
  getters: {
    getCart: state => {
      return state.cart;
    },
    getBestFood: state => {
      return state.bestFoods;
    },
    getFoods: state => {
      return state.foods;
    },
    getFoodSearch: state => {
      return state.foodSearch;
    },
    getOrders: state => {
      return state.orders;
    },
    getUser: state => {
      return state.user;
    },
    getSnackbar: state=>{
      return state.snackbar
    }
  },
  mutations: {
    SET_BEST_FOODS: (state, payload) => {
      state.bestFoods = payload;
    },
    SET_FOODS: (state, payload) => {
      state.foods = payload;
    },
    SET_FOOD_SEARCH: (state, payload) => {
      state.foodSearch = payload;
    },
    ADD_CART: (state, payload) => {
      state.cart.push(payload);
    },
    REMOVE_CART: (state, payload) => {
      state.cart.splice(state.cart.indexOf(payload), 1);
    },
    SET_CART: (state, payload) => {
      state.cart = payload;
    },
    SET_ORDERS: (state, payload) => {
      state.orders = payload;
    },
    ADD_ORDER: (state, payload) => {
      state.orders.push(payload);
    },
    REMOVE_ORDER: (state, payload) => {
      state.orders.splice(state.orders.indexOf(payload), 1);
    },
    SET_USER: (state, payload) => {
      state.user = payload;
    },
    SET_SNACKBAR: (state, payload) => {
      state.snackbar = payload
    }
  },
  actions: {
    fetchBestFoods: async ({ commit }) => {
      try {
        let result = await srvApi.getBestFood();
        commit('SET_BEST_FOODS', result.data);
        return Promise.resolve(result.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    fetchFoods: async ({ commit }) => {
      try {
        let result = await srvApi.getAllFoods();
        commit("SET_FOODS", result.data);
        return Promise.resolve(result.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    fetchFoodSearch: async ({ commit }, query) => {
      try {
        let result = await srvApi.getSearchFood(query);
        commit("SET_FOOD_SEARCH", result.data);
        return Promise.resolve(result.data);
      } catch (error) {
        return Promise.reject(error);

      }
    },
    fetchFoodByID: async ({ commit }, slug) => {
      try {
        let result = await srvApi.getFood(slug);
        return Promise.resolve(result.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    fetchCart: async ({ commit }) => {
      try {
        let result = await srvApi.getCart();
        commit("SET_CART", result.data);
        return Promise.resolve(result.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    addToCart: async ({ commit }, payload) => {
      try {
        let result = await srvApi.addToCart(payload);
        commit("ADD_CART", result.data);
        return Promise.resolve(result.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    removeToCart: async ({ commit }, payload) => {
      try {
        let result = await srvApi.deleteCart(payload.id);
        commit("REMOVE_CART", payload);
        return Promise.resolve(result.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    updateToCart: async ({ commit }, payload) => {
      try {
        let result = await srvApi.updateCart(payload.id, payload);
        return Promise.resolve(result.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    addToOrder: async ({ commit, dispatch, state }, payload) => {
      try {
        let result = await srvApi.addOrder(payload);
        commit("ADD_ORDER", result.data);
        state.cart.forEach(item => {
          dispatch("removeToCart", item);
        })
        commit("SET_CART", []);
        return Promise.resolve(result.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    userSignIn: async ({ commit, dispatch }, payload) => {
      try {
        let result = await srvApi.userSignIn(payload);
        let auth = await dispatch("getUserData", payload.email);
        let user = {
          ...result.data,
          email: auth.email,
          nama: auth.nama,
          id: auth.id
        }
        commit("SET_USER", user);
        return Promise.resolve(result.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    userRegister: async ({ commit,dispatch }, payload) => {
      try {
        let result = await srvApi.userRegister(payload);
        let auth = await dispatch("getUserData", payload.email);
        let user = {
          ...result.data,
          email: auth.email,
          nama: auth.nama,
          id: auth.id
        }
        commit("SET_USER", user);
        return Promise.resolve(result.data);
      } catch (error) {
        // console.log('error store', error.response)
        return Promise.reject(error);
      }
    },
    getUserData: async ({ commit }, payload) => {
      try {
        let result = await srvApi.getUserData(payload);
        // console.log('result auth', result.data[0]);
        return Promise.resolve(result.data[0]);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
})
