const gets = async (req, res) => {
  try {
    const data = [
      {
        _id: "0001",
        slug: "idr",
        name: "IDR - Indonesian",
      },
    ];

    return res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

module.exports = { gets };
