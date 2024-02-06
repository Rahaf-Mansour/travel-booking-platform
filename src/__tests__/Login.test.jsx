import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import AuthContextProvider from "../context/authContext";
import { loginAPI } from "../services/authService";

jest.mock("../services/authService", () => ({
  loginAPI: jest.fn(),
}));

describe("Login Component", () => {
  it("renders Login component", () => {
    render(
      <MemoryRouter>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </MemoryRouter>
    );
    const headerElement = screen.getByText(/Login 👋/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("submits the form with valid credentials when trying to login as user", async () => {
    loginAPI.mockResolvedValue({ userType: "User" });

    render(
      <MemoryRouter>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText(/Log in/i);

    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "user" } });

    await waitFor(() => {
      expect(usernameInput).toHaveValue("user");
      expect(passwordInput).toHaveValue("user");
    });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginAPI).toHaveBeenCalledWith({
        username: "user",
        password: "user",
      });
    });

    await waitFor(() => {
      const successMessage = screen.getByText(
        /Welcome, you're successfully logged in!/i
      );
      expect(successMessage).toBeInTheDocument();
    });
  });

  it("displays error message for invalid credentials when trying to login as user", async () => {
    loginAPI.mockRejectedValue(new Error("Invalid credentials"));

    render(
      <MemoryRouter>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByText(/Log in/i);

    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginAPI).toHaveBeenCalledWith({
        username: "user",
        password: "wrongPassword",
      });
    });

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /Login failed! Unable to login with provided credentials./i
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

it("submits the form with valid credentials when trying to login as admin", async () => {
  loginAPI.mockResolvedValue({ userType: "Admin" });

  render(
    <MemoryRouter>
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    </MemoryRouter>
  );

  const usernameInput = screen.getByPlaceholderText(/Username/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const loginButton = screen.getByText(/Log in/i);

  fireEvent.change(usernameInput, { target: { value: "admin" } });
  fireEvent.change(passwordInput, { target: { value: "admin" } });

  await waitFor(() => {
    expect(usernameInput).toHaveValue("admin");
    expect(passwordInput).toHaveValue("admin");
  });

  fireEvent.click(loginButton);

  await waitFor(() => {
    expect(loginAPI).toHaveBeenCalledWith({
      username: "admin",
      password: "admin",
    });
  });

  await waitFor(() => {
    const successMessage = screen.getByText(
      /Welcome, you're successfully logged in!/i
    );
    expect(successMessage).toBeInTheDocument();
  });
});

it("displays error message for invalid credentials when trying to login as admin", async () => {
  loginAPI.mockRejectedValue(new Error("Invalid credentials"));

  render(
    <MemoryRouter>
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    </MemoryRouter>
  );

  const usernameInput = screen.getByPlaceholderText(/Username/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const loginButton = screen.getByText(/Log in/i);

  fireEvent.change(usernameInput, { target: { value: "admin" } });
  fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });

  fireEvent.click(loginButton);

  await waitFor(() => {
    expect(loginAPI).toHaveBeenCalledWith({
      username: "admin",
      password: "wrongPassword",
    });
  });

  await waitFor(() => {
    const errorMessage = screen.getByText(
      /Login failed! Unable to login with provided credentials./i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
