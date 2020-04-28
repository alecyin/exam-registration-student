import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/announcement',
                    component: () => import(/* webpackChunkName: "announcement" */ '../components/page/Announcement.vue'),
                    meta: { title: '通知公告' }
                },
                {
                    path: '/info',
                    component: () => import(/* webpackChunkName: "info" */ '../components/page/Info.vue'),
                    meta: { title: '个人资料' }
                },
                {
                    path: '/announcement/:id',
                    component: () => import(/* webpackChunkName: "announcementDetail" */ '../components/page/AnnouncementDetail.vue'),
                    meta: { title: '通知公告详情' }
                },
                {
                    path: '/photo',
                    component: () => import(/* webpackChunkName: "photo" */ '../components/page/Photo.vue'),
                    meta: { title: '照片上传' }
                },
                {
                    path: '/apply',
                    component: () => import(/* webpackChunkName: "apply" */ '../components/page/Apply.vue'),
                    meta: { title: '网上报名' }
                },
                {
                    path: '/apply-info',
                    component: () => import(/* webpackChunkName: "applyInfo" */ '../components/page/ApplyInfo.vue'),
                    meta: { title: '报名信息查看' }
                },
                {
                    path: '/pay',
                    component: () => import(/* webpackChunkName: "pay" */ '../components/page/Pay.vue'),
                    meta: { title: '网上缴费' }
                },
                {
                    path: '/download-ticket',
                    component: () => import(/* webpackChunkName: "ticket" */ '../components/page/Ticket.vue'),
                    meta: { title: '下载准考证' }
                },
                {
                    path: '/ticket-detail/:id',
                    component: () => import(/* webpackChunkName: "ticketDetail" */ '../components/page/TicketDetail.vue'),
                    meta: { title: '准考证详情' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/reg',
            component: () => import(/* webpackChunkName: "reg" */ '../components/page/Reg.vue'),
            meta: { title: '注册' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
