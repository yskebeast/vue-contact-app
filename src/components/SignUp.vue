<template>
   <div class="signin">
      <div v-if="!form">
         <HeaderLink />
      </div>
      <v-col cols="12">
         <h1 v-if="!form">新規登録</h1>
         <h1 class="formheader" v-if="form">問い合わせフォーム</h1>
         <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="150"
         />
         <div v-if="!form">
            <form @submit.prevent="handleSignUp">
               <div class="inputs">
                  <div class="names">
                     <v-col cols="12" sm="6">
                        <v-text-field
                           hide-details
                           v-model="firstName"
                           label="姓"
                           placeholder="山田"
                           outlined
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12" sm="6">
                        <v-text-field
                           hide-details
                           v-model="lastName"
                           label="名"
                           placeholder="太郎"
                           outlined
                        ></v-text-field>
                     </v-col>
                  </div>
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
                           hide-details
                           v-model="password"
                           type="password"
                           label="パスワード"
                           placeholder="0123456789"
                           outlined
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12">
                        <v-text-field
                           v-model="password2"
                           type="password"
                           label="確認パスワード"
                           placeholder="0123456789"
                           outlined
                        ></v-text-field>
                        <p v-if="samePas">パスワードが一致しません</p>
                     </v-col>
                  </div>
               </div>
               <v-btn
                  class="btn"
                  type="submit"
                  :disabled="sumbitAuth"
                  large
                  color="primary"
                  >登録</v-btn
               >
            </form>
         </div>
      </v-col>
      <div v-if="form">
         <form @submit.prevent="handleContact">
            <div class="inputs">
               <div class="contact">
                  <v-col cols="12">
                     <v-text-field
                        hide-details
                        v-model="tel"
                        type="tel"
                        label="電話番号(ハイフン無し)"
                        placeholder="01234567890"
                        outlined
                     ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12">
                     <v-select
                        hide-details
                        :items="products"
                        v-model="selectedProduct"
                        label="商品識別"
                        return-object
                        outlined
                     ></v-select>
                  </v-col>
                  <v-col cols="12">
                     <v-textarea
                        v-model="contact"
                        label="問い合わせ内容"
                        auto-grow
                        rows="3"
                        row-height="30"
                        outlined
                     ></v-textarea>
                  </v-col>
               </div>
            </div>
            <v-btn
               class="btn"
               type="submit"
               :disabled="submitForm"
               large
               color="primary"
               >送信</v-btn
            >
         </form>
      </div>
   </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../../firebase";
import HeaderLink from "./HeaderLink.vue";
import {
   addDoc,
   collection,
   doc,
   serverTimestamp,
   setDoc,
} from "@firebase/firestore";
export default {
   name: "SignUp",
   props: {},
   components: {
      HeaderLink,
   },
   data() {
      return {
         required: true,
         firstName: "",
         lastName: "",
         email: "",
         password: "",
         password2: "",
         samePas: false,
         form: false,
         tel: "",
         products: [
            "A001",
            "A002",
            "A003",
            "A004",
            "A005",
            "A006",
            "A007",
            "A008",
            "A009",
            "A010",
            "A011",
            "A012",
            "A013",
            "A014",
            "A015",
            "A016",
         ],
         selectedProduct: "",
         contact: "",
         uid: "",
      };
   },
   methods: {
      async handleSignUp() {
         const samePassword = this.password === this.password2;
         if (samePassword) {
            this.form = true;
            await createUserWithEmailAndPassword(
               auth,
               this.email,
               this.password
            )
               .then(() => {
                  this.uid = auth.currentUser.uid;
                  setDoc(doc(db, "users", this.uid), {
                     fullName: this.firstName + this.lastName,
                     email: this.email,
                     uid: this.uid,
                  });
               })
               .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode + errorMessage);
               });
         } else {
            this.samePas = true;
            console.log("not");
         }
      },
      async handleContact() {
         try {
            await addDoc(collection(db, "users", this.uid, "contact"), {
               fullName: this.firstName + this.lastName,
               email: this.email,
               tel: this.tel,
               product: this.selectedProduct,
               contact: this.contact,
               timestamp: serverTimestamp(),
               uid: this.uid,
            });
         } catch (e) {
            console.error("Error adding document: ", e);
         }
         this.$router.push(`/home/${this.uid}`);
      },
   },
   computed: {
      sumbitAuth() {
         const fullName = this.firstName.length + this.lastName.length;
         const email = this.email.length;
         const password = this.password.length;
         const password2 = this.password2.length;
         return (
            fullName < 2 ||
            fullName > 16 ||
            email < 5 ||
            email > 200 ||
            password < 5 ||
            password > 20 ||
            password2 < 5 ||
            password2 > 20
         );
      },
      submitForm() {
         const tel = this.tel.length;
         const contact = this.contact.length;
         const selectedProduct = this.selectedProduct.length;
         return (
            tel < 1 ||
            tel > 12 ||
            contact < 1 ||
            contact > 2000 ||
            selectedProduct < 4
         );
      },
   },
};
</script>

<style scoped>
.nav {
   text-align: center;
   padding: 30px;
}
.nav a {
   font-weight: bold;
   color: #2c3e50;
}
.nav a.router-link-exact-active {
   color: #2b81d6;
}

.signin {
   max-width: 500px;
   margin: 0 auto;
}

h1 {
   text-align: center;
}

.formheader {
   padding: 30px;
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
.contact {
   width: 100%;
}

.btn {
   display: block;
   margin: 0 auto;
   width: 95%;
}
</style>
