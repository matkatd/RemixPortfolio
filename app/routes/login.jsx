import { Form, useActionData } from "@remix-run/react";
import adminStyles from "../styles/admin.css";
import { FormField } from "./components/FormField";
import { useEffect, useRef, useState } from "react";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators.server";
import { json, redirect } from "@remix-run/node";
import { getUser, login, register } from "../utils/auth.server";

export const loader = async ({ request }) => {
  // If there's already a user in the session, redirect to the home page
  return (await getUser(request)) ? redirect("/admin") : null;
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");

  if (
    typeof action !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  if (
    action === "register" &&
    (typeof firstName !== "string" || typeof lastName !== "string")
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === "register"
      ? {
          firstName: validateName(firstName || ""),
          lastName: validateName(lastName || ""),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 }
    );

  switch (action) {
    case "login": {
      return await login({ email, password });
    }
    case "register": {
      return await register({ email, password, firstName, lastName });
    }
    default:
      return json({ error: `Invalid Form Data` }, { status: 400 });
  }
};

export default function Login() {
  const [action, setAction] = useState("login");

  const actionData = useActionData();

  const firstLoad = useRef(true);
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || "");

  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    firstName: actionData?.fields?.lastName || "",
    lastName: actionData?.fields?.firstName || "",
  });

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      };
      setErrors(newState);
      setFormError("");
      setFormData(newState);
    }
  }, [action]);

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  // Updates the form data when an input changes
  const handleInputChange = (event, field) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  return (
    <main>
      <div className="login">
        <button
          onClick={() => setAction(action == "login" ? "register" : "login")}
          className="change-button">
          {action === "login" ? "Sign Up" : "Sign In"}
        </button>
        <Form method="post">
          <div className="error-text">{formError}</div>
          <FormField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors?.email}
          />
          <FormField
            htmlFor="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors?.password}
          />
          {/* {action === 'register' && (
            <>
              <FormField
                htmlFor="firstName"
                label="First Name"
                onChange={e => handleInputChange(e, 'firstName')}
                value={formData.firstName}
                error={errors?.firstName}
              />
              <FormField
                htmlFor="lastName"
                label="Last Name"
                onChange={e => handleInputChange(e, 'lastName')}
                value={formData.lastName}
                error={errors?.lastName}
              />
            </>
          )} */}
          <div>
            <button
              type="submit"
              name="_action"
              value={action}
              className="login-button">
              {action === "login" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: adminStyles }];
}
