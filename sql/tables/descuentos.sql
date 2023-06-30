CREATE TABLE descuentos (
id_descuento INT PRIMARY KEY,
services_min INT,
services_max INT,
porcentaje FLOAT,
rif_agency VARCHAR(15),
FOREIGN KEY (rif_agency) REFERENCES agency(rif_agency) ON DELETE CASCADE ON UPDATE CASCADE
);