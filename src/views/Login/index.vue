<template>
  <div class="login_body">
    <div class="bg" />
    <div class="box">
      <div class="title">智慧园区-登录</div>
      <el-form ref="form" :model="from" :rules="rules">
        <el-form-item
          label="账号"
          prop="username">
          <el-input v-model="from.username" placeholder="请输入账号" />
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password">
          <el-input v-model="from.password" type="password" placeholder="请输入密码"/>
        </el-form-item>

        <el-form-item prop="remember">
          <el-checkbox v-model="remember">记住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login_btn" @click="loginbtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/user'
import { setToken } from '@/utils/auth'

export default {
  name: 'Login',
   data () {
    return {
      remember:false,
      from:{
        username:'',
        password:''
      },
      rules:{
        username:[{ required: true, message: '请输入账号', trigger: 'blur' },],
        password:[{ required: true, message: '请输入密码', trigger: 'blur' },]
      }
    }
  },
  mounted(){
   const user = JSON.parse(localStorage.getItem('user'))
   if(user){
      this.from = user
      this.remember = true
   }  
  },
  methods:{
    //  登录的时候对整个表单进行校验
    loginbtn(){
      this.$refs.form.validate(async(value)=>{
        /* 校验通过后 调接口登录 */
        if(value){
         const {username,password} = this.from
        const res = await loginAPI({username,password})
        setToken(res.data.token)
        this.$message.success(res.msg)
        this.$router.push('/')

        if(this.remember){
          /* 勾选了 就保存密码 */
          localStorage.setItem('user',JSON.stringify(this.from))
        } else {
          /* 如果没有选择记住密码 则 清除 user  */
          localStorage.removeItem('user')
        }
        }
      })

    }
  }

}

</script>

<style scoped lang="scss">
  .login_body {
    display: flex;
  }
  .bg {
    width: 60vw;
    height: 100vh;
    background: url('~@/assets/login-bg.svg') no-repeat;
    background-position: right top;
    background-size: cover;
  }
  .box {
    margin: 200px 10% 0;
    flex: 1;
    .title {
      padding-bottom: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #1e2023;
    }
    ::v-deep() {
      .ant-form-item {
        display: flex;
        margin-bottom: 62px;
        flex-direction: column;
      }
      .ant-form-item-label label {
        font-size: 16px;
        color: #8b929d;
      }
      .ant-input,
      .ant-input-password {
        border-radius: 8px;
      }
    }
  }
  .login_btn{
    width: 100%;
  }
</style>
