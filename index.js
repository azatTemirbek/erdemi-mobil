import {AppRegistry} from "react-native";
import StorybookUIRoot from "./storybook/index";
import {name as appName} from "./app.json";
AppRegistry.registerComponent(appName, () => StorybookUIRoot);
