from jira import JIRA
import json
import re

def get_jira_details():
    with open('config.json') as config_file:
        res = json.load(config_file)

    return {
        "jira_username" : res['jira_username'], 
        "jira_api_token": res['jira_token'], 
        "jira_instance" : res['jira_instance']
    }

global auth_jira
def auth():
    """
    Authenticate to broadworkbench.atlassian.net Jira Cloud Instance
    """
    global auth_jira
    jd = get_jira_details()
    auth_jira = JIRA(
        basic_auth=(jd['jira_username'], jd['jira_api_token']), 
        options={
            'server': jd['jira_instance']
        } 
    )
    print(auth_jira)


def get_all_projects():
    """
    Return a list of all projects 
    """
    projects = auth_jira.projects()
    return projects


def get_single_project(project_name):
    """
    Get single project info given a project_id
    Example project name: 'Cloud Integrations'
    """
    project = auth_jira.project(project_name)
    return project.name


def get_regular_issue(issue_id):
    """
    Get a single issue in a particular project
    Example issue: 'AAA-6666'
    """
    issue = auth_jira.issue(issue_id)
    return issue


def get_security_issue(issue_id, fields='summary, content, security, sourceclear, codacy'):
    """
    Get a security specific issue
    Example issue: 'AAA-6666'
    """
    compliance_issue = auth_jira.issue(issue_id)   
    return compliance_issue 


def get_compliance_issue(issue_id, fields='clia, comment, fisma, your_favorite_compliance_framework_here'):
    """
    Get a compliance specific issue
    Example issue: 'AAA-6666'
    """
    compliance_issue = auth_jira.issue(issue_id)   
    return compliance_issue 


def main():
    auth()
    val = get_all_projects()
    print(val)


if __name__== "__main__":
    main()