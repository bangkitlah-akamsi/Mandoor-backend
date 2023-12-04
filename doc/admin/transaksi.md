**ENDPOINT :** https://mandoor-backend-ewhqw2fqpq-uc.a.run.app

**Routes for Transaksion**

- **Mitra Cek History Transaksi**

method : **GET**

path : /transaksi/mitra/{mitra_id}

response : 
```
{
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
}
```

statusCode = 200 (OK)

- **User Cek History Transaksi**

method : **GET**

path : /transaksi/user/{user_id}

response : 
```
{
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
}
```

statusCode = 200(OK)

- **Cek History Transaksi by Id**

method : **GET**

path : /transaksi/{transaksi_Id}

response : 
```
{
    "status": "success",
    "data": {
        "Transaksi": {
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
    }
}
```
statusCode = 200 (OK)

- **Cek All History Transaksi**

method : **GET**

path : /transaksi

response : 
```
{
    "status": "success",
    "data": {
        "dataTransaksi": [
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
}
```

statusCode = 200(OK)