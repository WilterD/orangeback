CREATE TABLE employees (
  employee_dni VARCHAR(15) NOT NULL,
  name dom_name,
  phone VARCHAR(16) NOT NULL,
  address VARCHAR(64) NOT NULL,
  salary FLOAT NOT NULL,
  agency_rif INTEGER NOT NULL,
  job_id INTEGER NOT NULL,
  PRIMARY KEY (employee_dni),
  CONSTRAINT fk_agency_rif FOREIGN KEY (agency_rif) REFERENCES agencies(agency_rif) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_job_id FOREIGN KEY (job_id) REFERENCES jobs(job_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
