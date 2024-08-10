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
                sh 'mkdir -p frontend && cd frontend && git clone git@github.com:vishnusai14/Roxiler-FRONTEND.git && npm install && npm run build'
            }
        }
    }
}