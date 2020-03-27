import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { BaseColor } from "../../config";
import PropTypes from "prop-types";
import { Button, Text, Checkbox } from "../";
import styles from "./styles";
import Pdf from "react-native-pdf";
import Modal from "react-native-modal";

export default class PolicyButton extends Component {
  constructor(props) {
    super(props);
    /** Copy all data from props and add checked to every item */
    let policyList = props.policyList.map(PDFData => ({
      ...PDFData,
      checked: false
    }));
    this.state = {
      policyList,
      current: policyList[0],
      modal: false
    };
  }
  render() {
    let { onPress, children, ...rest } = this.props;
    return (
      <>
        <View style={styles.policyTextContainer}>
          <Checkbox style={styles.checkbox} value={this._isAllChecked()} />
          <Text style={styles.policyText}>{children}</Text>
          <Modal
            isVisible={this.state.modal}
            onBackdropPress={() => this.setState({ modal: false })}
            style={styles.bottomModal}
            propagateSwipe
          >
            <View style={styles.contentModalBottom}>
              <View style={styles.contentTitle}>
                <Text title3>{this.state.current.title}</Text>
              </View>
              <Pdf
                source={{ uri: this.state.current.baseData || "" }}
                headers={this.props.headers || {}}
                activityIndicator={
                  <ActivityIndicator
                    size="large"
                    color={BaseColor.whiteColor}
                    style={{
                      marginTop: 20
                    }}
                  />
                }
                onError={error => {
                  // eslint-disable-next-line no-alert
                  alert(error);
                }}
                style={styles.pdf}
              />
              <Button
                full
                loading={!this.state.modal}
                style={{ marginTop: 10, marginBottom: 20 }}
                onPress={() => this._onConfirm()}
              >
                {this.props.translate(this.props.iHaveReadAndAcceptedText)}
              </Button>
            </View>
          </Modal>
        </View>
        <Button {...rest} onPress={this._onPress} loading={this.state.modal}>
          {this.props.translate(this.props.buttonText)}
        </Button>
      </>
    );
  }

  _isAllChecked = () => {
    let { policyList } = this.state;
    let filtered = policyList.filter(policy => policy.checked === true);
    return filtered.length === policyList.length;
  };
  _openUncheckedModal = () => {
    let { policyList } = this.state;
    let filtered = policyList.filter(policy => policy.checked === false);
    let uncheckedModal = filtered[0];
    this.setState({ current: uncheckedModal, modal: true });
  };
  _onConfirm = () => {
    /** close modal and set the current modal cheked true */
    let { policyList } = this.state;
    let filtered = policyList.filter(policy => policy.checked === false);
    filtered[0].checked = true;
    this.setState({
      modal: false,
      policyList
    });
  };
  _onPress = () => {
    /** control if all the policy checked */
    if (this._isAllChecked()) {
      /** if true invoke callback */
      return this.props.onFinish();
    } else {
      /** if false open modal uncheked_modal */
      this._openUncheckedModal();
    }
  };
}

PolicyButton.propTypes = {
  policyList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      title: PropTypes.string,
      baseData: PropTypes.string
    })
  ).isRequired,
  headers: PropTypes.object,
  onFinish: PropTypes.func,
  buttonText: PropTypes.string,
  iHaveReadAndAcceptedText: PropTypes.string
};

PolicyButton.defaultProps = {
  translate:key=>key,
  buttonText: "confirm",
  iHaveReadAndAcceptedText: "iHaveReadAndAccepted",
  children: "Provide policy text as a children",
  policyList: [],
  headers: {},
  // eslint-disable-next-line no-alert
  onFinish: () => alert("Provide onFinish as a completion callback")
};
