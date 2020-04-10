/* Multi Step Form v1 */

class MSF {
  constructor(form, next, back, nextText, submitText, alertText, warningClass) {
    this.form = document.getElementById(form);
    this.next = document.getElementById(next);
    this.back = document.getElementById(back);
    this.submit = this.form.querySelector('input[type="submit"]');
    this.mask = this.form.querySelector(".w-slider-mask");
    this.steps = this.form.querySelectorAll(".w-slide");
    this.rightArrow = this.form.querySelector(".w-slider-arrow-right");
    this.leftArrow = this.form.querySelector(".w-slider-arrow-left");
    this.nextText = nextText;
    this.submitText = submitText;
    this.alertText = alertText;
    this.warningClass = warningClass;
  }
}

let msfController = {
  init: (msf) => {
    console.log(msf);
    let start = () => {
      setEventListeners();
      setMaskHeight(0);
    };

    let setEventListeners = () => {
      msf.next.addEventListener("click", nextClick);
      msf.back.addEventListener("click", backClick);
    };

    let setMaskHeight = (index) => {
      msf.mask.style.height = "";
      msf.mask.style.height = `${msf.steps[index].offsetHeight}px`;
    };

    let nextClick = () => {
      let currentStep = parseInt(msf.next.getAttribute("step"));
      let filledFields = checkRequiredInputs(currentStep);
      let selectedRadios = checkRequiredRadios(currentStep);
      let selectedCheckboxes = checkRequiredCheckboxes(currentStep);

      if (filledFields && selectedRadios && selectedCheckboxes) {
        currentStep++;
        msf.next.setAttribute("step", currentStep);
        if (currentStep === msf.steps.length) {
          msf.submit.click();
          msf.next.style.display = "none";
          msf.back.style.display = "none";
        } else {
          msf.rightArrow.click();
          setMaskHeight(currentStep);
          if (currentStep === msf.steps.length - 1) {
            msf.next.textContent = msf.submitText;
          }
        }
      } else {
        alert(msf.alertText);
      }
    };

    let backClick = () => {
      let currentStep = parseInt(msf.next.getAttribute("step"));
      let previousStep = currentStep - 1;

      msf.leftArrow.click();
      setMaskHeight(previousStep);
      msf.next.setAttribute("step", previousStep);
      if (previousStep === msf.steps.length - 2) {
        msf.next.textContent = msf.nextText;
      }
    };

    let checkRequiredInputs = (index) => {
      let requiredInputs = msf.steps[index].querySelectorAll(
        "input[required], select[required], textarea[required]"
      );
      let filledInputs = 0;
      let pass;

      requiredInputs.forEach((el) => {
        let value = el.value;
        setConfirmValue(el.id, value);

        if (value && el.type !== "email") {
          el.classList.remove(msf.warningClass);
          filledInputs++;
        } else if (value && el.type === "email") {
          let correctEmail = validateEmail(value);
          if (correctEmail) {
            el.classList.remove(msf.warningClass);
            filledInputs++;
          } else {
            el.classList.add(msf.warningClass);
          }
        } else {
          el.classList.add(msf.warningClass);
        }
      });

      filledInputs === requiredInputs.length ? (pass = true) : (pass = false);
      return pass;
    };

    let validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    let checkRequiredCheckboxes = (index) => {
      let requiredInputs = msf.steps[index].querySelectorAll(
        'input[type="checkbox"][required]'
      );
      let checkedInputs = 0;
      let pass;

      requiredInputs.forEach((el) => {
        let checkbox = el.parentNode.querySelector(".w-checkbox-input");
        let value = el.value;
        setConfirmValue(el.id, value);

        if (el.checked) {
          if (checkbox) {
            checkbox.classList.remove(msf.warningClass);
          }
          checkedInputs++;
        } else {
          if (checkbox) {
            checkbox.classList.add(msf.warningClass);
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
          setConfirmValue(radioGroup, isChecked.value);
          radio.classList.remove(msf.warningClass);
          checkedInputs++;
        } else {
          radio.classList.add(msf.warningClass);
        }
      });

      checkedInputs === requiredInputs.length ? (pass = true) : (pass = false);
      return pass;
    };

    let setConfirmValue = (id, value) => {
      let confirmElement = document.getElementById(`${id}-value`);

      if (value && confirmElement) {
        confirmElement.textContent = value;
      } else if (!value && confirmElement) {
        confirmElement.textContent = "----";
      }
    };

    start();
  },
};

var Webflow = Webflow || [];
Webflow.push(function () {
  let msfUI = new MSF(
    "msf",
    "msf-next",
    "msf-back",
    "Next",
    "Submit",
    "Please, fill all the required fields.",
    "warning"
  );
  msfController.init(msfUI);
});
