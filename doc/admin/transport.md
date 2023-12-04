**ENDPOINT :** https://mandoor-backend-ewhqw2fqpq-uc.a.run.app

**ROUTE FOR TRANSPORT FEE**

- **Add Kecamatan :**

method : **POST**

path : /transport

request body :
```
{
   "kecamatan_user": "Pasar Kliwon",
   "kecamatan_mitra": "Serengan",
   "jarak": 1.8
}
```

response : 
```
{
    "status": "success",
    "message": "data berhasil ditambahkan",
    "data": {
        "id": "transport-_-_ELitJV6frpYZW"
    }
}
```

statusCode : 201 (Created)


- **get all kecamatan :**

method : **GET**

path : /transport

response : 
```
{
    "status": "success",
    "data": {
        "Transport": [
            {
                "id": "transport-grBRqU3x_2uuIVVS",
                "kecamatan_user": "Pasar Kliwon",
                "kecamatan_mitra": "Serengan",
                "jarak": 1
            },
            {
                "id": "transport-AdRBq-ehEgrtYy6l",
                "kecamatan_user": "Banjarsari",
                "kecamatan_mitra": "Jebres",
                "jarak": 5.2
            }
        ]
    }
}
```

statusCode = 200 (OK)

- **Delete Kecamatan by Id :**

method : **DELETE**

path : /transport/{transport_id}

response :
```
{
    "status": "success",
    "message": "data berhasil dihapus"
}
```