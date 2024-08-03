FROM node:20

USER root

WORKDIR /home/node/app

COPY package*.json ./

# Update and install OpenSSL and build dependencies
RUN apt-get update -y && \
    apt-get install -y openssl ca-certificates build-essential && \
    rm -rf /var/lib/apt/lists/*

# Ensure correct ownership and permissions for the node user
RUN chown -R node:node /home/node/app

# Switch to node user
USER node

# Install npm dependencies
RUN npm install

# Copy application files
COPY --chown=node:node . .

EXPOSE 3000

CMD [ "tail", "-f", "/dev/null" ]
