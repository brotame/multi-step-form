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
    this.mask = this.form.querySelector('.w-slider-mask');
    this.steps = this.form.querySelectorAll('.w-slide');
    this.rightArrow = this.form.querySelector('.w-slider-arrow-right');
    this.leftArrow = this.form.querySelector('.w-slider-arrow-left');
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
      'input, select, textarea'
    );
    return Array.from(inputs);
  }

  setMaskHeight() {
    this.mask.style.height = '';
    this.mask.style.height = `${this.steps[this.currentStep].offsetHeight}px`;
  }

  setNextButtonText() {
    if (this.currentStep === this.steps.length - 1)
      this.next.textContent = this.submitText;
    if (this.currentStep === this.steps.length - 2)
      this.next.textContent = this.nextText;
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

    inputs.forEach((input) => {
      const hiddenInput = document.getElementById(`hidden-${input.id}`);

      if (hiddenInput) hiddenInput.value = input.value;
    });

    this.hiddenSubmitButton.click();
  }

  hideButtons() {
    this.next.style.display = 'none';
    this.back.style.display = 'none';
  }

  addWarningClass(target) {
    target.classList.add(this.warningClass);
  }

  removeWarningClass(target) {
    target.classList.remove(this.warningClass);
  }

  showAlert() {
    if (this.alertText) alert(this.alertText);
    if (this.alertElement) this.alertElement.classList.remove('hidden');
  }

  hideAlert() {
    if (this.alertElement) this.alertElement.classList.add('hidden');
  }

  setConfirmValues() {
    const inputs = this.getInputs(this.currentStep);

    inputs.forEach((input) => {
      let value, confirmElement;

      if (input.type === 'radio') {
        const radioGroup = input.getAttribute('name');
        const isChecked = document.querySelector(
          `input[name="${radioGroup}"]:checked`
        );

        if (isChecked) {
          value = isChecked.value;
          confirmElement = document.getElementById(`${radioGroup}-value`);
        }
      } else {
        value = input.value;
        confirmElement = document.getElementById(`${input.id}-value`);
      }

      if (!confirmElement) return;

      confirmElement.textContent = value ? value : '-';
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
      msf.next.addEventListener('click', nextClick);
      msf.back.addEventListener('click', backClick);
      if (msf.hiddenForm) {
        msf.rightArrow.addEventListener(
          'click',
          () => {
            msf.submitHiddenForm(0);
          },
          { once: true }
        );
      }
    };

    const nextClick = () => {
      const filledFields = checkRequiredInputs(msf.currentStep);

      if (!filledFields) {
        msf.showAlert();
        return;
      }

      msf.setConfirmValues();
      msf.currentStep++;

      if (msf.currentStep === msf.steps.length) {
        msf.submitForm();
        msf.hideButtons();
      } else {
        msf.goNext();
        msf.setMaskHeight();
        msf.setNextButtonText();
      }

      msf.hideAlert();
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
      const requiredInputs = inputs.filter((input) => input.required);
      const requiredCheckboxes = requiredInputs.filter(
        (input) => input.type === 'checkbox'
      );
      const requiredRadios = requiredInputs.filter(
        (input) => input.type === 'radio'
      );
      let filledInputs = 0;

      requiredInputs.forEach((input) => {
        if (!input.value) {
          msf.addWarningClass(input);
          return;
        }

        if (input.type === 'email') {
          const correctEmail = validateEmail(input.value);
          if (!correctEmail) {
            msf.addWarningClass(input);
            return;
          }

          msf.removeWarningClass(input);
          filledInputs++;
          return;
        }

        msf.removeWarningClass(input);
        filledInputs++;
      });

      requiredCheckboxes.forEach((input) => {
        const checkbox = input.parentNode.querySelector('.w-checkbox-input');

        if (!input.checked) {
          if (checkbox) msf.addWarningClass(checkbox);
          return;
        }

        if (checkbox) msf.removeWarningClass(checkbox);
        filledInputs++;
      });

      requiredRadios.forEach((input) => {
        const radio = input.parentNode.querySelector('.w-radio-input');
        const radioGroup = input.getAttribute('name');
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
