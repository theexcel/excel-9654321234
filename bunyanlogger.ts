import bunyan from 'bunyan';

function customFormat(record: any) {
    return `[${record.time.toISOString()}] [${record.level.toUpperCase()}] ${record.msg}`;
}


const logger = bunyan.createLogger({
    name: 'application-logger',
    streams: [
        {
            level: 'info',
            stream: process.stdout 
        }
    ],
    serializers: {
        ...bunyan.stdSerializers,
        info: customFormat,
        warn: customFormat,
        error: customFormat
    }
});

export default logger;

// logger.info('This is an info message');
// logger.warn('This is a warning message');
// logger.error('This is an error message');