**ROUTE FOR MITRA REGISTRATION**

**add Mitra :**

method : **POST**
http://localhost:8080/mitras

request payload : content JSON
```
{
    "email": "example@gmail.com",
    "mitraname": "bayudsatriyo",
    "fullname": "bayu dwi satriyo",
    "password": "bayy1234",
    "noKTP": "334466228300382",
    "nomorwa": "098865543355677",
    "alamat": "Solo"
}
```

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
```
{
    "email": "example@gmail.com",
    "password": "blablabla"
}
```

**Refresh Authentication Mitra**

Method : **PUT**
url : /mitrasauthentications

request payload : 
```
{
    "refreshToken": "asdasdavvsdsdf"
}
```

**Delete Authentication Mitra**

Method : **DELETE**
url : /mitrasauthentications

request payload : 
```
{
    "refreshToken": "asdasdavvsdsdf"
}
```

**Pola Authentikasi bisa diunduh di link berikut => https://bit.ly/pola_auth**