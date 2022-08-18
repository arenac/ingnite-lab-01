# Overview

This project is composed by one web application using NextJs which communicates with two different microservices, purchases and classroom. On top of those microservices there is a gateway which allows consume both GraphQl APIs from a single endpoint using ApolloFederation and Supergraph gateway. The web application will talk directly to the gateway and it will forward the authentication token to the microservices purchases and classroom to authorize certain requests.

## Pre-requirements

Have installed docker and nodejs.

This project uses [Auth0](https://auth0.com/) as an authentication layer and it requires creating an account to be able to run the project. So when the account is created, in the auth0 platform, the first thing to be created is a tenant which will be your domain and should be unique, based on your region and it can be tagged as development. Now create a regular web SPA application and on the settings tab you need to fill two extra fields

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

After that, to run the projects they should be started in the following order:

1. purchase -> `yarn start`
2. classroom -> `yarn start`
3. gateway -> `yarn start`
4. web -> `yarn dev`

Finally the web page should be available on [http://localhost:3000](http://localhost:3000)

## Purchases service

Allows to create and list purchases and courses and providers a query to fetch user data required for authorization.

[http://localhost:4000/graphql](http://localhost:4000/graphql)

Schema:

```
directive @key(fields: String!) on OBJECT | INTERFACE

directive @extends on OBJECT | INTERFACE

directive @external on OBJECT | FIELD_DEFINITION

directive @requires(fields: String!) on FIELD_DEFINITION

directive @provides(fields: String!) on FIELD_DEFINITION

type Product {
id: ID!
title: String!
slug: String!
}

type Purchase {
id: ID!
status: PurchaseStatus!
createdAt: DateTime!
product: Product!
}

# Available purchase statuses
enum PurchaseStatus {
PENDING
APPROVED
FAILED
}

# A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
scalar DateTime

type User {
authUserId: ID!
purchases: [Purchase!]!
}

type Query {
_entities(representations: [_Any!]!): [_Entity]!
_service: _Service!
products: [Product!]!
purchases: [Purchase!]!
me: User!
}

union _Entity = User

scalar _Any

type _Service {
# The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied
sdl: String
}

type Mutation {
createProduct(data: CreateProductInput!): Product!
createPurchase(data: CreatePurchaseInput!): Purchase!
}

input CreateProductInput {
title: String!
}

input CreatePurchaseInput {
productId: String!
}
```

## Classroom service

Allows to create and list courses, and list students, courses, enrollments and user data required for authorization as well.

[http://localhost:5000/graphql](http://localhost:5000/graphql)

Schema:

```
directive @key(fields: String!) on OBJECT | INTERFACE

directive @extends on OBJECT | INTERFACE

directive @external on OBJECT | FIELD_DEFINITION

directive @requires(fields: String!) on FIELD_DEFINITION

directive @provides(fields: String!) on FIELD_DEFINITION

type Course {
  id: ID!
  title: String!
  slug: String!
}

type User {
  authUserId: ID!
  enrollments: [Enrollment!]!
}

type Enrollment {
  id: ID!
  student: User!
  course: Course!
  canceledAt: DateTime
  createdAt: DateTime!
}

# A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
scalar DateTime

type Query {
  _entities(representations: [_Any!]!): [_Entity]!
  _service: _Service!
  courses: [Course!]!
  course(id: String!): Course!
  enrollments: [Enrollment!]!
  students: [User!]!
}

union _Entity = User

scalar _Any

type _Service {
  # The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied
  sdl: String
}

type Mutation {
  createCourse(data: CreateCourseInput!): Course!
}

input CreateCourseInput {
  title: String!
}
```

## Gateway

Combines both microservices and allows to consume both GraphQl APIs from a single endpoint using @apollo/gateway and @nestjs/apollo.

[http://localhost:3332/graphql](http://localhost:3332/graphql)

## Web

A NextJs web application that allows to create, list, purchases and list courses a user is enrolled. Both purchase creation and courses enrolled list requires the user is logged in.

## Docker Images

[PostgreSQL data base](https://hub.docker.com/r/bitnami/postgresql)

[Zookeeper](https://hub.docker.com/r/confluentinc/cp-zookeeper) required for Kafka.

[Kafka](https://hub.docker.com/r/confluentinc/cp-kafka)

[Kafka UI](https://hub.docker.com/r/provectuslabs/kafka-ui)

## Future improvements

- Allow creation of products in an admin area of the page, as it requires to be created through the API call.
- Redirects the user to login page when clicking on an enrollment and when user is not logged in.
