**ENDPOINT :** https://mandoor-backend-ewhqw2fqpq-uc.a.run.app

**Routes for step order (pesan)**

- **User Order :**

method : **POST**
path : /pesananuser

request body : content JSON
```
{
   "user_id": "user-GvGZsdEg0SgK-Gyb",
   "kecamatan_user": "Laweyan",
   "kota_user": "Surakarta",
   "alamat": "tunggulsari pajang",
   "skill": [[{skillId}, {jumlah/luas yang perlu diperbaiki(number)}]]
}
```

response :
```
{
    "status": "success",
    "message": "Pesanan berhasil dibuat",
    "data": {
        "id": "pesanan-5T6zRhKMGoHbPjsv",
        "status_order": "mencari mitra"
    }
}
```

statusCode : 201 (Created)

- **Mitra Search Order by skill**

method : **GET**
path : /pesanan/skill/{mitra_id}

response :
```
{
    "status": "success",
    "data": {
        "dataPesanan": [
            {
                "id": "pesananhasbarang-sqdgGK_GNOVBptDh",
                "mitra_id": null,
                "user_id": "user-GvGZsdEg0SgK-Gyb",
                "kecamatan_user": "Laweyan",
                "kota_user": "Surakarta",
                "kecamatan_mitra": null,
                "kota_mitra": null,
                "total_barang": null,
                "harga_skill": 300000,
                "transport": null,
                "total": null,
                "status_order": "mencari mitra",
                "alamat": "tunggulsari pajang",
                "waktu": "2023-12-02T07:18:54.947Z",
                "pesanan_id": "pesanan-dtPTrk6WObbCBQYB",
                "skill_id": "skill-DRxnaZ_DnBEZUUVP",
                "permeter": 2
            },
            {
                "id": "pesananhasbarang-B4xE85xKyD33676h",
                "mitra_id": null,
                "user_id": "user-GvGZsdEg0SgK-Gyb",
                "kecamatan_user": "Laweyan",
                "kota_user": "Surakarta",
                "kecamatan_mitra": null,
                "kota_mitra": null,
                "total_barang": null,
                "harga_skill": 100000,
                "transport": null,
                "total": null,
                "status_order": "mencari mitra",
                "alamat": "tunggulsari pajang",
                "waktu": "2023-12-04T04:39:15.238Z",
                "pesanan_id": "pesanan-5T6zRhKMGoHbPjsv",
                "skill_id": "skill-I8EUMrIIl8P7p4hR",
                "permeter": 2
            }
        ]
    }
}
```

statusCode = 200(OK)

- **Mitra Accepted Order**

method : **PUT**
path : /pesananmitra

request body : 
```
{
    "pesanan_id": "{{pesanan_id}}",
    "mitra_id": "{{mitra_id}}",
    "barang": [["sekrup", 2, 2000], ["baut", 5, 2000]]
}
```

response :
```
{
    "status": "success",
    "message": "Pesanan berhasil diterima"
}
```

statusCode : 200 (OK)

- **Mitra Ended Order**

method : **PUT**
path : /pesananmitra/{mitra_id}

response : 
```
{
    "status": "success",
    "message": "Pesanan telah diselesaikan"
}
```

statusCode = 200(OK)
