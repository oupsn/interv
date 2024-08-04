FROM golang:latest AS build-stage

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /interv-core

FROM debian:buster-slim AS build-release-stage

WORKDIR /

COPY --from=build-stage /interv-core /interv-core

EXPOSE 5000

CMD ["/interv-core"]
