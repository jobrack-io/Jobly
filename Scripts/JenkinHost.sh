#!/bin/bash
sudo yum update –y

# Install Java 19
sudo dnf install java-11-amazon-corretto -y

# Install Maven
sudo yum install -y maven

# Install Git
sudo yum install -y git

# Install and Start Jenkins
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
sudo yum upgrade
sudo yum install jenkins -y
sudo systemctl enable jenkins
sudo systemctl start jenkins
