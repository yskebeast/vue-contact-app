<template>
   <div class="signup">
      <HeaderLink />
      <v-col cols="12">
         <h1>ログイン</h1>
         <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="150"
         />
         <form @submit.prevent="handleSignIn">
            <div class="inputs">
               <div class="mailpass">
                  <v-col cols="12">
                     <v-text-field
                        hide-details
                        v-model="email"
                        type="email"
                        label="メールアドレス"
                        placeholder="info@con.com"
                        outlined
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                     <v-text-field
                        v-model="password"
                        type="password"
                        label="パスワード"
                        placeholder="0123456789"
                        outlined
                     ></v-text-field>
                     <p class="err" v-if="error">{{ error }}</p>
                  </v-col>
               </div>
            </div>
            <v-btn
               class="btn"
               type="submit"
               :disabled="submitForm"
               color="primary"
               >ログイン</v-btn
            >
         </form>
      </v-col>
   </div>
</template>

<script>
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";
import HeaderLink from "./HeaderLink.vue";
export default {
   name: "SignIn",
   components: {
      HeaderLink,
   },
   data() {
      return {
         email: "",
         password: "",
         error: "",
      };
   },
   methods: {
      handleSignIn() {
         signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
               const uid = auth.currentUser.uid;
               this.$router.push(`/home/${uid}`);
            })
            .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
               this.error = errorCode + errorMessage;
            });
      },
   },
   computed: {
      submitForm() {
         const email = this.email.length;
         const password = this.password.length;
         return email < 5 || email > 20 || password < 5 || password > 20;
      },
   },
};
</script>

<style scoped>
.signup {
   max-width: 500px;
   margin: 0 auto;
}

h1 {
   text-align: center;
}

.inputs {
   width: 100%;
}

.names {
   width: 100%;
   display: flex;
}

.mailpass {
   width: 100%;
}

.err {
   color: red;
}

.btn {
   display: block;
   margin: 0 auto;
   width: 95%;
}
</style>
