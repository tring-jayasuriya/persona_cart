from node:20-alpine
workdir /persona
copy . .
run npm install
expose 5173
cmd ["npm","run","dev"]