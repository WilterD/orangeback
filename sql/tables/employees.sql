CREATE TABLE employees (
dni_employees VARCHAR(15) NOT NULL,
employee_name VARCHAR(50) NOT NULL,
id_charge VARCHAR(50),
tlf_employee VARCHAR(15),
addres_employee VARCHAR(50),

PRIMARY KEY (dni_employees),

FOREIGN KEY (id_charge) REFERENCES charges(id_charge) ON DELETE CASCADE ON UPDATE CASCADE

);