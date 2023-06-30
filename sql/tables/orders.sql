CREATE TABLE orders (
id_order INT NOT NULL,
dni_responsible VARCHAR(15) NOT NULL,
name_responsible VARCHAR(50) NOT NULL,
entry_date DATE NOT NULL,
entry_time TIME NOT NULL,
estimated_departure_date DATE NOT NULL,
estimated_departure_time TIME NOT NULL,
actual_departure_date DATE,                          
actual_departure_time TIME,
id_reserve INT,
dni_worker VARCHAR(15),
id_service INT NOT NULL,

PRIMARY KEY (id_order),

FOREIGN KEY (id_reserve) REFERENCES reservas(id_reserve) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (dni_worker) REFERENCES trabajadores(dni_worker) ON DELETE CASCADE ON UPDATE CASCADE
);