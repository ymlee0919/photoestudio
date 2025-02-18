module.exports = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    if (err.status === 404) {
      	res.render('404.html.twig');
    } else {
		res.render('500.html.twig');
    }
};