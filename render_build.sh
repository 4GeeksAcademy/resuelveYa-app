#!/usr/bin/env bash
# exit on error
# set -o errexit

# npm install
# npm run build

# pipenv install
# pipenv run reset_db
# pipenv run upgrade

# Definir la cadena de conexión
DB_CONNECTION="postgresql://postgresql_trapezoidal_42170_dkqh_user:5vxsx5ALX8qXPIWt6HBAZDswezH6iDuK@dpg-crrgbc9u0jms73ecot40-a/postgresql_trapezoidal_42170_dkqh"
# Ejecutar las acciones necesarias
echo "Reinicio de migraciones"
rm -R -f ./migrations &&
echo "Eliminación de la base de datos existente" &&
pipenv run init &&
echo "Eliminación de la base de datos existente" &&
dropdb "$DB_CONNECTION" || true &&
echo "Creación de la base de datos" &&
createdb "$DB_CONNECTION" || true &&
echo "Creación de la extensión 'unaccent'" &&
psql "$DB_CONNECTION" -c 'CREATE EXTENSION IF NOT EXISTS unaccent;' || true &&
echo "Migración" &&
pipenv run migrate &&
echo "Actualización" &&
pipenv run upgrade
