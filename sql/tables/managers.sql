CREATE TABLE managers (
dni_manager VARCHAR(15),
name_manager VARCHAR(50) NOT NULL,
tlf_main VARCHAR(15),
tlf_secondary VARCHAR(15),
address_manager VARCHAR(50),
mail_manager VARCHAR(50),
id_charge INT,

PRIMARY KEY (dni_manager),

FOREIGN KEY (id_charge) REFERENCES charges(id_charge) ON DELETE CASCADE ON UPDATE CASCADE
);