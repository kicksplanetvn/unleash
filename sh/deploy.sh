#!/bin/sh

HOST=$1
ECR_REGISTRY=$2
IMAGE_URL=$3
CONTAINER_NAME=unleash

ssh \
    -o StrictHostKeyChecking=no \
    -i "private_key.pem" \
    $HOST \
<< EOF

sh docker_login.sh $ECR_REGISTRY
sudo docker stop $CONTAINER_NAME
sudo docker stop postgres
sudo docker system prune -a -f
sudo docker pull $IMAGE_URL
sudo docker network create unleash
sudo docker run -e POSTGRES_PASSWORD=8779BQk3cfh6y9oNNNWdjOWk1HU4JrVYjw8A \
  -e POSTGRES_USER=unleash_user -e POSTGRES_DB=unleash \
  -d --network unleash --name postgres postgres
sudo docker run --name $CONTAINER_NAME -p 4242:4242 \
  -e DATABASE_HOST=postgres -e DATABASE_NAME=unleash \
  -e DATABASE_USERNAME=unleash_user -e DATABASE_PASSWORD=8779BQk3cfh6y9oNNNWdjOWk1HU4JrVYjw8A \
  -e DATABASE_SSL=false \
  -d --network unleash $IMAGE_URL

EOF
