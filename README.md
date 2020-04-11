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

### Summary

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

The code is located inside the `msf.js` file. You've got two options:

1. Take the code from the file and manually place it inside the **before <\/body> tag** section of your page/project.
   > Remember to put the code iniside a <script><\/script> tag. It is recommended to first minify the code before placing it on your Webflow project, as it will reduce significantly the amount of characters used.
