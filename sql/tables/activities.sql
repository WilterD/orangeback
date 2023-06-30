CREATE TABLE activities (
id_service INT NOT NULL,
id_activity INT NOT NULL UNIQUE,
cost FLOAT NOT NULL,
descriptions VARCHAR(200) NOT NULL,
PRIMARY KEY (id_service, id_activity),
CONSTRAINT fk_activities_services FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE ON UPDATE CASCADE
);