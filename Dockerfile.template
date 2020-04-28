# Build stage
FROM balenalib/%%BALENA_MACHINE_NAME%%-node:12-build as builder

WORKDIR /usr/src

RUN install_packages python
RUN npm install blinking

# Run stage
FROM balenalib/%%BALENA_MACHINE_NAME%%-node:12-run
ENV DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

RUN install_packages dbus

WORKDIR /usr/src
COPY . .
COPY --from=builder /usr/src .
RUN npm install && npm run build

CMD [ "node", "/usr/src/build/index.js" ]
