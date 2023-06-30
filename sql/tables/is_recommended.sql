CREATE TABLE is_recommended (
id_model VARCHAR(50) NOT NULL,
id_service INT NOT NULL,
mileage INT NOT NULL,
time_use INT NOT NULL,

PRIMARY KEY (id_model, id_service),

CONSTRAINT fk_modelo_recommended FOREIGN KEY (id_model) REFERENCES models(id_model) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_servicio_recommended FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE ON UPDATE CASCADE

);