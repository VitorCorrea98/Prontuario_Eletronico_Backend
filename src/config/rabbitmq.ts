import amqp from "amqplib";

const RABBITMQ_URL =
	process.env.RABBITMQ_URL || "amqp://user:password@localhost";

let connection: amqp.ChannelModel | null = null;
let channel: amqp.Channel | null = null;

export const connectRabbitMQ = async () => {
	console.log("Iniciando a conexão com Rabbit");
	if (connection && channel) {
		console.log("Conexão já existente e funcionando");
		return { connection, channel };
	}

	try {
		connection = await amqp.connect(RABBITMQ_URL);
		channel = await connection.createChannel();
		console.log("✅ Conectado ao RabbitMQ");
		return { connection, channel };
	} catch (error) {
		console.error("❌ Erro ao conectar no RabbitMQ:", error);
		process.exit(1);
	}
};
