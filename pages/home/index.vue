<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="$store.state.user">
                <nuxt-link class="nav-link"
                           exact
                           :to="{ name: 'home', query: { tab: 'your_feed' } }"
                           :class="{ active: tab === 'your_feed' }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           exact
                           :to="{ name: 'home', query: { tab: 'global_feed' } }"
                           :class="{ active: tab === 'global_feed' }">Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link class="nav-link"
                           exact
                           :to="{ name: 'home', query: { tab: 'tag', tag } }"
                           :class="{ active: tab === 'tag' }"
                ># {{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="item in articles"
            :key="item.slug"
          >
            <div class="article-meta">
              <nuxt-link :to="{ name: 'profile', params: { username: item.author.username } }"><img :src="item.author.image"/></nuxt-link>
              <div class="info">
                <nuxt-link :to="{ name: 'profile', params: { username: item.author.username } }" class="author">{{ item.author.username }}</nuxt-link>
                <span class="date">{{ item.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                      :class="{ active: item.favorited }"
                      @click="onFavorite(item)"
                      :disabled="item.btnDisable"
              >
                <i class="ion-heart"></i> {{ item.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{
              name: 'article',
              params: {
                slug: item.slug
              }
            }" class="preview-link">
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

<!--     分页     -->
          <nav>
            <ul class="pagination">
            <li class="page-item"
                :class="{active: pages === item}"
                v-for="item in totalPage"
                :key="item"
            >
              <nuxt-link class="page-link ng-binding"
                         :to="{
                            name: 'home',
                            query: {
                              page: item,
                              tag: $route.query.tag,
                              tab
                            }
                         }">
                {{ item }}
              </nuxt-link>
            </li>
            </ul>
          </nav>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link v-for="(item, index) in tags"
                         :key="index"
                         :to="{
                            name: 'home',
                            query: {
                              tag: item,
                              tab: 'tag'
                            }
                         }"
                         class="tag-pill tag-default">{{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from '/api/article'
import { getTags } from '/api/tag'

export default {
  name: 'HomeIndex',
  async asyncData ({ query, store }) {
    const limit = 20
    const pages = Number.parseInt(query.page || 1)
    const { tag, tab } = query
    const getAllArticles = (tab === 'your_feed' && store.state.user) ? getFeedArticles : getArticles
    // 获取文章列表和tag列表（并行）
    const [ articlesData, tagsData ] = await Promise.all([
      getAllArticles({
        limit,
        offset: (pages - 1) * limit,
        tag
      }),
      getTags()
    ])
    const { articles, articlesCount } = articlesData.data
    const { tags } = tagsData.data

    articles.forEach(item => item.btnDisable = false)

    return {
      articles,
      articlesCount,
      limit,
      pages,
      tags,
      tag,
      tab: tab || 'global_feed'
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  methods: {
    async onFavorite (item) {
      item.btnDisable = true
      if (item.favorited) {
        await deleteFavorite(item.slug)
        item.favoritesCount += -1
        item.favorited = false
      } else {
        await addFavorite(item.slug)
        item.favoritesCount += 1
        item.favorited = true
      }
      item.btnDisable = false
    }
  }
}
</script>

<style scoped>

</style>
