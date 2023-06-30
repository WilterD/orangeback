CREATE TABLE reserves (
id_reserve INT NOT NULL,
date_exped DATE NOT NULL,
date_expir DATE NOT NULL,
dni_client VARCHAR(15),
plate VARCHAR(10) NOT NULL,
hour TIME NOT NULL,

PRIMARY KEY (id_reserve),

CONSTRAINT fk_reserves_clients FOREIGN KEY (dni_client) REFERENCES clients(dni_client) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_reserves_vehiculos FOREIGN KEY (plate) REFERENCES vehicles(plate) ON DELETE CASCADE ON UPDATE CASCADE
);