<template lang="pug">
  .page-search
    navbar.navbar(:username="username")
    .search-content-container
      .side-menu-wrapper
        .account-name {{username}}
        b-card.side-menu-card(@click="$router.replace({name: 'Search', query: {favorites: true}})")
          .card-text
            i.material-icons.icon-favorite star
            | Favorites
      .container.content-container
        .row
          .col-6(v-if="storeList && storeList.length > 0")
            b-card.search-store-card(no-body v-for="store in storeList" :key="store.store_id" @click="showStoreDetail(store)")
              b-card-body
                i.material-icons.icon-favorite(:class="{active: isStoreFavorited(store.store_id)}" @click.stop="toggleFavorite(store.store_id)") star
                .search-title-container
                  .title {{store.name}}
                  .tag-wrapper
                    .tag(v-for="tag in store.tag_list.slice(0, 3)" :key="tag" @click.stop="replaceTag(tag)") {{"#" + tag}}
                .search-rating-wrapper
                  .rating-score {{getRatingPoint(store.score)}}
                  .rating-text {{getRatingText(store.score)}}
              b-card-footer
                span.recent Recent
                .text {{getLastComment(store.review_list)}}
          .col-6(v-else)
            b-card.empty-card(no-body)
              b-card-body Please search with keywords or tags.
          .col-6
            b-card.store-detail-card(no-body v-if="storeInDetail")
              b-card-body.detail-title-body
                i.material-icons.icon-favorite(:class="{active: isStoreFavorited(storeInDetail.store_id)}" @click.stop="toggleFavorite(storeInDetail.store_id)") star
                .title {{storeInDetail.name}}
              b-card-body.detail-content-body
                b-card(no-body)
                  b-card-body.ratings-body
                    .title Ratings
                    .ratings-content-wrapper
                      .rating {{getRatingPoint(storeInDetail.score)}}
                      .rating-text {{getRatingText(storeInDetail.score)}}
                      //- .rating-graph-wrapper
                      //-   .rating-graph
                      //-     .rating-graph-fill(style="width:80%;")
                      //-   .left-text 96
                      //-   .right-text 24
                  b-card-body.tags-body
                    .title Tags
                    .tags-container
                      .tag(v-for="tag in storeInDetail.tag_list" :key="tag" @click.stop="replaceTag(tag)") {{"#" + tag}}
                b-card(no-body)
                  b-card-body.reviews-title-body
                    .title Reviews
                  b-card-body.reviews-content-body(v-for="review in storeInDetail.review_list" :key="review.date")
                    .text {{review.content}}
            b-card.empty-card(no-body v-else)
              b-card-body Please select a store.
</template>

<script>
import Cookies from 'js-cookie'
import Navbar from '@/components/Navbar'

export default {
  async created () {
    if (Cookies.get('user_id')) {
      let promiseList = [
        this.$store.dispatch('getUser', Cookies.get('user_id')),
        this.$store.dispatch('getFavorites', Cookies.get('user_id'))
      ];

      if (this.$route.query.keyword) {
        promiseList.push(
          this.$store.dispatch('getStoreListKeyword', this.$route.query.keyword)
        );
      } else if (this.$route.query.tag) {
        promiseList.push(
          this.$store.dispatch('getStoreListTag', this.$route.query.tag)
        );
      } else {
        this.$store.commit('setState', {
          storeList: null,
        });
      }
      await Promise.all(promiseList);
      this.username = this.$store.state.username;
      if (this.$route.query.favorites) {
        this.$store.commit('setState', {
          storeList: this.$store.state.favorites,
        });
      }
      this.storeList = this.$store.state.storeList;
    } else {
      this.$router.push({name: 'Login'});
    }
  },
  components: {
    navbar: Navbar,
  },
  data () {
    return {
      username: "",
      storeList: null,
      storeInDetail: null,
      favorites: null,
    }
  },
  methods: {
    getLastComment(commentList) {
      if (commentList && commentList.length > 0) {
        return commentList[0].content;
      }
      return '-';
    },
    getRatingPoint(score) {
      if (score === null) return "-";
      return Math.round(score) + " p";
    },
    getRatingText(score) {
      if (score === null) return "-"
      if (score <= 20) {
        return "Very negative";
      } else if (score > 20 && score <= 40) {
        return "Negative";
      } else if (score > 40 && score <= 60) {
        return "Mixed";
      } else if (score > 60 && score <= 80) {
        return "Positive";
      } else if (score > 80) {
        return "Very Positive";
      }
    },
    replaceTag(tag) {
      this.$router.replace({
        name: 'Search',
        query: { tag },
      });
    },
    showStoreDetail(sto) {
      this.storeInDetail = sto;
    },
    isStoreFavorited(id) {
      if (!this.favorites || this.favorites.length < 1) return false;
      for (let i = 0; i < this.favorites.length; i++) {
        if (this.favorites[i].store_id === id) return true;
      }
      return false;
    },
    toggleFavorite(id) {
      const params = {
        store_id: id,
        user_id: Cookies.get('user_id'),
      };
      if (this.isStoreFavorited(id)) this.$store.dispatch('deleteFavorite', params);
      else this.$store.dispatch('addFavorite', params);
    }
  },
  watch: {
    '$route.query': {
      handler: async function () {
        let promiseList = [];
        if (this.$route.query.keyword) {
          promiseList.push(
            this.$store.dispatch('getStoreListKeyword', this.$route.query.keyword)
          );
        } else if (this.$route.query.tag) {
          promiseList.push(
            this.$store.dispatch('getStoreListTag', this.$route.query.tag)
          );
        } else if (this.$route.query.favorites) {
          this.$store.commit('setState', {
            storeList: this.$store.state.favorites
          });
          this.storeList = this.$store.state.storeList;
          this.storeInDetail = null;
        } else {
          this.$store.commit('setState', {
            storeList: null,
          });
        }
        await Promise.all(promiseList);
        this.storeList = this.$store.state.storeList;
      },
      deep: true,
    },
    '$store.state.favorites': function (val) {
      this.favorites = val;
    }
  },
}
</script>

