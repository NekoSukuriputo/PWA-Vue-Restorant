<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Registrasi</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <ValidationObserver v-slot="{ handleSubmit }">
              <v-form @submit.prevent="handleSubmit(submit)">
                <ValidationProvider
                  name="Nama"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    prepend-icon="mdi-account"
                    v-model="registerForm.nama"
                    label="Nama"
                    type="text"
                    :error-messages="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider
                  name="Email"
                  :rules="{ required: true, email: true }"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    outlined
                    prepend-icon="mdi-email"
                    v-model="registerForm.email"
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
                    v-model="registerForm.password"
                    label="Password"
                    type="password"
                    :error-messages="errors[0]"
                  />
                </ValidationProvider>
                <v-btn
                  block
                  type="submit"
                  color="primary"
                  :loading="loading"
                  :disabled="loading"
                >
                  Registrasi</v-btn
                >
              </v-form>
            </ValidationObserver>
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
      registerForm: {},
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        let res = await this.$store.dispatch("userRegister", this.registerForm);
        console.log("res", res);
        sessionStorage.setItem("user", res.accessToken);
        this.$router.push("/foods");
      } catch (error) {
        console.log("error", error);
        this.$swal("Error", `${error.response.data}`, "error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>