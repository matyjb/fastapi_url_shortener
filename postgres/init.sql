-- Create roles
CREATE ROLE db_user WITH LOGIN PASSWORD 'password_user';
CREATE ROLE shortener_db_admin WITH LOGIN PASSWORD 'password_admin';

-- Create database
CREATE DATABASE shortener_database OWNER shortener_db_admin;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE shortener_database TO shortener_db_admin;
GRANT CONNECT ON DATABASE shortener_database TO db_user;
GRANT USAGE ON SCHEMA public TO db_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO db_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO db_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO db_user;