<template>
  <div class="message" :id="getId" :class="{center: isMe}">
    <span class="msgInfo" v-if="!isMe">{{ message.member }}</span><br/>
    <p>{{ message.msg }}</p><br/>
    <span class="msgInfo">{{getFomatDate}}</span>
  </div>
</template>
<script>
export default {
  name: "Message",
  props: ["message", "isMe", "author"],
  computed: {
    getFomatDate() {
      let dt = new Date(this.message.dateSend);
      return ` le ${dt.getDate()}/${dt.getMonth()}
       à ${dt.getHours()}:${dt.getMinutes()}`;
    },
    getId() {
      return `msg${new Date(this.message.dateSend).getTime().toString()}`;
    }
  },
};
</script>
<style scoped>
img {
  width: 60px;
}
.center {
  text-align: right;
}
.msgInfo {
  color: gold;
  font-weight: bold;
  font-size: 13px;
}
.message {
    margin: 4px 0 4px 0;
}
.message p {
  padding: 10px;
  display: inline-block;
  margin: 2px;
  overflow-x: hidden;
  overflow-y: auto;
  min-width: 100px;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>