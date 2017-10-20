<p align="center">
  <img src = "resources/logo.png" alt = "Logo" width = 600 /> 
</p>

CaseX is an interactive web application and database solution optimized for the management of physical case data. CaseX is currently being developed in partnership with the Los Angeles Police Department Homicide Library Unit for the LMU Senior Capstone Project.

## Requirements
Install `npm` and `mongodb` if they are not already installed.
```bash
brew install node
brew install mongodb
mkdir -p /data/db
```
Ensure that user account running mongod has correct permissions for the directory:

```bash
sudo chmod 0755 /data/db
sudo chown $USER /data/db
```

## Installation

```bash
git clone https://github.com/avartanii/CaseX.git
cd CaseX
npm install
```
## Running & Development

Start Database
```bash
npm run mongo-start
```
Set up Database with Mock Data
```bash
npm run db-setup
```
Start Server
```bash
npm start
```
Run Tests
```bash
npm test
```
Lint Code
```bash
npm run lint
```
