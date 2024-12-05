import { useContext } from "react";

import { ActivityActor } from "../utils/types";
import { getActorFromUser } from "../utils/funcs";
import { ProfileUserContext } from "../contexts";
import { routes } from "../navigation";
import { User } from "../contexts/UsersContext";
import useNavigation from "./useNavigation";

export default () => {
  const context = useContext(ProfileUserContext);
  const navigation = useNavigation();

  const navigateToProfile = (user: ActivityActor) =>
    navigation.navigate(routes.PROFILE, user);

  const isActivityActor = (
    user: User | ActivityActor
  ): user is ActivityActor => {
    return "id" in user && typeof user.id === "string";
  };

  const viewProfile = (user: User | ActivityActor) => {
    const actor = isActivityActor(user) ? user : getActorFromUser(user);

    navigateToProfile(actor);
  };

  return { ...context, viewProfile };
};
