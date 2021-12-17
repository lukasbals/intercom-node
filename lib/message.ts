import { Client } from '.';
import { MessageObject, MessageType } from './message/message.types';

export default class Message {
    private messagesBaseUrl = 'messages';

    constructor(private readonly client: Client) {
        this.client = client;
    }

    create({
        messageType: message_type,
        subject,
        body,
        template,
        from,
        to,
    }: ICreateMessageBody) {
        const data: ICreateMessageRequest = {
            message_type,
            subject,
            body,
            template,
            from,
            to,
        };

        return this.client.post<MessageObject>({
            url: `/${this.messagesBaseUrl}`,
            data,
        });
    }
}

interface ICreateMessageRequest {
    message_type: MessageType;
    body: string;
    from: Recepient;
    to: Recepient;
    subject?: string;
    template?: string;
}

interface ICreateMessageBody
    extends Omit<ICreateMessageRequest, 'message_type'> {
    messageType: MessageType;
}

type Recepient = {
    id: string;
    type: RecepientType;
};

export enum RecepientType {
    ADMIN = 'admin',
    USER = 'user',
    LEAD = 'lead',
}
