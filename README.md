# DissertationApplication

INSERT INTO priorities (pathogen_id, priority) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9);


CREATE TABLE priorities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pathogen_id INT NOT NULL,
    priority INT NOT NULL,
    CONSTRAINT fk_pathogen FOREIGN KEY (pathogen_id) REFERENCES pathogens(id)
);


ALTER TABLE cleaning_timings
ADD COLUMN duration VARCHAR(100) NOT NULL;
