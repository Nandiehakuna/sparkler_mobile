import { createContext } from "react";
import * as stream from "getstream";

const StreamClientContext = createContext<
  | stream.StreamClient<
      stream.UR,
      stream.UR,
      stream.UR,
      stream.UR,
      stream.UR,
      stream.UR
    >
  | undefined
>(undefined);

export default StreamClientContext;
