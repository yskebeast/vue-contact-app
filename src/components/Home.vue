<template>
   <div>
      <MainHeader :uid="uid" />
      <div>
         <ul>
            <li></li>
         </ul>
      </div>
   </div>
</template>

<script>
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../firebase";

import MainHeader from "./MainHeader.vue";
export default {
   name: "Home",
   components: {
      MainHeader,
   },
   data() {
      return {
         uid: "",
      };
   },
   methods: {},
   mounted() {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            this.uid = user.uid;
            console.log("login");
         } else {
            console.log("logout");
         }
      });
   },
};
</script>

<style scoped></style>
