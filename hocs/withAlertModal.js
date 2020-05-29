import React, {useState, useCallback, forwardRef} from "react";
import hoistStatics from "hoist-non-react-statics";
import {curry} from "ramda";
import createElement from "./utils/createElement";
import {Block, Icon, Popup} from "../components";
import {renderer, isCompositeTypeElement} from "./utils/isClassComponent";

export const withAlertModal = curry((Component) => {
  const displayName = `withAlertModal(${
    Component.displayName || Component.name
  })`;
  const C = forwardRef((props, ref) => {
    const [config, setConfig] = useState({
      isVisible: false
    });
    /** used to close the modal with callback */
    const closeModal = useCallback(
      () =>
        setConfig((state) => {
          !!state.onClose && state.onClose();
          return {isVisible: false};
        }),
      []
    );
    const openModal = useCallback((conf = {}) => {
      if (conf.type === "success") {
        conf.icon = () => (
          <Block
            center
            middle
            style={{
              backgroundColor: "rgb(191,253,249)",
              borderRadius: 100,
              borderWidth: 1,
              height: 130,
              width: 130,
              borderColor: "rgb(0,203,157)"
            }}>
            <Icon
              name="check"
              color="rgb(0,203,157)"
              size={110}
              type="feather"
            />
          </Block>
        );
      }
      if (conf.type === "error") {
        conf.icon = () => (
          <Block
            center
            middle
            style={{
              backgroundColor: "#F79293",
              borderRadius: 100,
              borderWidth: 1,
              height: 130,
              width: 130,
              borderColor: "#E9282B"
            }}>
            <Icon
              name="exclamation"
              color="#E9282B"
              size={70}
              type="font-awesome"
            />
          </Block>
        );
      }
      if (conf.type === "custom") {
        conf.icon = conf.icon;
      }
      setConfig({isVisible: true, ...conf});
    }, []);
    const openModalSucces = (conf) => openModal({...conf, type: "success"});
    const openModalError = (conf) => openModal({...conf, type: "error"});
    let {body, footer, icon, isVisible, conatinerProps, ...rest} = config;
    const screenProps = {
      closeModal,
      openModal,
      openModalSucces,
      openModalError
    };
    return (
      <>
        <Popup isVisible={isVisible} onCloseModal={closeModal} {...rest}>
          <Block center {...conatinerProps}>
            {renderer(icon, {})}
            {/* {!!icon && (isCompositeTypeElement(icon)
              ? icon
              : createElement(icon, {}))} */}
            {!!body &&
              (isCompositeTypeElement(body) ? body : createElement(body, {}))}
            {!!footer &&
              (isCompositeTypeElement(footer)
                ? footer
                : createElement(footer, {}))}
          </Block>
        </Popup>
        <Component
          ref={ref}
          {...props}
          {...screenProps}
          screenProps={screenProps}
        />
      </>
    );
  });

  C.displayName = displayName;
  C.WrappedComponent = Component;
  return hoistStatics(C, Component);
});

export default withAlertModal;
