# Important
Set UTF-8 encoding in VS Code
# Getting started
Clone the Mini Twitter repository from GitHub
```bash
git clone https://github.com/NgawangChoedenShankentsang/miniTwitter.git
```

Navigate to the project directory
```bash
cd mini-twitter
```

Install the required packages
```bash
npm install
```
or 
```bash
yarn install
```

Create a .env file in root directory with the JWT_SECRET environment variable
```bash
echo "JWT_SECRET=mySecretKey123" > .env
```
Open Docker Desktop and start the Docker
```bash
docker-compose up -d
```
Start the server
```bash
npm run dev
```
or 
```bash
yarn dev
```
## Visit the Application
```bash
localhost:4200
```
## Visit the Database
```bash
localhost:9200
```
# Contributing
If you would like to contribute to Mini Twitter, please open a new issue or pull request on the GitHub repository.