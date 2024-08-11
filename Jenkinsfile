pipeline{
    agent any
    environment {
        dockerCred = 'docker-hub'
        SECRETS_FILE_ID = 'helm-secret'
    }
    tools{
        nodejs "NODEJS"
    }
    stages{
        stage("Removing the Existing workspace"){
            steps{
                deleteDir()
            }
        }
        stage("Cloning FrontEnd Repo") {
            steps {
                dir("frontend") {
                    git credentialsId: 'git-ssh', url: 'git@github.com:vishnusai14/Roxiler-FRONTEND.git'
                    sh "npm install && npm run build"
                }
            }
        }
        
        stage("CLoning the Backend Repo") {
            
            steps {
                dir('backend') {
                    git credentialsId: 'git-ssh', url: 'git@github.com:vishnusai14/Roxiler-BACKEND.git'
                }
            }
            
        }
        
        stage("Copying the build from the frontend folder") {
            steps {
                sh "mkdir -p backend/client/build"
                sh 'cp -r frontend/build backend/client/build/'
            }
        }
        
        //We can add testing in here but i am going to skip it
        
        stage("Building Database Image") {
            steps {
                dir('backend') {
                    script {
                        docker.withRegistry('https://index.docker.io/v1/', "${dockerCred}") { 
                            def customImage = docker.build("vishnuprasanna/roxiler-mongo:${env.BUILD_NUMBER}","-f databasebuild/Dockerfile databasebuild")        
                        }
                    
                    }    
                }
                
            }
        }
        stage("Pushing Database Image") {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${dockerCred}") {
                        docker.image("vishnuprasanna/roxiler-mongo:${env.BUILD_NUMBER}").push()
                    }
           
                }
           
            }
        }
        
        
        
        stage("Building Web Image") {
            steps {
                dir('backend') {
                    script {
                        docker.withRegistry('https://index.docker.io/v1/', "${dockerCred}") {
                            def customImage = docker.build("vishnuprasanna/roxiler-web:${env.BUILD_NUMBER}")        
                        }
                    
                    }    
                }
                
            }
        }
        stage("Pushing Web Image") {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${dockerCred}") {
                        docker.image("vishnuprasanna/roxiler-web:${env.BUILD_NUMBER}").push()
                    }
           
                }
           
            }
        }
        
        //I am using local agent which is configure with kubectl and minikube
       
        stage("Copy the secrets file to the template folder") {
            steps {
                dir("backend") {
                    withCredentials([file(credentialsId: "${SECRETS_FILE_ID}", variable: 'SECRETS_FILE')]) {
                        // Copy the secrets.yaml file to the current directory
                        sh 'cp ${SECRETS_FILE} ./roxiler-helm/templates'
                    }
                }
            }
        }
        
        stage("Installing/Upgrading stack using helm") {
            steps {
                dir("backend") {
                    sh "helm upgrade --install roxiler-stack roxiler-helm/ --namespace=dev --set image.tag=${env.BUILD_NUMBER}"                        
                }
                
            }
        }
    }
}