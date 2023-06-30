CREATE TABLE brands (
id_brand INT,
name_brand VARCHAR(50) NOT NULL,
PRIMARY KEY (id_brand)
);

CREATE TABLE clients (
dni_client VARCHAR(15),
name_client VARCHAR(50) NOT NULL,
tlf_main VARCHAR(15),
tlf_secondary VARCHAR(15),
mail_client VARCHAR(50),

PRIMARY KEY (dni_client)

);

CREATE TABLE charges (
id_charge VARCHAR(20) NOT NULL,
descriptions VARCHAR(50) NOT NULL,

PRIMARY KEY (id_charge)

);