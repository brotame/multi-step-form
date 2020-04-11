/* Multi Step Form v1 */

class MSF {
  constructor(form, next, back, nextText, submitText, alertText, warningClass) {
    this.form = document.getElementById(form);
    this.next = document.getElementById(next);
    this.back = document.getElementById(back);
    this.submitButton = this.form.querySelector('input[type="submit"]');
    this.mask = this.form.querySelector(".w-slider-mask");
    this.steps = this.form.querySelectorAll(".w-slide");
    this.rightArrow = this.form.querySelector(".w-slider-arrow-right");
    this.leftArrow = this.form.querySelector(".w-slider-arrow-left");
    this.nextText = nextText;
    this.submitText = submitText;
    this.alertText = alertText;
    this.warningClass = warningClass;
  }

  setMaskHeight(index) {
    this.mask.style.height = "";
    this.mask.style.height = `${this.steps[index].offsetHeight}px`;
  }

  setStepAttribute(step) {
    this.next.setAttribute("step", step);
  }

  setNextButtonText(step) {
    if (step === this.steps.length - 1) {
      this.next.textContent = this.submitText;
    }
    if (step === this.steps.length - 2) {
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

  hideButtons() {
    this.next.style.display = "none";
    this.back.style.display = "none";
  }

  addWarningClass(target) {
    target.classList.add(this.warningClass);
  }

  removeWarningClass(target) {
    target.classList.remove(this.warningClass);
  }

  alertUser() {
    alert(this.alertText);
  }

  setConfirmValue(index) {
    let inputs = this.steps[index].querySelectorAll("input, select, textarea");

    inputs.forEach((el) => {
      let value, confirmElement;
      if (el.type === "radio") {
        let radioGroup = el.getAttribute("name");
        let isChecked = document.querySelector(
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
        confirmElement.textContent = "----";
      }
    });
  }
}

let msfController = {
  init: (msf) => {
    console.log(msf);
    let start = () => {
      setEventListeners();
      msf.setMaskHeight(0);
    };

    let setEventListeners = () => {
      msf.next.addEventListener("click", nextClick);
      msf.back.addEventListener("click", backClick);
    };

    let nextClick = () => {
      let currentStep = parseInt(msf.next.getAttribute("step"));
      let filledFields = checkRequiredInputs(currentStep);
      let selectedRadios = checkRequiredRadios(currentStep);
      let selectedCheckboxes = checkRequiredCheckboxes(currentStep);

      if (filledFields && selectedRadios && selectedCheckboxes) {
        msf.setConfirmValue(currentStep);
        currentStep++;
        msf.setStepAttribute(currentStep);
        if (currentStep === msf.steps.length) {
          msf.submitForm();
          msf.hideButtons();
        } else {
          msf.goNext();
          msf.setMaskHeight(currentStep);
          msf.setNextButtonText(currentStep);
        }
      } else {
        msf.alertUser();
      }
    };

    let backClick = () => {
      let currentStep = parseInt(msf.next.getAttribute("step"));
      let previousStep = currentStep - 1;

      msf.goBack();
      msf.setMaskHeight(previousStep);
      msf.setStepAttribute(previousStep);
      msf.setNextButtonText(previousStep);
    };

    let checkRequiredInputs = (index) => {
      let requiredInputs = msf.steps[index].querySelectorAll(
        "input[required], select[required], textarea[required]"
      );
      let filledInputs = 0;
      let pass;

      requiredInputs.forEach((el) => {
        if (el.value && el.type !== "email") {
          msf.removeWarningClass(el);
          filledInputs++;
        } else if (el.value && el.type === "email") {
          let correctEmail = validateEmail(el.value);
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

      filledInputs === requiredInputs.length ? (pass = true) : (pass = false);
      return pass;
    };

    let checkRequiredCheckboxes = (index) => {
      let requiredInputs = msf.steps[index].querySelectorAll(
        'input[type="checkbox"][required]'
      );
      let checkedInputs = 0;
      let pass;

      requiredInputs.forEach((el) => {
        let checkbox = el.parentNode.querySelector(".w-checkbox-input");

        if (el.checked) {
          if (checkbox) {
            msf.removeWarningClass(checkbox);
          }
          checkedInputs++;
        } else {
          if (checkbox) {
            msf.addWarningClass(checkbox);
          }
        }
      });

      checkedInputs === requiredInputs.length ? (pass = true) : (pass = false);
      return pass;
    };

    let checkRequiredRadios = (index) => {
      let requiredInputs = msf.steps[index].querySelectorAll(
        'input[type="radio"][required]'
      );
      let checkedInputs = 0;
      let pass;

      requiredInputs.forEach((el) => {
        let radio = el.parentNode.querySelector(".w-radio-input");
        let radioGroup = el.getAttribute("name");
        let isChecked = document.querySelector(
          `input[name="${radioGroup}"]:checked`
        );

        if (isChecked) {
          msf.removeWarningClass(radio);
          checkedInputs++;
        } else {
          msf.addWarningClass(radio);
        }
      });

      checkedInputs === requiredInputs.length ? (pass = true) : (pass = false);
      return pass;
    };

    let validateEmail = (email) => {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    start();
  },
};
