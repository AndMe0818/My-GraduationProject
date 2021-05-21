<template>
  <div>
      <div class="title">欢迎使用场馆场地登记系统</div>
    <el-carousel trigger="click" height="450px" indicator-position="">
      <el-carousel-item v-for="item in images" :key="item">
       <img class="imgcover" :src="item.url" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      images: [
        { url: require('../../assets/img/体育场.jpeg') },
        { url: require('../../assets/img/操场.jpeg') },
        { url: require('../../assets/img/羽毛球.jpg') },
      ],
    }
  },
  created() {},
  methods: {},
}
</script>
<style scoped>
.el-carousel{
    margin: 20px auto;
    width: 750px;
}

.imgcover{
    width: 100%;
    height: 100%;
}
.title{
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
}
</style>