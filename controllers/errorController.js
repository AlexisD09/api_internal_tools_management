exports.setErrorMessage = (res, code, error, message) => {
    return res.status(code).json({
        error: error,
        message: message
    });
}