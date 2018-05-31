<template lang="pug">
  .page-search
    navbar.navbar
    .search-content-container
      .side-menu-wrapper
        .account-name Seongho Park
        b-card.side-menu-card
          .card-text
            i.material-icons.icon-favorite star
            | Favorites
      .container.content-container
        .row
          .col-6
            b-card.empty-card(no-body v-if="false")
              b-card-body Please search with keywords or tags.
            b-card.search-store-card(no-body)
              b-card-body
                i.material-icons.icon-favorite.active star
                .search-title-container
                  .title 에꿍이치킨 (신정점)
                  .tag-wrapper
                    .tag #치킨
                    .tag #양많음
                    .tag #교내배달
                .search-rating-wrapper
                  .rating-score 80%
                  .rating-text Very positive
              b-card-footer
                span.recent Recent
                .text 교내배달 되긴한데 한마리 세트는 안해주시고 두마리세트 부터 해주시는 거 같아요... 좀 너무한 거 같긴 하네요...
          .col-6
            b-card.empty-card(no-body v-if="false")
              b-card-body Please select a store.
            b-card.store-detail-card(no-body)
              b-card-body.detail-title-body
                i.material-icons.icon-favorite.active star
                .title 에꿍이치킨 (신성점)
              b-card-body.detail-content-body
                b-card(no-body)
                  b-card-body.ratings-body
                    .title Ratings
                    .ratings-content-wrapper
                      .rating 80%
                      .rating-text positive
                      .rating-graph-wrapper
                        .rating-graph
                          .rating-graph-fill(style="width:80%;")
                        .left-text 96
                        .right-text 24
                  b-card-body.tags-body
                    .title Tags
                    .tags-container
                      .tag #치킨
                      .tag #양많음
                      .tag #교내배달
                      .tag #건강
                b-card(no-body)
                  b-card-body.reviews-title-body
                    .title Reviews
                  b-card-body.reviews-content-body
                    .text 교내배달 되긴한데 한마리 세트는 안해주시고 두마리세트 부터 해주십니다
                  b-card-body.reviews-content-body
                    .text 교내배달 되긴한데 한마리 세트는 안해주시고 두마리세트 부터 해주십니다
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    navbar: Navbar,
  },
}
</script>

<style scoped lang="scss">
$store-detail-title-height: 4rem;

.icon-favorite {
  color: $gray-300;

  &.primary {
    color: $primary;
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