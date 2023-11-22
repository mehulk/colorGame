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

                script {
                    try {
                        withCredentials([file(credentialsId: 'creds-gcloud', variable: 'GCLOUD_CREDS')]){
                            sh "gcloud auth activate-service-account --key-file=$GCLOUD_CREDS"
                            sh "gcloud compute ssh jenkins-gcloud@jenkins-server --zone=us-central1-a --project cloud-labs-405222 --command 'sudo apt install apache2 -y'"
                        }

                        //sh 'false'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        sh """
                        gcloud logging write Jenkins_Log '{"Stage": "stage1", "Message":"Build execution Failed"}' --payload-type=json --severity=CRITICAL
                        """
                        error("Stage 2 failed: ${e.message}")
                        
                    }
                }

            }
        }

        stage('Deploy') {
            steps {
                script {
                    try {
                        // Deploy the HTML site to a web server or hosting service
                        sh "gcloud compute ssh jenkins@jenkins-server --zone=us-central1-a --project cloud-labs-405222 --command 'sudo cp -r * /var/www/html/'"
                        //sh 'false'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        sh """
                        gcloud logging write Jenkins_Log '{"Stage": "stage2", "Message":"Deploy execution Failed"}' --payload-type=json --severity=CRITICAL
                        """
                        error("Stage 2 failed: ${e.message}")
                        
                    }
                }
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
