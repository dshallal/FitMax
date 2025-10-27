# FitMax - React Native Expo Project

A blank slate React Native project with Expo, configured with a dev container for development on Windows.

## Prerequisites

- Docker Desktop installed and running
- VS Code with the "Dev Containers" extension
- Git

## Getting Started

### Using Dev Container (Recommended)

1. Open this project in VS Code
2. When prompted, click "Reopen in Container" or use the Command Palette (`Ctrl+Shift+P`) and select "Dev Containers: Reopen in Container"
3. Wait for the container to build and start
4. Once the container is ready, open the terminal in VS Code
5. Run the development server:
   ```bash
   npm run web
   ```
6. The app will be available at `http://localhost:19006`

### Running Locally (Alternative)

If you prefer to run without the dev container:

1. Install Node.js (version 18 or higher)
2. Install Expo CLI globally:
   ```bash
   npm install -g @expo/cli
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run web
   ```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run web` - Start the development server for web
- `npm run android` - Start the development server for Android
- `npm run ios` - Start the development server for iOS

## Project Structure

```
├── .devcontainer/          # Dev container configuration
│   ├── devcontainer.json   # Dev container settings
│   └── Dockerfile         # Container image definition
├── .vscode/               # VS Code workspace settings
│   ├── settings.json      # Editor settings
│   └── launch.json        # Debug configurations
├── App.js                 # Main application component
├── app.json              # Expo configuration
└── package.json          # Project dependencies and scripts
```

## Development

The dev container includes:
- Node.js 18
- Expo CLI
- VS Code extensions for React Native development
- Pre-configured port forwarding for Expo services
- Optimized settings for TypeScript and React development

## Troubleshooting

If you encounter issues with the dev container:
1. Ensure Docker Desktop is running
2. Try rebuilding the container: Command Palette → "Dev Containers: Rebuild Container"
3. Check that all required ports (8081, 19000, 19001, 19002) are available

For web development issues:
1. Clear browser cache
2. Try running `expo start --web --clear` to clear the cache
3. Check that port 19006 is not in use by another application
