const mysql = require('mysql');
const inquirer = require('inquirer');
const fs = require('fs');

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

//VARIABLES
let menuChoice = '';

// FUNCTIONS

const runBamazon = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'menu_options',
            message: 'Choose your option',
            choices: [
                'View Products For Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product'
            ]
        }).then(answer => {
            switch (answer.menu_options) {
                case 'View Products For Sale':
                    viewProducts();
                break;
                case 'View Low Inventory':
                    //if product inventory is low... 
                break;
            }
        })
}

const viewProducts = () => {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log(`\n PRODUCT INVENTORY \n`);
        for (var i = 0; i < res.length; i++) {
            console.log(`
                Product ID: ${res[i].item_id}
                Product Name: ${res[i].product_name}
                Product Department: ${res[i].department_name}
                Product Price: ${res[i].price}
                Product Quantity: ${res[i].stock_quantity}`);
        }
    })
};

runBamazon();