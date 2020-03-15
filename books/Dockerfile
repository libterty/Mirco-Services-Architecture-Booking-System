# Node Image
FROM node:latest
# Tini init
RUN apk add --no-cache tini
# Work Directory
WORKDIR /books
# Package
COPY package.json .
# ------ Dependencies Injection --------
FROM base As dependencies
# ------ Install as Production ---------
RUN npm install --production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# ------ RUN NPM -----------------------
RUN npm install

# ------ RUN As Build ------------------
FROM dependencies As Build
COPY . .
RUN rm -rf ./dist && tsc

# ------ RUN As Release ----------------
FROM base As release
# copy production node_modules
COPY --from=build /books/prod_node_modules ./node_modules
# copy app sources
COPY --from=build /books/dist .

# ------ Execution ---------------------
CMD ["tini", "node", "main.js"]


