import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/Recommend/recommend'
import Singer from 'components/Singer/singer'
import Search from 'components/Search/search'
import Rank from 'components/Rank/rank'
import SingerDetail from 'components/singer-detail/singer-detail'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/recommend'
    },

    {
        path: '/recommend',
        name: 'Recommend',
        component: Recommend
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
        component: Search
    },
    {
        path: '/rank',
        name: 'Rank',
        component: Rank
    }
    ]
})