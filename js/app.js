//Variables y selectores
const form = document.getElementById('agregar-gasto');
const expensesList = document.getElementById('gastos-ul');

//Eventos
const eventListeners = () => {
    document.addEventListener('DOMContentLoaded', askBudget);
    form.addEventListener('submit', addExpense);
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

    printAlert = (message, type) => {
        const div = document.createElement('div');
        if (type === 'error') {
            div.classList.add('alert-danger');
        } else {
            div.classList.add('alert-success');
        }
        div.classList.add('text-center','alert', 'mt-4');
        div.textContent = message;
        document.querySelector('.primario').insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.primario').removeChild(div);
        }, 3000);
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

const addExpense = (e) => {
    e.preventDefault();
    const expense = document.getElementById('gasto').value;
    const expenseAmount = document.getElementById('cantidad').value;

    if (expense === '' || expenseAmount === '' || isNaN(expenseAmount) || expenseAmount <= 0) {
        UI.printAlert('Ambos campos son obligatorios y la cantidad debe ser mayor a 0', 'error');
        return;
    }else {
        UI.printAlert('Gasto agregado correctamente', 'success');
    }

}




//Inicializar
eventListeners();