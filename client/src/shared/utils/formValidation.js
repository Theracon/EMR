const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.isNumber) {
    isValid = !isNaN(value) && isValid;
  }

  if (rules.max) {
    isValid = +value <= rules.max && isValid;
  }

  if (rules.min) {
    isValid = +value >= rules.min && isValid;
  }

  if (rules.isEmail) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = re.test(String(value).toLowerCase()) && isValid;
  }

  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }

  return isValid;
};

export default checkValidity;
