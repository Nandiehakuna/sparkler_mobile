import { createContext } from "react";

import { SparkleActivity } from "../utils/types";

type Value = {
  sparkles: SparkleActivity[];
  setSparkles: (sparkles: SparkleActivity[]) => void;
};

const SparklesContext = createContext<Value>({
  setSparkles: () => {},
  sparkles: [],
});

export default SparklesContext;
