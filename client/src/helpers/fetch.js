import { baseUrl } from '../config';

export async function getFetch(endpoint, token = null) {
  try {
    const authorization = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
    const resp = await fetch(`${baseUrl}/${endpoint}`, authorization);
    // console.log('resp fetch:', resp);
    if (resp.ok) {
      return resp.json();
    }
    throw new Error('500 Something went wrong.');
  } catch (err) {
    throw err;
  }
}

export async function postFetch(endpoint, inputData, token = null) {
  try {
    const authorization = token ? { Authorization: `Bearer ${token}` } : {};
    const resp = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authorization,
      },
      body: JSON.stringify(inputData),
    });
    // console.log('resp fetch:', resp);
    return resp.json();
  } catch (err) {
    console.log('error in postFetch:', err);
    throw err;
  }
}
