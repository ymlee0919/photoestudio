const api = require('./base/api.service');

async function loadHomeOffers() {
    return await api.load('/offers/home');
}

async function loadOffers() {
    return await api.load('/offers');
}

async function loadOffersList() {
    return await api.load('/offers/list');
}

module.exports = {loadHomeOffers, loadOffers, loadOffersList};