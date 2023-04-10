# jenkins-example

Simple jenkins pipeline example to build docker image, run several scan, push to docker hub, and deploy it in k3s
All in one instance of VM

## Prerequisite

* docker 
* [k3s](https://github.com/k3s-io/k3s)
* [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/#bare-metal-clusters)
* [Jenkins](https://www.digitalocean.com/community/tutorials/how-to-install-jenkins-on-ubuntu-22-04)
* [Sonarqube](https://linux.how2shout.com/install-sonarqube-on-ubuntu-20-04-18-04-server/)

