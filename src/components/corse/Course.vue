<template>
  <div class="corse-list">
    <div class="item-box" v-for="(item, index) in CourseList" :key="index">
      <!-- 这里 采用 绑定 class来给个函数判断 然后给出 样式名-->
      <!-- 封面 -->
      <div class="cover" :class="courseCover(item.type)">
        <span class="iconfont" :class="courseIcon(item.type)"></span>
        <span class="cover-title" :class="courseTitle(item.type)">{{
          item.type | coverFilter
        }}</span>
      </div>
      <div class="title">{{ item.name }}</div>
      <!-- 多半要用 过滤器 -->
      <div class="type">{{ item.type }}</div>
    </div>

    <!-- <div class="item-box">
      <div class="cover"></div>
      <div class="title"></div>
      <div class="type"></div>
    </div>
    <div class="item-box">
      <div class="cover"></div>
      <div class="title"></div>
      <div class="type"></div>
    </div>
    <div class="item-box">
      <div class="cover"></div>
      <div class="title"></div>
      <div class="type"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      CourseList: [],
    }
  },
  created() {
    this.getCourseList()
  },
  filters:{
       // 字体过滤器
    coverFilter(){
        return 123
    }
  },
  methods: {
    getCourseList() {
      this.$http('course').then((res) => {
        console.log(res)
        this.CourseList = res.data
      })
    },
    // 获取封面
    courseCover(type) {
      switch (type) {
        case 'java':
          return 'java'
          break
        case 'js':
          return 'js'
          break
        case 'test':
          return 'test'
          break
      }
    },
    // 获取icon样式
    courseIcon(type) {
      switch (type) {
        case 'java':
          return 'icon-java'
          break
        case 'js':
          return 'icon-JS'
          break
        case 'test':
          return 'icon-ceshi'
          break
        case 'yunwei':
          return 'icon-yunwei-'
          break
      }
    },
    // 封面字体样式
    courseTitle(type){
         switch (type) {
        case 'java':
          return 'java-title'
          break
        case 'js':
          return 'js-title'
          break
        case 'test':
          return 'test-title'
          break
        case 'yunwei':
          return 'yunwei-title'
          break
      }
    },
  },
}
</script>
<style scoped>
.corse-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item-box {
  width: 240px;
  height: 200px;
  background-color: blanchedalmond;
}
.cover {
  width: 240px;
  height: 135px;
  background-color: rgb(190, 137, 99);
}
.title {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
}
.type {
  margin-top: 10px;
  font-size: 14px;
  color: #6666;
}
.java {
  background-color: saddlebrown;
}
.js {
  background-color: rgb(255, 255, 0);
}
.test {
  background-color: rgb(16, 167, 154);
}
/* 封面字体图标 */
.icon-java {
  font-weight: 700;
  font-size: 120px;
}
/* 封字体样式 */
.java-title {
  font-size: 40px;
}
</style>