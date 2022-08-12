import * as winston from 'winston';

const formatMeta = (meta) => {
  const splat = meta[Symbol.for('splat')];
  if (splat && splat.length) {
    return splat.length === 1 ? splat[0] : splat;
  }
  return splat;
};
export const customFormat = winston.format.printf(
  ({ timestamp, level, message, label = '', ...meta }) => {
    return ` ${level} [${timestamp}] PATH: ${message} METHOD:${
      formatMeta(meta)[0]
    }  CODE: ${formatMeta(meta)[1]} MESSAGE:${formatMeta(meta)[2]}`;
  },
);
