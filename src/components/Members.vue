<template>
  <div class="members">
    <ul>
      <transition-group tag="p" name="bounce">
        <li class="member_item" v-for="member in getMember" :key="member.uuid">
          <!--         <span class="connected"></span>
          -->
          {{member.name}}
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: "Members",
  computed: {
    ...mapGetters(['getMember'])
  },
  updated() {
    console.log(this.getMember);
  }
};
</script>
<style scoped>
.members {
  width: 10%;
  overflow: hidden;
  border-right: 1px solid white;
}
ul {
  list-style: none;
  padding: 0;
}
img {
  width: 39px;
}
.member_item {
  background-color: rgba(112, 112, 112, 0.5);
  margin-bottom: 2px;
  padding: 10px;
  width: 100%;
}
.memberName {
  vertical-align: text-bottom;
}
span {
  display: inline-block;
}
.connected {
  width: 15px;
  margin-right: 5px;
  height: 15px;
  border-radius: 50%;
  background-color: greenyellow;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
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