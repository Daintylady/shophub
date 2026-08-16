import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function generateReferralCode(username) {
  const randomBit = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${username.slice(0, 4).toUpperCase()}${randomBit}`;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  function getUsers() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  }

  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function signup(username, email, password, referralCodeUsed) {
    const users = getUsers();

    const alreadyExists = users.some((u) => u.email === email);
    if (alreadyExists) {
      throw new Error("This email is already registered. Please log in instead.");
    }

    let hasReferralDiscount = false;
    let updatedUsers = users;

    if (referralCodeUsed) {
      const referrer = users.find((u) => u.referralCode === referralCodeUsed);
      if (referrer) {
        hasReferralDiscount = true;
        updatedUsers = users.map((u) =>
          u.referralCode === referralCodeUsed
            ? { ...u, hasReferralDiscount: true }
            : u
        );
      }
    }

    const newUser = {
      username,
      email,
      password,
      referralCode: generateReferralCode(username),
      hasReferralDiscount,
    };

    saveUsers([...updatedUsers, newUser]);
  }

  function login(email, password) {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      throw new Error("Invalid email or password.");
    }

    setCurrentUser(found);
    localStorage.setItem("currentUser", JSON.stringify(found));
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  function resetPassword(email, newPassword) {
    const users = getUsers();
    const updated = users.map((u) =>
      u.email === email ? { ...u, password: newPassword } : u
    );
    saveUsers(updated);
  }

  function findUserByEmail(email) {
    return getUsers().find((u) => u.email === email);
  }

  function clearReferralDiscount() {
    if (!currentUser) return;
    const users = getUsers();
    const updated = users.map((u) =>
      u.email === currentUser.email ? { ...u, hasReferralDiscount: false } : u
    );
    saveUsers(updated);
    const updatedCurrent = { ...currentUser, hasReferralDiscount: false };
    setCurrentUser(updatedCurrent);
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrent));
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    findUserByEmail,
    clearReferralDiscount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}