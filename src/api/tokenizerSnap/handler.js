// eslint-disable-next-line import/no-extraneous-dependencies
const midtransClient = require('midtrans-client');

class TokenizerSnapHandler {
  constructor(service) {
    this._service = service;
    this._snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
    });
  }

  async createTokenHandler(request, h) {
    const { pesanan_id } = request.payload;
    const dataPesanan = await this._service.getPesananSnapById(pesanan_id);
    const pesananHasSkill = await this._service.getPesananHasSkillSnapById(pesanan_id);

    const pesananToItem = await pesananHasSkill.map((item) => ({
      id: item.skill_id,
      price: item.harga_skill,
      quantity: item.permeter,
      name: item.nama_skill,
    }));

    console.log(pesananToItem);
    // todo get data pesananhasskill on skill
    const parameter = {
      transaction_details: {
        order_id: dataPesanan.id,
        gross_amount: dataPesanan.harga_skill,
      },
      //   todo map by skill
      item_details: pesananToItem,
      customer_details: {
        first_name: dataPesanan.fullname,
        email: dataPesanan.email,
      },
    };

    try {
      // menunggu hasil dari fungsi asinkron
      const transaction = await this._snap.createTransaction(parameter);
      // mendapatkan transaction token
      const transactionToken = transaction.token;
      console.log('transactionToken:', transactionToken);
      // mengembalikan response dengan status, message, dan token
      return h.response({
        status: 'success',
        message: 'Token berhasil dibuat',
        token: transactionToken,
      }).code(201);
    } catch (error) {
      console.error('Error:', error);
      return h.response({
        status: 'fail',
        message: 'Token gagal dibuat',
      }).code(500);
    }
  }
}

module.exports = TokenizerSnapHandler;
