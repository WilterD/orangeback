CREATE TABLE bills (
id_bill INT PRIMARY KEY,
date_bill DATE,
discount_value INT NOT NULL,
total_amount DECIMAL(10, 2),
id_order INT,
FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE ON UPDATE CASCADE
);