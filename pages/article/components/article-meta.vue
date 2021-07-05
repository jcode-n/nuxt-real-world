<template>
  <div class="article-meta">
    <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
    }"><img :src="article.author.image"/></nuxt-link>
    <div class="info">
      <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
      }" class="author">{{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <template v-if="article.author.username === $store.state.user.username">
      <button @click="$router.push({
        name: 'editor',
        query: {
          slug: article.slug
        }
      })">编辑文章</button>
      <button @click="delArticle(article.slug)">删除文章</button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary"
              :class="article.author.following"
              @click.prevent="isFollowing(article.author)"
      >
        <i class="ion-plus-round"></i>
        &nbsp;{{ article.author.following ? '取消关注' : '关注' }}
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm"
              :class="{ 'btn-outline-primary': article.favorited }"
              @click.prevent="isFavorited(article)"
              :disabled="btnDisable"
      >
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">{{ article.favoritesCount }}</span>
      </button>
    </template>
  </div>
</template>

<script>
import {
  followingArticle,
  unFollowingArticle,
  favoriteArticle,
  unFavoriteArticle,
  delArticle
} from '~/api/article'

export default {
  name: 'articleMeta',
  props: {
    article: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      btnDisable: false
    }
  },
  methods: {
    // 是否点赞
    async isFavorited (article) {
      this.btnDisable = true
      if (!article.favorited) {
        await unFavoriteArticle(article.slug)
        article.favoritesCount++
        article.favorited = true
      } else {
        await favoriteArticle(article.slug)
        article.favoritesCount--
        article.favorited = false
      }
      this.btnDisable = false
    },
    async isFollowing (author) {
      if (author.following) {
        author.following = false
        await unFollowingArticle(author.username)
      } else {
        author.following = true
        await followingArticle(author.username)
      }
    },
    async delArticle (slug) {
      await delArticle(slug)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>

</style>
