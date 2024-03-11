#!/bin/bash

# Tableau contenant les noms de schémas
schemas=("0af1338433e78be00cc497ecd36cc1bd")

# Boucle sur le tableau et exécute la migration pour chaque schéma
for schema in "${schemas[@]}"
do
  echo "Migration pour le schéma ${schema}..."
  DB_SCHEMA=${schema} sequelize-cli db:migrate
done
