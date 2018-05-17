<template>
	<div class="hotBrand">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form >
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
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
     <!--新增弹窗-->
		<el-dialog class="addForm" title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <ul>
        <li v-for="(item,index) in citys" :key="index">
          <p>{{item.name}}</p>
            <el-checkbox v-for="(foo,index) in citys[index].lists" :key="index" @change="changeAll(foo,index)">{{foo.id}} {{foo.page}}</el-checkbox>
          
        </li>
      </ul>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click="addNewList">提交</el-button>
			</div>
		</el-dialog>
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
      citys:[
          {
            name:'sfdg',
            lists:[
              {
                id:'3426346',
                page:'ewgweg'
              },
              {
                id:'9798',
                page:'hhk'
              },
              {
                id:'898',
                page:'lkml'
              },
            ]
          },
          {
            name:'frgr',
            lists:[
              {
                id:'342262',
                page:'sgdg'
              },
              {
                id:'435',
                page:'ge'
              },
              {
                id:'6546',
                page:'tert'
              },
            ]
          },
          {
            name:'fwefw',
            lists:[
              {
                id:'645645',
                page:'gsg'
              },
              {
                id:'45',
                page:'gsg'
              },
            ]
          },
      ],
      addFormVisible:false,
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
      ],
      obj:{
        id:"",
        page:""
      },
      arr:[],
      arr2:[]
      // checkedCities:[
      //     citys[]
      // ]
    };
  },
  methods: {
    changeAll(r,v){
        
        let newArr = [];
        let arr2 = new Array();
        
        //this.obj += "{"+'id'+':'+r.id+','+'page'+':'+r.page+"}"+','
        //newArr.push(this.obj)
        this.obj.id = r.id;
        this.obj.page = r.page;
        
        this.arr.push(this.obj)
        console.log(this.arr)
        
    },
    addNewList(){
        this.addFormVisible = false
    },
    handleAdd(){
      this.addFormVisible = true;
      //console.log(this.citys)
      for(let i=0; i<this.citys.length;i++){
         console.log(this.citys[i].name)
      }
    },
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
