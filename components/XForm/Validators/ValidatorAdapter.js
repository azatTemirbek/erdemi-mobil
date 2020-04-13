import ValidatorJS from "./Validator";

export default class ValidatorAdapter {
  constructor(formCtx, validator = ValidatorJS, translate) {
    this.validator = new validator(translate);
    this.formCtx = formCtx;
  }
  validate = () =>
    this.validator.validate(
      {...this.formCtx.state.values},
      {...this.formCtx.elements}
    );
}
