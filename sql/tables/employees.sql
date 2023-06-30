CREATE TABLE employees (
  employee_dni dom_dni NOT NULL,
  name dom_name NOT NULL,
  phone dom_phone_number NOT NULL,
  address VARCHAR(64) NOT NULL,
  salary FLOAT NOT NULL,
  agency_rif dom_agency_rif NOT NULL,
  job_id INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (employee_dni),
  CONSTRAINT fk_agency_rif FOREIGN KEY (agency_rif) REFERENCES agencies(agency_rif) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_job_id FOREIGN KEY (job_id) REFERENCES jobs(job_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
