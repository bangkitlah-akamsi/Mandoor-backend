**ENDPOINT :**https://mandoor-backend-ewhqw2fqpq-uc.a.run.app

**ROUTE FOR MITRA REGISTRATION**

**add Mitra :**

method : **POST**
path : /mitra

request body : content JSON
```
{
    "email": "examplemitra@gmail.com",
    "mitraname": "bayudsatriyo",
    "fullname": "bayu dwi satriyo",
    "password": "bayy1234",
    "noKTP": "334466228300382",
    "nomorwa": "098865543355677",
    "alamat": "Solo",
    "kecamatan": "Serengan",
    "kota": "Surakarta",
    "skill": [{skillId1}, {skillId2}]
}
```

response :
```{
    "status": "success",
    "message": "Mitra berhasil ditambahkan",
    "data": {
        "dataMitra": {
            "id": "mitra-B7lp4nsqTtXDIhr8",
            "email": "examplemitra@gmail.com",
            "password": "$2b$10$qaI/r/pa2RylpNyMvKsRkeOtXsc9u1IfSQrKxwF/a9aEcOw9oo1mu",
            "skill": [
                "skill-I8EUMrIIl8P7p4hR",
                "skill-DRxnaZ_DnBEZUUVP"
            ]
        }
    }
}```

statusCode : 201 (Created)

**get mitra by email :**

method : **GET**
path : /mitras/{email}

**get mitra by id :**

method : **GET**
path : /mitras/{mitra_id}/id

response :
```{
    "status": "success",
    "data": {
        "Mitra": {
            "id": "mitra-B7lp4nsqTtXDIhr8",
            "email": "examplemitra@gmail.com",
            "mitraname": "bayudsatriyo",
            "fullname": "bayu dwi satriyo",
            "password": "$2b$10$qaI/r/pa2RylpNyMvKsRkeOtXsc9u1IfSQrKxwF/a9aEcOw9oo1mu",
            "noktp": "334466228300382",
            "nomorwa": "098865543355677",
            "alamat": "Solo",
            "profile": null,
            "kecamatan": "Serengan",
            "kota": "Surakarta",
            "status_mitra": false,
            "skillarray": [
                "skill-I8EUMrIIl8P7p4hR",
                "skill-DRxnaZ_DnBEZUUVP"
            ]
        }
    }
}```

**edit mitra by id :**

method : **PUT**
path : /mitras/{mitra_id}

request body :
```
{
    "email": "examplemitra@gmail.com",
    "mitraname": "bayudsatriyo",
    "fullname": "bayu dwi satriyo",
    "password": "bayy1234",
    "noKTP": "334466228300382",
    "nomorwa": "098865543355677",
    "alamat": "Jl melati",
    "kecamatan": "Jebres",
    "kota": "Surakarta",
    "skill": [{skillId1}, {skillId2}, {skillId3}]
}
```

response : 
```{
    "status": "success",
    "message": "data bayudsatriyo berhasil diperbarui"
}```


**ROUTE FOR MITRA AUTHENTICATIONS**

**Login Mitra**

method : **POST**
path : /mitrasauthentications

request body :
```
{
    "email": "example@gmail.com",
    "password": "blablabla"
}
```

response : 
```{
    "status": "success",
    "message": "Authentication berhasil ditambahkan",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1pdHJhLXhhNTQ4RWlac3VjRnpmak0iLCJpYXQiOjE3MDE2ODg4MDl9.JnfGqHoYfz9oTPPmqHCGQ_owQ91MD2BQ2K7-7wbE5H4",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1pdHJhLXhhNTQ4RWlac3VjRnpmak0iLCJpYXQiOjE3MDE2ODg4MDl9.3l0x1M0VPrLAoL1g9jybQIU3Wy_SeRdJzUIGtdx-SrU"
    }
}```

statusCode = 201 (Created)

**Refresh Authentication Mitra**

method : **PUT**
path : /mitrasauthentications

request body : 
```
{
    "refreshToken": "asdasdavvsdsdf"
}
```

response :
```{
    "status": "success",
    "message": "Access Token berhasil diperbarui",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1pdHJhLXhhNTQ4RWlac3VjRnpmak0iLCJpYXQiOjE3MDE2ODg4Njl9.HN3j0rhv9tNWCbNISBZmNGnnF2TNtNHnJ7cWcdzwqzE"
    }
}```

statusCode = 200(OK)

**Logout Mitra**

Method : **DELETE**
url : /mitrasauthentications

request body : 
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

statusCode = 200(OK)


**Mitra Cek History Transaksi**

method : **GET**
path : /transaksi/mitra/{mitra_id}

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

**Pola Authentikasi bisa diunduh di link berikut => https://bit.ly/pola_auth**