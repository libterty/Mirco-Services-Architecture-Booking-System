# Mirco-Services Architecture Booking System

- A Book storeage System Build with micro services architecture, it's a simple mirco-services structure nothing fancy.

# LICENCE

Copyright © 2020, 11. Released under the MIT License.

### Environment Requirements

- Node version 10.16.3 above
- Docker
- PostgresQL
- Nest CLI (optional)
- PgAdmin (optional)

### Docker Image Collection

> :closed_book: BookService Container

```bash
docker pull libterty8186/bookservice
```

> :ghost: CustomerService Container

```bash
docker pull libterty8186/customerservice
```

> :office: OrderService Container

```bash
docker pull libterty8186/orderservice
```

### Run Project

> Start Script

```bash
docker-compose up --build
```

> Shutdown Script

```bash
docker-compose down
```

## Remind

- Before you implement it to production version, please remember to change the `redis` environment in `docker-compose.yml` where it's origin setup is default as `ALLOW_EMPTY_PASSWORD=yes`. Which may not be a appropriate way to be set in production. But it will be fine in development mode.
