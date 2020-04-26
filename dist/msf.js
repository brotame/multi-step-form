/**
 * Multi Step Form functionality for Webflow
 * MIT License © Alex Iglesias - https://brota.me.
 */

class MSF {
  constructor(data) {
    this.currentStep = 0;
    this.form = document.getElementById(data.formID);
    this.next = document.getElementById(data.nextButtonID);
    this.back = document.getElementById(data.backButtonID);
    this.submitButton = this.form.querySelector('input[type="submit"]');
    this.mask = this.form.querySelector(".w-slider-mask");
    this.steps = this.form.querySelectorAll(".w-slide");
    this.rightArrow = this.form.querySelector(".w-slider-arrow-right");
    this.leftArrow = this.form.querySelector(".w-slider-arrow-left");
    this.nextText = data.nextButtonText;
    this.submitText = data.submitButtonText;
    this.warningClass = data.warningClass;
    this.alertText = data.alertText;
    if (data.alertElementID) {
      this.alertElement = document.getElementById(data.alertElementID);
    }
    if (data.hiddenFormID) {
      this.hiddenForm = document.getElementById(data.hiddenFormID);
      this.hiddenSubmitButton = this.hiddenForm.querySelector(
        'input[type="submit"]'
      );
    }
  }

  getInputs(index) {
    const inputs = this.steps[index].querySelectorAll(
      "input, select, textarea"
    );
    return Array.from(inputs);
  }

  setMaskHeight() {
    this.mask.style.height = "";
    this.mask.style.height = `${this.steps[this.currentStep].offsetHeight}px`;
  }

  setNextButtonText() {
    if (this.currentStep === this.steps.length - 1) {
      this.next.textContent = this.submitText;
    }
    if (this.currentStep === this.steps.length - 2) {
      this.next.textContent = this.nextText;
    }
  }

  goNext() {
    this.rightArrow.click();
  }

  goBack() {
    this.leftArrow.click();
  }

  submitForm() {
    this.submitButton.click();
  }

  submitHiddenForm(index) {
    const inputs = this.getInputs(index);

    inputs.forEach((el) => {
      const hiddenInput = document.getElementById(`hidden-${el.id}`);

      if (hiddenInput) {
        hiddenInput.value = el.value;
      }
    });

    this.hiddenSubmitButton.click();
  }

  hideButtons() {
    this.next.style.display = "none";
    this.back.style.display = "none";
  }

  addWarningClass(target) {
    if (this.warningClass) {
      target.classList.add(this.warningClass);
    }
  }

  removeWarningClass(target) {
    if (this.warningClass) {
      target.classList.remove(this.warningClass);
    }
  }

  showAlert() {
    if (this.alertText) {
      alert(this.alertText);
    }

    if (this.alertElement) {
      this.alertElement.classList.remove("hidden");
    }
  }

  hideAlert() {
    if (this.alertElement) {
      this.alertElement.classList.add("hidden");
    }
  }

  setConfirmValues(index) {
    const inputs = this.getInputs(index);

    inputs.forEach((el) => {
      let value, confirmElement;
      if (el.type === "radio") {
        const radioGroup = el.getAttribute("name");
        const isChecked = document.querySelector(
          `input[name="${radioGroup}"]:checked`
        );

        if (isChecked) {
          value = isChecked.value;
          confirmElement = document.getElementById(`${radioGroup}-value`);
        }
      } else {
        value = el.value;
        confirmElement = document.getElementById(`${el.id}-value`);
      }

      if (value && confirmElement) {
        confirmElement.textContent = value;
      } else if (!value && confirmElement) {
        confirmElement.textContent = "-";
      }
    });
  }
}

const msfController = {
  init: (msf) => {
    const start = () => {
      setEventListeners();
      msf.setMaskHeight(0);
    };

    const setEventListeners = () => {
      msf.next.addEventListener("click", nextClick);
      msf.back.addEventListener("click", backClick);
      if (msf.hiddenForm) {
        msf.rightArrow.addEventListener(
          "click",
          () => {
            msf.submitHiddenForm(0);
          },
          {
            once: true,
          }
        );
      }
    };

    const nextClick = () => {
      const filledFields = checkRequiredInputs(msf.currentStep);

      if (filledFields) {
        msf.setConfirmValues(msf.currentStep);
        msf.currentStep++;
        if (msf.currentStep === msf.steps.length) {
          msf.submitForm();
          msf.hideButtons();
          msf.hideAlert();
        } else {
          msf.goNext();
          msf.setMaskHeight();
          msf.setNextButtonText();
          msf.hideAlert();
        }
      } else {
        msf.showAlert();
      }
    };

    const backClick = () => {
      const previousStep = msf.currentStep - 1;

      if (previousStep >= 0) {
        msf.goBack();
        msf.currentStep = previousStep;
        msf.setMaskHeight();
        msf.setNextButtonText();
        msf.hideAlert();
      }
    };

    const checkRequiredInputs = (index) => {
      const inputs = msf.getInputs(index);
      const requiredInputs = inputs.filter((el) => el.required);
      const requiredCheckboxes = requiredInputs.filter(
        (el) => el.type === "checkbox"
      );
      const requiredRadios = requiredInputs.filter((el) => el.type === "radio");
      let filledInputs = 0;

      requiredInputs.forEach((el) => {
        if (el.value && el.type !== "email") {
          msf.removeWarningClass(el);
          filledInputs++;
        } else if (el.value && el.type === "email") {
          const correctEmail = validateEmail(el.value);
          if (correctEmail) {
            msf.removeWarningClass(el);
            filledInputs++;
          } else {
            msf.addWarningClass(el);
          }
        } else {
          msf.addWarningClass(el);
        }
      });

      requiredCheckboxes.forEach((el) => {
        const checkbox = el.parentNode.querySelector(".w-checkbox-input");

        if (el.checked) {
          if (checkbox) {
            msf.removeWarningClass(checkbox);
          }
          filledInputs++;
        } else {
          if (checkbox) {
            msf.addWarningClass(checkbox);
          }
        }
      });

      requiredRadios.forEach((el) => {
        const radio = el.parentNode.querySelector(".w-radio-input");
        const radioGroup = el.getAttribute("name");
        const isChecked = document.querySelector(
          `input[name="${radioGroup}"]:checked`
        );

        if (isChecked) {
          msf.removeWarningClass(radio);
          filledInputs++;
        } else {
          msf.addWarningClass(radio);
        }
      });

      return filledInputs ===
        requiredInputs.length +
          requiredCheckboxes.length +
          requiredRadios.length
        ? true
        : false;
    };

    const validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    start();
  },
};
