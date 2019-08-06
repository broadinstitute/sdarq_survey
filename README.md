
[![Total alerts](https://img.shields.io/lgtm/alerts/g/broadinstitute/new_service_requirements.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/broadinstitute/new_service_requirements/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/broadinstitute/new_service_requirements.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/broadinstitute/new_service_requirements/context:javascript)


# sdarq_survey
Security and Devops Applicable Requirements Questionnaire is a tool that serves as an entry point
for generating security requirements based on technical characteristics of new services that are 
built at DSP. 


The tool currently offers (what alternatives like Google Forms, Survey Builders etc cannot) :
- Generates requirements to developers in a dynamic fashion based on their answers
- Connects to a backend where it creates a new "security engagement" so that security team can easily track 
- Slack channel notification 

## Getting Started 

* ``cd backend``
*  ``python3 --version`` to make sure you have python3 installed
* ``python3 -m venv env``
* ``source env/bin/activate``
* ``pip3 install -r requirements.txt``
* ``cd frontend``
* ``npm install``

## Development server

#### Docker
##### Backend
* ``docker build -t sdarq-backend:latest .``
* ``docker run -d -p 5000:5000 sdarq-backend``

##### Frontend
* ``docker build -t sdarq-frontend:latest .``
* ``docker run -d -p 4200:4200 sdarq-frontend``

##### Docker-compose
* ``docker-compose -f docker-compose-dev.yml -p sdarq-dev up``
* ``docker-compose -f docker-compose-prod.yml -p sdarq-prod up``

## Form edition
* Change json in ``src/form/form.component.ts``  or 
* Create your own form in [Surveyjs](https://surveyjs.io/create-survey/) and paste json code at ``form.component.ts``

## Build

* Run `ng build` to build the project. 
* `ng build --prod` flag for a production build.

## Running unit tests

* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

* Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Questions

* Ask `appsec@broadinstitute.org`



