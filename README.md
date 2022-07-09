# Overview

This project is composed by one web application using NextJs which communicates with two different microservices, purchases and classroom. On top of those microservices there is a gateway which allows consume both GraphQl APIs from a single endpoint using ApolloFederation and Supergraph gateway. The web application will talk directly to the gateway and it will forward the authentication token to the microservices purchases and classroom to authorize certain requests.

## Pre-requirements

Have installed docker and nodejs.

This project uses [Auth0](https://auth0.com/) and authentication layer and it's required to create an account to be able to run the project. After creating your account. The first thing to be created is a tenant which will be your domain and should be unique, based on your region and it can be tagged as development. Now create a regular web SPA application and on the settings tab you need to fill two extra fields

Allowed Callback URLs: `http://localhost:3000/api/auth/callback`

Allowed Logout URLs: `http://localhost:3000/api/auth/logout`

Make sure you saved the settings and now you can create the .env files for each _purchases_, and _classroom_ projects. In the web project, NextJs requires a .env.local file instead. Both .env and .env.local can be based on the respective .env.example files.

When all settings are done correctly it's time to start up all images. From root folder, start the images for PostgresDB, Zookeeper, Kafka and Kafka-UI.

```
docker-compose up -d
```

All four images should be up and running

```
docker ps
```

This project will be using only one Kafka topic for now and it needs to be created manually though Kafka UI. By default it is available on [http://localhost:8080/](http://localhost:8080/). Access it and create a new topic called

```
purchases.new-purchase
```

Now make sure you have installed the dependencies for each project by accessing their folders and running `yarn install`.

After you can run each project respective script to boot the project.

microservices and gateway -> `yarn start`

web -> `yarn dev`

## Purchases service

## Classroom service

## Gateway

## Web

## Images
