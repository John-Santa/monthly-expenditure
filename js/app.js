//Variables y selectores
const form = document.getElementById('agregar-gasto');
const expensesList = document.querySelector('#gastos ul');

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

    addExpense(expense) {
        this.expenses = [...this.expenses, expense];
        this.calculateRemaining();
    }

    calculateRemaining() {
        this.remaining = this.budget - this.expenses.reduce((acumulate, expense) => acumulate + expense.expenseAmount, 0);
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

    addExpense = (expenses) => {
        //Limpiar lista
        this.cleanHTML();
        expenses.forEach(expense => {
            const { expenseName, expenseAmount, id } = expense;
            const newExpense = document.createElement('li');
            newExpense.className = 'list-group-item d-flex justify-content-between align-items-center';
            //Alternativa para no usar setAttribute
            newExpense.dataset.id = id;
            newExpense.innerHTML = `
                ${expenseName}
                <span class="badge badge-primary badge-pill">$ ${expenseAmount}</span>
            `;

            const deleteExpense = document.createElement('button');
            deleteExpense.innerHTML = 'Borrar &times;';
            deleteExpense.classList.add('btn', 'btn-danger', 'borrar-gasto');
            newExpense.appendChild(deleteExpense);

            expensesList.appendChild(newExpense);
        });
    }

    updateRemaining = (remaining) => {
        document.querySelector('#restante').textContent = remaining;
    }

    cleanHTML = () => {
        while (expensesList.firstChild) {
            expensesList.removeChild(expensesList.firstChild);
        }
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
    const expenseName = document.getElementById('gasto').value;
    const expenseAmount = Number(document.getElementById('cantidad').value);

    if (expenseName === '' || expenseAmount === '' || isNaN(expenseAmount) || expenseAmount <= 0) {
        UI.printAlert('Ambos campos son obligatorios y la cantidad debe ser mayor a 0', 'error');
        return;
    }else {
        UI.printAlert('Gasto agregado correctamente', 'success');
    }
    //Generar objeto de gasto
    const expense = { expenseName, expenseAmount, id: Date.now() };
    budget.addExpense(expense);
    const { expenses, remaining } = budget;
    UI.addExpense(expenses);
    UI.updateRemaining(remaining);
    form.reset();

}




//Inicializar
eventListeners();