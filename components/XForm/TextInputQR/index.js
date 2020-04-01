import React from "react";
import { TouchableOpacity, View } from "react-native";
import { BaseColor } from "../../../config";
import PropTypes from "prop-types";
import { Text, Icon, TextInput, Popup } from "../../";
import styles from "./styles";

export const TextInputQR = ({ onChangeText, ...rest }) => {
  const [QRModal, setQRModal] = useState(false);
  return (
    <>
      <TextInput
        onChangeText={text => onChangeText(text)}
        {...rest}
        renderRight={({ props }) => (
          <TouchableOpacity onPress={() => setQRModal(true)}>
            <Icon name="qrcode" size={22} color={BaseColor.accentColor} />
          </TouchableOpacity>
        )}
      />
      <Popup
        top={false}
        bottom={false}
        onCloseModal={() => setQRModal(false)}
        isVisible={QRModal}
        containerStyle={styles.containerStyle}
        contentStyle={styles.contentStyle}
      >
        {/* there should be the content of the qr reader */}
        <QRCodeScanner
          onRead={e => onChangeText(e.data)}
          showMarker
          topContent={
            <View style={styles.topfullSize}>
              <TouchableOpacity
                style={styles.close}
                onPress={() => setQRModal(false)}
              >
                <Icon
                  type="font-awesome"
                  name="close"
                  size={22}
                  color={BaseColor.whiteColor}
                />
              </TouchableOpacity>
            </View>
          }
          // flashMode={QRCodeScanner.Constants.FlashMode.torch}
          bottomContent={
            <View style={styles.fullSize}>
              <Text whiteColor body1>
                {translate("qrHelpText")}
              </Text>
            </View>
          }
        />
      </Popup>
    </>
  );
};

TextInputQR.propTypes = {};

TextInputQR.defaultProps = {};

export default TextInputQR;
