<template>
  <div id="app">
    <el-container>
      <el-header>
        header
      </el-header>
      <el-container>
        <el-aside style="width: 220px;">
          <el-menu
            :default-active="$route.path"
            router
            menu-trigger="click"
            class="el-menu-vertical-demo">
            <el-submenu index="/vue">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>sub-vue</span>
              </template>
              <el-menu-item index="/vue">home</el-menu-item>
              <el-menu-item index="/vue/about">about</el-menu-item>
            </el-submenu>
            <el-menu-item index="/react">
              <i class="el-icon-menu"></i>
              <span slot="title">sub-react</span>
            </el-menu-item>
            <!-- <el-menu-item index="/angular">
              <i class="el-icon-document"></i>
              <span slot="title">sub-angular</span>
            </el-menu-item> -->
          </el-menu>
        </el-aside>
        <el-main>
          <div>
            <div id="react-app" class=""></div>
            <div id="vue" class="single-spa-vue">
              <div id="subVue"></div>
            </div>
            <div id="angular-app"></div>
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header{
  background: #f1f3f5;
  line-height: 60px;
}
.el-submenu__title{
  text-align: left;
}
.el-aside{
  border-right: solid 1px #e6e6e6;
}
.el-menu{
  border: none;
}
.el-menu-item{
  text-align: left;
}
</style>
