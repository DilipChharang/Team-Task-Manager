# 🚀 TeamFlow - Full-Stack Team Task Manager

**TeamFlow** is a powerful web application designed to help teams collaborate on projects. It allows Admins to manage projects and assign tasks, while Members can track and update their progress.

---

## ⚙️ Technology Stack

### **Frontend**
*   **React.js**: For building the user interface.
*   **Tailwind CSS**: For professional and responsive styling.
*   **Axios**: For making API requests to the backend.

### **Backend**
*   **Node.js & Express.js**: For the server-side logic and REST APIs.
*   **JWT (JSON Web Token)**: For secure user authentication.

### **Database**
*   **MongoDB**: For storing users, projects, and tasks data.
*   **Mongoose**: For database modeling.

---

## 🛠️ Project Workflow

The application works based on two primary roles: **Admin** and **Member**.

### **1. Authentication**
*   **Signup**: Users can register by choosing a role (Admin or Member).
*   **Login**: Secure login using email and password.

### **2. Admin Role (Project Manager)**
*   **Create Projects**: Admins can create new projects with a name and description.
*   **Manage Teams**: Admins add members to specific projects using their IDs.
*   **Assign Tasks**: Admins can create tasks within a project and assign them to specific team members.
*   **Full Visibility**: Admins can see all tasks, status updates, and overdue tasks across the team.

### **3. Member Role (Team Member)**
*   **Personal Dashboard**: Members only see tasks specifically assigned to them.
*   **Update Progress**: Members can change the status of their tasks (Pending, In Progress, or Completed).
*   **Sync with Admin**: When a member marks a task as "Completed," it is instantly updated on the Admin's dashboard.

---

## 🚀 Deployment

The project is deployed on **Railway**. You can access it here:
**[Insert Your Railway Deployment Link Here]**

---

