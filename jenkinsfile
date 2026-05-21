pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token')
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Diksha-roy/jenkins-demo1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {
                sh """
                /opt/sonar-scanner/bin/sonar-scanner \
                -Dsonar.projectKey=node-app \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://localhost:9000 \
                -Dsonar.login=$SONAR_TOKEN
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t node-app .'
            }
        }
        
        stage('push to docker hub') {
            steps {
            withCredentials([usernamePassword(
            credentialsId: 'docker-hub',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
        )]) {
                sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                sh 'docker image tag node-app:latest diksha8084/node-app:latest'
                sh 'docker push diksha8084/node-app:latest'
            }
        }
        
        }
        stage('Stop Old Container') {
            steps {
                sh 'docker rm -f node-app || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d --name node-app -p 3000:3000 node-app'
            }
        }
    }

    post {
        success {
            echo 'Pipeline SUCCESS 🚀 App deployed successfully!'
        }

        failure {
            echo 'Pipeline FAILED ❌ Check logs'
        }
    }
}
