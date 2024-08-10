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
                sh 'git clone git@github.com:vishnusai14/Roxiler-FRONTEND.git && cd Roxiler-FRONTEND && npm install && npm run build'
            }
        }
    }
}