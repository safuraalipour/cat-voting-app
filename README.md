# Cat Gallery & Voting App

A professional mobile application built with **React Native (Expo)**. This project serves as a technical demonstration of handling real-time data, complex state management, and clean architectural patterns using [The Cat API](https://thecatapi.com/).

## Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install


2. Running the App
Start the Expo development server:

Bash
npx expo start

🛠 Tech Stack
Framework: Expo (SDK 50+) with Expo Router.

State Management: TanStack Query (React Query) for efficient server-state handling.

Networking: Axios with a centralized instance.

Icons: Lucide React Native.

Formatting: Prettier for code consistency.


Configuration & Security Note
API Key Management
For the convenience of the technical reviewer, the API Key is currently included directly in the source code (src/api/client.ts). This allows the project to be run immediately after cloning without requiring extra setup steps.

Production Standards:
I am fully aware of production security protocols. To demonstrate this:

I have included a .env.example file in the root directory.

In a real-world scenario, I would move the key to a .env file and exclude it from version control via .gitignore.

Author
Safoura
https://www.linkedin.com/in/safoura-alipour/
https://github.com/safuraalipour
