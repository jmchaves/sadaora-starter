FROM node:18

WORKDIR /app

ENV DATABASE_URL="postgres://postgres:postgres@db:5432/sadaora"
ENV JWT_SECRET="U5WjvM2xYa2#zB8Hq9Lr@tCkN6Ep^X4V"

COPY package*.json ./
RUN npm install

COPY . .

# Add entrypoint script
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 4000
ENTRYPOINT ["sh", "./entrypoint.sh"]
