import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Circle, Lock, Terminal, Cloud, Server, Code, Shield, Layout, 
  BookOpen, Award, Briefcase, ArrowDown, Flag, ExternalLink, Lightbulb, 
  RotateCcw, Save, Printer, X, Copy, Check, ListOrdered, Users, Zap, Sparkles, Bot, Loader, Phone, Database
} from 'lucide-react';

// --- GEMINI API UTILITIES ---
const apiKey = ""; // API Key provided by environment

const callGemini = async (prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  let retries = 0;
  const maxRetries = 3;
  const delays = [1000, 2000, 4000];

  while (retries <= maxRetries) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    } catch (error) {
      retries++;
      if (retries > maxRetries) return `Error connecting to AI: ${error.message}`;
      await new Promise(resolve => setTimeout(resolve, delays[retries - 1]));
    }
  }
};

// --- DATA CONFIGURATION ---
const skillsData = {
  foundations: {
    title: "Foundations & Prerequisites",
    skills: [
      { id: "linux", label: "Linux & Terminal (Bash, Permissions)" },
      { id: "networking", label: "Networking (DNS, HTTP/S, Firewalls)" },
      { id: "git", label: "Git (Advanced Workflows, Branching)" },
      { id: "webservers", label: "Web Servers (Nginx/Apache)" },
      { id: "database", label: "Databases (PostgreSQL/SQL)" }
    ]
  },
  ci_build: {
    title: "Build & CI/CD",
    skills: [
      { id: "docker", label: "Docker (Images, Compose)" },
      { id: "jenkins", label: "Jenkins (Pipelines as Code)" },
      { id: "build_tools", label: "Build Tools (Maven/Gradle/Make)" }
    ]
  },
  cloud_automation: {
    title: "Cloud & Automation",
    skills: [
      { id: "aws_core", label: "AWS Core (EC2, VPC, IAM)" },
      { id: "terraform", label: "Terraform (IaC)" },
      { id: "ansible", label: "Ansible (Config Management)" }
    ]
  },
  orchestration: {
    title: "Orchestration",
    skills: [
      { id: "k8s_basic", label: "Kubernetes Basics (Pods, Svcs)" },
      { id: "k8s_admin", label: "Kubernetes Admin (Helm, Ingress)" }
    ]
  },
  observability: {
    title: "Observability & SRE",
    skills: [
      { id: "monitoring", label: "Prometheus & Grafana" },
      { id: "security", label: "DevSecOps (Trivy, SonarQube)" }
    ]
  },
  it_ops: {
    title: "IT Operations",
    skills: [
      { id: "identity", label: "Identity Mgmt (SSO/Keycloak)" },
      { id: "chatops", label: "Automation & ChatOps" }
    ]
  }
};

// Map for phase colors to ensure Tailwind JIT picks them up reliably
const colorMap = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/50",
    progress: "bg-blue-500"
  },
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/50",
    progress: "bg-indigo-500"
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/50",
    progress: "bg-purple-500"
  },
  pink: {
    bg: "bg-pink-500/10",
    text: "text-pink-400",
    border: "border-pink-500/50",
    progress: "bg-pink-500"
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/50",
    progress: "bg-emerald-500"
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/50",
    progress: "bg-cyan-500"
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/50",
    progress: "bg-orange-500"
  }
};

