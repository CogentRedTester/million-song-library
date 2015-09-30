export default function libraryRoute($stateProvider){
  'ngInject';

  $stateProvider.state(
    'msl.library', {
      url: '/my-library',
      template: require('./library.html'),
      controller: 'libraryCtrl',
      controllerAs: 'vm',
      title: 'My Library',
    });
}
