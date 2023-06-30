CREATE TABLE bills (
id_bill INT,
date_bill DATE,
discount_value INT NOT NULL,
total_amount DECIMAL(10, 2),
id_order INT,

PRIMARY KEY (id_bill),

FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE ON UPDATE CASCADE
);