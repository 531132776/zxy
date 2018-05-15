<template>
	<div class="hotBrand">
    <p>
			<span>排名</span>
			<span style="float:right">指数</span>
		</p>
		<draggagle v-model="tags" :move="getdata" @update="datadragEnd">
        <transition-group>
            <div v-for="item in tags" :key="item.id" class="ranking">
                    {{item.brand}}
            </div>
			  </transition-group>
		</draggagle>
	</div>
</template>

<script>
import draggagle from "vuedraggable";
export default {
  components: {
    draggagle
  },
  data() {
    return {
      tags: [
        {
          brand: "奥迪",
          id: "1"
        },
        {
          brand: "奔驰",
          id: "2"
        },
        {
          brand: "宝马",
          id: "3"
        },
        {
          brand: "本田",
          id: "4"
        }
      ]
    };
  },
  methods: {
    getdata(evt) {
      console.log(evt.draggedContext.element.id);
    },
    datadragEnd(evt) {
      // console.log("拖动前的索引 :" + evt.oldIndex);
      // console.log("拖动后的索引 :" + evt.newIndex);
      // console.log(this.tags);
    }
  }
};
</script>
<style scoped>
.ranking{
   padding: 15px;
   background: #f3f3f3;
   border-radius: 4px;
   cursor: pointer;
   transition: all .5s linear;
   -webkit-transition: all .5s linear;
   -moz-transition: all .5s linear;
   -o-transition: all .5s linear;
   margin:10px 0;
}
.ranking:hover{
   box-shadow: 3px 3px 8px #999, -3px 3px 8px #999;
}
</style>
