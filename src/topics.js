const makeRequest = async (url, init, fetchImpl) => {
  let response;
  if (fetchImpl) {
    response = await fetchImpl(url, init);
  } else {
    response = await fetch(url, init);
  }

  return await response.json();
}

export const list = (baseInputs) => async () => {
  const { headers, projectId, baseUrl, fetchImpl } = baseInputs;
  const method = 'GET';
  const url = `${baseUrl}/projects/${projectId}/topics`;
  const result = await makeRequest(url, { method, headers }, fetchImpl);
  const { topics } = result;
  return topics;
};

export const get =
  (baseInputs) =>
  async ({ topic }) => {
    const { headers, projectId, baseUrl, fetchImpl } = baseInputs;
    const method = 'GET';
    const url = `${baseUrl}/projects/${projectId}/topics/${topic}`;
    return  await makeRequest(url, { method, headers }, fetchImpl);
  };

export const publish =
  (baseInputs) =>
  async ({ topic, messages }) => {
    const { headers, projectId, baseUrl, fetchImpl } = baseInputs;

    const method = 'POST';
    const url = `${baseUrl}/projects/${projectId}/topics/${topic}:publish`;
    const bodyJSON = { messages };
    const body = JSON.stringify(bodyJSON);

    return await makeRequest(url, { method, headers, body }, fetchImpl);
  };
