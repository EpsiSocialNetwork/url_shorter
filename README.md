# Url Shorter pour le projet Réseau Social
> cbarange | 24th November 2020
---

## Get Started
```bash
# Insall the latest nodejs version
sudo apt remove nodejs --auto-remove --purge
sudo apt update && sudo apt upgrade -y
wget -qO- https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
sudo npm install -g yarn

git clone https://github.com/EpsiSocialNetwork/url_shorter.git
cd url_shorter
yarn install
yarn run start

#yarn add express yup helmet morgan cors nanoid redis
#yarn add -D dotenv nodemon
```

## Deployment 

> Check for [vercel & now-config](https://vercel.com/) `npx now-config` or also Heroku

## Install & Setup Docker with WSL2
```bash
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
sudo service docker start
# Test installation
sudo docker run -it --rm hello-world
```

## Install & Setup REDIS
```bash
mkdir data
sudo docker run -it --rm --name some-redis -d redis redis-server --appendonly yes -v ./data:/data
```

## Nginx Security Config
```
server_tokens off;
add_header X-Frame-Options "DENY";
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";

https://gist.github.com/plentz/6737338
```

## Nice to know 
```
https://www.netlify.com/
https://www.cloudflare.com/fr-fr/plans/?utm_referrer=https://www.cloudflare.com/
https://medium.com/@AndreyAzimov/how-free-heroku-really-works-and-how-to-get-maximum-from-it-daa53f2b3c57
https://www.heroku.com/pricing
https://github.com/CodingGarden/miniature-umbrella




```


