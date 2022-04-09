FROM nginx:1.13.7-alpine

RUN echo http://mirrors.aliyun.com/alpine/v3.5/main > /etc/apk/repositories \
    && echo http://mirrors.aliyun.com/alpine/v3.5/community >> /etc/apk/repositories
RUN apk add -U tzdata
ENV TZ Asia/Shanghai

COPY ./dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
