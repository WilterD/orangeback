CREATE TABLE products (
id_product INT,
product_code VARCHAR(50) NOT NULL,
short_name_product VARCHAR(50) NOT NULL,
descriptions VARCHAR(255) NOT NULL,
supplier VARCHAR(50),
is_ecology BOOLEAN,
price DECIMAL(10, 2),
existence INT,
level_min INT,
level_max INT,

PRIMARY KEY (id_product)
);