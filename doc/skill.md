**ENDPOINT :** https://mandoor-backend-ewhqw2fqpq-uc.a.run.app

**ROUTE FOR SKILL MITRA**

- **Adding Skill :**

method : **POST**

path : /skill

request body :
```
{
   "nama_skill": "Pemasangan Lantai Kayu",
   "harga_skill": 200000,
   "hitungan": "meter",
   "kata": "chair"
}
```

response : 
```
{
    "status": "success",
    "message": "Skill berhasil ditambahkan",
    "data": {
        "id": "skill-6IJkjMKm7cCCOidd"
    }
}
```

statusCode : 201 (Created)


- **get all skill :**

method : **GET**

path : /skill

response : 
```
{
    "status": "success",
    "data": {
        "Skill": [
            {
                "id": "skill-DRxnaZ_DnBEZUUVP",
                "nama_skill": "Perbaikan Plafon",
                "harga_skill": 150000,
                "hitungan": "meter"
            },
            {
                "id": "skill-I8EUMrIIl8P7p4hR",
                "nama_skill": "Perbaikan atap",
                "harga_skill": 50000,
                "hitungan": "meter"
            },
            {
                "id": "skill-6IJkjMKm7cCCOidd",
                "nama_skill": "Pemasangan Lantai Kayu",
                "harga_skill": 200000,
                "hitungan": "meter"
            }
        ]
    }
}
```

statusCode = 200 (OK)

- **get skill by item :**

method : **GET**

path : /tukang/{kata}

response : 
```
{
    "status": "success",
    "data": {
        "tukang": {
            "id": "skill-qG8m-4olNLlV-6ue",
            "nama_skill": "Tukang Kayu",
            "harga_skill": 100000,
            "hitungan": "meter"
        }
    }
}
```

statusCode = 200 (OK)