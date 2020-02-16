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
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
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
                    meta: { title: '报名信息查看' }
                },
                {
                    path: '/student',
                    component: () => import(/* webpackChunkName: "student" */ '../components/page/Student.vue'),
                    meta: { title: '学生管理' }
                },
                {
                    path: '/admin',
                    component: () => import(/* webpackChunkName: "admin" */ '../components/page/Admin.vue'),
                    meta: { title: '管理员管理' }
                },
                {
                    path: '/site',
                    component: () => import(/* webpackChunkName: "site" */ '../components/page/Site.vue'),
                    meta: { title: '考点管理' }
                },
                {
                    path: '/major',
                    component: () => import(/* webpackChunkName: "major" */ '../components/page/Major.vue'),
                    meta: { title: '专业管理' }
                },
                {
                    path: '/subject',
                    component: () => import(/* webpackChunkName: "subject" */ '../components/page/Subject.vue'),
                    meta: { title: '科目管理' }
                },
                {
                    path: '/examinee-note',
                    component: () => import(/* webpackChunkName: "examinee-notes" */ '../components/page/ExamineeNote.vue'),
                    meta: { title: '准考证注意事项' }
                },
                {
                    path: '/exam',
                    component: () => import(/* webpackChunkName: "exam" */ '../components/page/Exam.vue'),
                    meta: { title: '专业考试管理' }
                },
                {
                    path: '/exam-subject',
                    component: () => import(/* webpackChunkName: "exam-subject" */ '../components/page/ExamSubject.vue'),
                    meta: { title: '科目考试管理' }
                },
                {
                    path: '/order',
                    component: () => import(/* webpackChunkName: "order" */ '../components/page/Order.vue'),
                    meta: { title: '缴费管理' }
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
            path: '*',
            redirect: '/404'
        }
    ]
});
