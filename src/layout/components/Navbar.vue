<template>
  <div class="navbar">
    <!-- 左边标题区域 -->
    <div class="logo-container">
      <img src="@/assets/common/logoone.png" alt="">
    </div>
    <!-- 右边用户区域 -->
    <div class="right-menu">
      <!-- 头像区域 -->
      <el-dropdown class="avatar-container">
        <div class="avatar-wrapper">
          <img src="@/assets/common/logo.png" class="user-avatar">
          <span>欢迎您，用户名</span>

        </div>

      </el-dropdown>
      <!-- 退出按钮区域 -->
      <el-tooltip content="退出" placement="top">
        <span>退出 <i class="el-icon-caret-bottom" /></span>

      </el-tooltip>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  background:#5373e0;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  background: url('~@/assets/common/backgroundone.png');
  background-size: contain;
  color:#fff;
  z-index: 102;
  .logo-container {
    margin-left: 20px;
    width: 84px;
    height: 60px;
    display: flex;
    align-items: center;
    img {
      width: 100%;

    }
  }

  .right-menu {
    height: 100%;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;

      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      height: 60px;
      color: #fff;

      .avatar-wrapper {

        position: relative;
        height: 100%;
        display: flex;
      align-items: center;
      font-size: 16px;
        .user-avatar {
          cursor: pointer;
          width: 35px;
          height: 35px;
          margin-right: 13px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
