<template>
  <div class="home">
    <div class="relative" id="login">
      <input
        type="text"
        @keypress.enter="connect()"
        @input="updatePseudo"
        name="pseudo"
        placeholder="Pseudo"
      />
      <button @click="connect()">
        <i class="fa fa-arrow-right fa-3x" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  methods: {
    updatePseudo(e) {
      this.$store.dispatch("setPseudo", e.target.value);
    },
    connect() {
      console.log("pseudo", this.pseudo);
      this.$router.push("tchat");
    },
  },
  computed: {
    ...mapState(["pseudo"]),
    ...mapActions(["setPseudo"]),
  },
};
</script>

<style scopped>

#login {
position: fixed;
left: 50%;
width: 500px;
text-align: center;
top: 50%;
transform: translate(-50%, -50%);
}
#login input {
  padding: 13px;
  font-size: 20px;
  background: rgba(143, 143, 143, 0.3) none repeat scroll 0 0;
  color: white;
  border: medium none;
}
button {
  background-color: rgba(0, 0, 0, 0);
  color: white;
  position: relative;
  border: medium none;
  vertical-align: sub;
  cursor: pointer;
}
</style>