FROM node:10

WORKDIR /opt/track-style-back-end

ADD data data/
ADD domain domain/
ADD presentation presentation/
ADD .env .
ADD back-end.js .
ADD package.json .
ADD package-lock.json .

RUN npm i --production

EXPOSE 8080

CMD ["node", "back-end"]