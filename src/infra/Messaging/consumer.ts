import type { ConsumeMessage } from "amqplib";
import { connectRabbitMQ } from "./rabbitmq";

const processMessage = (msg: string) => {
	return msg.toUpperCase();
};

export const consumeMessage = async (queue: string) => {
	const { channel } = await connectRabbitMQ();

	await channel.assertQueue(queue, { durable: true });

	channel.consume(queue, (msg: ConsumeMessage | null) => {
		if (msg !== null) {
			const processedMessage = processMessage(msg.content.toString());
			console.log("Processed message:", processedMessage);

			// Acknowledge the message after processing
			channel.ack(msg);
		}
	});
};
