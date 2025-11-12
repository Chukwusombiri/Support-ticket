// mongo-init.js
db = db.getSiblingDB("support_desk");

db.createUser({
  user: "app_user",
  pwd: "app_password",
  roles: [
    {
      role: "readWrite",
      db: "support_desk"
    }
  ]
});