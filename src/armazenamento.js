const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.BACKBLAZE_ENDPOINT_S3);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.BACKBLAZE_KEY_ID,
    secretAccessKey: process.env.BACKBLAZE_APP_KEY,
  },
});

const uploadImagemProduto = async (path, buffer, mimetype) => {
  try {
    const produto_imagem = await s3
      .upload({
        Bucket: process.env.BACKBLAZE_KEY_NAME,
        Key: path,
        Body: buffer,
        ContentType: mimetype,
      })
      .promise();

    return {
      url: produto_imagem.Location,
      path: produto_imagem.Key,
    };
  } catch (error) {
    throw new Error(`Falha no upload da imagem: ${error.message}`);
  }
};

const excluirImagem = async (caminhoImagem) => {
  try {
    await s3.deleteObject({
        Bucket: process.env.BACKBLAZE_KEY_NAME,
        Key: caminhoImagem,
    }).promise();
    
} catch (error) {
    throw new Error(`Falha ao excluir imagem: ${error.message}`);
}
};

module.exports = {
  uploadImagemProduto,  
  excluirImagem,
};
