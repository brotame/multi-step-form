/* Multi Step Form v1 */

class MSF {
  constructor(form, next, back, warningClass) {
    this.form = document.getElementById(form);
    this.next = document.getElementById(next);
    this.back = document.getElementById(back);
    this.mask = this.form.querySelector(".w-slider-mask");
    this.steps = this.form.querySelectorAll(".w-slide");
    this.warningClass = warningClass;
  }
}

let msfController = {
  init: (msf) => {
    let start = () => {
      setEventListeners();
      setSlideHeight(0);
    };

    let setEventListeners = () => {
      msf.next.addEventListener("click", nextClick);
      msf.back.addEventListener("click", backClick);
    };

    let setSlideHeight = (index) => {
      msf.mask.style.height = "";
      msf.mask.style.height = `${msf.steps[index].offsetHeight}px`;
    };

    let nextClick = (e) => {
      let currentStep = e.target.getAttribute("step");
      let requiredFields = checkRequiredInputs(currentStep);
      setConfirmValues(currentStep);
      console.log(requiredFields);
    };

    let checkRequiredInputs = (index) => {
      let requiredInputs = msf.steps[index].querySelectorAll("[required]");
      let filledInputs = 0;
      let pass;

      requiredInputs.forEach((el) => {
        if (el.value && el.type !== "email") {
          el.classList.remove(msf.warningClass);
          filledInputs++;
        } else if (el.value && el.type === "email") {
          let correctEmail = validateEmail(el.value);
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

    let setConfirmValues = (index) => {
      let inputs = msf.steps[index].querySelectorAll("input");

      inputs.forEach((el) => {
        let confirmElement = document.getElementById(`${el.id}-value`);

        if (el.value && confirmElement) {
          confirmElement.textContent = el.value;
        } else if (!el.value && confirmElement) {
          confirmElement.textContent = "";
        }
      });
    };

    let backClick = () => {};

    start();
  },
};

var Webflow = Webflow || [];
Webflow.push(function () {
  let msfUI = new MSF("msf", "msf-next", "msf-back", "warning");
  msfController.init(msfUI);
});
