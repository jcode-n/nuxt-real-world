<template>
  <div class="row">

    <div class="col-xs-12 col-md-8 offset-md-2">

      <form class="card comment-form">
        <div class="card-block">
          <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
        </div>
        <div class="card-footer">
          <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>
          <button class="btn btn-sm btn-primary">
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
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { getComments } from "~/api/article"

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
      comments: []
    }
  },
  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  }
}
</script>

<style scoped>

</style>