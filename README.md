# Overview
- If the service is disabled / re-enabled you will need to update certain files
    - This README.md URLs
    - URL in index.html `<input type="text" id="externalURL" name="externalURL" value="HERE" style="width: 400px;">`
- You can test the site on your local machine by opening the `index.html` file in a web browser
- You can test the static site which is hosted on GitHub pages [here](https://scarletti-ben.github.io/gcr-flask-sql)
- The `index.html` file can alternatively be previewed [here](https://html-preview.github.io/?url=https://github.com/scarletti-ben/gcr-flask-sql/blob/main/docs/index.html)
- You can test the Flask app on your local machine by running `app.py` in the correct virtual environment
    - The loopback IP address the Flask app runs on is <http://127.0.0.1:5000>
- You can test the Google Cloud Run service at <https://test-revert-941950155724.europe-west1.run.app>
    - The app route "users" can be tested at <https://test-revert-941950155724.europe-west1.run.app/users>
- You can check your currently active services in the [Google Cloud Run Console](https://console.cloud.google.com/run)

- You can set up the virtual environment in Windows by following the steps below
    - clone the repository
    - open the cloned repository in your terminal
    - `cd flask-app`
    - `python -m venv venv` or `python -m virtualenv venv`
    - `venv\Scripts\activate` or `.\venv\Scripts\activate`
    - `pip install -r requirements.txt`

# Google Cloud Run Deployment
## Example Google Cloud Run Deployment Log (Abridged)

This is how it should look using gcloud to containerise and deploy Flask app, you will need to sign in and authenticate if gcloud init hasn't run before

```powershell
PS C:\...\gcr-flask-sql> .\venv\Scripts\activate
(env) PS C:\...\gcr-flask-sql> gcloud init
Welcome! This command will take you through the configuration of gcloud.

Settings from your current configuration [cloud-experimental] are:
accessibility:
  screen_reader: 'False'
core:
  account: ...@gmail.com
  disable_usage_reporting: 'True'
  project: virtual-transit-...-...

Pick configuration to use:
 [1] Re-initialize this configuration [cloud-experimental] with new settings
 [2] Create a new configuration
 [3] Switch to and re-initialize existing configuration: [cloud-test]
 [4] Switch to and re-initialize existing configuration: [default]
Please enter your numeric choice:  1

Your current configuration has been set to: [cloud-experimental]

Network diagnostic detects and fixes local network connection issues.
Checking network connection...done.
Reachability Check passed.
Network diagnostic passed (1/1 checks passed).

Choose the account you want to use for this configuration.

Select an account:
 [1] ...@gmail.com
 [2] Sign in with a new Google Account
 [3] Skip this step
Please enter your numeric choice:  1

You are signed in as: [...@gmail.com].

Pick cloud project to use: 
 [1] virtual-transit-...-...
 [2] Enter a project ID
 [3] Create a new project
Please enter numeric choice or text value (must exactly match list item):  1

Your current project has been set to: [virtual-transit-...-...].

The Google Cloud CLI is configured and ready to use!

* Commands that require authentication will use ...@gmail.com by default
* Commands will reference project `virtual-transit-...-...` by default
Run `gcloud help config` to learn how to change individual settings

(env) PS C:\...\gcr-flask-sql> gcloud run deploy --source .
Service name (flask-python-gcloud-sqlite):  test
Please specify a region:
 ...
 [16] europe-west1
 ...

Please enter numeric choice or text value (must exactly match list item):  16

To make this the default region, run `gcloud config set run/region europe-west1`.

Allow unauthenticated invocations to [test] (y/N)?  y

Building using Dockerfile and deploying container to Cloud Run service [test] in project [virtual-transit-...-...] region [europe-west1]
OK Building and deploying new service... Done.
  OK Uploading sources...
  OK Building Container... Logs are available at [https://console.cloud.google.com/...].
  OK Creating Revision...
  OK Routing traffic...
  OK Setting IAM Policy...
Done.
Service [test] revision [test-revert-...-...] has been deployed and is serving 100 percent of traffic.
Service URL: https://test-revert-....europe-west1.run.app
```

# Flask App Testing

## Example Flask App Log Run Locally

```powershell
(env) PS C:\...\gcr-flask-sql> python app.py
Current working directory: C:\...\gcr-flask-sql
Database path: C:\...\gcr-flask-sql\database.db
Current working directory: C:\...\gcr-flask-sql
Database path: C:\...\gcr-flask-sql\database.db
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
Current working directory: C:\...\gcr-flask-sql
Database path: C:\...\gcr-flask-sql\database.db
Current working directory: C:\...\gcr-flask-sql
Database path: C:\...\gcr-flask-sql\database.db
 * Debugger is active!
 * Debugger PIN: ...-...-...
```

# Miscellaneous

- This project uses Flask with SQLite and SQLAlchemy

## Issues I ran into on this project
- As I cloned the project to add database functionality I also cloned __pycache__ and caused issues with the virtual environment as it was pointing to a previous venv and filesystem, this was noticable as pip list and pip freeze were showing incorrect installed packages
- I found that SQLAlchemy and Flask like to look for and create files in the instance folder, creating the instance folder if it does not exist, and you may need to make explicit reference to files in the root directory rather than instances folder
  - This was the cause of an issue where the query made to the database was coming up empty as it was not detecting `database.db` but instead creating `instances/database.db` as an empty database and querying that
- In testing we are using `Allow unauthenticated invocations to [test-revert] (y/N)?  n` but be wary of this in production
- When testing GitHub pages site changes you can run into cache issues where new changes to the site are not displayed
    - Fix this by opening developer tools, right clicking the refresh icon and selecting "Empty Cache and Hard Reload"