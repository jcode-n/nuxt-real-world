<template>
  <div class="row">

    <div class="col-xs-12 col-md-8 offset-md-2">

      <form class="card comment-form"
            autocomplete="off"
            @submit.prevent="postComment"
      >
        <div class="card-block">
          <textarea class="form-control" v-model="comment"  placeholder="Write a comment..." rows="3"></textarea>
        </div>
        <div class="card-footer">
          <img :src="$store.state.user.image" class="comment-author-img"/>
          <button class="btn btn-sm btn-primary" type="submit"
          >
            Post Comment
          </button>
        </div>
      </form>

      <div class="card" v-for="item in comments"
        :key="item.id"
      >
        <div class="card-block">
          <p class="card-text">{{ item.body }}</p>
        </div>
        <div class="card-footer">
          <nuxt-link :to="{
            name: 'profile',
            params: {
              username: item.author.username
            }
          }" class="comment-author">
            <img :src="item.author.image" class="comment-author-img"/>
          </nuxt-link>
          <nuxt-link :to="{
            name: 'profile',
            params: {
              username: item.author.username
            }
          }" class="comment-author">
            {{ item.author.username }}
          </nuxt-link>
          <span class="date-posted">{{ item.createdAt | date('MMM DD, YYYY') }}</span>
          <i style="float: right; cursor: pointer" @click="delComment(item.id)">删除</i>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { delComment, getComments, postComment } from '~/api/article'

export default {
  name: "article-comments",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [],
      comment: ''
    }
  },
  mounted () {
    this.getComments()
  },
  methods: {
    // 提交评论
    async postComment () {
      await postComment({
        slug: this.article.slug,
        comment: this.comment
      })
      this.comment = ''
      await this.getComments()

    },
    // 获取评论
    async getComments () {
      const { data } = await getComments(this.article.slug)
      this.comments = data.comments
    },
    // 删除评论
    async delComment (id) {
      await delComment({
        slug: this.article.slug,
        id
      })
      await this.getComments()
    }
  }
}
</script>

<style scoped>

</style>
