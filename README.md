# Interv
Interv is a web application built using Go for the backend and React with TypeScript for the frontend. The project is managed using yarn for package management.
For more information about Interv, you can check with our [landing page](https://github.com/oupsn/interv-landing) which will provide more what Interv can do. 

## Contributors
- [oupsn](https://github.com/oupsn) | pasinun.witt@kmutt.ac.th
- [phawitpp](https://github.com/phawitpp) | phawit.monc@kmutt.ac.th
- [PS-safe](https://github.com/PS-safe) | phatdanai.shin@kmutt.ac.th

## To start locally
### Prerequisites
- Docker
- Just docker
### Steps
1. Clone this rpository to your machine:
    ```sh
    git clone https://github.com/oupsn/interv.git
    ```
2. Navigate to the directory:
    ```sh
    cd ./interv
    ```
3. Start all containers from docker-compose.yaml:
    ```sh
    docker compose up -d
    ```
4. Open [localhost:3000](http://localhost:3000)
5. Enjoy!

## Development

### Backend
1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Install Go dependencies:
    ```sh
    go mod tidy
    ```
3. Run the backend:
    ```sh
    go run main.go
    ```

### Frontend
1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install yarn dependencies:
    ```sh
    yarn install
    ```
3. Start the web ui:
    ```sh
    yarn dev
    ```
4. Open [localhost:3000](http://localhost:5173)

### Made with stress and anxiety ❤