import axios from "axios";
import { createStore } from "vuex";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
// import {ApplyToken} from "@/service/Authenticate.js"
// import {useCookies} from "vue3-cookies"
// const {cookies} = useCookies()
const Api = "http://localhost:3010/";
export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    recentPro: null,
    product: null,
  },
  getters: {},
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setSingleUser(state, value) {
      state.user = value;
    },
    setProducts(state, value) {
      state.products = value;
    },
    setRecentProduct(state, value) {
      state.recentPro = value;
    },
    setSingleProduct(state, value) {
      state.product = value;
    },
  },
  actions: {
    async recentProducts(context) {
      try {
        console.log("Recent Products");
        // gets recent products (the endpoint is from the backend API
        const { results, Msg } = await (
          await axios.get(`${Api}products/recent`)
        ).data;

        if (results) {
          context.commit("setRecentProduct", results);
        } else {
          toast.error(`${Msg}`, {
            autoClose: 2000,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
        });
      }
    },
  },
  modules: {},
});
