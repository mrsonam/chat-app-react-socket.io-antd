import { Typography, Form, Input, Button } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SendOutlined } from '@ant-design/icons';

const socket = io('http://localhost:7000')

const ChatRoom = () => {
    const [form] = useForm()
    const [chat, setChat] = useState<{ username: string, message: string }[]>([])
    const { username } = useParams()

    const sendMessage = ({ message }: { message: string }) => {
        // console.log(value.message)
        socket.emit('message', { username, message })
        form.resetFields(['message'])
    }

    useEffect(() => {
        socket.on('message', payload => {
            setChat([...chat, payload])
        })
    }, [sendMessage])


    return <div className='App'>
        <div className="container">
            <Typography.Title>Chat App</Typography.Title>
            <div className='chatArea'>
                {/* <Typography.Text type='secondary'>@{username}</Typography.Text> */}
                {chat.map(payload => {
                    if (payload.username === username) {
                        return <div className='self'>
                            <Typography.Text type='secondary'>You</Typography.Text><br />
                            <Typography.Text>{payload.message}</Typography.Text><br />
                        </div>
                    } else {
                        return <div>
                            <Typography.Text type='secondary'>@{payload.username}</Typography.Text><br />
                            <Typography.Text>{payload.message}</Typography.Text><br />
                        </div>
                    }
                })}

                <Form form={form} onFinish={sendMessage} className='message-form'>
                    <Form.Item
                    className='message-input'
                        name="message"
                        rules={[
                            {
                                required: true,
                                message: "",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Type a message..."
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item className='button'>
                        <Button type='primary' size='large' htmlType='submit'>Send <SendOutlined /></Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>;
};

export default ChatRoom;
