# Multi Step Form for Webflow

A custom multi step form made for Webflow websites. You can check the cloneable project [here](https://webflow.com/website/Multi-Step-Form-with-Input-Validation).

 <img width="728" src="https://raw.githubusercontent.com/brotaonline/multi-step-form/master/screenshot.PNG" alt="Demo">

## How to use it

In order to make the form work as intended, you will need to set up some components in Webflow and add some custom code.

### Webflow setup

The setup requires the use of...

#### Form and slider

Place a slider inside the form that you want to use. Inside each slide, you can put all the inputs you want.
Give a unique ID to the form.

> Note: Make sure that you give the ID to the **Form** and not the _Form Block_.

#### Step change buttons

You can hide the slider arrows and navigation as you won't use them. Instead, place two buttons anywhere you want and give them a unique ID.

#### Optional: Inputs confirm

If you want to display the required inputs value that the user provided, just place a text block anywhere you want with the following ID: `Input ID + "-value"`

> I.E: to display the value of an input that has a #name ID, just place a text block with #name-value as ID.

#### Recap

To sum up, the following items must have a unique ID:

- Form
- Next button
- Back button
- (Optional) Inputs + Text blocks to display them
- (Optional) Hidden Form
