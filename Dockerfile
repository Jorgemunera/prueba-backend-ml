FROM node:18.15.0

WORKDIR /test-soyyo

COPY package.json .

RUN npm install

COPY . .

RUN npx sequelize-cli db:migrate

RUN  npx sequelize-cli db:seed:all

# ENV DATABASE_URL=postgres://api_ml:okl0mvTVHu1QcKs@api-db-ml.flycast:5443463/api_ml?sslmode=disable

ENV JWT_SECRET='secret123'

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev"]
