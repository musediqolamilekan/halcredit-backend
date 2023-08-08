import * as winston from 'winston';
declare function createLogger(service: string, filename: string): winston.Logger;
export default createLogger;
