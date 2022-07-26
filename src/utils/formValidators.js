import {useState, useEffect, useRef} from "react";

export const useInputWithValidation = (initialValue, isOpen) => {
  const [value, setValue] = useState(initialValue);
  const [isRedacted, setIsRedacted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      resetInput();
    }
  }, [isOpen]);

  const onChange = (evt) => {
    changeValue(evt.target.value);
    setIsValid(evt.target.validity.valid);
    setValidationMessage(evt.target.validationMessage);
  }

  const changeValue = (newValue) => {
    setValue(newValue);
    setIsRedacted(true);
  }

  const resetInput = () => {
    setValue(initialValue);
    setIsRedacted(false);
    setIsValid(true);
  }

  return {
    value,
    isValid,
    isRedacted,
    validationMessage,
    onChange,
    "setValue": changeValue,
  }
}

export const useInputRefWithValidation = (initialValue, isOpen) => {
  const ref = useRef(initialValue);
  const [isRedacted, setIsRedacted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      resetInput();
    }
  }, [isOpen]);

  const onChange = (evt) => {
    setIsRedacted(true);
    setIsValid(evt.target.validity.valid);
    setValidationMessage(evt.target.validationMessage);
  }

  const resetInput = () => {
    ref.current.value = initialValue;
    setIsRedacted(false);
    setIsValid(true);
  }

  return {
    ref,
    isValid,
    isRedacted,
    validationMessage,
    onChange,
    setIsRedacted,
  }
}

export const useFormValid = (inputs) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(!inputs.some((input) => !input.isRedacted || !input.isValid));
  }, inputs);

  return [isFormValid, setIsFormValid];
}
