import React, {Component, cloneElement, Children} from "react";
import {TouchableOpacity, View} from "react-native";
import {BaseColor} from "../../../config";
import PropTypes from "prop-types";
import {Text, Icon, Card, MapArray, Selector, ErrorLabel, Label} from "../../";
import styles from "./styles";
import ImagePicker from "react-native-image-crop-picker";
import {withHideFormElement, compose} from "../../../hocs";
import { propEq } from "ramda";

class ImageInputComp extends Component {
  options = {
    mediaType: "photo",
    multiple: true,
    includeBase64: false ///<Image source={{uri: `data:${image.mime};base64,${image.data}`}} />
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.options = {...this.options, ...props.options};
  }
  /** renders right side of the listItem */
  renderer = (
    keyVal = "",
    props = {
      openSelector: this._openSelector.bind(this),
      openGallery: this._openGallery.bind(this),
      openCamera: this._openCamera.bind(this),
      name: this.props.name,
      disabled: this.props.disabled
    }
  ) => {
    let component = this.props[keyVal];
    let key = JSON.stringify(props);
    if (!component) {
      return null;
    }
    return typeof component === "function"
      ? component({key, props})
      : Array.isArray(component)
      ? Children.map(component, (child) => cloneElement(child, {key, props}))
      : component;
  };
  /** used to remove from the state */
  _onPillRemove = (object) => () => {
    let {value, onImageChange} = this.props;
    let photos = Array.isArray(value) ? value : value ? [value] : [];
    photos = photos
      .map((item) => ({...item}))
      .filter((photo) => {
        return JSON.stringify(object) !== JSON.stringify(photo);
      });
    /** will remove image if multiple is false */
    onImageChange(this.options.multiple ? photos : undefined);
  };
  /** return array of photos and also it is good for single amd multiple options */
  _addAndFilter = (newPhotos = []) => {
    /** if single return last adding */
    if (!this.options.multiple) {
      return newPhotos.length ? newPhotos[0] : undefined;
    }
    /** if more than one  */
    let newArrayOfPhotos = [];
    let {value} = this.props;
    let photos = Array.isArray(value) ? value : value ? [value] : [];
    /** remove selected one if exists */
    newArrayOfPhotos = photos
      .map((item) => ({...item}))
      .filter(
        (photo) =>
          newPhotos.findIndex((item) => {
            return photo.path === item.path;
          }) === -1
      );
    /** add the new ones */
    newArrayOfPhotos = [...newArrayOfPhotos, ...newPhotos];
    return newArrayOfPhotos;
  };
  /** opens gallery */
  _openGallery = () => {
    let {options} = this.props;
    ImagePicker.openPicker({...this.options, ...options}).then((images) => {
      let {onImageChange} = this.props;
      onImageChange(
        this._addAndFilter(Array.isArray(images) ? images : [images])
      );
      this.setState({modal: false});
    });
  };
  /** opens Camera */
  _openCamera = () => {
    let {options} = this.props;
    ImagePicker.openCamera({...this.options, ...options}).then((images) => {
      let {onImageChange} = this.props;
      onImageChange(
        this._addAndFilter(Array.isArray(images) ? images : [images])
      );
      this.setState({modal: false});
    });
  };
  /** opens selector */
  _openSelector = () => this.setState({modal: true});
  /** close selector */
  _closeSelector = () => this.setState({modal: false});
  render() {
    const {
      style,
      label,
      labelStyle,
      renderRightStyle,
      renderLeftStyle,
      renderLeft,
      renderRight,
      value,
      options,
      placeholder,
      pillContainerStyle,
      imageContainerStyle,
      errorStyle,
      error,
      required,
      translate,
      ...rest
    } = this.props;
    let photos = Array.isArray(value) ? value : value ? [value] : [];
    let opt = {...this.options, ...options};
    let list = [
      {
        title: translate("takePhoto"),
        onPress: this._openCamera
      },
      {
        title: translate("chooseFromGallery"),
        onPress: this._openGallery
      }
    ];
    return (
      <>
        <Selector
          onCloseModal={this._closeSelector}
          title={translate("selectImage")}
          isVisible={this.state.modal}
          list={list}
          translate={translate}
        />
        <Label {...{label, labelStyle, required}} />
        <View style={[styles.container, style]}>
          {!!renderLeft && (
            <View style={[styles.renderLeftStyle, renderLeftStyle]}>
              {this.renderer("renderLeft")}
            </View>
          )}
          <View
            style={[
              styles.ImageInputContainer,
              !this.options.multiple && {flex: 1},
              renderRight && {width: "90%"},
              renderLeft && {width: "90%"},
              renderLeft && renderRight && {width: "80%"},
              imageContainerStyle
            ]}>
            <MapArray
              {...rest}
              array={
                this.options.multiple
                  ? photos
                  : photos.length
                  ? [photos[0]]
                  : []
              }
              fallback={
                <View
                  key={"no-img"}
                  style={[
                    styles.ImageInputContainer,
                    renderRight && {width: "90%"},
                    renderLeft && {width: "90%"},
                    renderLeft && renderRight && {width: "80%"},
                    imageContainerStyle
                  ]}>
                  <Text
                    style={{
                      color: BaseColor.grayColor,
                      paddingVertical: 10,
                      marginVertical: 8
                    }}>
                    {placeholder}
                  </Text>
                </View>
              }>
              {({key, object, ...rest1}, index) => {
                return (
                  <Card
                    {...rest1}
                    style={[
                      styles.pillContainer,
                      !this.options.multiple && {flex: 1}
                    ]}
                    onPress={this._onPillRemove(object)}
                    styleContent={[styles.styleContent, pillContainerStyle]}
                    image={{
                      uri: opt.includeBase64
                        ? `data:${object.mime};base64,${object.data}`
                        : object.path
                    }}
                    key={"View" + index}>
                    {this.renderer("renderPillIcon", object)}
                  </Card>
                );
              }}
            </MapArray>
          </View>
          {!!renderRight && (
            <View style={[styles.renderRightStyle, renderRightStyle]}>
              {this.renderer("renderRight")}
            </View>
          )}
        </View>
        <ErrorLabel {...{errorStyle, error}} />
      </>
    );
  }
}

ImageInputComp.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeftStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  pillContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderRightStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  required: PropTypes.bool,
  renderPillIcon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  renderLeft: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  renderRight: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  translate: PropTypes.func
};

ImageInputComp.defaultProps = {
  style: {},
  labelStyle: {},
  renderLeftStyle: {},
  pillContainerStyle: {},
  imageContainerStyle: {},
  renderRightStyle: {},
  label: "Label",
  placeholder: "",
  errorStyle: {},
  error: "",
  required: false,
  renderPillIcon: (
    <Icon
      name="ios-close-circle-outline"
      type="ionicon"
      style={styles.iconClose}
      size={20}
      color={BaseColor.primaryColor}
    />
  ),
  renderLeft: false,
  renderRight: ({props}) => {
    return (
      <TouchableOpacity disabled={props.disabled} onPress={() => props.openSelector()}>
        <Icon
          name="image-plus"
          type="material-community"
          size={24}
          color={BaseColor.accentColor}
        />
      </TouchableOpacity>
    );
  },
  translate: (key) => key
};

export const ImageInput = compose(withHideFormElement)(ImageInputComp);
export default ImageInput;
