"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRequest = void 0;
function verifyRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiKey = null;
        apiKey = req.header("x-api-key");
        if (apiKey) {
            if (apiKey !== process.env.API_KEY) {
                res.status(400).send({
                    status: "error",
                    code: "apiError",
                    message: "You cannot access this request.",
                });
            }
            next();
        }
        else {
            res.status(500).send({
                status: "error",
                code: "apiErrorV",
                message: "You must provide an API key",
            });
        }
    });
}
exports.verifyRequest = verifyRequest;
