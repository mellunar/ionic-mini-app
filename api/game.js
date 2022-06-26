/* eslint-disable no-undef */
import axios from 'axios';

export default async function handler(request, response) {
  if (!request.body) {
    response.status(400).send('Bad Request');
  }

  const headers = {
    'Client-ID': process.env.APP_ID,
    Authorization: request.headers.authorization,
    Accept: 'application/json',
  };

  axios
    .post(`${process.env.IGDB}/games`, request.body, { headers })
    .then((res) => {
      return response.json(res.data);
    })
    .catch((err) => {
      const error = err.toJSON();
      return response.status(error.status).send(error.message);
    });
}
