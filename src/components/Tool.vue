<template>
  <div class="tool">
    <div class="simleyBox" v-show="smileyOpen">
      <ul id="smileyList" class="flex">
        <li @click="addSmiley(smiley)" v-for="smiley in smileys" :key="smiley">{{smiley}}</li>
      </ul>
    </div>
    <div class="flex flex_content">
      <p id="pseudo">{{pseudo}}</p>
      <button id="smileyBtn" @click="smileyOpen = !smileyOpen">😃</button>
    </div>
    <input
      type="text"
      class="write_msg"
      id="msgInput"
      @keyup.enter="sendMsg()"
      v-model="msg.msg"
      placeholder="Message"
    />
    <!--     <button class="msg_send_btn" type="button" @click="sendMsg()">
      <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
    </button>-->
  </div>
</template>
<script>
import { mapState } from "vuex";
import { uuid } from "vue-uuid"; // Import uuid
import { SMILEY } from "../assets/smiley";

export default {
  name: "Tool",
  data() {
    return {
      smileys: SMILEY,
      smileyOpen: false,
      msg: {
        msg: "",
        member: this.pseudo,
        dateSend: "",
        uuid: "",
      },
    };
  },
  computed: {
    ...mapState(["pseudo"]),
  },
  methods: {
    addSmiley(e) {
      this.msg.msg += e;     
    },
    sendMsg() {
      let newMsg = {
        msg: this.msg.msg,
        member: this.pseudo,
        dateSend: new Date(),
        uuid: uuid.v1(),
      };
      //this.$emit("msgSend", newMsg);
      this.$store.dispatch("addMsg", newMsg);
      this.$socket.emit("receiveMsg", newMsg);
      this.msg.msg = "";
    },
  },
};
</script>
<style scoped>
input {
  background: rgba(143, 143, 143, 0.3) none repeat scroll 0 0;
  border: medium none;
  color: white;
  border-radius: 15px;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}
#tool {
  text-align: right;
}
.simleyBox {
  overflow-y: auto;
  overflow-x: hidden;
  display: inline-block;
  background: rgba(143, 143, 143, 0.3) none repeat scroll 0 0;
  width: 300px;
  height: 200px;
  z-index: 2;
}
#smileyBtn {
  font-size: 25px;
}
#smileyList {
  list-style: none;
  flex-wrap: wrap;
  padding: 0px;
}
#smileyList li {
  font-size: 20px;
  cursor: pointer;
}
#smileyList li:hover {
  background-color: white;
}
.flex_content {
  justify-content: space-between;
}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 2px;
  top: 60px;
  width: 33px;
}

#pseudo {
  font-family: "Bungee Inline", cursive;
}
</style>