import jenkins.model.*
import hudson.security.*

// Get the Jenkins instance
def instance = Jenkins.getInstance()

// Create a new security realm (manages users)
def hudsonRealm = new HudsonPrivateSecurityRealm(false)
hudsonRealm.createAccount("sebsatian", "1234")  // Aquí se crea el usuario 'sebsatian' con contraseña '1234'
instance.setSecurityRealm(hudsonRealm)

// Set the authorization strategy (permissions)
def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
strategy.setAllowAnonymousRead(false)  // Solo los usuarios autenticados pueden acceder
instance.setAuthorizationStrategy(strategy)

// Save the current Jenkins state to disk
instance.save()
