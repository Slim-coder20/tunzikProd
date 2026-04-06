# Image de base : Node.js version 22 sur Alpine Linux
FROM node:22-alpine

WORKDIR /app

# index.js utilise process.env.PORT (obligatoire sinon le port est indéfini)
ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
