CREATE TABLE pays (
id_pay INT,
id_bill INT NOT NULL,
pay_date DATE NOT NULL,
payment_method VARCHAR(50) NOT NULL,
amount DECIMAL(10, 2) NOT NULL,
card_number VARCHAR(20),
bank_card VARCHAR(50),

PRIMARY KEY (id_pay),

CONSTRAINT fk_pays_factura FOREIGN KEY (id_bill) REFERENCES bills(id_bill) ON DELETE CASCADE ON UPDATE CASCADE
);