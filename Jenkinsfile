#!groovy

pipeline {

  agent any
  //triggers { pollSCM  '* * * * *' }

  environment {
    git_commit_message = ''
    git_commit_diff = ''
    git_commit_author = ''
    git_commit_author_name = ''
    git_commit_author_email = ''
  }

  stages {

    // Build
    stage('Build') {
      agent {
        label 'node'
      }
      steps {
        deleteDir()
        checkout scm
        sh "cd node/ && docker build . -t kinurra/node-app:$BUILD_NUMBER"
        sh "docker run --rm -v $PWD:$PWD -v /var/run/docker.sock:/var/run/docker.sock -w $PWD aquasec/trivy:latest image --format json --output trivy-scan.json alpine:3.10.7"
        sh "docker run --rm -v $PWD:$PWD -w $PWD owasp/dependency-check:latest --scan $PWD --out $PWD"
      }
    }

    // Static Code Analysis
    stage('Static Code Analysis') {
      agent {
        label 'node'
      }
      steps {
        deleteDir()
        checkout scm
        sh "echo 'Run Static Code Analysis'"
      }
    }

    // Unit Tests
    stage('Unit Tests') {
      agent {
        label 'node'
      }
      steps {
        deleteDir()
        checkout scm
        sh "echo 'Run Unit Tests'"
      }
    }

    // Acceptance Tests
    stage('Acceptance Tests') {
      agent {
        label 'node'
      }
      steps {
        deleteDir()
        checkout scm
        script{
            def scannerHome = tool 'sonarqube' ;
                            withSonarQubeEnv('sonarqube') {
                                sh "${scannerHome}/bin/sonar-scanner"
                            }
        }
        sh "echo 'Run Acceptance Tests'"
        sh "docker push kinurra/node-app:$BUILD_NUMBER"
        sh "docker rmi -f kinurra/node-app:$BUILD_NUMBER"
        sh "cd node/ && kubectl apply -f my-node.yaml"
        sh "cd && ls"
      }
    }

  }
  post {
    success {
      sh "echo 'Send mail on success'"
      // mail to:"me@example.com", subject:"SUCCESS: ${currentBuild.fullDisplayName}", body: "Yay, we passed."
    }
    failure {
      sh "echo 'Send mail on failure'"
      // mail to:"me@example.com", subject:"FAILURE: ${currentBuild.fullDisplayName}", body: "Boo, we failed."
    }
  }
}
