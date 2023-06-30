CREATE TABLE managers (
dni_manager VARCHAR(15),
name_manager VARCHAR(50) NOT NULL,
tlf_main VARCHAR(15) NOT NULL,
tlf_secondary VARCHAR(15) NOT NULL,
address_manager VARCHAR(50) NOT NULL,
mail_manager VARCHAR(50) NOT NULL,
id_charge VARCHAR(20) NOT NULL,

PRIMARY KEY (dni_manager),

FOREIGN KEY (id_charge) REFERENCES charges(id_charge) ON DELETE CASCADE ON UPDATE CASCADE
);