CREATE TABLE jobs (
  job_id INTEGER GENERATED ALWAYS AS IDENTITY,
  description VARCHAR(64) NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (job_id)
);
