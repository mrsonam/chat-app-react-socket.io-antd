import { Form, Typography, Input, Button } from 'antd';
import { ArrowRightOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useForm } from 'antd/lib/form/Form';

const Home = () => {
    const navigate = useNavigate()
    const [form] = useForm()

    const goToRoom = (value: {username: string}) => {
        navigate(`/chat-room/${value.username}`)
    }
    return <div className='App'>
        <div className="container">
            <Typography.Title>Enter your Username</Typography.Title>
            <Form form={form} onFinish={goToRoom}>
                <Form.Item name="username" rules={[{ required: true, message: "You need a username to access the chat room" },]} hasFeedback>
                    <Input size='large' prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' size='large' htmlType='submit'>Go to Chat Room <ArrowRightOutlined /></Button>
                </Form.Item>
            </Form>
        </div>
    </div>;
};

export default Home;
