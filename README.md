# EduFi - Marks exchange

Backend source code for the EduFi marks exchange package.

## Disclaimer
> EduFi is in no way a registered trademark or an official application. It is an academic project to simulate microservices. Author bears no responsibility for any injuries caused, cats killed in the using of any portion the app.

## Architecture & Design considerations
![image](https://user-images.githubusercontent.com/93184095/150818159-a0488dfe-cf14-42ba-a72d-abfc0b5e4089.png)

The three backend microservices, which are the Marks, Trade and Token services, are decoupled based on their functional domain using [Tactical Domain-Driven Design](https://docs.microsoft.com/en-us/azure/architecture/microservices/model/tactical-ddd).

> Quote MS:
> Tactical DDD is when you define your domain models with more precision. The tactical patterns are applied within a single bounded context. In a microservices architecture, we are particularly interested in the entity and aggregate patterns. Applying these patterns will help us to identify natural boundaries for the services in our application

The core service is the Trades service, which will house central operations to the Marks Exchange functionality, namely:

- Create, update, delete of trade
- View trade offers
- View trade history
- Auto-fulfilment of trade

<!-- db structure -->

### Documentation
[Click here to view the REST API docs for the Trades service](https://app.swaggerhub.com/apis-docs/CaeNGnp/ETI2).

#### Auto-fulfillment of trade
Auto fufillment works in a way that if someone made a trade that matched the criteria of an existing trade, both are considered to be fulfilled.

However, a trade can also be partially fulfilled if another trade is created with a similar ratio, e.g.
> Student A : 7 WEB -> 10 OOAD
> Student B : 20 OOAD -> 14 WEB

Student B's trade is partially fulfilled and updated to reflect the leftover tokens needed.
> Student B : 10 OOAD -> 7 WEB

### Technology used
- [Svelte](https://svelte.dev/) - Used by the frontend
- [NestJS](https://nestjs.com/) - Used by the backend Trades API service
- [NodeJS](https://nodejs.org/en/) - Main runtime used
- [Docker](https://www.docker.com/) - Used for managing of microservice containers

### Ports in use
| Host Port | Internal container port | Reserved by |
| ---- | ---- | ---- |
| 9160 | 9160 | Frontend |
| 9161 | 3306 | MySQL server |
| 9162 | 80 | PHPMyAdmin |
| 9163 | 6379 | Redis server |
| 9164 | 9164 | Tokens service |
| 9165 | 9165 | Trades service |
| 9166 | 9166 | Marks service |

## Setting up

Pre-requisite:
- [Docker](https://www.docker.com/)

<!-- https://docs.docker.com/compose/extends/#understanding-multiple-compose-files -->
```bash
# To run blockingly in the console, remove "-d" (detach)

# To build off source
docker-compose up -d

# To pull from docker
docker-compose -f docker-compose.yml up -d
```
