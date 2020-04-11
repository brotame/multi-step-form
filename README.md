# Multi Step Form for Webflow

A custom multi step form made for Webflow websites. You can check the cloneable project [here](https://webflow.com/website/Multi-Step-Form-with-Input-Validation).

<a href="https://webflow.com/website/Multi-Step-Form-with-Input-Validation"><img width="728" src="https://raw.githubusercontent.com/brotaonline/multi-step-form/master/screenshot.PNG" alt="Demo"></a>

# How to use it

In order to make the form work as intended, you will need to set up some components in Webflow and add some custom code.

## Webflow setup

### Form and slider

Place a slider inside the form that you are using. Inside each slide, you can put all the inputs you want.
Make sure that:

- The form has a submit button placed anywhere inside it. **Hide it** as the _Next_ button will replace its functionality.
- The form has a unique ID. `I.E: #form`

> Note: Make sure that you give the ID to the **Form** element and not to the _Form Block_ element.

### Step change buttons

You can hide the slider arrows and navigation as you won't use them. Instead, place two buttons **anywhere you want** and give them a unique ID.

> I.E: place a button with **#next** ID for the _Next Step_ functionality, and a button with **#back** ID for the _Previous Step_ functionality.

It is recommended to hide the Back button in the first slide using Webflow interactions to avoid confusing users.

### Warning class

When an input is not filled, the script adds a CSS class to it. You can create the CSS class using Webflow itself or via custom code. I.E:

```html
<style>
  .warning {
    border-color: red;
  }
</style>
```

If you want to apply the class to the _Checkboxes_ and _Radio_ inputs, make sure to set the style to **Custom** inside the element settings in the Webflow designer.

### _Optional_: Inputs confirm

If you want to display the value of the inputs that the user provided, you must:

1. Give the inputs that you want to display a unique ID.
2. Place a text block or a paragraph anywhere you want with the following ID: `InputID + "-value"`

> I.E: to display the value of an input that has a **#name** ID, just place a text block with **#name-value** as ID.

### _Optional_: Submit an additional form on the first step

You can collect the data from the 1st step into a hidden form and submit it when the user moves to the 2nd step.
In order to do so, you must:

1. Place a hidden form anywhere on the page and give it a unique ID. `I.E: #hidden-form`
2. In the form, place the same inputs that you want to collect and give them the following ID: `"hidden-" + InputID`.

> I.E: to collect the email field that has **#email** ID, you must place in the hidden form an email field with **#hidden-email** as ID.

### Webflow Setup Summary

To sum up, the following items **must have a unique ID**:

- Form. `I.E: #form`
- Next button. `I.E: #next`
- Back button. `I.E: #back`
- _Optional_: Inputs + Text Blocks or Paragraphs to display them. `I.E: #name --> #name-value`
- _Optional_: Hidden Form. `I.E: #hidden-form`
- _Optional_: Hidden Inputs that collect the first step fields. `I.E: #email --> #hidden-email`

## Custom Code

In order to make the form work, you must setup the script and initialize it:

### Setup the script

The code is located inside the `/dist/msf.js` file.
You've got two options (**only do one of them**):

1. Take the code from the file and manually place it inside the **before <\/body> tag** section of your page.

   > Remember to put the code inside a <script><\/script> tag. It is recommended first minify the code as it will reduce significantly the amount of characters used.

2. Include the script tag below in the **before <\/body> tag** section of your page:

```html
<script src="https://cdn.jsdelivr.net/gh/brotaonline/multi-step-form@1.3/dist/msf.min.js"></script>
```

### Initialize the script

Place the script tag below in the **before <\/body> tag** section of your page after the main script.
Replace the following strings:

- FORM_ID: the ID of the Form element. `I.E: form`
- NEXT_BUTTON_ID: the ID of the Next button. `I.E: next`
- BACK_BUTTON_ID: the ID of the Back button. `I.E: back`
- NEXT_BUTTON_TEXT: the text inside the Next button. This is required because the script changes the text of the Next button when the user reaches the last step. `I.E: Next`
- SUBMIT_BUTTON_TEXT: the text that you want to display when the user reaches the last step. `I.E: Submit`
- ALERT_TEXT: the text that you want to show when some inputs are not filled. `I.E: Please, fill all the required fields.`
- WARNING_CLASS: the CSS class that you want to add to the inputs that are not filled. `I.E: warning`
- **OPTIONAL:** HIDDEN_FORM_ID: the ID of the Hidden Form element. If you are not using this functionality, just delete this field. `I.E: hidden-form`

```html
<script>
  var Webflow = Webflow || [];
  Webflow.push(function () {
    let msfData = new MSF(
      "FORM_ID",
      "NEXT_BUTTON_ID",
      "BACK_BUTTON_ID",
      "NEXT_BUTTON_TEXT",
      "SUBMIT_BUTTON_TEXT",
      "ALERT_TEXT",
      "WARNING_CLASS",
      "OPTIONAL_HIDDEN_FORM_ID"
    );
    msfController.init(msfData);
  });
</script>
```

#### Initialize examples

Form that doesn't use the hidden form functionality:

```html
<script>
  var Webflow = Webflow || [];
  Webflow.push(function () {
    let msfData = new MSF(
      "msf",
      "msf-next",
      "msf-back",
      "Next",
      "Submit",
      "Please, fill all the required fields.",
      "warning"
    );
    msfController.init(msfData);
  });
</script>
```

Form that uses the hidden form functionality:

```html
<script>
  var Webflow = Webflow || [];
  Webflow.push(function () {
    let msfData = new MSF(
      "multi-step-form",
      "next-button",
      "back-button",
      "Next Step",
      "Send",
      "There are some fields that are not filled.",
      "red-border",
      "hidden-form"
    );
    msfController.init(msfData);
  });
</script>
```
