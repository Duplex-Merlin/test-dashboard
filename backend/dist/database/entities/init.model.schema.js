"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModelWithSchema = void 0;
const sequelize_1 = require("../config/sequelize");
function initModelWithSchema(model, schema) {
    // Initialiser le modèle avec le schéma spécifié
    const initializedModel = model.init({
        timestamps: true,
        sequelize: (0, sequelize_1.sequelize)(schema),
        modelName: model.name,
    }, { schema });
    // Renvoyer le constructeur du modèle initialisé
    return initializedModel;
}
exports.initModelWithSchema = initModelWithSchema;
