/* eslint-disable no-undef */
import axios from 'axios';

export default async function handler(request, response) {
  if (!request.body) {
    response.status(401).send('Unauthorized');
  }

  const clientSecret = process.env.APP_SECRET;
  const clientId = process.env.APP_ID;

  axios
    .post(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
    )
    .then((res) => {
      return response.json(res.data);
    })
    .catch((err) => {
      const error = err.toJSON();
      return response.status(error.status).send(error.message);
    });
}
