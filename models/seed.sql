
insert into usertables
    (gID, name, email, password, zipcode, thumbnail, createdAt, updatedAt)
values
    ( '3', 'tony', 'tg@gmail', '12345', '95618', '', '2008-01-01 00:00:01', '2008-01-01 00:00:01' );

INSERT INTO postTables
    ( title, body, category, expired, expirationDate, createdAt, updatedAt, userTableId)
Values('tggmail', 'coding', 'sales', false, '2008-01-01 00:00:01', '2008-01-01 00:00:01', '2008-01-01 00:00:01', 1);

INSERT INTO postTables
    ( title, body, category, expired, expirationDate, createdAt, updatedAt, userTableId)
Values('tggmail2', 'coding2', 'sales2', false, '2008-01-01 00:00:01', '2008-01-01 00:00:01', '2008-01-01 00:00:01', 2);

INSERT INTO postTables
    ( title, body, category, expired, expirationDate, createdAt, updatedAt, userTableId)
Values('tggmail3', 'codin3g', 'sales3', false, '2008-01-01 00:00:01', '2008-01-01 00:00:01', '2008-01-01 00:00:01', 3);

INSERT INTO commentTables
    (body, createdAt, updatedAT userTableId)
Values('coding', '2008-01-01 00:00:01', '2008-01-01 00:00:01', 1);


