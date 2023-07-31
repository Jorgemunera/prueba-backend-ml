FROM node:18.15.0

WORKDIR /test-soyyo

COPY package.json .

RUN npm install

COPY . .

ENV DB_URI postgres://admin:admin123@postgres:5674/market_db

ENV JWT_SECRET='secret123'

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev"]
