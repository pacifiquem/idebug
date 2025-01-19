# IDebug - Intelligent Debugger

**IDebug** is an AI-powered self-hosted debugging platform designed to revolutionize the debugging process by combining runtime data collection with intelligent issue analysis. This project aims to provide developers with a powerful tool to diagnose and resolve issues efficiently across frontend, backend, and APIs.

> **Note**: IDebug is currently in the proof-of-concept stage and may not be production-ready. Feedback and contributions are greatly appreciated to help shape the future of the project!

## Overview

**IDebug** is built as a proof of concept to explore the potential of using AI to automate and streamline debugging workflows. Developers can integrate the IDebug SDK into their applications to capture runtime data, report issues, and receive actionable insights for resolution.

The platform is self-hosted, ensuring full control over data and privacy while leveraging AI-powered diagnostics.

## Core Features

- **AI-Powered Issue Analysis**: Automatically identifies the root cause of reported issues and suggests fixes.
- **Self-Hosted**: Run IDebug locally to maintain data ownership and privacy.
- **Runtime Data Collection**: The SDK collects logs, API calls, user interactions, and other critical runtime data.
- **Session-Based Debugging**: Developers tag runtime data to specific issues using session IDs.
- **Interactive Interface**: Report issues, visualize runtime data, and review debugging insights through a user-friendly interface.

## How It Works

### 1. Integration:
- Developers integrate the IDebug SDK into their application.
- The SDK captures relevant runtime data during application execution.

### 2. Issue Reporting:
- Developers report an issue on the IDebug platform and generate a Session ID.
- The Session ID is added to the application code to associate runtime data with the reported issue.

### 3. Runtime Data Collection:
- Developers run and interact with their application as usual.
- The SDK collects and transmits tagged runtime data to the IDebug platform.

### 4. AI Analysis:
- IDebug analyzes the data, diagnoses the issue, and provides insights, including root causes and suggested fixes.

### 5. Insights and Suggestions:
- Developers access a detailed analysis through the platform interface, complete with logs, traces, and actionable recommendations.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the contribution guidelines.


## License

This project is licensed under the MIT License.  
[See the LICENSE file for details](https://github.com/pacifiquem/idebug/blob/main/LICENSE).
