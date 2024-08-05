FROM golang:latest AS build-stage

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /interv-core

FROM alpine:latest AS build-release-stage

WORKDIR /

COPY --from=build-stage /interv-core /interv-core

ENTRYPOINT ["/interv-core"]

EXPOSE 5000
