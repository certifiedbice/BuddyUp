BEGIN;

TRUNCATE
	users
RESTART IDENTITY CASCADE;

INSERT INTO users (username, name, password, zipcode)
VALUES
	('user1', 'jake todd', '$2a$12$rBPNvTQEbYVNp2/pIzKFJO4f8NlYSSDwpnwl2yMjBj6RoVDDmGgYa', '74008'),
	('user2', 'sarah shelly', '$2a$12$53ej0UFI63pcZBbGWQwSlO617ABjGWc3/v3P6XKbuiLWSF6BQ88Iu', '70032'),
	('user3', 'tim tebow', '$2a$12$a2lwO1B9Y3c74BzkNORfsu/C00e8IR51lQPwXSKQ.5gcY9j3e1jfi', '94203'),
	('user4', 'crystal ball', '$2a$12$mkmyCkhCimVhctVH6c2dD.yZ.ELrdlXRpeTkR6.3Ci35ox0.xl1Jy', '60290'),
	('user5', 'jimmy schmidts', '$2a$12$p2OVQBrQwpoAr355AKGI9ewidvGeIxr86FOPU8QxHLvgrx5fFxTnq', '80203');
--	('user1', 'jake todd', 'Zippy$$93', '74008'),
--	('user2', 'sarah shelly', 'Boopy##39', '70032'),
--	('user3', 'tim tebow', 'Jiffy%%76', '94203'),
--	('user4', 'crystal ball', 'Puffy**21', '60290'),
--	('user5', 'jimmy schmidts', 'rappy!!45', '80203');
COMMIT;