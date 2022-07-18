export default [
  {
    id: 1,
    title: "Button",
    code: `
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import sizes from "../../constants/sizes";
import { POD } from "../../helpers";
import useColorScheme from "../../hooks/useColorScheme";
import { CustomText } from "./text";
const windowHeight = Layout.window.height;
const windowWidth = Layout.window.width;
const Button: React.FC<{
  title: string;
  icon?: any;
  onPress: any;
  style?: StyleProp<ViewStyle>;
  fontSize?: number;
}> = ({ title, icon, onPress, style, fontSize }) => {
  const colorScheme = useColorScheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height: windowHeight / 20,
          width: windowWidth / 2.6,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: sizes.radius.sm * 0.5,
          backgroundColor: Colors[colorScheme].tint,
        },
        style,
      ]}
    >
      {icon && icon}
      <CustomText fontSize={POD(fontSize, sizes.font.xs * 1)}>
        {title}
      </CustomText>
    </Pressable>
  );
};
export default Button;`,
    image: "",
    dependencies: "",
  },
];
