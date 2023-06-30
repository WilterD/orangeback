CREATE TABLE card_banks (
  card_number VARCHAR(32),
  bank VARCHAR(32) NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (card_number),
  CONSTRAINT fk_card_number FOREIGN KEY (card_number) REFERENCES payments(card_number) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);