cd ../

docker build -t greg-celery --network=host -f ./celeryCode/dockerfile .

docker run -m 20GB -v /home/gttystah/pulledActions/actions/:/home/gttystah/pulledActions/actions/ greg-celery 

# docker compose 
