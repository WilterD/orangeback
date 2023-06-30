CREATE TABLE workers (
    dni_worker VARCHAR(15),
    worker_name VARCHAR(50) NOT NULL,
    tlf_worker VARCHAR(15),
   address_worker VARCHAR(50),
    salary int NOT NULL,
    id_charge VARCHAR(50) NOT NULL,

    PRIMARY KEY (dni_worker),



    FOREIGN KEY (id_charge) REFERENCES charges(id_charge) ON DELETE RESTRICT ON UPDATE CASCADE


);