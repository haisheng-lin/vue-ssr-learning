<template>
  <div id="app">
    <div id="cover" />
    <Header />
    <router-link to="/app">
      {{ fullName }}
    </router-link>
    <router-link to="/login">
      login
    </router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
// 现在暂时没法解决 jsx 的使用问题
import Header from './layout/header.vue';
// import Footer from './layout/footer.jsx';
export default {
  metaInfo: {
    title: `haisheng's todo app`,
  },
  components: {
    Header,
    // Footer,
  },
  computed: {
    ...mapState({
      // counter: (state) => state.count,
      // textA: (state) => state.a.text,
      // textB: (state) => state.b.text,
    }),
    ...mapGetters({
      fullName: 'fullName',
      // 'textAPlus': 'a/textPlus',
    }),
  },
  mounted () {
    // this.updateCountAsync({ num: 5, time: 2000 })
  },
  methods: {
    // ...mapMutations({
    //   updateTextA: 'a/updateTextA',
    // }),
    // ...mapActions({
    //   updateCountAsync: 'updateCountAsync',
    // }),
  },
}
</script>

<style lang="less" scoped>
  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  #cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    opacity: .9;
    z-index: -1;
  }
</style>
