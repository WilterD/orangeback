CREATE TABLE is_recommended (
codigo_modelo VARCHAR(50) NOT NULL,
id_servicio INT NOT NULL,
mileage INT NOT NULL,
time_use INT NOT NULL

PRIMARY KEY (codigo_modelo, id_servicio),

CONSTRAINT fk_modelo_recommended FOREIGN KEY (codigo_modelo) REFERENCES modelos(codigo_modelo) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_servicio_recommended FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio) ON DELETE CASCADE ON UPDATE CASCADE

);