const axios = require('axios');
const options = {
  provider: 'locationiq',
  httpAdapter: 'https',
  apiKey: 'pk.b80375d0b275a40ab0a19ec33510698e',
  formatter: null,

  fetch: {
    zoom: 18,
    addressdetails: 1,
  },
};

const getLocationDataFromCoordinates = async (data) => {
  const { latitude, longitude } = data;
  let valid = false;
  let response = {
    valid: valid,
    data: null,
  };

  if (!latitude || !longitude) return response;

  const url = `https://us1.locationiq.com/v1/reverse.php?key=pk.b80375d0b275a40ab0a19ec33510698e&lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&namedetails=1&zoom=18&normalizeaddress=1&normalizecity=1&statecode=1&extratags=1`;
  const fetchLocation = await axios({
    url,
    method: 'get',
  }).catch((err) => {
    console.log(err);
  });
  const { data: locationData } = fetchLocation ? fetchLocation : {};

  if (data) {
    valid = true;
    response = {
      valid: valid,
      data: locationData,
    };
  }

  return response;
};

module.exports = {
  getLocationDataFromCoordinates,
};
