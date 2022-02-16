"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Object clone
 */
exports.default = (inputObject) => {
    return JSON.parse(JSON.stringify(inputObject));
};
