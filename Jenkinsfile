pipeline{
    agent any
    stages{
        stage("Removing the Existing front-end build"){
            steps{
                echo "Hello World"
                echo "Removing the existing Frontend build folder"
                sh 'rm -rf client'
            }
        }
        stage("Cloning FrontEnd Repo") {
            steps {
                git credentialsId: 'git-ssh', url: 'git@github.com:vishnusai14/Roxiler-FRONTEND.git'
            }
        }
    }
}