const errorHandler = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем соответствующее сообщение
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

module.exports = errorHandler;