# 🚀 Node.js Project Template

This is a base Node.js project template, prepared with some of the most important code principles and project management recommendations. Feel free to change anything to suit your needs!

## 📋 Table of Contents

- [Description](#description)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## 📖 Description

This template provides a solid foundation for building Node.js applications. It follows best practices for organizing code, managing configurations, and structuring your project for scalability and maintainability.

## 🏗️ Project Structure

Inside the `src` folder, all the actual source code resides (excluding tests, which you might want to place in a separate `tests` folder).

Let's take a look inside the `src` folder:

- 📁 **`config`** - Handles configurations and setup for libraries or modules.  
  Example: Setting up `dotenv` for environment variables in `server-config.js`, or configuring logging libraries.

- 📁 **`routes`** - Registers routes along with their corresponding middlewares and controllers.

- 📁 **`middlewares`** - Intercepts incoming requests for validation, authentication, etc.

- 📁 **`controllers`** - Acts as the last middleware layer. Receives requests, passes data to the business layer, and structures API responses.

- 📁 **`repositories`** - Contains logic for database interactions, including raw queries or ORM queries.

- 📁 **`services`** - Holds business logic and interacts with repositories for database data.

- 📁 **`utils`** - Includes helper methods, error classes, and other utilities.

## ⚙️ Setup

Follow these steps to set up the project:

1. 📥 **Download and Open**: Download this template from GitHub and open it in your favorite text editor.

2. 📦 **Install Dependencies**: Navigate to the project folder and run:
   ```bash
   npm install
   ```

3. 🔧 **Environment Variables**: Create a `.env` file in the root directory and add the following:
   ```
   PORT=<port number of your choice>
   ```
   Example:
   ```
   PORT=3000
   ```

4. 🗄️ **Database Setup**: Go inside the `src` folder and initialize Sequelize:
   ```bash
   npx sequelize init
   ```
   This will create `migrations`, `seeders`, and `config.json` in the `config` folder.

5. 🔄 **Configure Database**: 
   - For development: Update `config.json` with your database username, password, and dialect (e.g., mysql, mariadb).
   - For test/prod: Replace the host with your hosted database URL.

## 🚀 Usage

To run the server in development mode, execute:
```bash
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source. Check the license file for more details.
