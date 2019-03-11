import Http from "./index";
import {
  ARTICLELIST, //获取文章列表
  ARTICLEBYID, //获取文章详情
  TAGS //标签
} from "./url";

/**
 * 获取文章信息
 */
class AriticleApi {
  /**
   * 获取文章列表
   * @returns Promise
   */
  static getArticleLists(data = {}) {
    return Http.post(ARTICLELIST, data, true);
  }

  /**
   * 获取文章详情
   * @param articleId 文章id
   * @returns Promise
   */
  static getArticleDetail(articleId = 1) {
    return Http.get(ARTICLEBYID, {
      articleId: articleId
    }, true);
  }

  /**
   * 获取所有标签
   * @returns Promise
   */
  static getTags() {
    return Http.get(TAGS);
  };
}

export default AriticleApi;
