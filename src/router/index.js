import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/Recommend/recommend'
import Singer from 'components/Singer/singer'
import Search from 'components/Search/search'
import Rank from 'components/Rank/rank'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'
import TopList from 'components/top-list/top-list'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/recommend'
    },

    {
        path: '/recommend',
        name: 'Recommend',
        component: Recommend,
        children: [
          {
            path: ':id',
            component: Disc
          }
        ]
    },
    {
        path: '/singer',
        component: Singer,
        children: [
            {
                path: ':id',
                component: SingerDetail
            }
        ]
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        children: [
            {
                path: ':id',
                component: SingerDetail
            }
        ]
    },
    {
        path: '/rank',
        name: 'Rank',
        component: Rank,
        children: [
          {
            path: ':id',
            component: TopList
          }
        ]
    }
    ]
})
