CREATE TABLE agency (
rif_agency VARCHAR(20) NOT NULL,
business_name VARCHAR(50) NOT NULL,
name_agency VARCHAR(50) NOT NULL,
id_city int NOT NULL,
dni_manager VARCHAR(15) NOT NULL,

PRIMARY KEY (rif_agency),

FOREIGN KEY (dni_manager) REFERENCES managers(dni_manager) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_city) REFERENCES citys(id_city) ON DELETE CASCADE ON UPDATE CASCADE
);