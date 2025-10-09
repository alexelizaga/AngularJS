(function () {
  'use strict';
  angular.module('app').controller('FormsCtrl', function () {
    const vm = this;
    vm.user = {};
    vm.submit = () => alert(`Enviado: ${vm.user.name}`);
  });
})();