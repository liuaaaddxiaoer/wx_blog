<template>
  <scroll-view class="home_scroll">
    <div class="home_container">
      <div class="header_container">
        <swiper class="swiper_header" :indicator-dots="imgs.length > 1" indicator-active-color="#ea6f5a" autoplay :interval="3000">
          <swiper-item v-for="(item,index) in imgs" :key="index">
            <img :src='item.article_icon' @click="loopImgClick(index)"/>
          </swiper-item>
        </swiper>
      </div>
      <div class="nav_container" v-if="false">
        <div class="nav_item_container" v-for="(nav,index) in navs" :key="index">
          <span>{{nav}}</span>
        </div>
      </div>
      <div class="tag_container">
        标签:
        <span v-for="(tag,index) in tags" :key="index" @click="tagClick(index)">{{tag.tagName}}</span>
      </div>
      <div class="article_container">
        <div class="article" v-for="(article, index) in articles" :key="index" @click="goToArticleDetail(index)">
          <div class="content_container">
            <h3>{{article.title}}</h3>
            <span>{{article.article_content}}</span>
          </div>
          <img :src="article.article_icon" alt="" :class="article.article_icon.length > 0 ? 'hasIcon': ''">
        </div>
      </div>
      <span v-if="isLoadingMore" class="loadMore">Loading...</span>
    </div>
  </scroll-view>
</template>

<script>
  import ArticleApi from '../../http/article'
  export default {
    data() {
      return {
        imgs: [],
        navs: [
          '首页',
          'Github',
          '关于我',
          '后台管理'
        ],
        tags: [], // 标签
        articles: [], // 文章列表数组,
        isLoadingMore: false // 是否在加载更多
      }
    },
    onPullDownRefresh(res) {
      console.log('1')
      // 震动
      mpvue.vibrateShort()
      this.loadArticles()
    },
    onReachBottom() {
      console.log('111')
      this.isLoadingMore = false
    },


    created() {
      // 加载文本列表
      this.loadArticles()
      // 加载标签列表
      this.loadTags()
    },

    methods: {
      // 点击轮播图 index:索引
      loopImgClick(index) {
        mpvue.navigateTo({
          url: `/pages/article/main?article_id=${this.imgs[index].id}`
        })
      },
      // 加载文章列表
      loadArticles(params) {
        // 获取文章列表
        this.isLoadingMore = false
        ArticleApi.getArticleLists(params).then((data) => {
          this.articles = data
          mpvue.stopPullDownRefresh()
          var arr = []
          this.articles.forEach((value,index)=> {
            if (value.is_Hot != null && value.is_Hot == 1) {
              arr.push(value)
            }
          })
          console.log(arr)
          if (arr.length > 0) {
            this.imgs = arr
          }
        })
      },
      // 跳转到文章详情页面
      goToArticleDetail(index) {
        mpvue.navigateTo({
          url: `/pages/article/main?article_id=${this.articles[index].id}`
        })
      },
      // 加载标签
      loadTags() {
        ArticleApi.getTags().then((data) => {
          console.log(data)
          this.tags = data
        })
      },
      // 标签点击
      tagClick(index) {
        console.log(this.tags[index].id)
        this.isLoadingMore = false
        this.loadArticles({
          tagId: this.tags[index].id
        })
      },

    }
  }
</script>


<style scoped lang="less">
  @import "../../common/common";
  .home_scroll {
    .home_container {
      display: flex;
      flex-direction: column;
      .loadMore {
        width: 100%;
        text-align: center;
        background: #f3f3f3;
        height: 60px;
        line-height: 60px;
      }
      .header_container {
        justify-content: center;
        align-items: center;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .nav_container {
        display: flex;
        flex-direction: row;
        padding: 15px 0;
        text-align: center;
        font-size: 15px;
        .nav_item_container {
          flex: 1;
        }
        border-bottom: .25px solid @dividerLineColor;
      }
      .tag_container {
        display: flex;
        flex-direction: row;
        padding: 16px;
        padding-bottom: 0px;
        font-size: 15px;
        span {
          margin-left: 20px;
          color: @mainColor;
        }
      }
      .article_container {
        display: flex;
        flex-direction: column;
        .article {
          display: flex;
          flex-direction: row;
          padding: 15px;
          border-bottom: .25px solid @dividerLineColor;
          .content_container {
            display: flex;
            flex: 1;
            flex-direction: column;
            h3 {
              color: #333;
              font-weight: 700;
              font-size: 18px;
              .maxLines(2);
            }
            span {
              margin-top: 5px;
              color: #999;
              font-size: 13px;
              .maxLines(2);
            }
          }
          img {
            width: 0;
            height: 0;

          }
          .hasIcon {
            border-radius: 6px;
            margin-left: 5px;
            width: 90px;
            height: 90px;
          }
        }
      }
    }
  }
</style>
