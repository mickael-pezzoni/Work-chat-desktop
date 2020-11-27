<template>
  <div id="app">
    <router-view />
    <notifications group="notif" position="top center" />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap");
body {
  background-image: linear-gradient(120deg, rgb(0, 0, 0), rgb(119, 181, 238));
}
body,
#app {
  min-height: 98vh;
  color: white;
}

.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 20px;
}
</style>
