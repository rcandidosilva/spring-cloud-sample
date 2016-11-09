FROM frolvlad/alpine-oraclejdk8:slim

ENV STARTUP_SLEEP 15

# add directly the war
ADD *.war /app.war

RUN sh -c 'touch /app.war'
VOLUME /tmp
EXPOSE 8080
CMD echo "The application will start in ${STARTUP_SLEEP}s..." && \
    sleep ${STARTUP_SLEEP} && \
    java -Djava.security.egd=file:/dev/./urandom -jar /app.war
