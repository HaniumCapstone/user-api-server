FROM node:18
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
# COPY node_modules node_modules

RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/main.js" ]