export const isSameSender = (messages, message, index) => {
	return (
		// check if the message is not the last message in the array
		(index < messages.length - 1 &&
			// check if the sender of the message is different from the sender of the last message
			message.sender._id !== messages[index + 1].sender._id) ||
		// check if the message is the last message
		messages[index + 1] === undefined
	);
};

export const isLastMessage = (messages, index) => {
	return (
		// check if the message is the last message in the array
		index === messages.length - 1 &&
		// check if the sender is a truthy
		messages[messages.length - 1].sender._id
	);
};

export const isCurrentUser = (message, userId) => {
	return message.sender._id === userId;
};

export const isSameSenderMargin = (messages, message, index, userId) => {
	if (
		// check if the sender of the message is not the current user
		message.sender._id !== userId &&
		// check if the message sender is a truthy
		message.sender._id
	)
		return 12;
	else if (
		// check if the message is not the last message
		(index < messages.length - 1 &&
			// check if the next message sender is not the sender of the current message
			messages[index + 1].sender._id !== message.sender._id &&
			// check if the sender of the current message is not the current user
			messages[index].sender._id !== userId) ||
		// check if the message is the last message but the sender is not the current user
		(index === messages.length - 1 && messages[index].sender._id !== userId)
	)
		return 48;
	else return "auto";
};

export const isSameUser = (messages, message, index) => {
	// check if the sender of the previous message is the same as the sender of the current message
	return index > 0 && messages[index - 1].sender._id === message.sender._id;
};
