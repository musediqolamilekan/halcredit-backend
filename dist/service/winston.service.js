"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const path = require("path");
const winston_1 = require("winston");
function createLogger(service, filename) {
    const logFormat = winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json(), winston_1.format.printf(({ timestamp, level, message, ...metadata }) => {
        let metaString = JSON.stringify(metadata);
        if (metaString !== '{}') {
            metaString = ` ${metaString}`;
        }
        return `${timestamp} ${level}: ${message}${metaString}`;
    }));
    return winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: logFormat,
        defaultMeta: { service },
        transports: [
            new winston.transports.File({
                filename: path.join('/tmp', filename),
                level: 'error',
                maxsize: 5 * 1024 * 1024,
                maxFiles: 5,
                tailable: true,
            }),
            new winston.transports.File({
                filename: path.join('/tmp', filename),
                level: 'info',
                maxsize: 5 * 1024 * 1024,
                maxFiles: 5,
                tailable: true,
            }),
            new winston.transports.File({
                filename: path.join('/tmp', filename),
                level: 'warn',
                maxsize: 5 * 1024 * 1024,
                maxFiles: 5,
                tailable: true,
            }),
            new winston.transports.Console({
                format: winston_1.format.combine(winston_1.format.colorize(), logFormat),
            }),
        ],
    });
}
exports.default = createLogger;
//# sourceMappingURL=winston.service.js.map