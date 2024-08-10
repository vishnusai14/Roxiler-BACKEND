pipeline{
    agent any
    stages{
        stage("Removing the Existing front-end build"){
            steps{
                echo "Removing the existing build folder"
                sh 'rm -rf client'
            }
        }
        stage("Cloning FrontEnd") {
            steps {
                git credentialsId: 'git', url: 'git@github.com:vishnusai14/Roxiler-FRONTEND.git'
            }
        }
    }
}