<style scoped lang="scss">
$store-detail-title-height: 4rem;

.tag {
  &:hover {
    cursor: pointer;
  }
}

.icon-favorite {
  color: $gray-300;

  &.active {
    color: $primary !important;
  }

  &:hover {
    cursor: pointer;
  }
}

.navbar {
  z-index: $navbar-z;
}

.search-content-container {
  padding-top: 2rem + $navbar-height;
  padding-bottom: 2rem;
  position: relative;
  z-index: $content-z;
}

.side-menu-wrapper {
  padding-left: 1.5rem;
  padding-right: 1rem;
  position: absolute;
  top: 2rem + $navbar-height;
  width: $navbar-title-width;

  .account-name {
    margin-bottom: .75rem;
  }

  .side-menu-card {
    &:hover {
      background-color: $primary-50;
      color: $primary;
      cursor: pointer;
    }

    .card-body {
      padding: .5rem .5rem .5rem 1rem;
    }

    .icon-favorite {
      font-size: 1rem;
      margin-right: .75rem;
    }
  }
}

.content-container {
  max-width: 100%;
  padding-left: 1rem + $navbar-title-width;
  padding-right: 2rem;
}

.empty-card .card-body {
  color: $gray-500;
  padding: 1rem 1.25rem;
}

.search-store-card {
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  .card-body {
    padding: 1.25rem 9.5rem 1.25rem 3.5rem;
    position: relative;
  }

  .icon-favorite {
    left: 1rem;
    position: absolute;
    top: 1.4rem;

    &.active {
      color: $primary;
    }
  }

  .search-title-container {
    .title {
      font-size: 1.25rem;
    }

    .tag-wrapper {
      height: 1.5rem;
      margin-top: .4rem;

      .tag {
        color: $primary;
        display: inline-block;
        margin-right: .5rem;
        text-decoration: underline;
      }
    }
  }

  .search-rating-wrapper {
    position: absolute;
    right: 2rem;
    text-align: right;
    top: .6rem;

    .rating-score {
      color: $primary;
      font-size: 2rem;
      line-height: 1.4;
    }

    .rating-text {
      color: $gray-400;
    }
  }

  .card-footer {
    color: $gray-700;
    padding: 0.75rem 1.25rem;
    position: relative;

    .recent {
      color: $gray-400;
      position: absolute;
    }

    .text {
      @include text-truncate;
      padding-left: 4.25rem;
    }
  }

  &:hover {
    cursor: pointer;

    .card-body {
      background-color: $primary-50;
    }
  }
}

.store-detail-card {
  .detail-title-body {
    border-bottom: 1px solid $gray-300;
    height: $store-detail-title-height;
    padding: 0;
    position: relative;

    .icon-favorite {
      left: 1.25rem;
      position: absolute;
      top: 1.25rem;
    }

    .title {
      font-size: 1.25rem;
      margin-left: 4rem;
      line-height: $store-detail-title-height;
    }
  }

  .detail-content-body {
    background-color: $gray-50;
    padding: 1rem;

    .card {
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .card-body {
      padding: 1rem 1.25rem;
    }

    .title {
      color: $gray-700;
    }

    .ratings-body {
      border-bottom: 1px solid $gray-300;
    }

    .ratings-content-wrapper {
      margin-top: .25rem;
      position: relative;
    }

    .rating {
      color: $primary;
      display: inline-block;
      font-size: 2.25rem;
    }

    .rating-text {
      color: $gray-500;
      display: inline-block;
      margin-left: .5rem;
    }

    .rating-graph-wrapper {
      left: 11.25rem;
      position: absolute;
      right: 0;
      top: .75rem;

      .left-text {
        color: $primary;
        display: inline-block;
      }

      .right-text {
        color: $gray-500;
        float: right;
      }
    }

    .rating-graph {
      background-color: $gray-300;
      height: 0.25rem;
      margin-bottom: .25rem;
      position: relative;
      width: 100%;
    }

    .rating-graph-fill {
      background-color: $primary;
      height: 100%;
    }

    .tags-container {
      margin-top: .75rem;

      .tag {
        color: $primary;
        display: inline-block;
        margin-right: .5rem;
        text-decoration: underline;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .reviews-title-body {
    border-bottom: 1px solid $gray-300;
    color: $gray-700;
  }

  .reviews-content-body {
    border-bottom: 1px solid $gray-300;

    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>