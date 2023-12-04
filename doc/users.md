**ENDPOINT :** https://mandoor-backend-ewhqw2fqpq-uc.a.run.app

**ROUTE FOR USER REGISTRATION**

**Registration User :**

method : **POST**
path : /user

request body : content JSON
```
{
    "email": "example@gmail.com",
    "username": "bayuds",
    "fullname": "bayu dwi sans",
    "password": "bayyy",
    "nomorwa": "0897887766223",
    "alamat": "surakarta"
}
```

statusCode : 201 (Created)

response : JSON
```{
    "status": "success",
    "message": "User berhasil ditambahkan",
    "data": {
        "datauser": {
            "id": "user-2HzI2HmHeV0l1dFH",
            "email": "example@gmail.com",
            "password": "$2b$10$I7Vmk9DteWck6fd5YCgoWe7UiXdQdusk9JC45unSyB.2tkST3k5QO"
        }
    }
}```


**get user by email :**

method : **GET**
path : /users/{email}

note : ganti {email} dengan example@gmail.com

response : JSON
```{
    "status": "success",
    "data": {
        "user": {
            "id": "user-QYjoLKjLnt4Fz-rN",
            "email": "example@gmail.com",
            "username": "bayuds",
            "fullname": "bayu dwi sans",
            "password": "$2b$10$CcQOua5klWvzp11miQWO7uy0ADii62ZALBD9oGG/YLGvh/iTOklKC",
            "nomorwa": "0897887766223",
            "alamat": "surakarta",
            "profile": null
        }
    }
}```

statusCode : 200 (OK)

**get user by id :**

method : **GET**
path : /users/{user_id}/id

note : ganti {user_id} dengan user-QYjoLKjLnt4Fz-rN

response : JSON
```{
    "status": "success",
    "data": {
        "User": {
            "id": "user-QYjoLKjLnt4Fz-rN",
            "email": "example@gmail.com",
            "username": "bayuds",
            "fullname": "bayu dwi sans",
            "password": "$2b$10$CcQOua5klWvzp11miQWO7uy0ADii62ZALBD9oGG/YLGvh/iTOklKC",
            "nomorwa": "0897887766223",
            "alamat": "surakarta",
            "profile": null
        }
    }
}```

statusCode : 200 (OK)

**Edit User by Id :**

method : **PUT**
path : /user/{user_id}

request body : 
```
{
    "email": "example@gmail.com",
    "username": "bayuds",
    "fullname": "bayu dwi sans",
    "password": "bayyy",
    "nomorwa": "0897887766223",
    "alamat": "Bandung"
}
```

response :
{
    "status": "success",
    "message": "data bayuds berhasil diperbarui"
}

statusCode : 200 (OK)


**ROUTE FOR USER AUTHENTICATIONS**

**Login Users :**

method : **POST**
path : /authentications

request body : 
```
{
    "email": "example@gmail.com",
    "password": "blablabla"
}
```

response : JSON
```{
    "status": "success",
    "message": "Authentication berhasil ditambahkan",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItZHJXdHFPUlE5T2J5LXhpNCIsImlhdCI6MTcwMTY4NjAyMH0.xJNwSsYXiJATAxHZCtFEtsXO4iy28fkMOCtV2FZvQj0",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItZHJXdHFPUlE5T2J5LXhpNCIsImlhdCI6MTcwMTY4NjAyMH0.xi3E9l_ETFugbWEN-P1hLeZOkUGfLtj2O31U0HX2Vn4"
    }
}```

statusCode : 201 (Created)

**Refresh Authentication User Authentication**

method : **PUT**
path : /authentications

request payload : 
```
{
    "refreshToken": "asdasdavvsdsdf"
}
```

response : JSON
```{
    "status": "success",
    "message": "Access Token berhasil diperbarui",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItZHJXdHFPUlE5T2J5LXhpNCIsImlhdCI6MTcwMTY4NjA4MX0.Ij5Ii0ZCXcvxdmWQWfMX7uqDkrZXxy2trOSPxw-WNQg"
    }
}```

statusCode : 200 (OK)

**Logout User**

method : **DELETE**
path : /authentications

request payload :
```
{
    "refreshToken": "asdasdavvsdsdf"
}
```

response : 
```{
    "status": "success",
    "message": "Refresh token berhasil dihapus"
}```

statusCode : 200 (OK)


**User Cek History Transaksi**

method : **GET**
path : /transaksi/user/{user_id}

response : 
```{
    "status": "success",
    "data": {
        "Transaksi": [
            {
                "id": "pesanan-btz3KDB6BN1ijkMg",
                "mitra_id": "mitra-B7lp4nsqTtXDIhr8",
                "user_id": "user-QYjoLKjLnt4Fz-rN",
                "kecamatan_user": "Laweyan",
                "kota_user": "Surakarta",
                "kecamatan_mitra": "Jebres",
                "kota_mitra": "Surakarta",
                "total_barang": 14000,
                "harga_skill": 100000,
                "transport": 14400,
                "total": 128400,
                "status_order": "selesai",
                "waktu_transaksi": "2023-12-04T05:05:48.988Z"
            },
            {
                "id": "pesanan-5Xy1lhtiPu6_3e9w",
                "mitra_id": "mitra-B7lp4nsqTtXDIhr8",
                "user_id": "user-QYjoLKjLnt4Fz-rN",
                "kecamatan_user": "Laweyan",
                "kota_user": "Surakarta",
                "kecamatan_mitra": "Jebres",
                "kota_mitra": "Surakarta",
                "total_barang": 14000,
                "harga_skill": 100000,
                "transport": 14400,
                "total": 128400,
                "status_order": "selesai",
                "waktu_transaksi": "2023-12-04T05:06:08.016Z"
            }
        ]
    }
}```

statusCode = 200(OK)
