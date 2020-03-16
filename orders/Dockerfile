# Node Image
FROM node:12-alpine AS base
# Work Directory
WORKDIR /orders
# Package
COPY package.json .
COPY production.env .
# ------ Dependencies Injection --------
FROM base As dependencies
# ------ Install as Production ---------
RUN npm install --production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# ------ RUN NPM -----------------------
RUN npm install
RUN apk add --no-cache --virtual .persistent-deps \
  curl \
  openssl \
  # for node-sass module
  make \
  gcc \
  g++ \
  python \
  py-pip \
  # Install node packages
  && npm install --silent --save-dev -g \
  typescript

# ------ RUN As Build ------------------
FROM dependencies As Build
COPY . .
RUN tsc -p .

# ------ RUN As Release ----------------
FROM base As release
# copy production node_modules
COPY --from=build /orders/prod_node_modules ./node_modules
# copy app sources
COPY --from=build /orders/dist .

# ------ Execution ---------------------
CMD ["node", "main.js"]
