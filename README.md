# Project Title

Brief description of the project.

## Technologies Used

- Typescript
- MongoDB
- Next.js

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JoseNeto5689/bd2_project.git
   ```
2. Navigate to the API directory:
   ```bash
   cd bd2_api
   ```
3. Install all the dependencies:
   ```bash
   bun install
   ```
4. Navigate to the front directory:
   ```
   cd bd2_front
   ```
5. Install all the dependencies
   ```
   bun install
   ```
6. You need create and copy link of mongoDB database url to bd2_api/docker-compose.yml
   ```

   ```
7. After that you need to execute docker-compose in bd2_api directory with command:
   ```
   docker compose up --build
   ```
8. Now you need to execute run server Next in bd2_front directory with command:
   ```
   bun dev
   ```
9. Now you need to execute cypress server in other terminal with command:
   ```
   npx cypress open or bun cypress open
   ```
10. After that you can execute all of tests without problem
