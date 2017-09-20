import Vue from 'vue'
import Router from 'vue-router'
import Room from '@/pages/room/Room'
import Members from '@/pages/members/Members'

Vue.use(Router)

export default new Router({
  	routes: [
	    {
	      	path: '/',
	      	name: 'room',
	      	component: Room
	    },
	    {
	      	path: '/members',
	      	name: 'members',
	      	component: Members
	    }
  	]
})
