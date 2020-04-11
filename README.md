# Multi Step Form for Webflow

A custom multi step form made for Webflow websites. You can check the cloneable project [here](https://webflow.com/website/Multi-Step-Form-with-Input-Validation).

 <img width="728" src="https://raw.githubusercontent.com/brotaonline/multi-step-form/master/screenshot.PNG" alt="Demo">

## How to use it

In order to make the form work as intended, you will need to set up some components in Webflow and add some custom code.

### Webflow setup

#### Form and slider

Place a slider inside the form that you want to use. Inside each slide, you can put all the inputs you want.
Give a unique ID to the form.

> Note: Make sure that you give the ID to the **Form** and not the _Form Block_.

#### Step change buttons

You can hide the slider arrows and navigation as you won't use them. Instead, place two buttons anywhere you want and give them a unique ID.

#### _Optional_: Inputs confirm

If you want to display the required inputs value that the user provided, you must:

1. Give the inputs a unique ID.
2. Place a text block or paragraph anywhere you want with the following ID: `InputID + "-value"`

> I.E: to display the value of an input that has a **#name** ID, just place a text block with **#name-value** as ID.

#### _Optional_: Submit an additional form on the first step

You can collect the data from the 1st step into a hidden form and submit it when the user moves to the 2nd step.
In order to do so, you must:

- Put a hidden form anywhere on the page and give it a unique ID.
- Place in the form the same inputs that you want to collect and give them the following ID: `"hidden-" + InputID`.

> I.E: to collect the text field that has **#name** ID, you must place in the hidden form a text field with **#hidden-name** as ID.

#### Recap

To sum up, the following items **must have a unique ID**:

- Form
- Next button
- Back button
- _Optional_: Inputs + Text blocks to display them
- _Optional_: Hidden Form
