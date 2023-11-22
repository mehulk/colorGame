pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                checkout scm
            }
        }

        stage('Build') {
            steps {

                withCredentials([file(credentialsId: 'creds-gcloud', variable: 'GCLOUD_CREDS')]){
                    sh "gcloud auth activate-service-account --key-file=$GCLOUD_CREDS"
                    sh "gcloud compute ssh jenkins-gcloud@jenkins-server --zone=us-central1-a --project cloud-labs-405222 --command 'sudo apt install apache2 -y'"
                }

            }
        }

        stage('Deploy') {
            steps {
                script {
                    try {
                        //sh 'rm -rf *'
                        //sh 'gsutil cp -r gs://test1lab/ /'
                        //sh "gcloud compute ssh  imranc42@instance-1 --zone=us-central1-a --command 'sudo gsutil -m cp -r gs://test1lab/ /var/lib/jenkins/workspace/; cd lab3; ls'"
                        //sh "gcloud compute ssh  imranc42@instance-1 --zone=us-central1-a --command 'sudo rm -rf /var/www/html/* ;sudo mv /var/lib/jenkins/workspace/test1lab/lab3/* /var/www/html/'"
                    
                        sh 'false'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        sh """
                        gcloud logging write Jenkings_Log '{"Stage": "stage2", "Message":"Deploy execution Failed"}' --payload-type=json --severity=CRITICAL
                        """
                        error("Stage 2 failed: ${e.message}")
                        
                    }
                }

                // Deploy the HTML site to a web server or hosting service
                //sh "gcloud compute ssh jenkins@jenkins-server --zone=us-central1-a --project cloud-labs-405222 --command 'sudo cp -r * /var/www/html/'"
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
