pipeline{
    agent any
    tools{
        node "NODEJS"
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
                sh 'git clone git@github.com:vishnusai14/Roxiler-FRONTEND.git'
            }
        }
    }
}