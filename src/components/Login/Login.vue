<template>
  <v-app>
    <loading-bar />
    <div class="container">
      <form>
        <div class="drop drop-5">
          <hr />
          <hr />
          <div class="input-container">
            <i class="fa fa-user icon"></i>
            <input
              class="input-field"
              type="text"
              placeholder="Kullanıcı Adı"
              v-model="firstName"
            />
          </div>

          <div class="input-container">
            <i class="fa fa-lock icon"></i>
            <input
              class="input-field"
              type="password"
              placeholder="Şifre"
              v-model="password"
              :rules="[rules.required, rules.min]"
              name="input-10-1"
              v-on:keyup.enter="validate"
            />
          </div>

          <div class="input-container">
            <i class="fa fa-flag icon"></i>
            <v-combobox
              :items="itemsLang"
              background-color="#526b89"
              style="border-radius: 0px; color: white"
              item-value="id"
              :return-object="true"
              item-text="text"
              v-model="DefaultSelectedLang"
              @change="changeLangSelection"
              solo
            >
              <template slot="item" slot-scope="data">
                <v-icon color="blue">flag</v-icon>
                <span>{{ data.item.text }}</span>
              </template>
            </v-combobox>
          </div>
          <div class="input-chk">
            <v-switch
              color="white"
              v-model="rememberMe"
              :label="`Beni Hatırla`"
            ></v-switch>
          </div>
        </div>
        <div class="drop drop-3">
          <input
            type="button"
            value="Giriş"
            class="Loginbtn"
            @click="validate"
          />
        </div>
      </form>

      <div class="drops">
        <div class="drop drop-4">
          <img :src="headerLogo" class="logoLgn" />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import LoadingBar from "../Shared/LoadingBar.vue";
import "../../../static/css/login.css";
import headLogo from "../../../static/img/web_logo_300x60.png";
export default {
  components: {
    LoadingBar,
  },
  data() {
    return {
      dialog: true,
      firstName: "",
      lastName: "",
      rememberMe: false,
      password: "",
      show1: false,
      headerLogo:headLogo,
      DefaultSelectedLang: this.$appConfig.DefaultItemsLang,
      rules: {
        required: (value) => !!value || "Gerekli.",
        min: (v) => (v && v.length >= 1) || "En az 1 karakter",
      },
      itemsLang: this.$appConfig.itemsLang,
    };
  },
  methods: {
    validate() {
      var loginModel = {
        username: this.firstName,
        password: this.password,
        selectedLanguage: this.DefaultSelectedLang.id,
        clientInfo: "string",
        userTimeOut: 0,
        applicationTypeCode: 3,
        userKey: "string",
      };
      this.$store.commit("updateUserLang", this.DefaultSelectedLang.id);
      this.$store.dispatch("getUserInfoApi", loginModel);
      this.$store.dispatch("showNotification");
    },
    changeLangSelection() {
      this.$store.commit("updateUserLang", this.DefaultSelectedLang.id);
    },
  },
  computed: {
    //...mapState(["isLoading"]),
    // passwordMatch() {
    //   // this.$store.commit("increaseCounter", 100);//mutation
    //   // this.$store.dispatch("increment");/action
    //   // this.firstName = this.$store.getters.getCountOfState; getters
    //   return () => this.password === this.verify || "Şifreler eşleşmedi";
    // },
  },
  // beforeRouteLeave(to,from,next){
  //   if(this.$store.getters.getLoginInfo){
  //      next();

  //   }else{
  //    next(false);
  //   }

  // }
};
</script>
<style>
</style>