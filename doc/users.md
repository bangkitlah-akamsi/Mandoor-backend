**ROUTE FOR USER REGISTRATION**

**add User :**

method : **POST**
http://localhost:8080/users

request : content JSON
```
{
    "email": "example@gmail.com",
    "username": "bayuds",
    "fullname": "bayu dwi satriyo",
    "password": "bayyy",
    "nomorwa": "0897887766223",
    "alamat": "surakarta"
}
```

**get user by email :**

method : **GET**
http://localhost:8080/users/{email}

**get user by username :**

method : **GET**
http://localhost:8080/users/{username}/username

**ROUTE FOR USER AUTHENTICATIONS**

**Login Users :**

method : **POST**
url : /authentications

request payload : 
```
{
    "email": "example@gmail.com",
    "password": "blablabla"
}
```

**Refresh Authentication User Authentication**

method : **PUT**
url : /authentications

request payload : 
```
{
    "refreshToken": "asdasdavvsdsdf"
}
```

**Delete Authentication User**

method : **DELETE**
url : /authentications

request payload :
```
{
    "refreshToken": "asdasdavvsdsdf"
}
```