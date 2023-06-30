CREATE TABLE models (
id_model VARCHAR(50),
brand VARCHAR(50) NOT NULL,
brand_name VARCHAR(50) NOT NULL,
model_kg INT NOT NULL,
model_year INT NOT NULL,
refrigerant_type VARCHAR(50) NOT NULL,
number_posts INT NOT NULL,
engine_oil_type VARCHAR(50) NOT NULL,
oil_box VARCHAR(50) NOT NULL,
octane INT NOT NULL,

PRIMARY KEY (id_model)
);