var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,

        user: 'root',

        password: '',
        database: 'Bamazon'


});

function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
            return true;
    } else {
            return 'Please enter a whole non-zero number.';
    }
    
}
function promptUserPurchase() {
        inquirer.prompt([
                {
                        type: 'input',
                        name: 'item_id',
                        message: 'Please enter the Item ID associated with the product you are interested in.',
                        validate: validateInput,
                        filter: Number
                }  
        ]).then(function(input) {
                var item = input.item_id;
                var quantity = input.quantity;

                var queryStr = 'Select * FROM products Where ?';
                connection.query(queryStr, {item_id: item}, function(err, data {
                        if (err) throw err;
                        if (data.length === 0) {
                            console.log('ERROR: This is not an item. Choose an existing Item Id.');
                            displayInventory();
                        } else {
                                var productData = data[0];
                                if (quantity <= productData.stock_quantity) {
                                    console.log('Ordering the Item...');
                                    var updateQueryStr = 'UPDATE product SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                                    connection.query(updateQueryStr, function(err, data) {
                                            if (err) throw err;

                                            console.log('Order placed. Amount due: $' productData.price * quantity);
                                            console.log('Have a great day');
                                            
                                            connection.end();
                                    })
                            } else {
                                    console.log('We're out of these products')
                                    console.log('Try buying something else.');

                                    displayInventory();
                            }
                        }
                })
        })
}