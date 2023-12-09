**ENDPOINT :** https://mandoor-backend-ewhqw2fqpq-uc.a.run.app

**Routes for step order (pesan)**

- **User Order :**

method : **POST**

path : /pesananuser

request body : content Form Data
```
{
   KEY          Value
   ________     ___________
   user_id: user-GvGZsdEg0SgK-Gyb,
   kecamatan_user: Laweyan,
   kota_user: Surakarta,
   alamat: tunggulsari pajang,
   skill: [[{skillId}, {jumlah/luas yang perlu diperbaiki(number)}]]
}
```

response :
```
{
    "status": "success",
    "message": "Pesanan berhasil dibuat",
    "data": {
        "id": "pesanan-9qVzgrxSm5WjMf_e",
        "mitra_id": null,
        "user_id": "user-ZhMAZArxM50H8oih",
        "kecamatan_user": "Pasar Kliwon",
        "kota_user": "Surakarta",
        "kecamatan_mitra": null,
        "kota_mitra": null,
        "total_barang": null,
        "harga_skill": 250000,
        "transport": null,
        "total": null,
        "status_order": "search mitra",
        "alamat": "tunggulsari pajang",
        "waktu": "2023-12-09T01:34:23.011Z",
        "nomorwa_user": "1701861114",
        "nomorwa_mitra": null,
        "imageurl": "http://localhost:8080/uploadGambar/gambar/1702110862998flower.jpg"
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

request body : con5ent JSON
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
    "message": {
        "id": "pesanan-9qVzgrxSm5WjMf_e",
        "mitra_id": "mitra-p38eULBlSASgDvnn",
        "user_id": "user-ZhMAZArxM50H8oih",
        "kecamatan_user": "Pasar Kliwon",
        "kota_user": "Surakarta",
        "kecamatan_mitra": "Serengan",
        "kota_mitra": "Surakarta",
        "total_barang": 14000,
        "harga_skill": 250000,
        "transport": 10600,
        "total": 274600,
        "status_order": "wait payment",
        "alamat": "tunggulsari pajang",
        "waktu": "2023-12-09T01:34:23.011Z",
        "nomorwa_user": "1701861114",
        "nomorwa_mitra": "0988652200662",
        "imageurl": "http://localhost:8080/uploadGambar/gambar/1702110862998flower.jpg"
    }
}
```

statusCode : 200 (OK)

- **Get pesanan by user_id**

method : **GET**

path : /pesanan/user/{{user_id}}

- **Get pesanan by mitra id**

method : **GET**

path : /pesanan/mitra/{{mitra_id}}

response :
```
{
    "status": "success",
    "data": {
        "pesanan": [
            {
                "id": "pesanan-9qVzgrxSm5WjMf_e",
                "mitra_id": "mitra-p38eULBlSASgDvnn",
                "user_id": "user-ZhMAZArxM50H8oih",
                "kecamatan_user": "Pasar Kliwon",
                "kota_user": "Surakarta",
                "kecamatan_mitra": "Serengan",
                "kota_mitra": "Surakarta",
                "total_barang": 14000,
                "harga_skill": 250000,
                "transport": 10600,
                "total": 274600,
                "status_order": "wait payment",
                "alamat": "tunggulsari pajang",
                "waktu": "2023-12-09T01:34:23.011Z",
                "nomorwa_user": "1701861114",
                "nomorwa_mitra": "0988652200662",
                "imageurl": "http://localhost:8080/uploadGambar/gambar/1702110862998flower.jpg"
            }
        ]
    }
}
```

if status_code 200 (OK) : pesanan still process
if status_code 404 (NotFound) : pesanan put in transaksi

- **User After Pay Order**

method : **PUT**

path : /pesanan/payment/{{pesanan_id}}

response :
```
{
    "status": "success",
    "data": {
        "dataPesanan": {
            "id": "pesanan-bCafoec4RTIkUpLu",
            "status_order": "payment success"
        }
    }
}
```

- **Mitra Ended Order**

method : **DELETE**

path : /pesananmitra/{mitra_id}

Jika Pesanan Berhasil, maka 

response : 
```
{
    "status": "success",
    "message": "Pesanan telah diselesaikan"
}
```

Jika Pesanan dibatalkan maka
```
{
    "status": "success",
    "message": "Pesanan telah dibatalkan"
}
```

statusCode = 400(OK)
