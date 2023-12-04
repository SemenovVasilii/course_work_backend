
create TABLE _user(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    surname VARCHAR,
    email VARCHAR,
    password VARCHAR,
    role VARCHAR,
    avatar VARCHAR,
    vehicle_id INTEGER
);

create TABLE drive(
    id SERIAL PRIMARY KEY,
    passenger_id INTEGER,
    driver_id INTEGER,
    cost DECIMAL,
    departure VARCHAR,
    destination VARCHAR,
    description VARCHAR
);

create TABLE vehicle(
    id SERIAL PRIMARY KEY,
    model VARCHAR,
    number VARCHAR,
    color VARCHAR
);

alter table drive
    add constraint drive__user_id_fk
        foreign key (driver_id) references _user;

alter table drive
    add constraint passenger__user_id_fk
        foreign key (passenger_id) references _user;

alter table _user
    add constraint vehicle__user_id_fk
        foreign key (vehicle_id) references vehicle;