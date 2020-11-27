<template>
  <div class="tchat flex">
    <transition name="fade">
      <Members v-if="getMemberVisible" />
    </transition>
    <TchatBox />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Members from "../components/Members.vue";
import TchatBox from "../components/TchatBox.vue";

export default {
  name: "Tchat",
  components: {
    Members,
    TchatBox,
  },
  updated() {
    console.log(this.getMember);
  },
  created() {
    this.$socket.emit("memberJoin", this.getPseudo);
  },
  computed: {
    ...mapGetters(["getPseudo", "getMember", "getMemberVisible"]),
  },
};
</script>

<style>
.flex {
  display: flex;
}
.tchat {
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>