
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

- Using SQLite with SQLAlchemy