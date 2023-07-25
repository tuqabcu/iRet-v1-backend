exports.validateEmail = function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

exports.handleError = function (res, err) {
    var status = err.status || 500;
    res.status(status);
    return res.json({
        errors: [err]
    });
};
