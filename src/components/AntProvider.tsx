import { useContext } from "react";

import { ThemeContext } from "@contexts/theme";
import { Provider } from "@ant-design/react-native";

export const AntProvider = ({ children }: IAntProviderProps) => {
  const { theme } = useContext(ThemeContext);

  return <Provider theme={theme}>{children}</Provider>;
};

interface IAntProviderProps {
  children: React.ReactNode;
}
