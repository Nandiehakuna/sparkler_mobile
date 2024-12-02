import { useContext } from "react";

import { UserContext } from "../contexts";

export default () => {
  const context = useContext(UserContext);

  return { ...context };
};
