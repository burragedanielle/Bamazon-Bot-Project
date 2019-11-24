const mysql = require('mysql');
const fs = require('fs');
const inquirer = require('inquirer');

// CONNECTING NODE TO SQL 

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
});

// VARIABLES

let itemChoice = '';
let departmentChoice = '';
let quantityChoice = 0;
let currentStock = 0;
let newStock = 0;
let cart = [];
let total = 0;

// FUNCTIONS

const runBamazon = () => {
    console.log(` Welcome to Bamazon! Let's Get Shopping! \n`);
    fetchDepartment();
}

const fetchDepartment = () => {
    connection.query('SELECT department_name FROM products GROUP BY department_name', function (err, res) {
        if (err) throw err;

        inquirer
            .prompt({
                type: 'list',
                name: 'department_choice',
                message: 'Choose your department',
                choices: () => {
                    var departmentArray = [];
                    for (var i = 0; i < res.length; i++) {
                        departmentArray.push(res[i].department_name);
                    }
                    return departmentArray;
                }
            })
            .then(answer => {
                departmentChoice = answer.department_choice;
                fetchProducts();
            });
    })
}

const fetchProducts = () => {
    connection.query('SELECT * FROM products WHERE ?', { department_name: departmentChoice }, function (err, res) {
        if (err) throw err;
        inquirer
            .prompt({
                type: 'list',
                name: 'item_choice',
                message: 'Which item would you like to purchase?',
                choices: () => {
                    let itemArray = [];
                    for (var i = 0; i < res.length; i++) {
                        itemArray.push(res[i].product_name);
                    }
                    return itemArray;
                }
            }).then(answer => {
                itemChoice = answer.item_choice;
                buyProducts();
            })
    })
};

const buyProducts = () => {
    connection.query('SELECT * FROM products WHERE ?', { product_name: itemChoice }, function (err, res) {
        if (err) throw err;
        inquirer
            .prompt({
                type: 'input',
                name: 'quantity_choice',
                message: 'How many of this item would you like to buy?',
            }).then(answer => {
                quantityChoice = parseInt(answer.quantity_choice);
                currentStock = res[0].stock_quantity;
                newStock = currentStock -= quantityChoice;

                // ENOUGH STOCK?
                if (newStock <= 0) {
                    console.log(`Sorry there is not enough of ${itemChoice} in stock!`);
                    continueShopping();

                } else {
                    // PLURAL OR SINGULAR
                    if (quantityChoice <= 1) {
                        console.log(`Success! You purchased ${quantityChoice} ${itemChoice}`);
                    } else {
                        console.log(`Success! You purchased ${quantityChoice} ${itemChoice}s`);
                    }

                    cart.push(itemChoice + ' ' + quantityChoice + ' ');
                    total += (res[0].price * quantityChoice);
                    console.log(`
                        Your cart: ${cart}
                        Your total: $${total}`);

                    connection.query('UPDATE products SET ? WHERE ?', [
                        {
                            stock_quantity: newStock
                        },
                        {
                            product_name: itemChoice
                        }
                    ])
                    
                    continueShopping();
                }
            })
    })
};

const continueShopping = () => {
    inquirer
        .prompt({
            type: 'confirm',
            name: 'continue_shopping',
            message: 'Would you like to continue shopping?',
            default: false
        }).then(answer => {
            if (answer.continue_shopping === true) {
                fetchDepartment();
            }

            else if (answer.continue_shopping === false) {
                console.log(`
                \n Thank You For Shopping At Bamazon! \n
                Your total: $${total}`);
                connection.end();
            };
        });
};

runBamazon();
