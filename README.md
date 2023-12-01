# Mercedes-Benz.io QA Challenge

This repository contains the solution for the challenge provided by Mercedes-Benz.io for both the Manual Test and Automated test challenges developed by Fábio Dias.

## Task_1

Inside this folder it can be found the solution for the Manual Testing exercise.

Please download the PDF file to access the reported issues.

## Task_2

In this folder it can be found the solution for the Automated Testing exercise.

The solution was implemented based on the [Playwright](https://playwright.dev/) framework.

The implementation had in mind the PageObject pattern where four different pages are identified, making it easier to understand where the test steps are being performed.

In the test, can be found the user flow that aims to enquire a pre-owned car and, on the enquire form, input a mistaken email with the desired validation.

The file with the Model Year and VIN number is generated, as a CSV, after each test run.

### Requirements

Make sure to have the following requirements installed on your local machine

* [NodeJS ^20.10](https://nodejs.org/en/download)
* npm
```sh
  npm install npm@latest -g
  ```

### Installation

First and foremost, clone the repository via:
```sh
  git clone https://github.com/frpmd/mbio.git
  ```

Then intall all the necessary dependencies through:
```sh
  npm install
  ```

### Running the test

To run the test, navigate to the `Task_2` subfolder on your command prompt and run the following command:

* For chromium based browser
```sh
  npx playwright test --project chromium
  ```

* For firefox based browser
```sh
  npx playwright test --project firefox
  ```

### Reporting

After each execution a HTML report can be accessed through the command:
```sh
  npx playwright show-report
  ```