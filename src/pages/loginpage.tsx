import { useRouter } from 'next/router';
import { Layout, Button, Checkbox, Form, Input, Row } from 'antd';
import {login} from @services;

const { Content } = Layout;
const LoginPage: React.FC = () => {
    const router = useRouter();

    const onFinish = (data: any) => {
        login(data.username, data.password).then((success) => {
            const returnUrl = router.query.returnUrl || '/dashboard';
            router.push(returnUrl.toString());
        }).catch(err => {
            console.log('Tài khoản hoặc mật khẩu không đúng');
        });
    };
    return (
        <>
            <Layout className="layout">
                <Layout className="site-layout">
                    <Content className="site-layout-background" style={{ margin: '20px 0', padding: '20px' }} >
                        <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
                            <Form
                                name="normal_login"
                                className="login-form"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                autoComplete="off"
                                layout='vertical'
                            >
                                <Form.Item
                                    label="Tên đăng nhập"
                                    name="username"
                                    rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>Ghi nhớ</Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Đăng nhập
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Row>
                    </Content>
                </Layout>
            </Layout>

        </>
    )
};
    export default LoginPage;