DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(10),
	department_name VARCHAR(10),
	price DECIMAL(10, 2),
	stock_quantity INTEGER(100),
	PRIMARY KEY (item_id)
)

SELECT * FROM bamazon_db.products

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pokémon Sword", "Video Games", '50', '200');

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pokémon Shield", "Video Games", "50", "250");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Legend Of Zelda", "Video Games", "23", "200");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stardew Valley", "Video Games", "32", "400");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kingdom Hearts III", "Video Games", "50", "140");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Penguin Food", "Pets", "10", "200");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "Pets", "7", "200");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Food", "Pets", "5", "200");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Llama Food", "Pets", "15", "200");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Premium Dog Leash", "Pets", "10", "200");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Regular Dog Leash", "Pets", "5", "200");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Women's Tennis Skirt", "Clothing", "25", "150");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Women's Winter Coat", "Clothing", "30", "150");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Men's Winter Coat", "Clothing", "30", "150");







