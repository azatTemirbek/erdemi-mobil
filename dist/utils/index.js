import {
  // NativeModules,
  Platform,
  Animated,
  Easing,
  UIManager,
  LayoutAnimation,
  PixelRatio,
  Dimensions
} from "react-native";
import DeviceInfo from "react-native-device-info";
const scaleValue = PixelRatio.get() / 2;

export const pick = (obj = {}, blacklisted = []) =>
  Object.entries(obj).reduce((acc, [key, val]) => {
    if (blacklisted.includes(key)) {
      acc[key] = val;
    }
    return acc;
  }, {});

export const updateObjectInArrayWithIndex = (array, positionIndex, payload) => {
  return array.map((item, index) => {
    if (index !== positionIndex) {
      // This isn't the item we care about - keep it as-is
      return item;
    }
    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...payload
    };
  });
};
/**
 * used to make cross platform shadow and elevation effect
 * @param {Number} elevation
 */
export const elevationShadowStyle = (elevation = 2) => {
  return {
    elevation,
    shadowColor: "black",
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
};

export const enableExperimental = () => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const scaleWithPixel = (size, limitScale = 1.2) => {
  /* setting default upto 20% when resolution device upto 20% with defalt iPhone 7 */
  const value = scaleValue > limitScale ? limitScale : scaleValue;
  return size * value;
};

export const heightHeader = () => {
  const OS = Platform.OS;
  const landscape =
    Dimensions.get("window").width > Dimensions.get("window").height;
  let model = DeviceInfo.getModel();
  if (model.includes("iPad")) {
    model = "iPad";
  }
  if (OS === "ios") {
    switch (model) {
      case "iPhone X":
      case "iPhone XS":
      case "iPhone XS Max":
      case "iPhone XR":
        return landscape ? 45 : 88;
      case "iPad":
        return 65;
      default:
        return landscape ? 45 : 65;
    }
  } else {
    return 45;
  }
};

export const getWidthDevice = () => {
  return Dimensions.get("window").width;
};

export const getHeightDevice = () => {
  return Dimensions.get("window").height;
};

export const scrollEnabled = (contentWidth, contentHeight) => {
  return contentHeight > Dimensions.get("window").height - heightHeader();
};

// Animation navigation between screen react-navigation
export function fromLeft(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: ({layout, position, scene}) => {
      const {index} = scene;
      const {initWidth} = layout;

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-initWidth, 0, 0]
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1]
      });

      return {opacity, transform: [{translateX}]};
    }
  };
}

export function fromTop(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: ({layout, position, scene}) => {
      const {index} = scene;
      const {initHeight} = layout;

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-initHeight, 0, 0]
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1]
      });

      return {opacity, transform: [{translateY}]};
    }
  };
}

export function fromRight(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: ({layout, position, scene}) => {
      const {index} = scene;
      const {initWidth} = layout;

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initWidth, 0, 0]
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1]
      });

      return {opacity, transform: [{translateX}]};
    }
  };
}

export function fromBottom(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: ({layout, position, scene}) => {
      const {index} = scene;
      const {initHeight} = layout;

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initHeight, 0, 0]
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1]
      });

      return {opacity, transform: [{translateY}]};
    }
  };
}

export function fadeIn(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1]
      });

      return {opacity};
    }
  };
}

export function zoomIn(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;
      let start = 0;

      if (Platform.OS !== "ios") {
        start = 0.005;
      }

      const scale = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [start, 1]
      });

      return {transform: [{scale}]};
    }
  };
}

export function zoomOut(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;

      const scale = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [10, 1]
      });

      return {transform: [{scale}]};
    }
  };
}

export function flipY(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;

      const rotateY = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: ["180deg", "0deg"]
      });

      return {transform: [{rotateY}], backfaceVisibility: "hidden"};
    }
  };
}

export function flipX(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;

      const rotateX = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: ["180deg", "0deg"]
      });

      return {transform: [{rotateX}], backfaceVisibility: "hidden"};
    }
  };
}
/**
 * top right bottom left
 * @param {String} key Key to generate trbl
 */
export const TRBLFactory = (key = "padding") => (value) => {
  if (typeof value === "number") {
    return {
      [`${key}Top`]: value,
      [`${key}Right`]: value,
      [`${key}Bottom`]: value,
      [`${key}Left`]: value
    };
  }
  if (typeof value === "object") {
    const paddingSize = Object.keys(value).length;
    switch (paddingSize) {
      case 1:
        return {
          [`${key}Top`]: value[0],
          [`${key}Right`]: value[0],
          [`${key}Bottom`]: value[0],
          [`${key}Left`]: value[0]
        };
      case 2:
        return {
          [`${key}Top`]: value[0],
          [`${key}Right`]: value[1],
          [`${key}Bottom`]: value[0],
          [`${key}Left`]: value[1]
        };
      case 3:
        return {
          [`${key}Top`]: value[0],
          [`${key}Right`]: value[1],
          [`${key}Bottom`]: value[2],
          [`${key}Left`]: value[1]
        };
      default:
        return {
          [`${key}Top`]: value[0],
          [`${key}Right`]: value[1],
          [`${key}Bottom`]: value[2],
          [`${key}Left`]: value[3]
        };
    }
  }
};
/**
 * ui helper function
 * @param {number|number[]} margin
 */
export const handleMargins = TRBLFactory("margin");
/**
 * Ui helper Function
 * @param {number|number[]} padding
 */
export const handlePaddings = TRBLFactory("padding");
