<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <ValidationObserver v-slot="{ handleSubmit }">
              <v-form @submit.prevent="handleSubmit(submit)">
                <ValidationProvider
                  name="Email"
                  :rules="{ required: true, email: true }"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    prepend-icon="mdi-email"
                    v-model="loginForm.email"
                    label="Email"
                    type="text"
                    :error-messages="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider
                  name="Password"
                  :rules="{ required: true, min: 8 }"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    prepend-icon="mdi-lock"
                    v-model="loginForm.password"
                    label="Password"
                    type="password"
                    :error-messages="errors[0]"
                  />
                </ValidationProvider>
                <v-btn block type="submit" color="primary"> Login </v-btn>
              </v-form>
            </ValidationObserver>
            <div class="d-flex justify-end mt-10 ml-5">
              <span class="subtitle-2">Tidak ada akun</span>
              <v-btn
                to="/auth/register"
                depressed
                small
                class="ml-5"
                color="success"
                >Registrasi</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {},
    };
  },
  methods: {
    async submit() {
      try {
        let res = await this.$store.dispatch("userSignIn", this.loginForm);
        console.log("res", res);
        sessionStorage.setItem("user",`${res.accessToken}`);
        this.$router.push("/foods");
      } catch (error) {
        this.$swal("Login","Email atau password salah","error");
        console.log("error", error);
      }
    },
  },
};
</script>

<style>
</style>