const roadmapStages = [
  {
    id: 1,
    title: "Phase 1: The Bare Metal Foundation",
    description: "Master the prerequisites: Linux, Networking, and Web Servers. You can't automate what you don't understand.",
    reqs: ["linux", "networking", "git", "webservers"],
    icon: Terminal,
    color: "blue",
    project: {
      title: "Project Milestone 1: The Monolith Server",
      goal: "Manually provision a Linux server and host a web application behind a reverse proxy.",
      tasks: [
        { topic: "Linux & Users", task: "Provision a Linux VM. Create a dedicated 'appuser' with sudo privileges." },
        { topic: "Web Servers", task: "Install and configure Nginx or Apache to serve a static HTML page on port 80." },
        { topic: "Git Workflow", task: "Initialize a Git repo. Practice branching, merging, and resolving conflicts locally." },
        { topic: "Scripting", task: "Write a Bash script to monitor disk usage and email an alert if it exceeds 80%." }
      ],
      resources: [
        { name: "Linux Journey (Best for Beginners)", url: "https://linuxjourney.com/" },
        { name: "Nginx Beginner's Guide", url: "https://nginx.org/en/docs/beginners_guide.html" },
        { name: "Pro Git Book", url: "https://git-scm.com/book/en/v2" }
      ],
      hints: [
        "Security: Disable root login via SSH. Use key-based authentication only.",
        "Web Server: Check Nginx logs at '/var/log/nginx/error.log' if your site doesn't load.",
        "Networking: Ensure firewall (UFW/IPtables) allows traffic on ports 22, 80, and 443."
      ],
      cheatSheet: [
        { cmd: "sudo systemctl status nginx", desc: "Check web server status" },
        { cmd: "sudo ufw allow 'Nginx Full'", desc: "Allow HTTP/HTTPS traffic" },
        { cmd: "git checkout -b feature/login", desc: "Create and switch to a new branch" },
        { cmd: "top", desc: "Monitor system processes and resource usage" },
        { cmd: "curl -I localhost", desc: "Check HTTP headers locally" }
      ],
      guide: [
        "Provision a Ubuntu 22.04 LTS server (or use a local VM).",
        "Install Nginx: 'sudo apt update && sudo apt install nginx'.",
        "Create a custom `index.html` in `/var/www/html/`.",
        "Configure Nginx sites-available to point to your new file.",
        "Write a bash script using `df -h` and `mail` commands for monitoring."
      ]
    }
  },
  {
    id: "1-bonus",
    title: "Side Quest: VoIP System (FusionPBX)",
    description: "A practical SysAdmin project. Build a private phone system to master services, ports, and databases.",
    reqs: ["linux", "networking", "database"],
    icon: Phone,
    color: "orange",
    project: {
      title: "Project: Deploy a Cloud PBX",
      goal: "Deploy FusionPBX (FreeSWITCH GUI) on Debian to understand complex multi-service stacks.",
      tasks: [
        { topic: "OS Prep", task: "Setup Debian 11/12. Configure UFW to allow SIP (5060 UDP/TCP) and RTP (16384-32768 UDP)." },
        { topic: "DB & Web", task: "Install PostgreSQL (Database), PHP-FPM (Logic), and Nginx (Web Server)." },
        { topic: "Install Script", task: "Clone the FusionPBX install script. Read it to understand how it compiles FreeSWITCH." },
        { topic: "Testing", task: "Create an extension in the GUI. Connect a softphone (Microsip/Zoiper) and make a test call." }
      ],
      resources: [
        { name: "FusionPBX Official Docs", url: "https://docs.fusionpbx.com/en/latest/install.html" },
        { name: "FreeSWITCH Basics", url: "https://freeswitch.org/confluence/display/FREESWITCH/Introduction" }
      ],
      hints: [
        "Troubleshooting: If calls drop instantly, it's almost always a NAT/Firewall issue.",
        "Database: FusionPBX uses PostgreSQL. Learn basic `psql` commands to check the `v_extensions` table.",
        "Logs: Check `/var/log/freeswitch/freeswitch.log` and `/var/log/nginx/error.log`."
      ],
      cheatSheet: [
        { cmd: "fs_cli", desc: "Enter FreeSWITCH Command Line Interface" },
        { cmd: "sofia status profile internal", desc: "Check SIP profile status in fs_cli" },
        { cmd: "psql -U fusionpbx -d fusionpbx", desc: "Access the database via CLI" },
        { cmd: "tail -f /var/log/freeswitch/freeswitch.log", desc: "Live stream telephony logs" }
      ],
      guide: [
        "Start with a clean Debian minimal install.",
        "Run: `wget -O - https://raw.githubusercontent.com/fusionpbx/fusionpbx-install.sh/master/debian/pre-install.sh | sh`",
        "Follow the prompt to install FusionPBX, PostgreSQL, and FreeSWITCH.",
        "Once installed, login to the web GUI (usually port 443). Default user is often admin/admin.",
        "Go to Accounts > Extensions and create Extension 100.",
        "Configure Zoiper (free softphone) with the IP, Ext 100, and the password generated."
      ]
    }
  },
  {
    id: 2,
    title: "Phase 2: CI/CD & Build Automation",
    description: "Move from manual coding to automated pipelines. Master Docker and Jenkins as per industry standards.",
    reqs: ["docker", "jenkins", "build_tools"],
    icon: Layout,
    color: "indigo",
    project: {
      title: "Project Milestone 2: The Automated Pipeline",
      goal: "Containerize an application and automate the build process using Jenkins Pipelines.",
      tasks: [
        { topic: "Docker", task: "Create a Dockerfile. Optimize it using multi-stage builds to reduce image size." },
        { topic: "Build Tools", task: "Use Maven (Java) or Make (Go/C) to define build targets for your app." },
        { topic: "Jenkins CI", task: "Deploy a Jenkins server. Create a 'Jenkinsfile' to build, test, and push your Docker image." },
        { topic: "Code Quality", task: "Integrate SonarQube into your pipeline to fail builds on code smells." }
      ],
      resources: [
        { name: "Jenkins Pipeline Documentation", url: "https://www.jenkins.io/doc/book/pipeline/" },
        { name: "Docker Curriculum", url: "https://docker-curriculum.com/" },
        { name: "Maven in 5 Minutes", url: "https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html" }
      ],
      hints: [
        "Jenkins: Run Jenkins in Docker for easy setup: 'docker run -p 8080:8080 jenkins/jenkins:lts'.",
        "Pipeline: Don't click in the UI. Use 'Declarative Pipeline' syntax in a Jenkinsfile stored in Git.",
        "Docker: Don't run containers as root. Use the 'USER' instruction in your Dockerfile."
      ],
      cheatSheet: [
        { cmd: "docker build -t myapp:v1 .", desc: "Build a docker image" },
        { cmd: "docker run -d -p 80:80 myapp:v1", desc: "Run container detached" },
        { cmd: "mvn clean package", desc: "Clean and build a Java project" },
        { cmd: "jenkins-plugin-cli --plugins <name>", desc: "Install Jenkins plugins via CLI" }
      ],
      guide: [
        "Install Docker and run a Jenkins container.",
        "Configure Jenkins: Install 'Docker Pipeline' and 'Git' plugins.",
        "Create a simple Java/Node app with a test script.",
        "Write a Jenkinsfile: `pipeline { agent any stages { stage('Build') { steps { sh 'mvn package' } } } }`.",
        "Connect Jenkins to your GitHub repo and trigger a build on commit."
      ]
    }
  },
  {
    id: 3,
    title: "Phase 3: Infrastructure & Config Mgmt",
    description: "Automate infrastructure provisioning with Terraform and configuration with Ansible.",
    reqs: ["aws_core", "terraform", "ansible"],
    icon: Cloud,
    color: "purple",
    project: {
      title: "Project Milestone 3: Hybrid Automation",
      goal: "Provision AWS infrastructure with Terraform and configure servers using Ansible.",
      tasks: [
        { topic: "Terraform (IaC)", task: "Write Terraform to provision a VPC, 2 Subnets, and an EC2 instance." },
        { topic: "Ansible", task: "Write an Ansible Playbook to install Docker and Nginx on your Terraform-created EC2." },
        { topic: "State Mgmt", task: "Store Terraform state remotely in S3 with DynamoDB locking." },
        { topic: "Roles", task: "Refactor your Ansible code into Roles (e.g., 'webserver', 'database') for reusability." }
      ],
      resources: [
        { name: "Terraform Registry", url: "https://registry.terraform.io/" },
        { name: "Ansible Documentation", url: "https://docs.ansible.com/ansible/latest/index.html" },
        { name: "AWS VPC Guide", url: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html" }
      ],
      hints: [
        "Ansible: Use 'ansible-galaxy' to find community roles, but try writing your own first.",
        "Terraform: Use `terraform output` to pass EC2 IP addresses to your Ansible inventory automatically.",
        "Security: Never commit AWS keys to Git. Use `aws configure` or environment variables."
      ],
      cheatSheet: [
        { cmd: "terraform plan", desc: "Preview infrastructure changes" },
        { cmd: "terraform apply", desc: "Provision infrastructure" },
        { cmd: "ansible-playbook -i hosts site.yml", desc: "Run Ansible playbook" },
        { cmd: "ansible -m ping all", desc: "Test connectivity to hosts" }
      ],
      guide: [
        "Write `main.tf` to create an EC2 instance with an SSH key pair.",
        "Run `terraform apply` to get the instance running.",
        "Create an Ansible inventory file `hosts` with the EC2 IP.",
        "Write `playbook.yml`: tasks -> yum install nginx -> service start nginx.",
        "Run the playbook against the EC2 instance."
      ]
    }
  },
  {
    id: 4,
    title: "Phase 4: Container Orchestration",
    description: "Scale your applications using Kubernetes. Learn to manage clusters, pods, and services.",
    reqs: ["k8s_basic", "k8s_admin"],
    icon: Server,
    color: "pink",
    project: {
      title: "Project Milestone 4: Cluster Operations",
      goal: "Migrate your Dockerized application to a Kubernetes cluster.",
      tasks: [
        { topic: "K8s Objects", task: "Write YAML manifests for Deployment, Service (LoadBalancer), and ConfigMap." },
        { topic: "Helm", task: "Package your application manifests into a Helm Chart." },
        { topic: "Ingress", task: "Deploy an Nginx Ingress Controller to route traffic based on subdomains." },
        { topic: "Scaling", task: "Configure Horizontal Pod Autoscaler (HPA) to scale based on CPU usage." }
      ],
      resources: [
        { name: "Kubernetes Docs", url: "https://kubernetes.io/docs/home/" },
        { name: "Helm Charts", url: "https://helm.sh/" }
      ],
      hints: [
        "Local K8s: Use Minikube or Kind for learning without cloud costs.",
        "Debugging: `kubectl describe pod` is your best friend for crash loops.",
        "Storage: Understand the difference between PersistentVolume and PersistentVolumeClaim."
      ],
      cheatSheet: [
        { cmd: "kubectl get pods -A", desc: "List all pods" },
        { cmd: "kubectl logs -f <pod>", desc: "Stream logs" },
        { cmd: "helm install myapp ./chart", desc: "Deploy helm chart" },
        { cmd: "kubectl apply -f deployment.yaml", desc: "Apply manifest" }
      ],
      guide: [
        "Start Minikube: `minikube start`.",
        "Create `deployment.yaml` with 3 replicas of your app.",
        "Create `service.yaml` exposing port 80.",
        "Apply files: `kubectl apply -f .`.",
        "Verify access: `minikube service myapp --url`."
      ]
    }
  },
  {
    id: 5,
    title: "Phase 5: Observability & SRE",
    description: "Ensure system reliability through monitoring, logging, and incident management.",
    reqs: ["monitoring", "security"],
    icon: Shield,
    color: "emerald",
    project: {
      title: "Project Milestone 5: The SRE Dashboard",
      goal: "Implement a full monitoring stack with Prometheus and Grafana.",
      tasks: [
        { topic: "Monitoring", task: "Deploy the Kube-Prometheus-Stack via Helm." },
        { topic: "Dashboards", task: "Create a Grafana dashboard displaying 'Golden Signals' (Latency, Traffic, Errors, Saturation)." },
        { topic: "Alerting", task: "Configure AlertManager to send notifications to Slack/Discord on high CPU." },
        { topic: "Security", task: "Run a Trivy scan on your cluster images and fix critical vulnerabilities." }
      ],
      resources: [
        { name: "Prometheus Operator", url: "https://github.com/prometheus-operator/kube-prometheus" },
        { name: "Grafana Dashboards", url: "https://grafana.com/grafana/dashboards/" }
      ],
      hints: [
        "Metrics: Ensure your app exposes metrics at `/metrics` endpoint for Prometheus to scrape.",
        "Security: Lock down Grafana with a strong password immediately.",
        "Persistence: Monitoring data consumes disk space. Configure retention policies."
      ],
      cheatSheet: [
        { cmd: "kubectl port-forward svc/grafana 3000:80", desc: "Access Grafana locally" },
        { cmd: "promtool check config prometheus.yml", desc: "Validate config" },
        { cmd: "trivy image myapp:v1", desc: "Scan image for CVEs" }
      ],
      guide: [
        "Add Helm repo: `helm repo add prometheus-community ...`",
        "Install stack: `helm install monitoring prometheus-community/kube-prometheus-stack`.",
        "Login to Grafana (admin/prom-operator).",
        "Import Dashboard ID 315 (Kubernetes Cluster Monitoring).",
        "Simulate load to see graphs move."
      ]
    }
  },
  {
    id: 6,
    title: "Phase 6: The Complete DevOps Project",
    description: "The ultimate integration. Combine Docker, Jenkins, Ansible, Terraform, and Kubernetes into one unified workflow.",
    reqs: ["ansible", "jenkins", "terraform", "k8s_admin"],
    icon: Zap,
    color: "cyan",
    project: {
      title: "Capstone: Real-World Cloud Platform",
      goal: "Build an end-to-end DevOps Platform as described in the CLS Learning Path.",
      tasks: [
        { topic: "Infrastructure", task: "Use Terraform to provision a K8s cluster (EKS/GKE/AKS) and a Jenkins Server EC2." },
        { topic: "Configuration", task: "Use Ansible to configure the Jenkins server with Docker, Java, and Git." },
        { topic: "CI/CD", task: "Create a Jenkins Pipeline that builds Docker images and deploys them to the K8s cluster using Helm." },
        { topic: "Operations", task: "Ensure the entire stack is monitored by Prometheus and logs are centralized." }
      ],
      resources: [
        { name: "CLS DevOps Career Path PDF", url: "#" },
        { name: "AWS EKS with Terraform", url: "https://learn.hashicorp.com/tutorials/terraform/eks" }
      ],
      hints: [
        "Integration: The hardest part is permissions. Ensure Jenkins EC2 role has permission to talk to EKS.",
        "GitOps: Consider using ArgoCD for the deployment step if you want to go advanced.",
        "Cost: Remember to `terraform destroy` everything when you are done to avoid cloud bills."
      ],
      cheatSheet: [
        { cmd: "terraform destroy", desc: "Tear down all infrastructure" },
        { cmd: "kubectl get nodes", desc: "Verify cluster nodes are ready" },
        { cmd: "jenkins-cli build my-job", desc: "Trigger build from CLI" }
      ],
      guide: [
        "Step 1: Write Terraform to launch infrastructure (VPC, EKS, EC2 for Jenkins).",
        "Step 2: Run Ansible playbook against Jenkins EC2 to install tools.",
        "Step 3: Configure Jenkins with EKS kubeconfig.",
        "Step 4: Write Jenkinsfile: Build Image -> Push to Registry -> Helm Upgrade.",
        "Step 5: Commit code and watch the magic happen."
      ]
    }
  }
];

// --- AI MODAL COMPONENT ---
const AIModal = ({ isOpen, onClose, title, content, loading, error }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 w-full max-w-2xl rounded-xl border border-slate-700 shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">DevOps Assistant</h3>
              <p className="text-sm text-slate-400 truncate max-w-md">{title}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader className="w-8 h-8 text-indigo-500 animate-spin" />
              <p className="text-slate-400 animate-pulse">Generating DevOps insights...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
              <p className="font-semibold mb-1">AI Connection Error</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              {content.split('\n').map((line, i) => {
                // Simple formatting: Header detection (lines starting with # or **)
                if (line.startsWith('**') || line.startsWith('#')) {
                  return <h4 key={i} className="text-indigo-300 font-bold mt-4 mb-2 text-lg">{line.replace(/^[#*]+/, '').replace(/[*]+$/, '')}</h4>;
                }
                // Code block detection (lines roughly looking like code or indented)
                if (line.includes('```') || line.startsWith('    ') || line.startsWith('\t')) {
                   return <pre key={i} className="bg-slate-950 border border-slate-800 p-3 rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto my-2">{line.replace(/```/g, '')}</pre>
                }
                // List items
                if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                    return <li key={i} className="text-slate-300 ml-4 list-disc">{line.replace(/^[-*]\s/, '')}</li>
                }
                if (line.trim() === "") return <br key={i}/>;
                
                return <p key={i} className="text-slate-300 leading-relaxed">{line}</p>;
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 rounded-b-xl flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Powered by Gemini 2.5</span>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION ---
const App = () => {
  // State: Load from localStorage if available
  const [selectedSkills, setSelectedSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('devops-pathfinder-skills');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  
  const [expandedResources, setExpandedResources] = useState({});
  const [showCapstone, setShowCapstone] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState("");
  const [copiedCmd, setCopiedCmd] = useState(null);

  // AI State
  const [aiModal, setAiModal] = useState({ isOpen: false, title: "", content: "", loading: false, error: null });

  // Effect: Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('devops-pathfinder-skills', JSON.stringify(selectedSkills));
  }, [selectedSkills]);

  const toggleSkill = (id) => {
    setSelectedSkills(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleResources = (stageId) => {
    setExpandedResources(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your progress? This cannot be undone.")) {
      setSelectedSkills({});
      setShowCapstone(false);
      setShowCertificate(false);
      setExpandedResources({});
      setUserName("");
    }
  };

  const getStageProgress = (stageReqs) => {
    const completed = stageReqs.filter(req => selectedSkills[req]).length;
    return Math.round((completed / stageReqs.length) * 100);
  };

  const isStageUnlocked = (index) => {
    if (index === 0) return true;
    const prevStage = roadmapStages[index - 1];
    return getStageProgress(prevStage.reqs) === 100;
  };

  const capstoneUnlocked = getStageProgress(roadmapStages[roadmapStages.length-1].reqs) === 100;

  const handlePrintCertificate = () => {
    window.print();
  };

  // --- AI FUNCTIONS ---
  const handleAITaskGuide = async (taskItem) => {
    setAiModal({ isOpen: true, title: `Guide: ${taskItem.task}`, content: "", loading: true, error: null });
    
    const prompt = `
      Act as a Senior DevOps Engineer Mentor. 
      The user is asking for help with this task: "${taskItem.task}".
      
      Please provide a concise, actionable guide.
      Structure your response as:
      1. **Concept**: One sentence explaining what we are doing.
      2. **Steps**: 3-5 bullet points on how to execute the task.
      3. **Code Snippet**: Provide the actual CLI command, Dockerfile content, or YAML code needed.
      
      Keep it strictly technical and under 300 words.
    `;

    try {
      const response = await callGemini(prompt);
      setAiModal(prev => ({ ...prev, content: response, loading: false }));
    } catch (err) {
      setAiModal(prev => ({ ...prev, error: "Failed to contact the AI Mentor.", loading: false }));
    }
  };

  const handleAITroubleshoot = async (phaseTitle, skills) => {
    const skillNames = skills.map(s => s.label).join(", ");
    setAiModal({ isOpen: true, title: `Troubleshooting Challenge: ${phaseTitle}`, content: "", loading: true, error: null });

    const prompt = `
      Generate a realistic DevOps troubleshooting scenario for a junior engineer.
      Context: ${phaseTitle}. Skills involved: ${skillNames}.
      
      Structure:
      **The Scenario**: Describe a broken system state (e.g., "Container keeps crashing", "502 Bad Gateway").
      **The Symptoms**: List 2-3 logs or error messages the user would see.
      **The Fix**: Explain the root cause and the specific commands to fix it.
      
      Make it challenging but solvable.
    `;

    try {
      const response = await callGemini(prompt);
      setAiModal(prev => ({ ...prev, content: response, loading: false }));
    } catch (err) {
      setAiModal(prev => ({ ...prev, error: "Failed to generate scenario.", loading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 print:bg-white print:p-0">
      <AIModal 
        isOpen={aiModal.isOpen} 
        onClose={() => setAiModal(prev => ({ ...prev, isOpen: false }))}
        title={aiModal.title}
        content={aiModal.content}
        loading={aiModal.loading}
        error={aiModal.error}
      />

      <div className="max-w-7xl mx-auto print:hidden">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-slate-800 pb-8 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              DevOps Pathfinder
            </h1>
            <p className="text-slate-400 text-sm md:text-base">
              Interactive Project-Based Roadmap • Integrated with CLS Curriculum
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={resetProgress}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-500/20"
              onClick={() => alert("To save this roadmap, use your browser's print feature (Ctrl+P) and 'Save as PDF'.")}
            >
              <Save className="w-4 h-4" />
              Save PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Skill Selector (Sticky) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl sticky top-6 max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                Your Skill Inventory
              </h2>
              
              <div className="space-y-8">
                {Object.entries(skillsData).map(([key, category]) => (
                  <div key={key}>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-1">{category.title}</h3>
                    <div className="space-y-2">
                      {category.skills.map(skill => (
                        <label key={skill.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group">
                          <div className="relative flex items-center mt-0.5">
                            <input 
                              type="checkbox" 
                              className="peer sr-only"
                              checked={!!selectedSkills[skill.id]}
                              onChange={() => toggleSkill(skill.id)}
                            />
                            <div className="w-5 h-5 border-2 border-slate-600 rounded peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all shadow shadow-transparent peer-checked:shadow-indigo-500/50"></div>
                            <CheckCircle className="w-3.5 h-3.5 text-white absolute top-1 left-0.5 opacity-0 peer-checked:opacity-100 transition-all" />
                          </div>
                          <span className={`text-sm transition-colors leading-tight select-none ${selectedSkills[skill.id] ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                            {skill.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 text-center">
                <p>Progress is automatically saved to your browser.</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Project Journey */}
          <div className="lg:col-span-8 space-y-8 pb-20">
            
            {roadmapStages.map((stage, index) => {
              const progress = getStageProgress(stage.reqs);
              const isUnlocked = isStageUnlocked(index);
              const isCompleted = progress === 100;
              const Icon = stage.icon;
              const showExtras = expandedResources[stage.id];
              const styles = colorMap[stage.color];

              // Find skills relevant to this stage for the troubleshooting prompt
              const stageSkills = stage.reqs.map(reqId => {
                for (const cat in skillsData) {
                  const found = skillsData[cat].skills.find(s => s.id === reqId);
                  if (found) return found;
                }
                return null;
              }).filter(Boolean);

              return (
                <div key={stage.id} className={`relative group transition-all duration-500 ${!isUnlocked ? 'opacity-40 grayscale blur-[1px] hover:blur-0 hover:opacity-60' : 'opacity-100'}`}>
                  
                  {/* Connector Line */}
                  {index !== roadmapStages.length - 1 && (
                    <div className={`absolute left-8 top-16 bottom-[-32px] w-0.5 transition-colors z-0 ${isCompleted ? 'bg-emerald-500/30' : 'bg-slate-800'}`}></div>
                  )}

                  <div className={`relative z-10 bg-slate-900 rounded-2xl border overflow-hidden transition-all duration-300 ${isCompleted ? 'border-emerald-500/30 shadow-lg shadow-emerald-900/10' : isUnlocked ? `${styles.border} shadow-lg` : 'border-slate-800'}`}>
                    
                    {/* Progress Strip */}
                    <div className="h-1.5 w-full bg-slate-800">
                      <div className={`h-full transition-all duration-700 ease-out ${isCompleted ? 'bg-emerald-500' : styles.progress}`} style={{ width: `${progress}%` }}></div>
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-6">
                        <div className={`shrink-0 p-4 rounded-xl transition-colors ${isCompleted ? 'bg-emerald-500/10 text-emerald-400' : isUnlocked ? `${styles.bg} ${styles.text}` : 'bg-slate-800 text-slate-600'}`}>
                          {isCompleted ? <CheckCircle className="w-8 h-8" /> : <Icon className="w-8 h-8" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`text-xl font-bold ${isCompleted ? 'text-emerald-400' : 'text-white'}`}>{stage.title}</h3>
                            {isUnlocked && !isCompleted && <span className={`text-xs font-mono px-2 py-1 rounded border animate-pulse ${styles.bg} ${styles.text} ${styles.border}`}>IN PROGRESS</span>}
                          </div>
                          
                          <p className="text-slate-400 mb-6">{stage.description}</p>

                          {/* Project Box */}
                          {isUnlocked && (
                            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                              <div className="bg-slate-900/50 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Code className="w-4 h-4 text-indigo-400" />
                                  <span className="font-semibold text-indigo-100 text-sm uppercase tracking-wide">{stage.project.title}</span>
                                </div>
                                <button 
                                  onClick={() => toggleResources(stage.id)}
                                  className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors px-2 py-1 rounded hover:bg-indigo-500/10"
                                >
                                  {showExtras ? 'Hide' : 'Open'} Learning Toolkit
                                  <ArrowDown className={`w-3 h-3 transition-transform ${showExtras ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              
                              <div className="p-6 space-y-5">
                                <div className="flex gap-3 items-start">
                                    <Flag className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                    <p className="text-slate-300 italic">"{stage.project.goal}"</p>
                                </div>
                                
                                <div className="space-y-3 pl-2">
                                  {stage.project.tasks.map((item, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row sm:gap-4 border-l-2 border-slate-800 pl-4 py-2 hover:border-indigo-500/50 transition-colors group/task">
                                      <div className="shrink-0 w-24 text-xs font-mono text-slate-500 pt-0.5 sm:text-right uppercase tracking-wider">{item.topic}</div>
                                      <p className="text-sm text-slate-300 leading-relaxed flex-1">{item.task}</p>
                                      
                                      {/* AI Help Button */}
                                      <button 
                                        onClick={() => handleAITaskGuide(item)}
                                        className="opacity-0 group-hover/task:opacity-100 flex items-center gap-1 px-2 py-1 rounded bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-lg transition-all hover:scale-105"
                                        title="Ask Gemini AI for help with this task"
                                      >
                                        <Sparkles className="w-3 h-3" /> Guide Me
                                      </button>
                                    </div>
                                  ))}
                                </div>

                                {/* Resources & Hints Drawer */}
                                {showExtras && (
                                  <div className="mt-6 pt-6 border-t border-slate-800 animate-in slide-in-from-top-2 fade-in duration-300">
                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                      {/* Resources */}
                                      <div>
                                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                          <BookOpen className="w-3 h-3" /> Learning Resources
                                        </h4>
                                        <ul className="space-y-2">
                                          {stage.project.resources.map((res, i) => (
                                            <li key={i}>
                                              <a href={res.url} target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-emerald-400 hover:underline flex items-center gap-2 transition-colors group/link">
                                                <ExternalLink className="w-3 h-3 opacity-50 group-hover/link:opacity-100" />
                                                {res.name}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                                      {/* Hints */}
                                      <div>
                                        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                          <Lightbulb className="w-3 h-3" /> Pro Tips & Hints
                                        </h4>
                                        <ul className="space-y-3">
                                          {stage.project.hints.map((hint, i) => (
                                            <li key={i} className="text-sm text-slate-400 flex items-start gap-2 bg-amber-500/5 p-2 rounded border border-amber-500/10">
                                              <span className="text-amber-500 font-bold text-xs mt-0.5">!</span>
                                              {hint}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>

                                    {/* Build Guide */}
                                    <div className="border-t border-slate-800 pt-6 mb-8">
                                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                          <ListOrdered className="w-3 h-3" /> Build Walkthrough
                                        </h4>
                                        <div className="space-y-3">
                                            {stage.project.guide && stage.project.guide.map((step, i) => (
                                                <div key={i} className="flex gap-3">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-mono flex items-center justify-center border border-slate-700">
                                                        {i + 1}
                                                    </span>
                                                    <p className="text-sm text-slate-300 leading-relaxed pt-0.5">
                                                        {step}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Cheat Sheet & AI Challenge */}
                                    <div className="border-t border-slate-800 pt-6">
                                      <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                                          <Terminal className="w-3 h-3" /> Commands & Tools
                                        </h4>
                                        <button 
                                          onClick={() => handleAITroubleshoot(stage.title, stageSkills)}
                                          className="text-xs flex items-center gap-1 bg-slate-800 hover:bg-red-900/30 text-slate-400 hover:text-red-400 px-3 py-1.5 rounded border border-slate-700 hover:border-red-500/50 transition-all"
                                        >
                                          <Bot className="w-3 h-3" />
                                          Generate AI Broken Scenario
                                        </button>
                                      </div>
                                      
                                      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                                        {stage.project.cheatSheet.map((cmdItem, i) => (
                                          <div key={i} className="flex items-center justify-between p-3 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 group/cmd">
                                            <div className="flex flex-col md:flex-row md:items-center md:gap-4 flex-1 min-w-0">
                                               <code className="text-sm font-mono text-blue-300 bg-blue-900/10 px-2 py-0.5 rounded truncate">{cmdItem.cmd}</code>
                                               <span className="text-xs text-slate-500 truncate hidden md:block">// {cmdItem.desc}</span>
                                               <span className="text-xs text-slate-500 md:hidden mt-1">{cmdItem.desc}</span>
                                            </div>
                                            <button 
                                              onClick={() => copyToClipboard(cmdItem.cmd)}
                                              className="ml-4 text-slate-500 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
                                              title="Copy command"
                                            >
                                              {copiedCmd === cmdItem.cmd ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Final Project Capstone Section */}
            <div className={`relative z-10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl border ${capstoneUnlocked ? 'border-emerald-500 shadow-2xl shadow-emerald-500/20' : 'border-slate-800 opacity-80'} overflow-hidden mt-12 transition-all duration-500`}>
              
              {!showCapstone ? (
                <div className="p-10 text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-colors ${capstoneUnlocked ? 'bg-emerald-500/20 text-emerald-400 animate-bounce-subtle' : 'bg-slate-800 text-slate-600'}`}>
                    <Award className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">The Final Boss: Capstone Project</h2>
                  <p className="text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                    Integrate all 6 phases. Take your Kubernetes cluster, implement GitOps with ArgoCD, setup a centralized logging stack (ELK/Loki), and perform a Chaos Engineering test.
                  </p>
                  
                  {capstoneUnlocked ? (
                    <button 
                      onClick={() => setShowCapstone(true)}
                      className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:-translate-y-1"
                    >
                      Generate Final Project Specs
                    </button>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-slate-800 text-slate-500 font-mono text-sm border border-slate-700">
                            <Lock className="w-3 h-3" />
                            Locked: Complete all previous phases
                        </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="animate-in zoom-in-95 fade-in duration-500">
                    <div className="bg-emerald-950/30 border-b border-emerald-500/30 p-6 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Award className="w-8 h-8 text-emerald-400" />
                            <div>
                                <h2 className="text-xl font-bold text-white">Capstone: The "Cloud-Native" E-Commerce Platform</h2>
                                <p className="text-emerald-400/80 text-sm">Full Stack DevOps Implementation</p>
                            </div>
                        </div>
                        <button onClick={() => setShowCapstone(false)} className="text-slate-400 hover:text-white text-sm">Close</button>
                    </div>
                    
                    <div className="p-8 space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Server className="w-5 h-5 text-indigo-400" />
                                    Architecture Requirements
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
                                    <li>Microservices: User Service (Python), Product Service (Go), Frontend (React).</li>
                                    <li>Database: Managed RDS (Postgres) via Terraform.</li>
                                    <li>Ingress: Nginx Controller with TLS (Cert-Manager + Let's Encrypt).</li>
                                    <li>Scaling: Horizontal Pod Autoscaling (HPA) based on CPU &gt; 70%.</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-emerald-400" />
                                    Operational Requirements
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
                                    <li>GitOps: Use ArgoCD to sync cluster state from a specific Git repo.</li>
                                    <li>Observability: Grafana Dashboards showing 4 Golden Signals.</li>
                                    <li>Logging: Centralized logging using Fluent-bit -&gt; Loki -&gt; Grafana.</li>
                                    <li>Chaos: Kill a random pod every 24h using Chaos Mesh.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-lg p-6 border border-slate-800">
                            <h4 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-wider">Evaluation Criteria</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-indigo-500 h-full w-[100%]"></div>
                                    </div>
                                    <span className="text-xs text-slate-400 whitespace-nowrap">Zero Downtime Deployments</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-indigo-500 h-full w-[100%]"></div>
                                    </div>
                                    <span className="text-xs text-slate-400 whitespace-nowrap">Infrastructure Recovery &lt; 5m</span>
                                </div>
                            </div>
                        </div>

                        {/* Certificate Section */}
                        <div className="mt-8 pt-8 border-t border-slate-800">
                           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                              <Award className="w-5 h-5 text-yellow-500" />
                              Project Completed? Claim your Reward.
                           </h3>
                           <div className="bg-slate-800/50 rounded-lg p-6 flex flex-col md:flex-row items-center gap-4 justify-between border border-slate-700">
                              <div className="w-full md:w-auto flex-1">
                                <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Your Name for Certificate</label>
                                <input 
                                  type="text" 
                                  placeholder="Enter your full name" 
                                  value={userName}
                                  onChange={(e) => setUserName(e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                />
                              </div>
                              <button 
                                onClick={() => setShowCertificate(true)}
                                disabled={!userName.trim()}
                                className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${userName.trim() ? 'bg-yellow-600 hover:bg-yellow-500 text-white shadow-lg' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                              >
                                <Award className="w-5 h-5" />
                                Issue Certificate
                              </button>
                           </div>
                        </div>

                        <div className="text-center pt-4">
                            <a 
                              href="https://github.com/new" 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors"
                            >
                                Start Repository <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
