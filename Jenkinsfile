pipeline {
    agent any

    // environment {
    //     GCLOUD_PROJECT = 'cloud-labs-405222'
    //     GCLOUD_ZONE = 'us-central1-a'
    //     GCLOUD_INSTANCE = 'jenkins-launched-server'
    //     GCLOUD_SERVICE_KEY = credentials('jenkins-sa.json')
    // }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // For a simple HTML site, no build step is needed
                // You might want to copy the files to a specific directory if needed
                //sh 'sudo apt -y install apache2'
                //sh 'wget https://archive.apache.org/dist/httpd/httpd-2.4.51.tar.gz'
                //sh 'tar -zxvf httpd-2.4.51.tar.gz'

                withCredentials([file(credentialsId: '6f113e45-123a-4313-bb4e-8a71ff698346', variable: 'GCLOUD_CREDS')]){

                    sh "gcloud compute ssh jenkins@jenkins-server --zone=us-central1-a --project cloud-labs-405222 --command 'sudo apt install apache2 -y'"


                }

            }
        }

        stage('Deploy') {
            steps {
                // Deploy the HTML site to a web server or hosting service

                //sh 'cp -r * /var/www/html/'
                sh "gcloud compute ssh jenkins@jenkins-server --zone=us-central1-a --project cloud-labs-405222 --command 'sudo cp -r * /var/www/html/'"

            }
        }
    }

    post {
        success {
            // Notification or additional steps on success
            echo 'Build and deployment successful!'
        }
        failure {
            // Notification or additional steps on failure
            echo 'Build or deployment failed!'
        }
    }
}
