const routes = (handler) => [
  {
    method: 'POST',
    path: '/payment/token',
    handler: (request, h) => handler.createTokenHandler(request, h),
  },
];

module.exports = routes;
