import pagination from './pagination.js';//頁碼
import productTempModal from './productModal.js';//新增修改互動視窗

let productModal  =''; //互動視窗(新增)

const app =Vue.createApp({
  //資料
  data(){
    return{
      text:true,
      url:'https://vue3-course-api.hexschool.io',
      path:'v268018',
      productData:[],//產品資訊
      pagination:{},//頁碼資訊
      tempProductData:{//新增修改產品內容 
          imageUrl : "https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80",
          imagesUrl: [],//多圖內容
      },
      isNew:false,//判斷是否需要新增還是編輯
    }
  },
  //區域註冊元件
  components:{
    pagination,//頁碼
    productTempModal,//新增編輯互動視窗
  },
  //方法
  methods:{
    removeProducts(id){//刪除單筆產品訂單
      console.log(id);
      axios.delete(`${this.url}/api/${this.path}/admin/product/${id}`)
      .then(res=>{
          console.log(res);
          this.getProducts();
      }).catch(err=>{
          console.log(err);
      })
    },
    updataProductData(){//新增或者是刪除產品訂單
      //新增模式
      if(this.isNew){//新增模式
        axios.post(`${this.url}/api/${this.path}/admin/product`,{data:this.tempProductData})
        .then(res=>{
          console.log(res);
          if(res.data.success){
            alert('新增產品訂單成功');
            this.getProducts();
            productModal.hide();
          }else{//新增產失敗
            let str ='';
            res.data.message.forEach(item=>{
              str+=item;
            })
            alert('新增產品訂單失敗');
            productModal.hide();
          }
        }).catch(err=>{
          alert('新增產品訂單失敗');
          console.log(err);
        })
      }else{//編輯模式
       axios.put(`${this.url}/api/${this.path}/admin/product/${this.tempProductData.id}`,
       {data:this.tempProductData})
       .then(res=>{
         if(res.data.success){
           alert('訂單資料修改成功');
           this.getProducts();
           productModal.hide();
         }
         else{
           alert('訂單資料修改失敗');
           productModal.hide();
         }
       }).catch(err=>{
         alert('訂單資料修改失敗');
         console.log(err);
       })  
     }
    },
    openModal(isNew,item){
      this.isNew=isNew;//判斷是否為新增還是編輯
      if(this.isNew){
        this.tempProductData={//新增修改產品內容 
          imageUrl : "https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80",
          imagesUrl: [],//多圖內容
        };
      }else{//把item內容複製到暫存內容裡面
        this.tempProductData={...item};
      }
      productModal.show(); 
    },
    getProducts(page=1){//取得產品資料
      axios.get(`${this.url}/api/${this.path}/admin/products?page=${page}`)
      .then(res=>{
          this.productData=res.data.products;//產品列表
          this.pagination=res.data.pagination;//頁碼資訊
          console.log(res);
      }).catch(err=>{
          console.log(err);
      })
    },
  },
  //初始化(生命週期)
  created(){
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)v268018\s*\=\s*([^;]*).*$)|^.*$/, "$1");//取得cookie的token
    axios.defaults.headers.common['Authorization'] = myCookie;//執行axios的時候都會自動執行token認證
    this.getProducts();
  },
  mounted(){//初始化完畢
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
  }
})
app.mount('#app');







