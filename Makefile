all:
	docker build --tag=frontend -f ./infrastructure/frontend/Dockerfile . #Builds the frontend container
	docker build --tag=backend -f ./infrastructure/backend/Dockerfile . #Builds the backend container