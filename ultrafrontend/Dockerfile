FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 5174
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]