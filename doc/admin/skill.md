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
   "hitungan": "meter"
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

- **get skill by id :**

method : **GET**

path : /skill/{skill_id}

response : 
```
{
    "status": "success",
    "data": {
        "skill": {
            "id": "skill-gNHKZffRGdJ-6-fm",
            "nama_skill": "Perbaikan Dinding",
            "harga_skill": 50000,
            "hitungan": "meter"
        }
    }
}
```

statusCode = 200 (OK)

- **Edit Kecamatan by Id :**

method : **PUT**

path : /skill/{skill_id}

request body :
```
{
   "nama_skill": "Perbaikan Dinding",
   "harga_skill": 50000,
   "hitungan": "meter"
}
```

response :
```
{
    "status": "success",
    "message": "Perbaikan Dinding berhasil diperbarui"
}
```

statusCode = 200(OK)

- **Delete Skill by Id :**

method : **DELETE**

path : /skill/{skill_id}

response :
```
{
    "status": "success",
    "message": "data berhasil dihapus"
}
```

statusCode = 200(OK)