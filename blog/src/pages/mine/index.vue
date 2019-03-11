<template>
  <scroll-view class="mine_scroll">
    <div class="mine_container">
      <div class="header_container"  @click.stop.prevent="changeBgViewClick">
        <img :src="bgImg" alt="" class="bg_img">
        <div class="user_container">
          <img src="/static/images/icon.jpg" alt="">
          <span>刘小二</span>
        </div>
      </div>
      <div class="section_container">
        <div class="name_section_container">
          <div class="name rows">
            <i class="iconfont icon-xingmingyonghumingnicheng" ></i>
            <span>刘小二</span>
          </div>
          <div class="info rows">
            <i class="iconfont icon-jinengbiaoqian" ></i>
            <span>iOS开发, Vue, 小程序</span>
          </div>
        </div>
        <div class="company_container">
          <div class="company rows">
            <i class="iconfont icon-gongsimingcheng" ></i>
            <span>中公教育(北京总部)</span>
          </div>
          <div class="email rows">
            <i class="iconfont icon-youxiang" ></i>
            <span>oneenddi@163.com</span>
          </div>
          <div class="blog rows" @click="copyLinkWithURL(blogURL)">
            <i class="iconfont icon-bokeyuan" ></i>
            <span>{{blogURL}}</span>
          </div>
          <div class="github rows" @click="copyLinkWithURL(githubURL)">
            <i class="iconfont icon-github" ></i>
            <span>{{githubURL}}</span>
          </div>
        </div>
        <Button open-type="contact" class="contact">联系我</Button>
      </div>
    </div>
  </scroll-view>
</template>

<script>
  export default {
    data() {
      return {
        bgImg: '/static/images/icon2.jpg',
        blogURL: 'https://www.liuxiaoer.club',
        githubURL: 'https://github.com/liuaaaddxiaoer',
      }
    },
    mounted() {
      mpvue.showShareMenu()
    },
    methods: {

      // 切换背景
      changeBgViewClick() {
        console.log(1)
        var _this = this
        mpvue.chooseImage({
          count: 1,
          success: function(res) {
            console.log(res)
            console.log(this)
            console.log(res.tempFiles[0].path)
            _this.bgImg = res.tempFiles[0].path
          }
        })
      },
      // 拷贝链接到粘贴板
      copyLinkWithURL(url) {
        mpvue.showModal({
          title: '提示',
          content: '目前我的小程序无法加载网页，请复制链接后在浏览器中打开查看',
          cancelText: '关闭',
          confirmText: '复制链接',
          success: function(res) {
            if (res.confirm) {
              // 拷贝链接到粘贴板
              mpvue.setClipboardData({
                data: url,
                success: function() {
                  mpvue.showToast({
                    title: '复制成功'
                  })
                }
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/common";
  .mine_scroll {
    height: 100%;
    .mine_container {
      display: flex;
      height: 100%;
      flex-direction: column;
      .header_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 200px;
        overflow: hidden;
        .bg_img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          z-index: -1;
          filter: blur(2px);
        }
        .user_container {
          display: flex;
          flex-direction: column;
          color: white;
          text-align: center;
          font-size: 16px;
          img {
            width: 62px;
            height: 62px;
            border-radius: 50%;
            border: 2px solid white;
            margin-bottom: 5px;
          }
        }
      }
      .section_container {
        display: flex;
        flex: 1;
        background: #f5f5f5;
        flex-direction: column;
        position: relative;
        .contact {
          position: absolute;
          left: 50%;
          bottom: 30px;
          transform: translate(-50%, 0);
        }
        .name_section_container,.company_container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 12px;
          background: white;
          padding: 0px 16px;
          span {
            color: #333;
            font-size: 15px;
            margin-left: 10px;
          }
          .rows{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 10px 0;

          }
        }

      }
    }
  }
</style>
