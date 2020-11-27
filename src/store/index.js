import Vue from 'vue'
import Vuex from 'vuex'
const { ipcRenderer } = require('electron')


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    pseudo: "Anonymous",
    members: [],
    memberVisible: true,
    message: []
  },
  getters: {
    getPseudo(state) {
      return state.pseudo;
    },
    getMember(state) {
      return state.members;
    },

    getLastMsg(state) {
      return state.message[state.message.length -1];
    },
    getMemberVisible(state) {
      return state.memberVisible;
    },
    getMsg(state) {
      return state.message;
    }
  },
  mutations: {
    SET_PSEUDO(state, pseudo) {
      state.pseudo = pseudo;
    },
    SOCKET_SETCONNECT(state) {
      state.isConnected = true;
    },
    SOCKET_MEMBERJOIN(state, member) {
      state.members.push(member);
    },
    SOCKET_SETALLMEMBERS(state, members) {
      state.members = members;
    },
    SET_MEMBERVISIBLE(state, status) {
      state.memberVisible = status;
    },
    SOCKET_MEMBERUPDATE(state, member) {
      let index = state.members.findIndex(_elt => _elt.uuid === member.uuid);
      Vue.set(state.members, index, member)
    },
    SOCKET_MEMBERDISCONNECT(state, member) {
      let index = state.members.findIndex(_m => _m.uuid === member.uuid);
      if (index !== -1) {
        state.members.splice(index, 1);
      }
    },
    ADD_MESSAGE(state, message) {
      state.message.push(message);
    }

/*     SOCKET_SENDMESSAGE(state, message) {

    } */
  },
  actions: {
    setPseudo(context, pseudo) {
      context.commit('SET_PSEUDO', pseudo);
    },
    SOCKET_memberJoin(context, playload) {
      context.commit('SOCKET_MEMBERJOIN', playload);
    },
    SOCKET_connect(context) {
      context.commit('SOCKET_SETCONNECT');
    },
    SOCKET_newMessage(context, payload) {
      Vue.notify({
        group: "notif",
        type: "success",
        title: `<p>De ${payload.member}</p>`,
        text: `${payload.msg}`,
        duration: 500,
        speed: 1000,
      });
      ipcRenderer.send('newMsg', payload) 
      context.commit('ADD_MESSAGE', payload);
    },
    SOCKET_memberDisconnect(context, payload) {
      context.commit('SOCKET_MEMBERDISCONNECT', payload);
    },
    addMsg(context, message) {
      context.commit('ADD_MESSAGE', message)
    },
    SOCKET_allMember(context, members) {
      context.commit('SOCKET_SETALLMEMBERS', members);
    },
    SOCKET_memberUpdate(context, member) {
      context.commit('SOCKET_MEMBERUPDATE', member);
    },
    SOCKET_myUpdate(context, member) {
      context.commit('SOCKET_MEMBERUPDATE', member);
    },
    setMemberVisible(context, status) {
      context.commit('SET_MEMBERVISIBLE', status);
    },
  },
  modules: {
  }
})
