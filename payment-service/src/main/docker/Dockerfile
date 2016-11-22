FROM frolvlad/alpine-oraclejdk8:slim

ARG SPRING_PROFILES_ACTIVE
ARG STARTUP_SLEEP
ARG JAVA_OPTS
ARG PORT

ENV SPRING_PROFILES_ACTIVE ${SPRING_PROFILES_ACTIVE:-docker}
ENV STARTUP_SLEEP ${STARTUP_SLEEP:-30}
ENV JAVA_OPTS ${JAVA_OPTS:-'-Xmx512m'}
ENV PORT ${PORT:-8083}

ADD *.jar /app.jar

VOLUME /tmp

RUN sh -c 'touch /app.jar'
RUN sh -c 'sleep ${STARTUP_SLEEP}'

EXPOSE ${PORT}

ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ]