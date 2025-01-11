export default class BudgetDetailsController {
  constructor($stateParams, BudgetService, $state) {
    this.$stateParams = $stateParams;
    this.BudgetService = BudgetService;
    this.isNew = $state.params.id === 'new';
    this.budgetId = $stateParams.id;

    if (this.budgetId) {
      this.loadBudget();
    } else {
      this.budget = { name: '', amount: 0, description: '' };
    }
  }

  loadBudget() {
    this.BudgetService.getBudgetById(this.budgetId)
      .then((budget) => {
        this.budget = budget;
      })
      .catch((err) => {
        console.error('Error al cargar el presupuesto:', err);
      });
  }

  saveBudget() {
    if (this.budgetId) {
      this.BudgetService.updateBudget(this.budgetId, this.budget)
        .then(() => {
          console.log('Presupuesto actualizado con éxito');
        });
    } else {
      this.BudgetService.createBudget(this.budget)
        .then(() => {
          console.log('Presupuesto creado con éxito');
        });
    }
  }
}

BudgetDetailsController.$inject = ['$stateParams', 'BudgetService'];