export const loginFormControls = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email ID",
        componentType: "input",
        type:"email"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        type:"password"
    }
];

export const registrationFormControl = [
    {
        name: "userName",
        label: "Enter user name",
        placeholder: "Enter your user name",
        componentType: "input",
        type:"text"
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email ID",
        componentType: "input",
        type:"email"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        type:"password"
    },
    {
        label: "Role",
        name: "role",
        componentType: "select",
        options: [
          { id: "creator", label: "Creator" },
          { id: "user", label: "User" },
        ],
    },
];

export const backendDomainName = "http://localhost:5000/";