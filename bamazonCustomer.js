const mysql = require('mysql');
const fs = require('fs');
const inquirer = require('inquirer');

var departments = [];

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
    runBamazon();
});

function runBamazon() {
    console.log(`
    Welcome to Bamazon! Let's Get Shopping! \n
    `); 
    connection.query('SELECT department_name FROM products GROUP BY department_name', function (err, res) {
        // console.log(res);
        if (err) throw err;
        // Log all results of the SELECT statement
    inquirer
        .prompt({
            type: 'list',
            name: 'department_choice',
            message: 'Choose your department',
            choices: function(){
                var departmentArray = [];
                for (var i = 0; i < res.length; i++) {
                    departmentArray.push(res[i].department_name);
                } 
                return departmentArray;
            }
        })
        .then(answer => {
            connection.query('SELECT * FROM PRODUCTS WHERE ?', {department_name: answer.department_choice}, function(err, res){
                if(err) throw(err);
                inquirer
                    .prompt({
                        type: 'list',
                        name: 'item_choice',
                        message: 'Which item do you want?',
                        choices: function(){
                            var itemArray = [];
                            for (var i = 0; i < res.length; i++){
                                itemArray.push(res[i].product_name);
                            }
                            return itemArray;
                        }
                    }).then(answer => {
                        inquirer
                            .prompt({
                                type: 'input',
                                name:'quantity_choice',
                                message: 'How many of this item do you want?'
                            }).then(answer => {
                                var newQuantity = parseInt(answer.quantity_choice);
                                connection.query('UPDATE products SET ? WHERE ?', [
                                    {
                                        stock_quantity : answer.stock_quantity - newQuantity
                                    },
                                    {
                                        product_name : answer.item_choice
                                    }
                                ])

                                console.log(
                                    `new quantity: ${stock_quantity}`
                                )
                            })
                    })
            })
        });
    });
}


const purchasePrompt = () => {
    inquirer
        .prompt({
            name: 'id',
            type: 'input',
            message: 'What is the item ID of the product you would like to purcahse?'
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'How many would you like to purcahse?'
        }
    
        ).then({

        })


}

// 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.