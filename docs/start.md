# How to get the app up and running

We will start the app using [Docker](https://www.docker.com/) so you should install [Docker](https://docs.docker.com/) and [docker-compose](https://docs.docker.com/compose/).

## Configuration

In order to sign secure [JSON Web Tokens](https://jwt.io/) we need to change environmental variable `PRIVATE` in [docker-compose.yml](../docker-compose.yml). The variable (secret) can be any string you choose.

By default database volume is shared and stored in `/opt/tab/data/db` so if you choose to use another location change it in [docker-compose.yml](../docker-compose.yml).

## Running

To run the application navigate to the root of the app and type:

```bash
docker-compose up
```

If this is the first time you're doing this it could take some time. Now the app should be running on `http://localhost:3001`
