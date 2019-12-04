module.exports = {
  response: (res, statusRes, statusPayload, payload) => {
    const payloadResponse = {}
    payloadResponse.status = statusPayload
    payloadResponse.payload = payload
    return res.status(statusRes).json(payloadResponse)
  }
}
