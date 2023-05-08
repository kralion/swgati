import HttpError from './HttpError';

const handleError = (error, res) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).send({ message: error.message, error });
  } else {
    console.error(error);
    res.status(500).send({ message: 'Error interno del servidor', error });
  }
};

const asyncHandler = (controllerFunc) => (req, res, next) =>
  Promise.resolve(controllerFunc(req, res, next)).catch((error) =>
    handleError(error, res)
  );

export default asyncHandler;
