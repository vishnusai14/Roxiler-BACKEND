pipeline{
    agent any
    tools{
        nodejs "NODEJS"
    }
    stages{
        stage("Removing the Existing front-end build"){
            steps{
                echo "Removing the existing Frontend build folder"
                sh 'rm -rf client'
            }
        }
        stage("Cloning FrontEnd Repo") {
            steps {
                git credentialsId: 'git-ssh', url: 'git@github.com:vishnusai14/Roxiler-FRONTEND.git'
                sh "npm install && npm run build"
            }
        }
    }
}