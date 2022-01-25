BEGIN;

DROP TABLE IF EXISTS trains, stations, admins CASCADE;

CREATE TABLE trains (
  id SERIAL PRIMARY KEY,
  train_number SERIAL NOT NULL,
  driver VARCHAR(255),
  stations INTEGER [],
  passenger_number INTEGER
);

CREATE TABLE stations(
    id SERIAL PRIMARY KEY,
    station_name VARCHAR(255),
    location VARCHAR(255),
    all_trains INTEGER [],
    start_at TIME,
    end_at TIME
);

CREATE TABLE admins(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    title VARCHAR(255)
);

INSERT INTO trains(train_number, driver, stations, passenger_number) VALUES 
(1, 'mahmoud', ARRAY [1, 2], 200),
(2, 'shireen', ARRAY [1, 5], 300),
(3, 'raneen', ARRAY [2, 3], 200),
(4, 'mario', ARRAY [1, 2, 3, 4, 5], 350),
(5, 'julian', ARRAY [4, 3], 200),
(6, 'thaer', ARRAY[5, 3], 300),
(7, 'doaa', ARRAY[4, 1], 200),
(8, 'asraa', ARRAY[4, 5], 300),
(9, 'ahmed', ARRAY[1, 3], 200);

INSERT INTO stations(station_name, location, all_trains, start_at, end_at) VALUES
('webAhead9', 'haifa', ARRAY[1, 2, 4, 7, 9], '09:00:00', '22:00:00'),
('webAhead10', 'tel-aviv', ARRAY[1, 3, 4], '09:00:00', '20:00:00'),
('webAhead11', 'jerusalem', ARRAY[3, 4, 5, 6, 9], '06:30:00', '23:00:00'),
('webAhead12', 'be`ersheva', ARRAY[5, 7, 8], '07:00:00', '22:00:00'),
('webAhead13', 'akko', ARRAY[2, 4, 6, 8], '09:00:00', '22:00:00');

INSERT INTO admins(username, password, title) VALUES
('saleh', 'saleh1234', 'manager'),
('riham', 'riham1234', 'co-manager');


COMMIT;
