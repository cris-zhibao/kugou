import Vue from 'vue'
import Router from 'vue-router'
import nav from '@/components/nav'

import newSong from './views/newSong.vue'
import rank from './views/rank'
import singer from './views/singer'

import goBack from '@/components/goBack'

import search from './views/search'

import singerList from './views/singerList'
import singerInfo from './views/singerinfo'

Vue.use(Router)


export const navData =[
  {
    path: '/',
    name: 'newSong',
    title:'新歌',
    components:{
      default:newSong,
      navBar:nav
    }
  },
  {
    path: '/rank',
    name: 'rank',
    title:'排行',
    components:{
      default:rank,
      navBar:nav
    }
  },
  {
    path: '/singer',
    name: 'singer',
    title:'歌手',
    components:{
      default:singer,
      navBar:nav
    }
  }
];



export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...navData,
    {
      path:'/search',
      name:'Search',
      components:{
        navBar:goBack,
        default:search
      }
    },
    {
      path:'/singer/singerlist/:id',
      name:'SingerList',
      components:{
        navBar:goBack,
        default:singerList
      }
    },
    {
      path:'/singer/singerlist/singerinfo/:singerid',
      name:'singerInfo',
      components:{
        navBar:goBack,
        default:singerInfo
      }
    }
  ]
})
