import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Text } from "../";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import Pdf from "react-native-pdf";

export class PdfModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.isVisible
    };
  }
  pressedButtons = [];

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        style={[styles.container, this.props.containerStyle]}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        propagateSwipe
        onModalHide={() => {
          this.pressedButtons[this.pressedButtons.length - 1]
            ? this.props.onSuccess()
            : this.props.onDismiss();
        }}
      >
        <View style={[styles.content, this.props.contentStyle]}>
          <Pdf
            source={this.props.source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            style={[styles.pdf, this.props.style]}
          />
          <View style={[styles.footer, this.props.footerStyle]}>
            {this.props.children}
            {this.props.renderLeft && (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  this.props.onPressLeft();
                  this.pressedButtons.push(false);
                }}
              >
                {this.props.renderLeft()}
              </TouchableOpacity>
            )}
            {this.props.renderRight && (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  this.props.onPressRight();
                  this.pressedButtons.push(true);
                }}
              >
                {this.props.renderRight()}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
PdfModal.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  footerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  source: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isVisible: PropTypes.bool,
  iconProps: PropTypes.object,
  title: PropTypes.string,
  titleTag: PropTypes.func,
  titleProps: PropTypes.object,
  onCloseModal: PropTypes.func,
  children: PropTypes.node.isRequired,
  renderLeft: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  renderRight: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onPressLeft: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onPressRight: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onDismiss: PropTypes.func,
  onSuccess: PropTypes.func
};

PdfModal.defaultProps = {
  style: {},
  footerStyle: {},
  containerStyle: {},
  contentStyle: {},
  source: {
    uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
    cache: true
  },
  isVisible: false,
  iconProps: null,
  title: "",
  titleTag: Text,
  titleProps: {},
  onCloseModal: () => {},
  renderLeft: false,
  renderRight: false,
  onPressLeft: () => {},
  onPressRight: () => {},
  onSuccess: () => {},
  onDismiss: () => {}
};
export default PdfModal;
