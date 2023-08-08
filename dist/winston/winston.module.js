"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const nest_winston_1 = require("nest-winston");
const nest_winston_2 = require("nest-winston");
nest_winston_2.WinstonModule.forRoot({
    levels: winston.config.npm.levels,
    format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({ level, message, timestamp }) => {
                return `${timestamp} ${level}: ${message}`;
            })),
        }),
        new winston.transports.File({
            filename: 'error.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({ level, message, timestamp }) => {
                return `${timestamp} ${level}: ${message}`;
            })),
        }),
    ],
});
//# sourceMappingURL=winston.module.js.map