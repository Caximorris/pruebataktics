import angular from 'angular';
import budgetListUrl from './views/budgets.list.html';
import budgetDetailsUrl from './templates/budget-details.html';
import BudgetController from './controllers/budgets.controller.js';
import BudgetDetailsController from './controllers/budget-details.controller.js';


export default angular.module('app.budgets-list', [])
  .config(routeConfig)
  .name;

function routeConfig($stateProvider) {
  $stateProvider
    .state('budgets', {
      url: '/budgets',
      templateUrl: budgetListUrl,
      controller: BudgetController,
      controllerAs: 'vm',
    })
    .state('budget-details', {
      url: '/budgets/:id?', 
      templateUrl: budgetDetailsUrl,
      controller: BudgetDetailsController,
      controllerAs: 'vm',
    });
}

routeConfig.$inject = ['$stateProvider'];