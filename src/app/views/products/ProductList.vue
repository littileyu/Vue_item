//列表组件
<template>
    <div class="product">
        <div class="row" v-if="!listData.list">
            <div class="col-xs-12">
                 加载中...
            </div>
        </div>
        <div class="row" v-else-if="listData.list.length == 0">
            <div class="col-xs-12 no-list"></div>
        </div>
        <div class="row"  id="productList"  v-else>
            <ul class="clearfix">
            <li class="col-xs-6 col-sm-3 col-md-2 col-lg-1" v-for="(item,index) in listData.list "  @click="fetchItem(item.id);">
                <div class="item">
                    <em  class="item-cd"   v-if="item.sekillTime" ><em class="iconfont icon-lishi"></em> {{item.sekillTime}}</em>
                    <!--图片盒子-->
                    <div class="cc">
                        <div class="photo" :style="{'background-image':'url('+item.image+')'}">

                            <div class="txt">
                                <a  class="item-icon-btn" role="button"   v-if="item.point" >积</a>
                                <a  class="item-icon-btn" role="button"   v-if="item.sekillTime" >限</a>
                                <a  class="item-icon-btn" role="button"   v-if="item.giftType!='none'" ><span class="iconfont icon-baobei"></span></a>
                                <a  class="item-icon-btn" role="button"   v-if="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
                                <span class="info">
										 <span class="price">{{item.seckillPrice || item.price | currency }}</span><span class="stock">&times;{{item.availableStock}}</span>
								</span>
                            </div>
                        </div>
                    </div>

                    <!--文本盒子-->
                    <div class="tt">
                        {{item.name}}
					</div>
                </div>
            </li>
         </ul>

        </div>
        <div class="productlist-footer">
            <pagination :page="listData" :go-callback="goCallback" ></pagination>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ProductList',
        data() {
            return {

            }
        },
        computed: {
            productParams(){
                return this.$store.state.currentPage.list;
            },
            listData () {
                return this.$store.state.currentPage.pageData;
            },
        },
        created(){
//               this.$store.commit("setProductParams", {"categoryId": null, "categoryName": null,"brandId":null,"brandName":null,});

               this.fetchList();

        },
        watch:{
            'productParams'(val){
                    if(val.type!=1){
                        this.fetchList();
                    }
            }

        },
        methods:{
            //请求列表
            fetchList() {


                    this.$store.dispatch('fetchList',this.productParams).then(res=>{

                       if(res.page.list.length>0) {
//                            this.$nextTick(_ => {
//
//                                this.$simpleScroll('#productList');
//                            })
                       }
                    }).catch(res=>{
                        this.$alert(res.msg, {
                            type: 'error',
                        });
                    });


            },
            goCallback(pageIndex){
                this.$store.commit("setProductParams",{pageNum:pageIndex})
                this.fetchList();
            },
            //获取物品详情
            fetchItem:function(pid){
                this.$store.dispatch('fetchItem',pid).then(res=>{
                     this.$emit('open-detail'); //主动触发upup方法，'hehe'为向父组件传递的数据  父级传过来的方法  用$emit方法去触发
                }).catch(res=>{
                    this.$alert(res.msg, {
                        type: 'error',
                    });
                });
            }

        }
    }
</script>

<style scoped>


</style>