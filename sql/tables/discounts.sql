CREATE TABLE discounts (
id_discount INT PRIMARY KEY,
services_min INT,
services_max INT,
percentages FLOAT,
rif_agency VARCHAR(15),
FOREIGN KEY (rif_agency) REFERENCES agency(rif_agency) ON DELETE CASCADE ON UPDATE CASCADE
);