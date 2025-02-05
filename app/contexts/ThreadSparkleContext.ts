import { createContext } from 'react';

import { SparkleActivity } from '../utils/types';

interface Value {
  threadSparkle: SparkleActivity | undefined;
  setThreadSparkle: (sparkle: SparkleActivity) => void;
}

const ThreadSparkleContext = createContext<Value>({
  threadSparkle: undefined,
  setThreadSparkle: () => {},
});

export default ThreadSparkleContext;
