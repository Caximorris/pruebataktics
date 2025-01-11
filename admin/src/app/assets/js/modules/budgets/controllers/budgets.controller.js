import angular from "angular";

export default class BudgetController {
  constructor($state, Budget) {
    this.$state = $state;
    this.Budget = Budget;
    this.budgets = [];
    this.filters = {
      name: '',
      client: '',
      from: null,
      to: null,
    };
    this.getBudgets();
  }

  getBudgets() {
    const filters = {
      name: { like: `%${this.filters.name}%` },
      client: { like: `%${this.filters.client}%` },
      date: {
        between: [
          this.filters.from || 0,
          this.filters.to || Date.now()
        ],
      },
    };
    this.Budget.find({ filter: { where: filters } }).$promise
      .then(data => {
        this.budgets = data;
      })
      .catch(error => {
        console.error('Error loading budgets', error);
      });
  }

  deleteBudget(id) {
    if (confirm('Are you sure you want to delete this budget?')) {
      this.Budget.deleteById({ id }).$promise
        .then(() => {
          this.getBudgets();
        })
        .catch(error => {
          console.error('Error deleting budget', error);
        });
    }
  }

  createBudget() {
    this.$state.go('budget-details', { id: 'new' });
  }

  editBudget(id) {
    this.$state.go('budget-details', { id });
  }
}

BudgetController.$inject = ['Budget', '$state'];