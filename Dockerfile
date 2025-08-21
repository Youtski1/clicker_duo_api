FROM node:18

WORKDIR /app
COPY . .

RUN npm i

EXPOSE 3001

CMD ["npx", "ts-node", "src/index.ts"]