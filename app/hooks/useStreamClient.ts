import { useContext } from "react";

import StreamClientContext from "../contexts/StreamClientContext";

const useStreamClient = () => useContext(StreamClientContext);

export default useStreamClient;
