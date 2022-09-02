// eslint-disable-next-line max-len
const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

const request = (url: string) => {
  return fetch(`${BASE_URL}/${url}.json`)
    .then(res => res.json());
};

export const getCurrency = (currency: string) => {
  return request(currency);
};
