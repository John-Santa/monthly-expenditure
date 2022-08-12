//Variables y selectores
const form = document.getElementById('agregar-gasto');
const expensesList = document.getElementById('gastos-ul');

//Eventos
const eventListeners = () => {
    document.addEventListener('DOMContentLoaded', askBudget);
}

//Clases
class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.remaining = Number(budget);
        this.expenses = [];
    }
}

class Ui {
    addBudget = ({ budget, remaining }) => {
        document.getElementById('total').textContent = budget;
        document.getElementById('restante').textContent = remaining;
    }
}

const UI = new Ui();
let budget;

//Funciones
const askBudget = () => {
    const userBudget = prompt('Cual es tu presupuesto mensual?');

    if (userBudget === null || userBudget === '' || isNaN(userBudget) || userBudget <= 0) {
        window.location.reload();
    }
    budget = new Budget(userBudget);
    UI.addBudget(budget);

}




//Inicializar
eventListeners();