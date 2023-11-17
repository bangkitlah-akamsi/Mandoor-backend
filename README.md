# Mandoor-API Documentation

**ROUTE FOR USER REGISTRATION**

**add User :**

method : **POST**
http://localhost:8080/users

request : content JSON
{

    "email": "example@gmail.com",
    "username": "bayuds",
    "fullname": "bayu dwi satriyo",
    "password": "bayyy",
    "nomorwa": "0897887766223",
    "alamat": "surakarta"
}

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
{

    "email": "example@gmail.com"
    
}

**Refresh Authentication User Authentication**

method : **PUT**
url : /authentications

request payload : 
{

    "refreshToken": "asdasdavvsdsdf"
    
}

**Delete Authentication User**

method : **DELETE**
url : /authentications

request payload :
{

    "refreshToken": "asdasdavvsdsdf"
    
}

**ROUTE FOR MITRA REGISTRATION**


**add Mitra :**

method : **POST**
http://localhost:8080/mitras

request payload : content JSON
{

    "email": "example@gmail.com",
    "mitraname": "bayudsatriyo",
    "fullname": "bayu dwi satriyo",
    "password": "bayy1234",
    "noKTP": "334466228300382",
    "nomorwa": "098865543355677",
    "alamat": "Solo"
}

**get mitra by email :**

method : **GET**
http://localhost:8080/mitras/{email}

**get mitra by mitraname :**

method : **GET**
http://localhost:8080/mitras/{mitraname}/mitraname

**ROUTE FOR MITRA AUTHENTICATIONS**

**Login Mitra**

method : **POST**
url : /mitrasauthentications

request payload :
{

    "email": "example@gmail.com"
    
}

**Refresh Authentication Mitra**

Method : **PUT**
url : /mitrasauthentications

request payload : 
{

    "refreshToken": "asdasdavvsdsdf"
    
}

**Delete Authentication Mitra**

Method : **DELETE**
url : /mitrasauthentications

request payload : 
{

    "refreshToken": "asdasdavvsdsdf"
    
}

**Pola Authentikasi bisa diunduh di link berikut => https://bit.ly/pola_auth**

**#BayyGanteng**
