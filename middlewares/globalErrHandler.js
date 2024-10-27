export const globalErrHandler = (err, req, res, next) => {
  //stack
  //message
  const stack = err?.stack;
  const status = err?.statusCode ? err?.statusCode : 500;
  const message = err?.message;
  res.status(status).json({ stack, message });
};
