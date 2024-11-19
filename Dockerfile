FROM node:20-alpine

WORKDIR /app

# other instructions
ARG REACT_APP_AUTH_URL # Set environment variables using build arguments
ARG REACT_APP_COURSE_URL # This passes these values at build time
ARG PORT
ARG MONGODB_URI

#Set those build arguments as environment variables.
ENV REACT_APP_AUTH_URL=${REACT_APP_AUTH_URL}
ENV REACT_APP_COURSE_URL=${REACT_APP_COURSE_URL}
ENV PORT=${PORT}
ENV MONGODB_URI=${MONGODB_URI}

RUN npm install -g @babel/cli
COPY server/package*.json ./server/
RUN npm i --prefix server

COPY server/ ./server

COPY client/package*.json ./client/
RUN npm i --prefix client

COPY client/ ./client


RUN npm run build --prefix client
RUN npm run build --prefix server

COPY server/dist ./server/dist
COPY server/package.json ./server/package.json

CMD ["npm", "start", "--prefix", "server"]