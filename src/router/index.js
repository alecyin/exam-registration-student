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
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
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
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
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
