import * as winston from 'winston';
import * as path from 'path';
import { format } from 'winston';

function createLogger(service: string, filename: string) {
  const logFormat = format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.printf(({ timestamp, level, message, ...metadata }) => {
      let metaString = JSON.stringify(metadata);
      if (metaString !== '{}') {
        metaString = ` ${metaString}`;
      }
      return `${timestamp} ${level}: ${message}${metaString}`;
    }),
  );

  return winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: { service },
    transports: [
      new winston.transports.File({
        filename: path.join('/tmp', filename),
        level: 'error',
        maxsize: 5 * 1024 * 1024, // 5MB
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
        format: format.combine(format.colorize(), logFormat),
      }),
    ],
  });
}

export default createLogger;
