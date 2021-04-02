FROM nginx:latest

WORKDIR /opt/track-style-front-end

RUN curl -fsSL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN npm i npm -g

ADD public public/
ADD src src/
ADD package.json .
ADD package-lock.json .

RUN npm i
RUN npm run build
RUN cp -R /opt/track-style-front-end/build/* /usr/share/nginx/html

ADD nginx/default.conf /etc/nginx/conf.d/default.conf