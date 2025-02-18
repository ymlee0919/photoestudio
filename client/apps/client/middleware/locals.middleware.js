var businessService = require('./../services/business.service');
var servicesService = require('./../services/services.service');
var offersService = require('./../services/offers.service');

module.exports = async (req, res, next) => {
    if(req.method === 'GET') {
        res.locals.business = await businessService.loadBusinessInfo();
        res.locals.servicesList = await servicesService.loadServicesList();
        res.locals.offersList = await offersService.loadOffersList();
    }
    
    next();
}
  