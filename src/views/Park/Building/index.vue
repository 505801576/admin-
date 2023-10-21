<template>
  <div class="building-container">
    <div class="qqqqq">
      <el-form label-width="80px">
        <el-form-item label="楼宇名称:">
          <el-input v-model="names" placeholder="请输入楼宇名称" class="sousuo"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button class="query" size="small" type="primary" @click="name">查询</el-button>
      </div>
    </div>
    <el-button class="addition" size="small" type="primary" @click="Dialog('add')">添加楼宇</el-button>
   <!-- 表格 -->
   <el-table :data="data" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="楼宇名称" width="180"></el-table-column>
      <el-table-column prop="floors" label="层数"></el-table-column>
      <el-table-column prop="area" label="在管面积(m²)">
      </el-table-column>
      <el-table-column prop="propertyFeePrice" label="物业费(元/m²)">
      </el-table-column>
      <el-table-column v-if="status===0" label="状态">空置中</el-table-column>
      <el-table-column v-else label="状态">租赁中</el-table-column>
          <el-table-column label="操作">
            <template #default='{row}'>
                <el-button type="text" @click="Dialog('edit', row.id)">编辑</el-button>
                <el-button type="text" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
   </el-table>
      <div class="paging">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleSizeChange"
          layout="total, prev, pager, next, sizes, jumper"
          :total="total">
        </el-pagination>
      </div>

      <!-- 卡片 添加 编辑 -->
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%">
        <!-- <div class="formpanding"> -->
          <el-form ref="form" :model="derlist" :rules="rules">
            <el-form-item label="楼宇名称" prop="name">
              <el-input placeholder="请输入楼宇名称" v-model="derlist.name"></el-input>
            </el-form-item>
            <el-form-item label="楼宇层数" prop="floors">
              <el-input placeholder="请输入楼宇层数" v-model.number="derlist.floors"></el-input>
            </el-form-item>
            <el-form-item label="再管面积" prop="area">
              <el-input placeholder="请输入再管面积" v-model.number="derlist.area"><template slot="append"> m²</template></el-input>
            </el-form-item>
            <el-form-item label="物业费" prop="propertyFeePrice">
              <el-input placeholder="请输入物业费" v-model.number="derlist.propertyFeePrice"><template slot="append"> 元/m²</template></el-input>
            </el-form-item>
          </el-form>
        <!-- </div> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {addList,alterList, changeList, delList, getList} from '@/api/index'
export default {
  data(){
    return {
      data:[],
      status:0,
      total:0,  // 共多少条
      names:'',  //  搜索内容
      dialogVisible: false,
      title:'',  //弹窗标题
      drawerType:'',//  区分 添加提交 还是 编辑提交
      /* 列表数据 */
      from:{
        page:1, //页数
        pageSize:10, //条数
        name:''
      },
      /* 添加楼宇信息 */
      derlist:{
        name:'',
        floors:null,
        area:null,
        propertyFeePrice:null
      },
      rules:{}
    }
  },
  created(){
   this.exgetList()
  },
  methods:{
    /* 列表数据 */
   async exgetList(){
      const res = await getList(this.from)
      this.data = res.data.rows
      this.total = res.data.total
    },
    /* 删除 */
    async del(id){
        await delList(id)
        this.exgetList()
    },
    /* 标题 判断 */
  async Dialog(ad,id){
    console.log(id);
      if(ad === 'add'){
        this.drawerType = ad
        this.title = '添加楼宇'
      } else {
        this.drawerType = ad
        this.title = '编辑楼宇'
        /*  获取编辑 数据 回显 */
       const res = await changeList(id)
       this.derlist = res.data
      }
      this.dialogVisible = true
    },
    /*  添加 编辑 */
  async add(){
     if(this.drawerType === 'add'){
       /*  添加提交 */
       await addList(this.derlist)
     }else{
      /*  编辑提交 */
       const {id,name,floors,area,propertyFeePrice} = this.derlist
       await alterList({id,name,floors,area,propertyFeePrice})
     }
       this.exgetList()
       this.dialogVisible = false
   },
    /* 分页器 */
    handleSizeChange(prev){
      // console.log(prev);
      this.from.page = prev
      console.log(this.page);
      this.exgetList()
    },
    /* 查询功能 */
    name(){
     this.from.name = this.names
     this.from.page = 1
     this.exgetList()
    },
    /*  一页显示多少条数据 */
    handleSizeChange(value){
      this.from.pageSize = value
      this.from.page = 1
      this.exgetList()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table .el-table__cell{
  padding: 8px 0;
}
.query{
  margin-top: 4px;
}
.addition{
  margin-top: 20px;
  margin-bottom: 20px;
}
.qqqqq{
  display: flex;
  border-bottom: 1px solid #efefef;
  .sousuo{
  width: 220px;
  margin-right: 25px;
}
}
.paging{
  display: flex;
  justify-content: space-around
}
.formpanding{
  padding: 10px 50px;
}
::v-deep .el-dialog__body{
 padding: 0px 100px;
}
</style>
