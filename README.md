<img src = "resources/Logo_Mockup_Option1.png" alt = "Logo" width = 300 />

## Install MongoDB
[Source](https://gist.github.com/adamgibbons/cc7b263ab3d52924d83b)

### Install MongoDB with Homebrew

```bash
brew install mongodb
mkdir -p /data/db
```
### Set permissions for the data directory
Ensure that user account running mongod has correct permissions for the directory:

```bash
sudo chmod 0755 /data/db
sudo chown $USER /data/db
```
