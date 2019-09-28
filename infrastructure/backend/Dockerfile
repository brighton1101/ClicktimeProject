# base image
FROM node:12.2.0-alpine

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ./backend/package.json /app/package.json

RUN mkdir /app/app

RUN mkdir /app/sample_data

COPY ./backend/sample_data/ /app/sample_data/

# set working directory
WORKDIR /app

RUN npm install --silent

# test app
CMD ["npm", "test"]

# start app
CMD ["npm", "start"]