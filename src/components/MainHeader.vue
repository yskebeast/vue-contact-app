<template>
   <div>
      <v-app-bar color="blue" dark elevation="5">
         <div>
            <h4 @click="handleHome">
               <!-- <router-link class="router-link" to="/">オシリス社</router-link> -->
               オシリス社
            </h4>
         </div>
         <v-spacer></v-spacer>
         <v-app-bar-nav-icon @click="OpenMenu = !OpenMenu"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer v-model="OpenMenu" absolute right>
         <v-list>
            <v-list-item-group>
               <v-list-item class="v-list-item"
                  ><span class="v-list-item" @click="handleHome"
                     >ホーム</span
                  ></v-list-item
               >
               <v-list-item class="v-list-item"
                  ><span class="v-list-item">undefined</span></v-list-item
               >
               <v-list-item class="v-list-item" @click="handleContact"
                  ><span class="v-list-item">問い合わせ</span>
               </v-list-item>
               <v-list-item class="v-list-item" @click="handleLogout"
                  ><span class="v-list-item">ログアウト</span></v-list-item
               >
            </v-list-item-group>
         </v-list>
      </v-navigation-drawer>
   </div>
</template>

<script>
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase";
export default {
   name: "MainHeader",
   props: {
      uid: {
         type: String,
      },
   },
   data() {
      return {
         OpenMenu: false,
      };
   },
   methods: {
      handleHome() {
         this.$router.push(`/home/${this.uid}`);
         console.log(this.uid);
      },
      handleContact() {
         this.$router.push(`/home/${this.uid}/contact`);
         console.log(this.uid);
      },
      handleLogout() {
         signOut(auth)
            .then(() => {
               this.$router.push("/");
            })
            .catch(() => {});
      },
   },
};
</script>

<style scoped>
h4 {
   cursor: pointer;
}
/* .router-link {
   color: white;
   text-decoration: none;
} */

.v-list-item {
   color: #1872cb;
   font-weight: bold;
}
</style>
