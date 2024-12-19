import { Activity } from 'getstream';

import { getFailedResponse, processResponse } from './client';
import { SparkleActivity } from '../utils/types';
import client from './client';

const endpoint = '/sparkles';

type NewSparkle = {
  text: string;
  images: string[];
};

const createSparkle = async (sparkle: NewSparkle) => {
  try {
    return processResponse(await client.post(endpoint, sparkle));
  } catch (error) {
    return getFailedResponse(error);
  }
};

const deleteSparkle = async (sparkleId: string) => {
  try {
    return processResponse(await client.delete(`${endpoint}/${sparkleId}`));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export type NewQuote = {
  images: string[];
  text: string;
  quoted_activity: Activity | SparkleActivity;
};

const quoteSparkle = async (quote: NewQuote) => {
  try {
    return processResponse(await client.post(`${endpoint}/quote`, quote));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { createSparkle, deleteSparkle, quoteSparkle };
