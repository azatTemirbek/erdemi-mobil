import Validator from "validate.js";
/**
 * need to add promis if async is required
 * need to add format and parse method for date and date time
 */
export default class ValidatorJS {
  constructor(translateFn = (key) => key) {
    this.translate = translateFn;
    this.Validator = Validator;
    this.Validator.formatters.customFormatFunc = this.customFormatFunc;
    this.Validator.convertErrorMessages = this.convertErrorMessages;
    this.customErrorMessages();
  }
  /** i was using required inside forms so i need to replace required with presence*/
  replaceRequiredToPresence = (constraints = {}, values = {}) => {
    constraints = Object.entries(constraints).reduce(
      (acc, [key, {required, ...ObjVal}]) => {
        /** state is always string meed to be converted */
        values[key] = ObjVal.type === "number" ? +values[key] : values[key];
        acc[key] = {presence: required, ...ObjVal};
        return acc;
      },
      {}
    );
    return {
      constraints,
      values
    };
  };
  /** overriding default messages with my own mesages */
  customErrorMessages = () => {
    this.Validator.validators.date.options = {};
    this.Validator.validators.datetime.options = {
      notValid: "notValid_DATETIME_VALIDATOR_ERROR_MSG",
      tooEarly: "tooEarly_DATETIME_VALIDATOR_ERROR_MSG",
      tooLate: "tooLate_DATETIME_VALIDATOR_ERROR_MSG"
    };
    this.Validator.validators.email.options = {
      message: "EMAIL_VALIDATOR_ERROR_MSG"
    };
    this.Validator.validators.equality.options = {
      message: "EQUALITY_VALIDATOR_ERROR_MSG"
    };
    this.Validator.validators.exclusion.options = {
      message: "EXCLUSION_VALIDATOR_ERROR_MSG"
    };
    this.Validator.validators.format.options = {
      message: "FORMAT_VALIDATOR_ERROR_MSG"
    };
    this.Validator.validators.inclusion.options = {
      message: "INCLUSION_VALIDATOR_ERROR_MSG"
    };
    this.Validator.validators.length.options = {
      notValid: "notValid_LENGTH_VALIDATOR_ERROR_MSG",
      tooLong: "tooLong_LENGTH_VALIDATOR_ERROR_MSG",
      tooShort: "tooShort_LENGTH_VALIDATOR_ERROR_MSG",
      wrongLength: "wrongLength_LENGTH_VALIDATOR_ERROR_MSG"
    };
    this.Validator.validators.numericality.options = {
      notValid: "notValid_NUMERICALITY_VALIDATOR_ERROR_MSG",
      notInteger: "notInteger_NUMERICALITY_VALIDATOR_ERROR_MSG",
      notGreaterThan: "notGreaterThan_NUMERICALITY_VALIDATOR_ERROR_MSG",
      notGreaterThanOrEqualTo:
        "notGreaterThanOrEqualTo_NUMERICALITY_VALIDATOR_ERROR_MSG",
      notEqualTo: "notEqualTo_NUMERICALITY_VALIDATOR_ERROR_MSG",
      notLessThan: "notLessThan_NUMERICALITY_VALIDATOR_ERROR_MSG",
      notLessThanOrEqualTo:
        "notLessThanOrEqualTo_NUMERICALITY_VALIDATOR_ERROR_MSG",
      notDivisibleBy: "notDivisibleBy_NUMERICALITY_VALIDATOR_ERROR_MSG",
      notOdd: "notOdd_NUMERICALITY_VALIDATOR_ERROR_MSG",
      notEven: "notEven_NUMERICALITY_VALIDATOR_ERROR_MSG"
    };
    this.Validator.validators.presence.options = {
      message: "PRESSENCE_VALIDATOR_ERROR_MSG"
    };
    this.Validator.validators.url.options = {
      message: "URL_VALIDATOR_ERROR_MSG"
    };
    this.Validator.validators.type.messages = {
      array: "array_TYPE_VALIDATOR_ERROR_MSG",
      boolean: "boolean_TYPE_VALIDATOR_ERROR_MSG",
      date: "date_TYPE_VALIDATOR_ERROR_MSG",
      integer: "integer_TYPE_VALIDATOR_ERROR_MSG",
      number: "number_TYPE_VALIDATOR_ERROR_MSG",
      object: "object_TYPE_VALIDATOR_ERROR_MSG",
      string: "string_TYPE_VALIDATOR_ERROR_MSG"
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
        value: this.Validator.stringifyValue(errorInfo.value, options)
      });
      ret.push(this.Validator.extend({}, errorInfo, {error: error}));
    });
    return ret;
  };
  /** uses translate with formatfunc */
  customFormatFunc = (errors) =>
    errors.reduce((acc, {validator, attribute, value, error}) => {
      acc[attribute] = this.translate(error, {
        validator,
        attribute,
        value,
        prettified: this.Validator.capitalize(this.translate(attribute))
      });
      return acc;
    }, {});
  /** communicate with internal validate */
  validate = (
    valuesOriginal = {},
    constraintsOrginal = {},
    options = {format: "customFormatFunc"}
  ) => {
    let {values, constraints} = this.replaceRequiredToPresence(
      constraintsOrginal,
      {
        ...valuesOriginal
      }
    );
    return this.Validator(values, constraints, options);
  };
}
