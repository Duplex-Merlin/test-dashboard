#!/bin/bash

# Tableau contenant les noms de schémas
# schemas=("merlin-3d" "test")
schemas=("2ad564a716fd62d28cfd78867cf774a7")

# Boucle sur le tableau et exécute la migration pour chaque schéma
for schema in "${schemas[@]}"
do
  echo "Migration pour le schéma ${schema}..."
  DB_SCHEMA=${schema} sequelize-cli db:migrate:undo
done
