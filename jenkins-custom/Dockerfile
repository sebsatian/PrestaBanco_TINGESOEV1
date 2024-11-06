# Use the official Jenkins LTS image as the base
FROM jenkins/jenkins:lts

# Switch to the root user to install additional packages
USER root

# Set environment variables to prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Update the system and install basic dependencies
RUN apt-get update -qq && \
    apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common

# Install Docker using the get.docker.com script
RUN curl -fsSL https://get.docker.com/ | sh

# Add Jenkins user to the Docker group to run Docker commands without sudo
RUN usermod -aG docker jenkins

# Install Java (OpenJDK 17 as a current LTS version)
RUN apt-get update -qq && \
    apt-get install -qqy openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*

# Set JAVA_HOME and add it to PATH
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Verify the Java installation
RUN java -version

# Install Maven
ENV MAVEN_VERSION=3.8.7
RUN mkdir -p /usr/share/maven /usr/share/maven/ref && \
    curl -fsSL https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz | tar -xzC /usr/share/maven --strip-components=1 && \
    ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

# Verify the Maven installation
RUN mvn -version

# Install Node.js and npm
ENV NODE_VERSION=16.x
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash - && \
    apt-get install -qqy nodejs && \
    rm -rf /var/lib/apt/lists/*

# Verify the Node.js and npm installation
RUN node -v && npm -v

# Install only the essential pipeline plugin (workflow-aggregator) to automatically manage dependencies
RUN jenkins-plugin-cli --plugins workflow-aggregator docker-plugin credentials-binding

# Switch back to Jenkins user
USER jenkins

# Expose Jenkins ports
EXPOSE 8080
EXPOSE 50000

# Define the entry point (using the default Jenkins entry point)
ENTRYPOINT ["/usr/local/bin/jenkins.sh"]
