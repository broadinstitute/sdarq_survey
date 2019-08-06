import { Component, OnInit } from '@angular/core';
import { SendFormDataService } from '../send-form-data.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private sendForm: SendFormDataService) { }

  ngOnInit() {}

  json = {
    showProgressBar: 'top',
    showQuestionNumbers: 'false',
    pages: [
      {
        'name': 'Metadata',
        'elements': [
          {
            'type': 'text',
            'name': 'Service',
            'title': 'The name of the application/service',
            'isRequired': true
          },
          {
            'type': 'comment',
            'name': 'Description',
            'title': 'A brief description of the application/service (provide link to external doc if easier)',
            'isRequired': true
          },
          {
            'type': 'text',
            'name': 'Security champion',
            'title': 'Security champion (main point of contact from a security perspective):',
            'isRequired': true
          },
          {
            'type': 'text',
            'name': 'Github URL',
            'title': 'Github URL (N/A if you have not written a line of code yet)',
            'isRequired': true
          },
          {
            'type': 'text',
            'name': 'Architecture Diagram',
            'title': 'Link to Architecture Diagram, ideally a Lucidchart diagram.',
            'isRequired': true
          }
        ],
        'title': 'Metadata'
      },
      {
        'name': 'Compliance',
        'elements': [
          {
            'type': 'radiogroup',
            'name': 'Compliance',
            'title': 'Is an SIA needed? In order to determine this please select what\'s applicable. My application:',
            'choices': [
              {
                'value': 'Uses a Global Load Balancer that doesn’t already exist',
                'text': ' Uses a Global Load Balancer that doesn’t already exist '
              },
              {
                'value': 'Cloud Function that access https directly from Internet',
                'text': ' Is a new Cloud Function that access https directly from Internet '
              },
              {
                'value': 'New GAE app that doesn’t use Firewall Rules to limit the app that can talk to it',
                'text': ' Is a new GAE application that doesn’t use Firewall Rules to limit the applications that can talk to it '
              },
              {
                'value': 'Not behind our “Orchestration” layer or API Gateway',
                'text': ' Is not behind our “Orchestration” layer or API Gateway '
              },
              {
                'value': 'Uses a new cloud component (GCP) that hasn’t been used before by our microservices',
                'text': ' Uses a new cloud component (Google service) that hasn’t been used before by our microservices. How can you tell if your component is new? See the Service-Oriented Architecture section of the FireCloud Design Specification. If the service you are introducing does NOT rely in what\'s already in the list please select this checkbox and update the Doc by adding your service'
              }
            ]
          }
        ],
        'title': 'Compliance'
      },
      {
        'name': 'Architecture',
        'elements': [
          {
            'type': 'radiogroup',
            'name': 'Architecture',
            'title': 'Your service must be based on one of the following',
            'hasOther': true,
            'choices': [
              {
                'value': 'GAE',
                'text': ' Based in GAE (Google App Engine) '
              },
              {
                'value': 'GCF',
                'text': 'Based in GCF (Google Cloud Functions)'
              },
              {
                'value': 'GKE',
                'text': ' Based in GKE (Google Kubernetes Engine) '
              }
            ],
            'otherText': 'Other'
          }
        ],
        'title': 'Architecture'
      },
      {
        'name': 'Security',
        'elements': [
          {
            'type': 'checkbox',
            'name': 'Security tools',
            'title': 'Please select applicable items',
            'choices': [
              {
                'value': 'Sourceclear',
                'text': 'We are currently using SourceClear for downstream dependency/3rd party component management '
              },
              {
                'value': 'Git-secrets',
                'text': 'We are currently using git-secrets in our repo '
              },
              {
                'value': 'Vault',
                'text': 'We are currently using Vault to store our secrets '
              },
              {
                'value': 'Sentry',
                'text': ' We are currently using Sentry '
              },
              {
                'value': 'Codacy',
                'text': 'We are currently using Codacy for security static code analysis'
              }
            ]
          },
          {
            'type': 'radiogroup',
            'name': 'ApacheProxy for frontend encryption',
            'title': 'Are you using the Apache Proxy for the front-end to your application to terminate Encryption?',
            'choices': [
              'Yes',
              'No'
            ]
          },
          {
            'type': 'comment',
            'name': 'Https implementation',
            'visibleIf': '{ApacheProxy for frontend encryption} = \"No\"',
            'title': 'Explain how you are implementing HTTPS',
            'enableIf': '{ApacheProxy for frontend encryption} = \"No\"'
          },
          {
            'type': 'checkbox',
            'name': 'Applicable',
            'title': 'Check what\'s applicable',
            'choices': [
              {
                'value': 'Certificate for a non-*.dsde-.broadinstitute.org URL',
                'text': 'I need a certificate for a non-*.dsde-.broadinstitute.org URL '
              },
              {
                'value': 'Using persistent storage',
                'text': 'We are using persistent storage (other than a SQL database)'
              }
            ]
          }
        ],
        'title': 'Security'
      },
      {
        'name': 'Logging',
        'elements': [
          {
            'type': 'radiogroup',
            'name': 'Logging',
            'title': 'Are you currently logging or plan to log to either Logit.io or Stackdriver?',
            'choices': [
              'Yes',
              'No'
            ]
          },
          {
            'type': 'radiogroup',
            'name': 'Logs persistence for at least 180 days',
            'visibleIf': '{Logging} = \"Yes\"',
            'title': 'Do logs persist for at least 180 days in a searchable form?',
            'enableIf': '{Logging} = \"Yes\"',
            'choices': [
              'Yes',
              'No'
            ]
          },
          {
            'type': 'radiogroup',
            'name': 'Are logs reviewed',
            'visibleIf': '{Logging} = \"Yes\"',
            'title': 'Are those logs being reviewed by either humans or are alerts set up for anomalous situations?',
            'enableIf': '{Logging} = \"Yes\"',
            'choices': [
              'Yes',
              'No'
            ]
          },
          {
            'type': 'radiogroup',
            'name': 'Authent/Authorz attemps logged',
            'visibleIf': '{Logging} = \"Yes\"',
            'title': 'Are failed authentication and authorization attempts also logged?',
            'enableIf': '{Logging} = \"Yes\"',
            'choices': [
              'Yes',
              'No'
            ]
          }
        ],
        'title': 'Logging',
        'description': 'Application logging should be always be included for security events. Application logs provide invaluable data for indentifying security incidents, monitoring policy violations, providing information about problems and unusual conditions. They might also be used to record other types of events too such as audit trails e.g. data addition, modification and deletion, data exports, as well as data for subsequent requests for information e.g. data subject access, freedom of information, litigation, police and other regulatory investigations.'
      },
      {
        'name': 'Testing',
        'elements': [
          {
            'type': 'radiogroup',
            'name': 'Unit testing',
            'title': 'How would you describe the code coverage of your unit tests?',
            'choices': [
              {
                'value': 'Robust',
                'text': 'Robust: The vast majority of our code is tested or will be tested through unit tests. '
              },
              {
                'value': 'Weak',
                'text': ' Weak: We have some unit testing, but much of the code is not tested and have no plan of changing it in the future. '
              },
              {
                'value': 'Nonexistent',
                'text': ' Nonexistent: We currently have no (or almost no) unit tests.'
              }
            ]
          },
          {
            'type': 'radiogroup',
            'name': 'Integration testing',
            'title': 'How would you describe the code coverage of your integration tests?',
            'choices': [
              {
                'value': 'Robust',
                'text': 'Robust: The vast majority of our code is tested or will be tested through integration tests. '
              },
              {
                'value': 'Weak',
                'text': 'Weak: We have some integration testing, but much of the code is not tested and have no plan of changing it in the future. '
              },
              {
                'value': 'Nonexistent',
                'text': ' Nonexistent: We currently have no (or almost no) integration tests.'
              }
            ]
          },
          {
            'type': 'radiogroup',
            'name': 'Performance testing',
            'title': 'How would you describe the code coverage of your performance tests?',
            'choices': [
              {
                'value': 'Robust',
                'text': 'Robust: The vast majority of our code is tested or will be tested through performance/scale tests. '
              },
              {
                'value': 'Weak',
                'text': ' Weak: We have some performance testing, but much of the code is not tested and have no plan of changing it in the future. '
              },
              {
                'value': 'Nonexistent',
                'text': ' Nonexistent: We currently have no (or almost no) performance tests.'
              }
            ]
          },
          {
            'type': 'radiogroup',
            'name': 'Post-launch monitoring',
            'title': 'How would you describe your post-launch monitoring?',
            'choices': [
              {
                'value': 'Robust',
                'text': 'Robust: We have procedures in place to log and monitor for unexpected crashes, exceptions, and other error conditions. If something looks suspicious, a security-conscious engineer evaluates it. '
              },
              {
                'value': 'Weak',
                'text': 'Weak: If something goes terribly wrong, such as massive spikes in crash rates or other large-scale anomalies, we will probably notice. But our monitoring is fairly coarse, and there is room for improvement. '
              },
              {
                'value': 'Nonexistent',
                'text': ' Nonexistent: At the moment, we are not doing any kind of post-release monitoring that looks for signs of exploitation or increases in crashes/exceptions.'
              }
            ]
          }
        ],
        'title': 'Testing',
        'description': 'Simple unit tests: Unit tests are typically used to confirm that the basic building blocks of the application work as expected. Unit tests are easy to repeat — they can run whenever new code is checked into the repository, to confirm that the code still behaves as expected. Unit tests can also check for security features. For example, they can be used to confirm that authentication is required to access user data; or that unexpected HTML tags can\'t get through input filters or escaping routines.\nIntegration testing: Testing performed to expose defects in the interfaces and in the interactions between integrated components or systems.\nPerformance/Monitoring testing: Once the application is deployed, the focus usually shifts from testing to monitoring. Watch out for unexpected spikes in error rates, sandbox violations, and other flaky or inexplicable behavior (including intermittent test failures) — and before you dismiss an anomaly, check with your security team. Crashes and flakiness can indicate a race condition or a memory corruption bug (if applicable).'
      },
      {
        'name': 'Deployment',
        'elements': [
          {
            'type': 'checkbox',
            'name': 'Deployment',
            'title': 'Please select what\'s applicable',
            'choices': [
              {
                'value': 'Config files do NOT contain any secrets ',
                'text': 'Our Deployment config files do NOT contain any secrets '
              },
              {
                'value': 'Config files are templatized ',
                'text': ' Our Deployment config files are templatized '
              },
              {
                'value': 'Scripted solution for CI and CD',
                'text': ' We have a scripted solution for CI and CD'
              }
            ]
          }
        ],
        'title': 'Deployment'
      },
      {
        'name': 'Reliability',
        'elements': [
          {
            'type': 'checkbox',
            'name': 'Reliability',
            'title': 'Please select what\'s applicable',
            'choices': [
              {
                'value': 'Status endpoint to indicate service health',
                'text': ' We have a status endpoint to indicate service health (it should monitor real things like database connections and downstream dependencies) '
              },
              {
                'value': 'Relic synthetic monitor',
                'text': ' We have a New Relic synthetic monitor configured to monitor status '
              },
              {
                'value': 'PagerDuty for our new service',
                'text': ' We have configured PagerDuty for our new service '
              },
              {
                'value': 'New Relic agent installed',
                'text': ' New Relic agent installed and reporting data to New Relic SRE indicators (api error rate and response time) '
              },
              {
                'value': 'Service is able to scale in response to load',
                'text': ' Our service is able to scale in response to load, either manually or automatically '
              },
              {
                'value': 'An on-call playbook for the service, linked it into the main on-call documentation',
                'text': ' We have created an on-call playbook for your service, linked it into the main on-call documentation?'
              }
            ]
          }
        ],
        'title': 'Reliability'
      },
      {
        'name': 'Notes',
        'elements': [
          {
            'type': 'comment',
            'name': 'Notes',
            'title': 'Provide any additional information that you think it\'s important in regards to your application/service'
          }
        ],
        'title': 'Notes'
      },
      {
        'name': 'Alerts',
        'elements': [
          {
            'type': 'html',
            'name': 'Alert-general',
            'html': '<strong>Tip</strong> Please reach out to AppSec team for initial security discussion. This is basically a\n            Threat Modeling and Security Architecture Review session. The main purpose of the meeting is for us to take\n            an iterative, recursive look at the architecture and design of a new service/system.'
          },
          {
            'type': 'html',
            'name': 'Alert-Compliance',
            'html': '<strong>Warning — possible high-risk issue!</strong> Get Started with the SIA doc:\n         <ul>\n           <li><a href=\"https://docs.google.com/document/d/1IPsRaAXboI48YaUYDyID15Q2W5gizaH6LTzQN0i_gJs/edit\">SIA Doc</a>\n               Build a concept of operations/Security Impact Assessment document. The SIA should be placed in\n               <a href=\"https://drive.google.com/drive/folders/1xIJmmkv3nn6Rq4cWMH5_CaIhVf0D-VLG\">this google drive folder</a>.\n           </li>\n           <li>Update the<a href=\"https://docs.google.com/document/d/1HZNxtX4sbUD-MdgLB1x66v2-bcKdYCh9a-t7a5NPQps/edit#heading=h.k2buho6j0gen\">\n               FireCloud Design Specification Document</a></li>\n           <li>Update the <a href=\"https://www.lucidchart.com/documents/edit/fd25eae4-291a-409a-8859-1ac2511df633?shared=true&\">\n               Firecloud Network Diagram</a></li>\n           <li>Make a user flow of your component (and/or alter the FC one) – make sure to show how it connects to rest of FC\n               <a href=\"https://www.lucidchart.com/blog/why-user-flow-diagrams-are-worth-your-time\">User Flow</a>\n           </li>\n           <li>Make a data flow diagram of your component (and/or alter the FC one) -– make sure to show how it connects\n               to rest of FC <a href=\"https://www.lucidchart.com/pages/data-flow-diagram\">Data Flow Diagram</a>\n           </li>\n         </ul>'
          },
          {
            'type': 'html',
            'name': 'Alert-Sourceclear',
            'visibleIf': '{Security tools} notcontains \"Sourceclear\"',
            'html': '<strong>Warning — possible high-risk issue!</strong> You must use\n            <a href=\"https://broadinstitute-dsp.sourceclear.io/login\">SourceClear</a> for downstream dependency/3rd\n            party component management. Ask DSP AppSec to add your repo.'
          },
          {
            'type': 'html',
            'name': 'Alert-gitsecrets',
            'visibleIf': '{Security tools} notcontains \"Git-secrets\"',
            'html': '<strong>Warning — possible high-risk issue!</strong> You must use <a href=\"https://github.com/awslabs/git-secrets\">git-secrets</a>\n            to prevent accidental commit of secrets to source code repository. Get started\n            <a href=\"https://docs.google.com/document/d/1_7deaZd2XbjUetVJs8EsQg6JbW_MEX2iFgXpnR_PyYs/edit#heading=h.4f1e34ah25ia\">here</a>'
          },
          {
            'type': 'html',
            'name': 'Alert-vault',
            'visibleIf': '{Security tools} notcontains \"Vault\"',
            'html': '<strong>Warning — possible high-risk issue!</strong> You should only store secrets in\n            <a href=\"https://www.vaultproject.io/\">Vault</a>. Get started\n            <a href=\"https://broadinstitute.atlassian.net/wiki/spaces/DO/pages/113874856/Vault\">here</a>'
          },
          {
            'type': 'html',
            'name': 'Alert-sentry',
            'visibleIf': '{Security tools} notcontains \"Sentry\"',
            'html': '<strong>Warning — possible high-risk issue!</strong> You should setup\n            <a href=\"https://sentry.io/welcome/\">Sentry</a>. Reach out to #dsp-devops to get started.'
          },
          {
            'type': 'html',
            'name': 'Alert-codacy',
            'visibleIf': '{Security tools} notcontains \"Codacy\"',
            'html': '<strong>Warning — possible high-risk issue!</strong> You should use\n            <a href=\"https://www.codacy.com/\">Codacy</a> for security static code analysis.\n            Reach out to #dsp-infosec-champions to add your repo.\n'
          },
          {
            'type': 'html',
            'name': 'Alert-certificate',
            'visibleIf': '{Applicable} contains \"Certificate for a non-*.dsde-.broadinstitute.org URL\"',
            'html': '<strong>Warning</strong> Reach out to DevOps team about certificates for non-*.dsde-.broadinstitute.org URL\n'
          },
          {
            'type': 'html',
            'name': 'Alert-encryptionBackupOptions',
            'visibleIf': '{Applicable} contains \"Using persistent storage\"',
            'html': '<strong>Warning</strong> Reach out to DevOps team about persistence about Encryption and Backup options for your persistence storage.'
          },
          {
            'type': 'html',
            'name': 'Alert-logsPersistence',
            'visibleIf': '{Logs persistence for at least 180 days} = \"No\"',
            'html': ' <strong>Warning</strong> Please make sure to allow logs to persist for at least 180 days in a searchable form. If you don\'t have a good idea of what events to audit, ask DevOps.'
          },
          {
            'type': 'html',
            'name': 'Alert-LoggingMonitoring',
            'visibleIf': '{Are logs reviewed} = \"No\"',
            'html': '<strong>Warning</strong> For logging you should be able to know WHO did WHAT to WHAT OBJECT and WHEN. You must have some human review of logs on a regular basis for key events, and have alerts setup for these events. Ask dsp-devops if you need clarification.'
          },
          {
            'type': 'html',
            'name': 'Alert-logAuthAttemps',
            'visibleIf': '{Authent/Authorz attemps logged} = \"No\"',
            'html': '<strong>Warning</strong> You should log authorization and authentication attempts. The application has the most information about the user (e.g. identity, roles, permissions) and the context of the event (target, action, outcomes), and often this data is not available to either infrastructure devices, or even closely-related applications.'
          },
          {
            'type': 'html',
            'name': 'Alert-unitTesting',
            'visibleIf': '{Unit testing} = \"Weak\"  or {Unit testing} = \"Nonexistent\"',
            'html': '<strong>Warning — possible medium-risk issue</strong> Unit tests have become quasi-standard for testing the functionality of software at a low level. Although this questionnaire focuses on security, the functional correctness of the application is also important. Particularly for web applications, where it is difficult (often impossible) to fall back to a previous version, functional bugs can cause problems with both integrity and availability. Consider implementing unit tests.'
          },
          {
            'type': 'html',
            'name': 'Alert-integrationTesting',
            'visibleIf': '{Integration testing} = \"Weak\" or {Integration testing} = \"Nonexistent\"',
            'html': '<strong>Warning — possible medium-risk issue</strong> Integration testing will show you how well your modules get along. Please consider implementing.'
          },
          {
            'type': 'html',
            'name': 'Alert-performanceTesting',
            'visibleIf': '{Performance testing} = \"Weak\"  or {Performance testing} = \"Nonexistent\"',
            'html': '<strong>Warning — possible medium-risk issue</strong> Performance testing will determine whether your service meets scalability and stability requirements under expected workloads. Please consider implementing.'
          },
          {
            'type': 'html',
            'name': 'Alert-monitoring',
            'visibleIf': '{Post-launch monitoring} = \"Weak\" or {Post-launch monitoring} = \"Nonexistent\"',
            'html': '<strong>Warning — possible medium-risk issue</strong> Exceptions and crashes often indicate an underlying security problem. Monitoring the deployed application can go a long way toward quickly identifying and subsequently fixing vulnerabilities. In carefully designed software products, exceptions should be a fairly rare occurrence; it therefore usually does not introduce significant overhead to monitor for them.'
          },
          {
            'type': 'html',
            'name': 'Alert-filesWithoutSecrets',
            'visibleIf': '{Deployment} notcontains \"Config files do NOT contain any secrets \"',
            'html': '<strong>Warning — possible medium-risk issue</strong> You need to ensure that your config files contain no secrets. Additionally please review <a href=\"https://security-kb.dsp-techops.broadinstitute.org/\">Security KB</a> on how to avoid leaking secrets to build logs.'
          },
          {
            'type': 'html',
            'name': 'Alert-ciConfigTemplatized',
            'visibleIf': '{Deployment} notcontains \"Config files are templatized \"',
            'html': '<strong>Warning — possible medium-risk issue</strong> We recommmend that your CI config files are templatized\n'
          },
          {
            'type': 'html',
            'name': 'Alert-scriptedSolution',
            'visibleIf': '{Deployment} notcontains \"Scripted solution for CI and CD\"',
            'html': '<strong>Warning — possible medium-risk issue</strong> We recommend that you have a scripted solution for CI/CD'
          },
          {
            'type': 'html',
            'name': 'Alert-statusEndpoint',
            'visibleIf': '{Reliability} notcontains \"Status endpoint to indicate service health\"',
            'html': '<strong>Warning — possible medium-risk issue</strong> Have a /status endpoint to indicate service health (it should monitor real things like database connections and downstream dependencies)'
          },
          {
            'type': 'html',
            'name': 'Alert-relicSynthetic',
            'visibleIf': '{Reliability} notcontains \"Relic synthetic monitor\"',
            'html': '<strong>Warning — possible medium-risk issue</strong> Have a New Relic synthetic monitor configured to monitor/status'
          },
          {
            'type': 'html',
            'name': 'Alert-pagerDuty',
            'visibleIf': '{Reliability} contains \"PagerDuty for our new service\"',
            'html': '<strong>Warning — possible medium-risk issue</strong> Configure PagerDuty for your new service. Reach out to DevOps if you have questions.'
          },
          {
            'type': 'html',
            'name': 'Alert-relicAgent',
            'visibleIf': '{Reliability} notcontains \"New Relic agent installed\"',
            'html': '<strong>Warning — possible medium-risk issue</strong> New Relic agent installed and reporting data to New Relic SRE indicators (api error rate and response time)'
          },
          {
            'type': 'html',
            'name': 'Alert-serviceScalability',
            'visibleIf': '{Reliability} notcontains \"Service is able to scale in response to load\"',
            'html': '<strong>Warning — possible medium-risk issue</strong> Your service must be able to scale in response to load, either manually or automatically. Ask DevOps if you need more clarification on this.'
          },
          {
            'type': 'html',
            'name': 'Alert-oncallPlaybook',
            'visibleIf': '{Reliability} notcontains \"An on-call playbook for the service, linked it into the main on-call documentation\"',
            'html': '<strong>Warning — possible medium-risk issue</strong> You should create an on-call playbook for your service, and link it into the main on-call documentation'
          }
        ],
        'title': 'Alerts'
      }
    ],
    completedHtml: "<p><h3>Thank you!</h3></p>"

  };


  sendData(result) {
      this.sendForm.sendFormData(result).subscribe((res) => {
          console.log('Form sent');
        },
        (res) => {
        });
    }
}
