<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                    v-model="article.title"
                    type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input
                    v-model="article.description"
                    type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea
                    v-model="article.body"
                    class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                    v-model="article.tagList"
                    type="text" class="form-control" placeholder="Enter tags">
                <div class="tag-list"></div>
              </fieldset>
              <button
                  @click="createArticle"
                  class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {
  createArticle,
  getArticleDetail,
  updateArticle
} from '~/api/article'

export default {
  middleware: 'authenticated',
  name: 'EditorIndex',
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: ''
      }
    }
  },
  async asyncData ({ query }) {
    let article
    if (query.slug) {
      const { data } = await getArticleDetail(query.slug)
      article = data.article
    }

    return {
      article
    }
  },
  methods: {
    async createArticle () {
      if (this.$route.query.slug) {
        await updateArticle({ slug: this.$route.query.slug, article: this.article })
        this.$router.push({
          name: 'home'
        })
      } else {
        await createArticle(this.article)
        this.$router.push({
          name: 'home'
        })
      }
    },
    change (article) {
      this.article = article
    }
  }
}
</script>

<style scoped>

</style>
