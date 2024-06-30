FROM docker.io/library/node:20.13.0-alpine

ENV PYTHONUNBUFFERED=1
RUN set -ex && \
    apk add --no-cache gcc g++ musl-dev python3 openjdk17 ruby iptables ip6tables

# Install GO
RUN set -ex && \
    apk add --no-cache go

# Install Rust
RUN set -ex && \
    apk add --no-cache curl && \
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    source $HOME/.cargo/env

# Install Kotlin
RUN set -ex && \
    apk add --no-cache unzip && \
    wget https://github.com/JetBrains/kotlin/releases/download/v1.4.32/kotlin-compiler-1.4.32.zip && \
    unzip kotlin-compiler-1.4.32.zip -d /usr/local && \
    ln -s /usr/local/kotlinc/bin/kotlin /usr/bin/kotlin && \
    ln -s /usr/local/kotlinc/bin/kotlinc /usr/bin/kotlinc

RUN set -ex && \
    apk add --no-cache chromium lsof

RUN set -ex && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/cc1obj && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto1 && \
    rm -f /usr/libexec/gcc/x86_64-alpine-linux-musl/6.4.0/lto-wrapper && \
    rm -f /usr/bin/x86_64-alpine-linux-musl-gcj

RUN ln -sf python3 /usr/bin/python

ADD . /usr/bin/
ADD start.sh /usr/bin/

RUN npm --prefix /usr/bin/ install
EXPOSE 8080

# add a dummy user that will run the server, hence sandboxing the rest of the container
RUN addgroup -S -g 2000 runner && adduser -S -D -u 2000 -s /sbin/nologin -h /tmp -G runner runner
#   USER runner
CMD sh /usr/bin/start.sh