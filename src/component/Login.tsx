import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginFields {
  username: string;
  password: string;
}

interface LoginErrors {
  username?: string;
  password?: string;
  general?: string;
}

const initialFields: LoginFields = {
  username: "",
  password: "",
};

const validate = (fields: LoginFields): LoginErrors => {
  const errors: LoginErrors = {};

  if (!fields.username.trim()) errors.username = "Username is required";
  if (!fields.password.trim()) errors.password = "Password is required";

  return errors;
};

export const Login = () => {
  const navigate = useNavigate();

  const [fields, setFields] = useState<LoginFields>(initialFields);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id as keyof LoginFields;

    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
  };

  const sendInformation = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foundErrors = validate(fields);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) return;

    toast.success("Successfully logged in!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      theme: "light",
    });

    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <PageWrapper>
      <ToastContainer />
      <Card>
       <CardTitle>Log into StyleHub</CardTitle>

        <StyledForm action="#" method="post" onSubmit={sendInformation}>
          <InputGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={fields.username}
              onChange={handleChange}
              $hasError={Boolean(errors.username || errors.general)}
            />
            {errors.username && <ErrorText>{errors.username}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={fields.password}
              onChange={handleChange}
              $hasError={Boolean(errors.password || errors.general)}
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </InputGroup>

          {errors.general && <ErrorText>{errors.general}</ErrorText>}

          <SubmitButton type="submit">Log in</SubmitButton>
        </StyledForm>
      </Card>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #ebf2fa;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Card = styled.div`
  width: 100%;
  max-width: 380px;
  padding: 32px;
  box-sizing: border-box;

  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
`;


const CardTitle = styled.h2`
  margin: 0 0 24px 0;

  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 16px;
`;

const Label = styled.label`
  margin-bottom: 8px;

  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
`;

const Input = styled.input<{ $hasError: boolean }>`
  padding: 10px 14px;

  background-color: #f8fafc;
  color: #0f172a;
  font-size: 14px;

  border: ${(props) =>
    props.$hasError ? "2px solid #eb2525" : "1px solid #2563eb"};
  border-radius: 10px;
`;

const ErrorText = styled.p`
  margin-top: 6px;
  margin-bottom: 4px;

  color: #ef4444;
  font-size: 13px;
`;

const SubmitButton = styled.button`
  width: 100%;

  padding: 12px;
  margin-top: 8px;

  background-color: #2563eb;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;

  border: none;
  border-radius: 10px;

  cursor: pointer;
`;
