<template>
  <div class="tchatbox" :class="{member_visible: getMemberVisible,member_hide: !getMemberVisible}">
    <button class="btnSidebar" @click="memberTogle">
        <i class="fa fa-bars fa-3x" aria-hidden="true"></i>
        <span id="badgeNbMembers">{{getMember.length}}</span>
    </button>
    <div id="msg_history">
      <transition-group name="bounce">
        <Message
          v-for="msg in message"
          :key="msg.uuid"
          :message="msg"
          :author="msg.member"
          :isMe="msg.member == pseudo"
        />
      </transition-group>
    </div>
    <Tool id="tool" />
  </div>
</template>
<script>
import Tool from "../components/Tool";
import Message from "../components/Message";
import { mapGetters, mapState } from "vuex";

export default {
  name: "TchatBox",
  components: {
    Tool,
    Message,
  },
  methods: {
    memberTogle() {
      this.$store.dispatch("setMemberVisible", !this.getMemberVisible);
    },
  },
  updated() {
    let lastMsg = this.getLastMsg;
    console.log("updated", lastMsg);
    if (lastMsg) {
      let idLastMsg = `msg${new Date(lastMsg.dateSend).getTime().toString()}`;
      console.log(idLastMsg);
      let lastMsgElt = this.$el.querySelector(`#${idLastMsg}`);
      lastMsgElt.scrollIntoView();
    }
  },
  computed: {
    ...mapState(["message", "pseudo"]),
    ...mapGetters(["getLastMsg", "getMember", "getMemberVisible"]),
  },
};
</script>
<style scoped>
.tchatbox {
  position: relative;
  padding: 5px;
  height: 97vh;
  /*border: 1px solid white;*/
}
.btnSidebar {
    background-color: rgba(0, 0, 0, 0);
    color: white;
    position: relative;
    border: medium none;
    cursor: pointer;
}
.member_visible {
  width: 90%;

}

.member_hide {
  width: 100%;
}

#msg_history {
  height: 86%;
  overflow-y: hidden;
  overflow-x: hidden;
}
#tool {
  position: absolute;
  bottom: 0px;
  width: 99%;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

#badgeNbMembers {
    display: inline-block;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    right: 0px;
    background: red;
    width: 20px;
    height: 20px;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>