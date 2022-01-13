#!/bin/bash

OS_VERSION=$(echo "$BALENA_HOST_OS_VERSION" | cut -d " " -f 2)
echo "OS Version is $OS_VERSION"

# Install driver
pushd drivers
find . -name "*.ko" -exec insmod {} \;
lsmod | grep 88XXau
popd

# pushd rtl8812au
# 	insmod 88XXau.ko
# 	lsmod | grep 88XXau
# popd

# Run application
node /usr/src/build/index.js
