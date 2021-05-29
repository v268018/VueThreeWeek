let addModal  =''; //互動視窗(新增)
let editModal =''; //互動視窗(編輯)

const app ={
  //資料
  data(){
    return{
      text:true,
      url:'https://vue3-course-api.hexschool.io',
      path:'v268018',
      productData:[],//產品資訊
      addProductData:{//新增產品內容
        "data": {
          "title": "", 
          "category": "",
          "origin_price": 1000,
          "price": 500,
          "unit": "",
          "description": "",
          "content": "",
          "is_enabled": 0,
          "imageUrl" : "https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80",
          "imagesUrl": [
            "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80",
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1948&amp;q=80",
            "https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80",
            "https://images.unsplash.com/photo-1511914265872-c40672604a80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1867&amp;q=80"
          ]
        }
      },
      editProductData:{},//編輯產品內容
      token:{//存放uesr的token
        headers:{
          Authorization:'',
        },
      },
    }
  },
  //方法
  methods:{
    removeProducts(id){//刪除單筆產品訂單
      console.log(id);
      axios.delete(`${this.url}/api/${this.path}/admin/product/${id}`,this.token)
      .then(res=>{
          console.log(res);
          this.getProducts();
      }).catch(err=>{
          console.log(err);
      })
    },
    setEditProducts(){//設定編輯商品訂單
      let putEditData={//定義傳送的修改格式
        data:{
          ...this.editProductData,
        }
      }
      console.log(putEditData);
      axios.put(`${this.url}/api/${this.path}/admin/product/${this.editProductData.id}`,putEditData,this.token)
      .then(res=>{
        console.log(res);
        if(res.data.success){
          alert('訂單資料修改成功');
          this.getProducts();
          editModal.hide();
        }
        else{
          alert('訂單資料修改失敗');
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    editProducts(item){//編輯商品訂單
      this.editProductData={...item};
      editModal.show();
    },
    setAddProducts(){
      // title(String)、category(String)、unit(String)、origin_price(Number)、price(Number) 為必填欄位
      axios.post(`${this.url}/api/${this.path}/admin/product`,this.addProductData,this.token)
      .then(res=>{
        let str ='';
        if(res.data.success===false){
          res.data.message.forEach(item=>{
              str+=item;
          })
          alert(str);
          alert('新增產品訂單失敗');
          addModal.hide();
        }else{
          alert('新增產品訂單成功');
          this.addProductData={//重製產品內容
            "data": {
              "title": "", 
              "category": "",
              "origin_price": 1000,
              "price": 500,
              "unit": "",
              "description": "",
              "content": "",
              "is_enabled": 0,
              "imageUrl" : "https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=621e8231a4e714c2e85f5acbbcc6a730&auto=format&fit=crop&w=1352&q=80",
              "imagesUrl": [
                "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80",
                "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1948&amp;q=80",
                "https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80",
                "https://images.unsplash.com/photo-1511914265872-c40672604a80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1867&amp;q=80"
              ]
            }
          }
          addModal.hide();
          this.getProducts();
        }
   
      }).catch(err=>{
        alert('新增產品訂單失敗');
        console.log(err);
      })
    },
    addProduct(){//新增商品
      addModal.show();
    },
    getProducts(){//取得產品資料
      axios.get(`${this.url}/api/${this.path}/admin/products`,this.token)
      .then(res=>{
          this.productData=res.data.products;
      }).catch(err=>{
          console.log(err);
      })
    },
  },
  //初始化(生命週期)
  created(){
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)v268018\s*\=\s*([^;]*).*$)|^.*$/, "$1");//取得cookie的token
    this.token.headers.Authorization=myCookie;//定義token資料內容
    this.getProducts();
  },
  mounted(){//初始化完畢
    addModal = new bootstrap.Modal(document.getElementById('addModal'));
    editModal = new bootstrap.Modal(document.getElementById('editModal'));
  }
}
Vue.createApp(app).mount('#app')   ;




