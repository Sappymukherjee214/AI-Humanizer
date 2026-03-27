# Contributing to AI Humanizer 📝

Thank you for your interest in contributing to **AI Humanizer**! We're excited to have you join our community, especially during **GSSoC 2026**. This project aims to make AI-generated content more human, undetectable, and professional.

By contributing to this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 🌟 GSSoC 2026 Guidelines

As a participant in GSSoC 2026, please follow these additional steps:

1.  **Find an Issue**: Go to the [Issues](https://github.com/Sappymukherjee214/AI-Humanizer/issues) tab and look for issues labeled with `gssoc26`.
2.  **Claiming an Issue**: Comment on the issue you'd like to work on with: `"I want to work on this. Please assign it to me during GSSoC."`
3.  **Wait for Assignment**: Only start working on an issue *after* a maintainer has assigned it to you. This avoids duplication of work.
4.  **Submission Timeline**: You should aim to submit your PR within 2-3 days of being assigned. If you need more time, please update the issue.

---

## 🚀 How to Contribute

### 1. Fork and Clone

- **Fork** the repository to your own GitHub account.
- **Clone** your fork to your local machine:
  ```bash
  git clone https://github.com/your-username/AI-Humanizer.git
  cd AI-Humanizer
  ```

### 2. Set Up the Project

Refer to the [README.md](README.md) for detailed instructions on setting up the **Backend** and **Frontend**. Ensure you have all prerequisites installed.

### 3. Create a Feature Branch

Always create a new branch for your work:
```bash
git checkout -b feature/your-feature-name
# OR
git checkout -b fix/your-fix-name
```

### 4. Make Your Changes

- Keep your code clean, readable, and well-commented.
- Follow the existing project structure and styling (React 19, Tailwind CSS, etc.).
- If you're adding a new feature, include unit tests if possible.

### 5. Commit and Push

- Use descriptive commit messages:
  ```bash
  git add .
  git commit -m "feat: added multi-language support (GSSoC'26)"
  git push origin feature/your-feature-name
  ```

### 6. Create a Pull Request (PR)

- Go to the original AI Humanizer repository on GitHub.
- Click on **New Pull Request**.
- Provide a clear title and description of your changes.
- Reference the issue number you worked on (e.g., `Closes #12`).
- Check that your PR passes all status checks and linting rules.

---

## 🛠️ Project Structure

- `/frontend`: React application (Vite, Tailwind, Framer Motion).
- `/backend`: Node.js/Express server (Prisma ORM, PostgreSQL).
- `/assets`: Brand assets and mockups.

---

## 💬 Communication

If you have any questions or need clarification, you can:
- Comment on the relevant issue.
- Reach out to the Project Admin (**Saptarshi Mukherjee**) via the official GSSoC Discord/Slack channels.

Happy coding! 🚀
