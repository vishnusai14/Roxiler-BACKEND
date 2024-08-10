pipeline{
    agent any
    stages{
        stage("Removing the Existing front end build"){
            steps{
                echo "Removing the existing build"
                sh 'rm -rf client'
            }
        }
        stage("Pulling FrontEnd") {
            steps {
                git credentialsId: 'git', url: 'git@github.com:vishnusai14/Roxiler-FRONTEND.git'
            }
        }
    }
}