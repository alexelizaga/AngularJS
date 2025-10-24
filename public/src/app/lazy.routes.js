import { defineLazyPage } from '../ui/definePage.js';
const ng = angular.module('app');

function addRoute(path, loader, tag) {
  defineLazyPage(ng, path, loader, tag);
}

addRoute('/',   () => import('../pages/Home/Home.page.js'), 'home-page');
addRoute('/forms',   () => import('../pages/Forms/Forms.page.js'), 'forms-page');
addRoute('/url/:id?', () => import('../pages/Url/Url.page.js'), 'url-page');
addRoute('/lists', () => import('../pages/List/List.page.js'), 'list-page');
addRoute('/details/:id?', () => import('../pages/Details/Details.page.js'), 'details-page');
addRoute('/http', () => import('../pages/Http/Http.page.js'), 'http-page');
