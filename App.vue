<script>
import Vue from 'vue'
import localStore from '@/helpers/localStore.js'

export default {
  data() {
    return {
      timer: ''
    }
  },

  created() {
    // #ifdef APP-PLUS
    plus.navigator.closeSplashscreen()
    // #endif
  },

  onLaunch: function () {
    console.log('App Launch')

    uni.getSystemInfo({
      success: function (e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight
        if (e.platform == 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight + 50
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45
        }
        // #endif
        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight
        let custom = wx.getMenuButtonBoundingClientRect()
        Vue.prototype.Custom = custom
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight
        // #endif
        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight
        // #endif
        // #ifdef MP-BAIDU
        Vue.prototype.StatusBar = e.statusBarHeight
        Vue.prototype.CustomBar = e.statusBarHeight + e.navigationBarHeight
        // #endif
      }
    })

    // #ifdef MP-BAIDU
    /*
    uni.checkSession({
      success: () => {
        const userinfo = localStore.get('userinfo')
        if (userinfo) {
          this.$store.dispatch('user/init_baidu', {}, { root: true })
          this.timer = setInterval(() => {
            this.$store.dispatch('user/getPosition', {}, { root: true })
          }, 300000)
        } else {
          uni.reLaunch({
            url: '/pages/login/login-baidu/login-baidu'
          })
        }
      }
		})
		*/
    // #endif

    // #ifndef MP-BAIDU
    if (uni.getStorageSync('sessionId')) {
      this.$store.dispatch('user/init', {}, { root: true })

      this.timer = setInterval(() => {
        this.$store.dispatch('user/getPosition', {}, { root: true })
      }, 300000)
    } else {
      uni.reLaunch({
        url: '/pages/login/login'
      })
    }
    // #endif
  },

  onShow: function () {
    console.log('App Show')
  },

  onHide: function () {
    console.log('App Hide')
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss">
/* uview-ui */
@import 'uview-ui/index.scss';
/* color-ui */
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import 'colorui/animation.css';
/*每个页面公共css */
.empty {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.mask-style {
  width: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.custom-avatar {
  width: 96upx;
  height: 96upx;
  position: absolute;
  left: 30upx;
}
</style>
