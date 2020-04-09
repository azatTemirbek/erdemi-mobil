import React from "react";
import {storiesOf} from "@storybook/react-native";
import {action} from "@storybook/addon-actions";
import {Button} from "./";
import Block from "../Block";
import {Icon} from "../Icon";

const BufferView = (storyFn) => <Block color="red">{storyFn()}</Block>;
// import { BufferView } from './decorators';
storiesOf("Button", module)
  .addDecorator(BufferView)
  .add("default", () => (
    <Button
      icon={<Icon name="trash" size={22} color="white" />}
      onPress={action("tapped-default")}>
      Press Me
    </Button>
  ))
  .add("outline", () => (
    <Button onPress={action("tapped-outline")} outline shadow>
      Press Me
    </Button>
  ))
  .add("Full and Color", () => (
    <Button onPress={action("tapped-outline")} full color="gray">
      Press Me
    </Button>
  ));
