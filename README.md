# Daily X Backend

Backend service for the [daily-x](https://github.com/pvcodes/daily-x) application.

## Prerequisites

- Node.js (latest LTS version recommended)
- PostgreSQL database (local or remote)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/pvcodes/daily-x-be.git
   cd daily-x-be
   ```

2. **Set up environment variables**
   ```bash
   mv .env.example .env
   ```
   Update `.env` with your PostgreSQL database URL and other required variables.

3. **Install dependencies**
   ```bash
   yarn install    # Yarn is recommended
   ```

4. **Start development server**
   ```bash
   yarn dev
   ```

## API Testing

Once the server is running, verify the setup by accessing:
```
http://localhost:3000/
```
This endpoint returns the server status.

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork & Clone**
   - Fork the repository on GitHub
   - Clone your fork locally

2. **Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit & Push**
   ```bash
   git commit -m "Description of your changes"
   git push origin feature/your-feature-name
   ```

4. **Submit Pull Request**
   - Create a PR from your fork to the main repository
   - Provide a clear description of your changes
   - Reference any related issues

## Related Projects

- [daily-x](https://github.com/pvcodes/daily-x) - Frontend application