CREATE TABLE activities (
id_service INT,
id_activity INT,
name_activity VARCHAR(50) NOT NULL,
cost FLOAT,
descriptions VARCHAR(200),
PRIMARY KEY (id_service, id_activity),
CONSTRAINT fk_activities_services FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE ON UPDATE CASCADE,
);