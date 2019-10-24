<!--suppress ALL -->
<template>
  <div class="myPage">
    <div ref="canvasDiv" class="canvasDiv"></div>
  </div>
</template>

<script>
import zrender from 'zrender'
export default {
    name: "TopologyManage",
    data () {
      return {}
    },
    methods:{},
    mounted (){
      let zr = zrender.init(this.$refs.canvasDiv);
      var circle = new zrender.Arc({
        shape: {
          cx: 150,
          cy: 50,
          r: 40,
          startAngle:0
        },
        style: {
          fill: 'none',
          stroke: '#F00'
        }
      });
      zr.add(circle);
    }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .myPage{
    width: 100%;
    height:100%;
    .canvasDiv {
      width: 100%;
      height: calc(100% - 50px);
    }
  }
</style>
