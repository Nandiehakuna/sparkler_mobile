import { NavigationProp, useNavigation } from "@react-navigation/native";

export default () => {
  const navigation = useNavigation();

  return navigation as unknown as NavigationProp<any>;
};
