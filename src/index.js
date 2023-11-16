import * as topicsOps from './topics';
import { getTokenFromGCPServiceAccount } from '@sagi.io/workers-jwt';
import { createPubSubMessage, injectBaseInputs } from './utils';

const PubSubREST = async ({
  serviceAccountJSON,
  cryptoImpl = null,
  fetchImpl = null,
}) => {
  const { project_id: projectId } = serviceAccountJSON;
  const aud = 'https://pubsub.googleapis.com/google.pubsub.v1.Publisher';

  const token = await getTokenFromGCPServiceAccount({
    serviceAccountJSON,
    aud,
    cryptoImpl,
  });

  const headers = { Authorization: `Bearer ${token}` };
  const baseUrl = `https://pubsub.googleapis.com/v1`;
  const baseInputs = { headers, projectId, baseUrl, fetchImpl };

  const topics = injectBaseInputs(baseInputs, topicsOps);
  const helpers = { createPubSubMessage, headers };

  return { topics, helpers };
};

module.exports = PubSubREST;
