# 🚀 TeamFlow - Full-Stack Team Task Manager

**TeamFlow** is a powerful web application designed to help teams collaborate on projects. It allows Admins to manage projects and assign tasks, while Members can track and update their progress.[cite: 17, 18, 21]

---

## ⚙️ Technology Stack

### **Frontend**
*   **React.js**: For building the user interface.[cite: 11, 14]
*   **Tailwind CSS**: For professional and responsive styling.[cite: 13, 15]
*   **Axios**: For making API requests to the backend.[cite: 11]

### **Backend**
*   **Node.js & Express.js**: For the server-side logic and REST APIs.[cite: 30, 32]
*   **JWT (JSON Web Token)**: For secure user authentication.[cite: 20, 25]

### **Database**
*   **MongoDB**: For storing users, projects, and tasks data.[cite: 19, 24]
*   **Mongoose**: For database modeling.[cite: 22, 23, 30]

---

## 🛠️ Project Workflow

The application works based on two primary roles: **Admin** and **Member**.[cite: 21, 24]

### **1. Authentication**
*   **Signup**: Users can register by choosing a role (Admin or Member).[cite: 8, 16]
*   **Login**: Secure login using email and password.[cite: 6, 16]

### **2. Admin Role (Project Manager)**
*   **Create Projects**: Admins can create new projects with a name and description.[cite: 17, 22]
*   **Manage Teams**: Admins add members to specific projects using their IDs.[cite: 17]
*   **Assign Tasks**: Admins can create tasks within a project and assign them to specific team members.[cite: 18, 23]
*   **Full Visibility**: Admins can see all tasks, status updates, and overdue tasks across the team.[cite: 5, 18]

### **3. Member Role (Team Member)**
*   **Personal Dashboard**: Members only see tasks specifically assigned to them.[cite: 18]
*   **Update Progress**: Members can change the status of their tasks (Pending, In Progress, or Completed).[cite: 4, 18]
*   **Sync with Admin**: When a member marks a task as "Completed," it is instantly updated on the Admin's dashboard.[cite: 5, 18]

---

## 🚀 Deployment

The project is deployed on **Railway**. You can access it here:
**[Insert Your Railway Deployment Link Here]**

---

## 📂 Installation (Local Setup)

1. **Clone the Project:**
   ```bash
   git clone <your-github-repo-link>
