import { createContext } from "react";
import { DefaultGenerics, StreamClient } from "getstream";

const StreamClientContext = createContext<
  StreamClient<DefaultGenerics> | undefined
>(undefined);

export default StreamClientContext;
