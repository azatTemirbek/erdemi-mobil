import Validator from "validate.js";
/**
 * need to add pronis if async is required
 * need to add format and parse method for date and date time
 */
export default class ValidatorJS {
  constructor(translateFn = (key) => key) {
    this.translate = translateFn;
    this.Validator = Validator;
    this.Validator.formatters.custom = this.overloadFormatFunc;
    this.Validator.convertErrorMessages = this.convertErrorMessages;
    this.overloadErrorMessages();
  }
  /** i was using required inside forms so i need to replace required with presence*/
  bindRequiredToPresence = (constraints) =>
    Object.entries(constraints).reduce(
      (acc, [key, { required, ...ObjVal }]) => {
        acc[key] = { presence: required, ...ObjVal };
        return acc;
      },
      {}
    );
  /** overriding default messages with my own mesages */
  overloadErrorMessages = () => {
    this.Validator.validators.date.options = {
      message: "DATE_VALIDATOR_ERROR_MSG",
    };
    this.Validator.validators.datetime.options = {
      message: "DATETIME_VALIDATOR_ERROR_MSG",
    };
    this.Validator.validators.email.options = {
      message: "EMAIL_VALIDATOR_ERROR_MSG",
    };
    this.Validator.validators.equality.options = {
      message: "EQUALITY_VALIDATOR_ERROR_MSG",
    };
    this.Validator.validators.exclusion.options = {
      message: "EXCLUSION_VALIDATOR_ERROR_MSG",
    };
    this.Validator.validators.format.options = {
      message: "FORMAT_VALIDATOR_ERROR_MSG",
    };
    this.Validator.validators.inclusion.options = {
      message: "INCLUSION_VALIDATOR_ERROR_MSG",
    };
    this.Validator.validators.length.options = {
      message: "LENGTH_VALIDATOR_ERROR_MSG",
    };
    this.Validator.validators.numericality.options = {
      message: "NUMERICALITY_VALIDATOR_ERROR_MSG",
    };
    this.Validator.validators.presence.options = {
      message: "PRESSENCE_VALIDATOR_ERROR_MSG",
    };
    this.Validator.validators.url.options = {
      message: "URL_VALIDATOR_ERROR_MSG",
    };
    this.Validator.validators.type.messages = {
      array: "ARRAY_VALIDATOR_ERROR_MSG",
      boolean: "BOOLEAN_VALIDATOR_ERROR_MSG",
      date: "DATE_VALIDATOR_ERROR_MSG",
      integer: "INTEGER_VALIDATOR_ERROR_MSG",
      number: "NUMBER_VALIDATOR_ERROR_MSG",
      object: "OBJECT_VALIDATOR_ERROR_MSG",
      string: "STRING_VALIDATOR_ERROR_MSG",
    };
  };
  /*** Override atribute + " " + error */
  convertErrorMessages = (errors, options) => {
    options = options || {};
    var ret = [];
    errors.forEach((errorInfo) => {
      var error = this.Validator.result(
        errorInfo.error,
        errorInfo.value,
        errorInfo.attribute,
        errorInfo.options,
        errorInfo.attributes,
        errorInfo.globalOptions
      );

      if (!this.Validator.isString(error)) {
        ret.push(errorInfo);
        return;
      }

      if (error[0] === "^") {
        error = error.slice(1);
      } else if (options.fullMessages !== false) {
        error = error;
        // error = v.capitalize(prettify(errorInfo.attribute)) + " " + error;
      }
      error = error.replace(/\\\^/g, "^");
      error = this.Validator.format(error, {
        value: this.Validator.stringifyValue(errorInfo.value, options),
      });
      ret.push(this.Validator.extend({}, errorInfo, { error: error }));
    });
    return ret;
  };
  /** uses translate with formatfunc */
  overloadFormatFunc = (errors) =>
    errors.reduce((acc, { validator, attribute, value, error }) => {
      acc[attribute] = this.translate(error, {
        validator,
        attribute,
        value,
        prettified: this.Validator.capitalize(
          this.Validator.prettify(attribute)
        ),
      });
      return acc;
    }, {});
  /** communicate with internal validate */
  validate = (data, constraints, options = { format: "custom" }) => {
    console.log("validatingData:", data);
    console.log("validatingconstraints:", constraints);
    let res = this.Validator(
      data,
      this.bindRequiredToPresence(constraints),
      options
    );
    console.log("validatedRes:", res);
    return res;
  };
}
