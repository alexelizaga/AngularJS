import { defineLazyPage } from '../ui/definePage.js';
const ng = angular.module('app');

function addRoute(path, loader, tag) {
  defineLazyPage(ng, path, loader, tag);
}

addRoute('/',   () => import('../pages/Home/Home.page.js'), 'home-page');
addRoute('/forms',   () => import('../pages/Forms/Forms.page.js'), 'forms-page');
addRoute('/react', () => import('../pages/ReactDemo/ReactDemo.page.js'), 'react-page');
addRoute('/eje-02', () => import('../pages/Eje02/Eje02.page.js'), 'eje-02-page');
addRoute('/url/:id?', () => import('../pages/Url/Url.page.js'), 'url-page');
addRoute('/lists', () => import('../pages/List/List.page.js'), 'list-page');
addRoute('/http', () => import('../pages/Http/Http.page.js'), 'http-page');
