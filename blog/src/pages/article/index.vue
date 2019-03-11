<template>
  <div class="article_container">
    <wemark :md="content" link highlight type="wemark"></wemark>
  </div>
</template>

<script>
  import ArticleApi from '../../http/article'
  export default {
    data() {
      return {
        content: ''
      }
    },


    mounted() {
      // 获取query文章id
      console.log(this.$root.$mp)
      var article_id = this.$root.$mp.query.article_id
      ArticleApi.getArticleDetail(article_id).then((data) => {
        this.content = data.article_content
        mpvue.setNavigationBarTitle({
          title: data.title
        })
      })
      mpvue.showShareMenu()

    },

    onPageNotFound(res) {
      console.log('res')
    }
  }

</script>


<style lang="less">
  .article_container {
    padding: 20px 15px;

  }
  * {
    background-color: red;
  }
  .wemark_block_code {
    background: cyan;
  }
</style>
