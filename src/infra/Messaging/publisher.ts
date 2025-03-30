import { connectRabbitMQ } from "../../config/rabbitmq";

export const publishMessage = async (queue: string, message: object) => {
	const { channel } = await connectRabbitMQ();

	if (!channel) {
		console.error("❌ Não foi possível obter um canal.");
		return;
	}

	await channel.assertQueue(queue, { durable: true });
	channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
		persistent: true,
	});

	console.log(`📤 Mensagem enviada para a fila "${queue}":`, message);
};
