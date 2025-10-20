# Monitor a Node.js Application using Prometheus and Grafana
This project demonstrates how to monitor a Node.js application running inside a Kubernetes cluster using Prometheus and Grafana.
The setup includes custom metrics, alerting, and Slack notifications for a real-time monitoring experience.

## 🚀 Project Overview

* The Node.js application exposes a custom metric:
`http_requests_root_total` — the total number of HTTP requests to the root endpoint (`/`).
* Prometheus scrapes the metrics from the app and triggers an alert when the HTTP request rate exceeds a defined threshold.
* Grafana visualizes the metrics in real-time dashboards.
* Alertmanager sends notifications to Slack when alerts fire.
---

## 🧰 Technologies Used

* Node.js (Express + prom-client)
* Docker
* Kubernetes (YAML Manifests)
* Prometheus Operator
* Grafana
* Alertmanager
* Slack Webhook Integration
* Bash (for load testing)

---

📦 Features

* Containerized NodeJS application with custom Prometheus metrics
* Deployed to a Kubernetes cluster using YAML manifests
* Integrated Prometheus ServiceMonitor for scraping metrics
* Custom PrometheusRule to trigger alerts
* Configured Alertmanager to send alerts to Slack
* Dashboards in Grafana for monitoring
---

## Step-by-Step Implementation
## 🧩 Step 1: Create the NodeJS Application
```bash
mkdir nodejs && cd nodejs
vim index.js
```
## 🧩 Step 2: Create the Dockerfile

## 🧩 Step 3: Build and Run the Docker Image
```bash
docker build -t nodejs-app .
docker run -d -p 3000:3000 --name dolfined-nodejs nodejs-app
```

Check:
```bash
docker ps
curl http://localhost:3000
curl http://localhost:3000/metrics
```

## 🧩 Step 4: Push Image to Docker Hub

```bash
docker tag nodejs-app:latest menamagdyhalem/nodejs-app:v1
docker login
docker push <account-name>/nodejs-app:v1
```

## 🧩 Step 5: Deploy on Kubernetes
Deployment file (`nodejs-app.yaml`)
```bash
kubectl apply -f nodejs-app.yaml
kubectl get pods
```
## 🧩 Step 6: Expose Service
Service file (`nodejs-svc.yaml`)
```bash
kubectl apply -f nodejs-svc.yaml
kubectl get svc
```

Now access:
```bash
<NodeIP>:<NodePort>
<NodeIP>:<NodePort>/metrics
```

## 🧩 Step 7: Add ServiceMonitor for Prometheus
File: `nodejs-monitor.yaml`

```bash
kubectl apply -f nodejs-monitor.yaml
```

## 🧩 Step 8: Create Alert Rule

File: `nodejs-alert.yaml`
```bash
kubectl apply -f nodejs-alert.yaml
```

## 🧩 Step 9: Configure Alertmanager to Send Alerts to Slack

File: `nodejs-alert-manager.yaml`
```bash
kubectl apply -f nodejs-alert-manager.yaml
```

## 🧩 Step 10: Simulate High Load

File: `send.sh`
```bash
chmod +x send.sh
./send.sh
```

## 🧩 Step 11: Verify

* ✅ Access your app: http://<NodeIP>:<NodePort>/
* ✅ Check metrics: http://<NodeIP>:<NodePort>/metrics
* ✅ Open Prometheus → “Alerts” tab → see alert firing
* ✅ Check Slack → Alert message received
* ✅ Open Grafana → visualize metrics and dashboard panels

---

👨‍💻 Author

Mena Magdy Haleem <br>
DevOps Instructor | AWS | Docker | Kubernetes | Prometheus & Grafana













